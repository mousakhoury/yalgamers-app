import { error, json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    try {
        const formData = await request.formData();
        const id = formData.get('id');
        let member = await locals.pb.collection('tournament_selected_players').getOne(id);
        member.player = ''
        member.state = "pending"

        await locals.pb.collection("tournament_selected_players").update(id, member)

        return json(201);
    } catch (err) {
        throw error(400, 'server error')
    }
}

