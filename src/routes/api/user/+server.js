import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import { getImageUrl } from '$lib/utils.js';

export const GET = async ({ locals, url }) => {
    if (locals.user) {
        const game_id = url.searchParams.get('game');
        try {
            await locals.pb.collection('mini_games').getOne(game_id);
        } catch {
            return json({
                status: 404,
                message: "Not Found"
            })
        }

        const [items, my_score] = await Promise.all([get_top_50(locals.pb, game_id, locals.user.id), get_current_loggedin_user_score(locals.pb, game_id, locals.user.id)]);

        const data = {
            user: {
                id: locals.user.id,
                name: locals.user.name,
                username: locals.user.username,
                avatar: locals.user.avatar ? getImageUrl(locals.user.collectionId, locals.user.id, locals.user.avatar) : null,
                score: my_score
            },
            top50: items,
        }
        return json(data)
    }
    return json(null);
};

async function get_top_50(pb, game_id, user_id) {
    try {
        const recordList = await pb.collection('combine_mini_games_scores').getList(1, 50, {
            sort: '-total_score',
            filter: `game='${game_id}'&&user!='${user_id}'`,
            expand: 'user'
        });

        return recordList.items.map(m => {
            return {
                user_id: m.expand.user.id,
                username: m.expand.user.username,
                avatar: m.expand.user.avatar ? getImageUrl(m.expand.user.collectionId, m.expand.user.id, m.expand.user.avatar) : null,
                scores: m.total_score
            }
        })
    } catch (error) {
        console.log(error);
        return []
    }
}

async function get_current_loggedin_user_score(pb, game_id, user_id) {
    try {
        return (await pb.collection('combine_mini_games_scores').getFirstListItem(`game='${game_id}'&&user='${user_id}'`)).total_score;
    } catch (error) {
        return 0;
    }
}