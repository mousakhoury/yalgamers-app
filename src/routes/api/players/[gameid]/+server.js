import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { getOneWeekBeforeToday } from '$lib/utils.js';

export async function GET(url) {
    try {
        const gameid = url.params.gameid;
        const user = url.url.searchParams.get('user');

        const pb = new PocketBase(env.PUBLIC_BASE_URL);
        await pb.collection('mini_games').getOne(gameid);
        await pb.collection('users').getOne(user);

        const date = getOneWeekBeforeToday();

        let scores = await pb.collection('min_games_scores').getFullList({
            filter: `created>='${date}' && game='${gameid}'`,
            expand: 'user'
        });


        let list = [];
        scores.forEach(element => {
            const index = list.findIndex(f => f.user == element.user);
            if (index >= 0) {
                list[index].score = list[index].score + element.score
            } else {
                list.push(element);
            }
        });

        let full_sorted_list = list.sort((a, b) => b.score - a.score);
        let top50 = full_sorted_list.slice(0, 50);

        const top_players = top50.map(m => {
            return {
                score: m.score,
                name: m.expand.user.name,
                username: m.expand.user.username,
            }
        });

        const index = list.findIndex(f => f.user == user);
        let my_rank = 0;
        let my_score = 0;
        if (index == -1) {
            my_rank = list.length + 1;
        } else {
            my_rank = index + 1;
            my_score = list[index].score;
        }

        const number_of_top_players = top_players.length;

        return json({ my_rank, my_score, number_of_top_players, top_players });
    } catch (err) {
        throw error(404);
    }
}
