import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();
    const t_id = params.tournamentid;
    const id = formData.get("id");

    if (id == "") {
        throw error(400, 'server error')
    }
    try {
        await locals.pb.collection('tournament_selected_players').update(id, { state: 'accepted' });
        await locals.pb.collection('tournaments').update(t_id, { 'selected_players+': 1 });
        return json(201);
    } catch (err) {
        throw error(400, 'server error')
    }
}
