import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();

    if (formData.get('u_id') == "" || formData.get('id') == "") {
        throw error(500, 'server error')
    }

    let data = {
        state: 'pending',
        player: formData.get('u_id')
    }

    try {
        await locals.pb.collection('tournament_selected_players').update(id, data);
        return json(201);
    } catch (err) {
        throw error(500, 'server error')
    }
}
