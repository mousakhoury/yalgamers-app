import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const data = await request.json();
    if (locals.user && data && locals.pb) {
        const userId = locals.user.id;
        try {
            await locals.pb.collection('users').update(userId, data);
            return json({ save: true })
        } catch (error) {
            return json({ save: false })
        }
    }
    return json({ save: false })
}