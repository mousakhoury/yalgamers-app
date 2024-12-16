import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();

    const id = formData.get("id");
    if (id == "") {
        throw error(400, 'server error')
    }

    try {
        await locals.pb.collection('tournament_selected_players').update(id, { player: '', state: 'pending' });
        return json(201);
    } catch {
        throw error(400, 'server error');
    }
}

