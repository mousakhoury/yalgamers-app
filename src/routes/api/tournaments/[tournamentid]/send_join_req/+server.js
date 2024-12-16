import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);

    if (data.team == "" || data.player == "") {
        throw error(400, 'server error')
    }

    try {
        await locals.pb.collection('tournament_team_requests').create(data);
        return json(201);
    } catch {
        throw error(400, 'server error')
    }
}

