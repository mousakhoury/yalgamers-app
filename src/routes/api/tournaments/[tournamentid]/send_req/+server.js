import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();
    const id = formData.get("id");
    const p_id = formData.get("p_id");

    if (id == "" || p_id == "") {
        throw error(401, "empty fields")
    }

    try {
        let res = await locals.pb.collection('tournament_team_requests').getFirstListItem(`player='${p_id}'`)
        throw error(401, "already exist")
    } catch (error) {
    }

    try {
        await locals.pb.collection('tournament_registrations').getOne(id);
        const data = {
            player: p_id,
            team: id,
            tournament: params.tournamentid
        }

        await locals.pb.collection('tournament_team_requests').create(data);
        return json(201);
    } catch (err) {
        throw error(400, 'server error')
    }
}
