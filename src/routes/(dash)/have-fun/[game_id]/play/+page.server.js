export async function load({ locals, params }) {
	const pb = locals.pb;
	const game = await pb.collection('mini_games').getOne(params.game_id, {
		expand: 'sponsors'
	});

	return {
		game: JSON.parse(JSON.stringify(game))
	};
}
