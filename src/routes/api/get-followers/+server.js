import { getImageUrl } from '$lib/utils.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (locals.user) {
        const userid = locals.user.id;

        let myFollowers = [];
        try {
            let record = await locals.pb.collection('followers').getFirstListItem(`user='${userid}'`, {
                expand: 'followers'
            });

            myFollowers = record.expand.followers.map(m => ({
                name: m.name == '' ? m.username : m.name,
                username: m.username,
                image: m.avatar == '' ? null : getImageUrl('users', m.id, m.avatar)
            }));
        } catch (error) { }

        let following = [];
        try {
            let records = await locals.pb.collection('followers').getFullList({
                filter: `followers~'${userid}'`,
                expand: 'user'
            })

            following = records.map(m => ({
                id: m.expand.user.id,
                name: m.expand.user.name == '' ? m.expand.user.username : m.expand.user.name,
                username: m.expand.user.username,
                image: m.expand.user.avatar == '' ? null : getImageUrl('users', m.expand.user.id, m.expand.user.avatar)
            }))
        } catch (error) {

        }

        return json({ following, myFollowers })
    }
    throw error(401)
}