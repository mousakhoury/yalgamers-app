import { json } from '@sveltejs/kit';

export const actions = {
	review: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const user = await locals.pb.authStore.model;
		const gameData = await locals.pb.collection('games').getFirstListItem(`unique_title='${params.gameid}'`);
		let game = gameData.id;

		if (formData.get('review') == "") {
			return;
		}

		try {
			const data = {
				review: formData.get('review'),
				stars: formData.get('rating'),
				graphics: formData.get('graphics'),
				gameplay: formData.get('gameplay'),
				performance: formData.get('optimization')
			};
			const record = await locals.pb.collection('reviews').create({
				...data,
				user: user.id,
				game
			});

			await locals.pb.collection('xp_logs').create({
				user: user.id,
				xp: gameData.xp,
				type: 'GAME_REVIEW',
				data: {
					game
				}
			});

			return 'Success';
		} catch (error) {
			// console.log(error);
			return 'Failed';
		}
	}
};
