import { json } from '@sveltejs/kit';

export async function POST({ request, params, locals }) {

    const req = await request.json();
    const { in_game_username } = req;
    const tournament = params.id;
    const user = locals.user.id;

    if (!in_game_username) {
        return json({ ok: false, msg: 'in_game_username is required' });
    }

    let exist = null;
    try {
        exist = await locals.pb.collection('tournaments_leaderboard').getFirstListItem(`tournament='${tournament}' && in_game_username='${in_game_username}'`);
        await locals.pb.collection('tournaments_leaderboard').update(exist.id, { user });
        return json({ ok: true });
    } catch (error) {
        console.log(error.message);
    }

    try {
        await locals.pb.collection('tournaments_leaderboard').create({ tournament, user, in_game_username });
        return json({ ok: true });
    } catch (error) {
        return json({ ok: false, msg: error.message });
    }
}