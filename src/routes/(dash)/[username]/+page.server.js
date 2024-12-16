import { redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
    const username = params.username;
    if (locals.user) {

        let user;
        try {
            user = await locals.pb.collection('users').getFirstListItem(`username='${username}'`);
        } catch (error) {
            throw redirect(301, '/')
        }

        async function fetchMyNfts() {
            try {
                return await locals.pb.collection('project_nft_logs').getFullList({
                    filter: `user='${user.id}' && claimed=true`,
                    expand: 'project',
                })
            } catch (error) {
                return []
            }
        }

        async function get_xps() {
            try {
                return (await locals.pb.collection('users_xp').getFirstListItem(`username='${user.username}'`)).xp
            } catch (error) {
                return 0
            }
        }

        async function get_followers() {
            try {
                const record = await locals.pb.collection('followers').getFirstListItem(`user='${user.id}'`, { expand: 'followers' });
                if (record.followers.length > 0) {
                    return record.expand.followers
                }
                return [];
            } catch (error) {
                await locals.pb.collection('followers').create({ user: user.id });
                return []
            }
        }

        async function get_badges() {
            try {
                return await locals.pb.collection('claimed_badges').getFirstListItem(`user='${user.id}'`);
            } catch (error) {
                return null
            }
        }

        const [my_nfts, followers, xps] = await Promise.all([fetchMyNfts(), get_followers(), get_xps()]);
        return { user: structuredClone(user), my_nfts: structuredClone(my_nfts), followers: structuredClone(followers), xps, }
    } else {
        throw redirect(301, '/login')
    }
};

export const actions = {
    follow: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            const record = await locals.pb.collection('followers').getFirstListItem(`user='${data.get('id')}'`);
            if (!record.followers.find(f => f == locals.user.id)) {
                let followers = [...record.followers, locals.user.id];
                await locals.pb.collection('followers').update(record.id, { followers });
                return { ok: true }
            }
            return { ok: false }
        } catch (error) {
            return { ok: false }
        }
    },
    unfollow: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            const record = await locals.pb.collection('followers').getFirstListItem(`user='${data.get('id')}'`);

            if (record.followers.find(f => f == locals.user.id)) {
                let followers = record.followers.filter(f => f != locals.user.id);
                await locals.pb.collection('followers').update(record.id, { followers });
                return { ok: true }
            }
            return { ok: false }
        } catch (error) {
            return { ok: false }
        }
    }
};