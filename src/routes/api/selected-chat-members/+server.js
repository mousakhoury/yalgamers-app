import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    const chatId = url.searchParams.get('id');

    let hidden = false;
    if (chatId == 'u5euzic3yqh45c4') {
        hidden = true;
    }
    let members = await locals.pb.collection('chat_room_members').getFullList({
        filter: `chat_room='${chatId}' && hidden=${hidden}`,
        expand: 'member'
    })

    let list = [];
    members.forEach(e => {
        let obj = e.expand.member;
        obj.type = e.type;
        obj.join_date = e.created;
        obj.member_id = e.id;
        list.push(obj)
    })

    return json({ list })
}