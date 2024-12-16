import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();
    const empty_player_id = formData.get("empty_player_id");
    const player_id = formData.get("player_id");
    const req_id = formData.get("req_id");
    const t_id = params.tournamentid;

    if (empty_player_id == "" || player_id == "" || req_id == "") {
        throw error(401, "empty fields")
    }

    try {
        let res = await locals.pb.collection('tournament_selected_players').getOne(empty_player_id)

        res.player = player_id;
        res.state = 'accepted'

        await locals.pb.collection('tournament_selected_players').update(empty_player_id, res);
        await locals.pb.collection('tournament_team_requests').delete(req_id)
        await locals.pb.collection('tournaments').update(t_id, { 'selected_players+': 1 })
        return json(201);
    } catch {
        throw error(400, 'server error')
    }
}
