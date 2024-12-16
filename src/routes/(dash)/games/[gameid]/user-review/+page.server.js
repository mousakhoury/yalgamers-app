import { env } from '$env/dynamic/public';
export async function load({ params, locals, fetch }) {
	try {
		const res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/games/records?filter=(unique_title='${params.gameid}')`);
		const game = (await res.json()).items[0];

		const reviews = await locals.pb.collection('reviews').getList(1, 50, {
			filter: `game="${game.id}"`,
			sort: '-created',
			expand: 'user'
		});
		return {
			reviews: JSON.parse(JSON.stringify(reviews.items))
		};
	} catch (error) {
		return {
			reviews: []
		};
	}
}

export const actions = {
	review: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const user = await locals.pb.authStore.model.id;
		const gameData = await locals.pb.collection('games').getFirstListItem(`unique_title='${params.gameid}'`);
		const game = gameData.id;
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
				user,
				game
			});

			locals.pb.collection('xp_log').create({
				user,
				data: {
					type: 'GAME_REVIEW',
					game_id: game,
					review_id: record.id
				}
			});

			return {
				response_code: 200,
				response_message: 'Review submitted successfully',
				response: null
			};
		} catch (error) {
			// console.log(error);
			return { response_code: 500, response_message: error, response: null };
		}
	}
};
