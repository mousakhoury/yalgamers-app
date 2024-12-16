import { error, json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const formData = await request.formData();

    let data = Object.fromEntries(formData);
    const { u_id, prev_u_id, id } = data;

    if (prev_u_id == "" || u_id == "" || id == "") {
        throw error(400, 'server error')
    }

    data = {
        state: 'pending',
        player: u_id
    }

    try {
        let getOne = await locals.pb.collection('tournament_selected_players').getOne(id);
        if (getOne.player == prev_u_id) {
            await locals.pb.collection('tournament_selected_players').update(id, data);
            return json(201);
        } else {
            throw error(400, 'server error')
        }

    } catch {
        throw error(400, 'server error')
    }
}

