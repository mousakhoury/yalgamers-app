import { json } from '@sveltejs/kit'

export async function POST({ locals, request }) {
    if (locals.user) {
        try {
            const data = await request.json();
            await locals.pb.collection('weekly_spin').update(data.id, { claim: true, spins: data.spin })
            return json({ ok: true })
        } catch (error) {
            return json({ ok: false })
        }
    }
}
