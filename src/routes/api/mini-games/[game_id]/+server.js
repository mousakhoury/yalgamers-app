import { getImageUrl } from '$lib/utils.js';
import { json } from '@sveltejs/kit';
import exp from 'constants';

export const GET = async ({ params, locals }) => {
	// console.log(params.game_id);
	let minigame;
	try {
		minigame = await locals.pb.collection('mini_games').getOne(params.game_id);
	} catch (e) {
		return json('failed');
	}
	const getImage = (img) => getImageUrl('mini_games', minigame.id, img);

	return json({
		...minigame,
		background_image_url: getImage(minigame.background_image),
		sponsor_image_urls: minigame.sponsors.map(getImageUrl),
		extra_image_url: getImage(minigame.extra)
	});
};

export const POST = async ({ request, locals, params }) => {
	try {
		const user = locals.pb.authStore.model.id;
		const score = (await request.json()).score;
		const game = params.game_id;

		locals.pb.collection('min_games_scores').create({
			game,
			user,
			score
		});
		return json('success');
	} catch (error) {
		return json('not logged In');
	}
};
