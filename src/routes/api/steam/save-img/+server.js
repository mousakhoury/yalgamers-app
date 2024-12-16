import { json } from "@sveltejs/kit"

export async function POST({ locals, request }) {
    try {
        const form = await request.formData();
        const id = form.get('id');
        form.delete('id');
        await locals.pb.collection('steam_data').update(id, form)
        return json({ ok: true })
    } catch (error) {
        return json({ ok: false })
    }
}