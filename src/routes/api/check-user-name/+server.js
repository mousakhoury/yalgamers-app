import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    try {
        const data = await request.json();
        const res = await locals.pb.send('/find-user-by-username', {
            method: 'POST',
            body: JSON.stringify({ username: data.username })
        });

        if (!res.username) {
            return json({ ok: true })
        }

        if (res.username && locals.user && locals.user.id == res.id) {
            return json({ ok: true });
        }

        return json({ ok: false })
    } catch (error) {
        return json({ ok: true })
    }
}