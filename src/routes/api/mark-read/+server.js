import { json } from '@sveltejs/kit';
// mark notification as read
export async function GET({ locals, url }) {
    if (locals.user) {
        const id = url.searchParams.get('id');
        try {
            await locals.pb.collection('notifications').update(id, { read: true })
        } catch (error) { }
        return json(200);
    }
}