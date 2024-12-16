import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    try {
        const id = url.searchParams.get('id');
        await locals.pb.collection('chat_room_members').update(id, { unread_msgs: 0 })
        return json({ ok: true })
    } catch (error) {
        return json({ ok: false })
    }
}