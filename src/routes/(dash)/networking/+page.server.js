import { redirect } from '@sveltejs/kit';
export async function load({ locals }) {
    if (locals.user) {
        async function get_chats() {
            try {
                let list = await locals.pb.collection('chat_room_members').getFullList({
                    filter: `member='${locals.user.id}' && chat_room.live=true`,
                    expand: 'chat_room.project'
                })

                let chats = [];
                list.forEach(e => {
                    let obj = e.expand.chat_room;
                    obj.unread_msgs = e.unread_msgs;
                    obj.member_id = e.id;
                    chats.push(obj);
                });

                return [...chats.filter(f => f.type == 'default'), ...chats.filter(f => f.type != 'default')]
            } catch (error) {
                return [];
            }
        }

        async function get_locked_chats() {
            try {
                return await locals.pb.collection('networking').getFullList({
                    filter: `type!='default'`,
                })
            } catch (error) {
                return [];
            }
        }

        const [chats, locked] = await Promise.all([get_chats(), get_locked_chats()]);
        let locked_chats = []
        const chat_ids = chats.map(e => e.id);
        locked.forEach(e => {
            if (!chat_ids.includes(e.id)) {
                locked_chats.push(e);
            }
        })

        return { chats: structuredClone(chats), locked_chats: structuredClone(locked_chats) }
    } else {
        throw redirect(301, '/login')
    }
};

export const actions = {
    send_msg: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            const obj = {
                username: locals.user.username,
                name: locals.user.name == '',
                id: locals.user.id,
                avatar: locals.user.avatar
            }

            data.append('user', locals.user.id);
            data.append('data', JSON.stringify(obj));

            await locals.pb.collection('messages').create(data);
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
            }
        }
    },
    leave_chat: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            const chatid = data.get('chatid');
            const userid = locals.user.id;
            const record = await locals.pb.collection('networking').getOne(chatid);
            const members = record.members.filter(f => f != userid);
            await locals.pb.collection('networking').update(chatid, { members });
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
            }
        }
    },
};