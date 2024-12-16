import { getImageUrl } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request, params, locals }) => {
	if (!locals.user) return json('');
	const data = await request.json();
	try {
		const game = await locals.pb
			.collection('mini_games')
			.getFirstListItem(`bucket_path="${params.gameid}"`);

		await locals.pb.collection('min_games_scores').create({
			user: locals.pb.authStore.model.id,
			game: game.id,
			//score: (data?.score ?? 0) + (data?.coins * 10 ?? 0)
			score: data?.score ?? 0
		});
		const [items, my_score] = await Promise.all([get_top_50(locals.pb, game.id, locals.user.id), get_current_loggedin_user_score(locals.pb, game.id, locals.user.id)]);

		const obj = {
			user: {
				id: locals.user.id,
				name: locals.user.name,
				username: locals.user.username,
				avatar: locals.user.avatar ? getImageUrl(locals.user.collectionId, locals.user.id, locals.user.avatar) : null,
				score: my_score
			},
			top50: items,
		}
		return json(obj)
	} catch (e) {
		// console.log(e);
		return json('ooo');
	}
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
		// console.log(error);
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