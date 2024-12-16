import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    try {
        const data = await request.json();
        const addr = data.address;
        const user = await locals.pb.collection('users').getFirstListItem(`metamask_address='${addr}' || ronin_address='${addr}' || solana_address='${addr}'`);
        if (user.id == locals.user.id) {
            return json(true)
        }
        return json(false)
    } catch (error) {
        return json(true)
    }
}