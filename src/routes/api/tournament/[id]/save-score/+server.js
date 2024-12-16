import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/public';

export async function POST({ request, params }) {

    const req = await request.json();
    const { in_game_username, score } = req;
    const tournament_id = params.id;
    const pb = new PocketBase(env.PUBLIC_BASE_URL);

    if (!in_game_username) {
        throw error(400, 'in_game_username is required');
    }

    if (!score) {
        throw error(400, 'score is required');
    }

    await pb.collection('users').authWithPassword('test@gmail.com', '12341234');

    let tournament_record;
    try {
        tournament_record = await pb.collection('tournaments').getOne(tournament_id);
    } catch (err) {
        throw error(404, 'Tournament not found')
    }

    if (tournament_record.type != 'leaderboard') {
        throw error(400, 'Tournament not found');
    }

    try {
        const tournament_leaderboard = await pb.collection('tournaments_leaderboard').getFirstListItem(`tournament="${tournament_id}" && in_game_username="${in_game_username}"`);
        await pb.collection('tournaments_leaderboard').update(tournament_leaderboard.id, { 'score+': score });
        pb.authStore.clear();
        return json({ success: true });
    } catch (error) {
        console.log(error.message);

    }

    try {
        await pb.collection('tournaments_leaderboard').create({ tournament: tournament_id, in_game_username, score });
        pb.authStore.clear();
        return json({ success: true });
    } catch (error) {
        throw error(500, 'Internal Server Error');
    }

}