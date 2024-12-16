import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
	const pb = locals.pb;

	const ratings = await locals.pb.collection('game_ratings').getFullList();

	const search = url.searchParams;

	const page = search.get('page') ?? 1;

	const networkQuery = search
		.getAll('Network')
		.map((n) => `network~'${n}'`)
		.join('||');

	const platformQuery = search
		.getAll('Platform')
		.map((p) => `platforms~'${p}'`)
		.join('||');

	const statusQuery = search
		.getAll('Status')
		.map((p) => `status='${p}'`)
		.join('||');

	const genreQuery = search
		.getAll('Genres')
		.map((g) => `genres_new~'${g}'`)
		.join('||');

	let freeToPlay = search.get('Free To Play')
		? `&& free_to_play = '${search.get('Free To Play')}'`
		: '';
	const filter = [networkQuery, platformQuery, statusQuery, genreQuery].reduce((acc, q) => {
		if (q) {
			return acc + (acc ? '&&' : ' ') + `(${q})`;
		} else {
			return acc;
		}
	}, freeToPlay);

	// const gamesLength = (await pb.collection('games').getFullList()).length;
	const games = await pb.collection('games').getList(page, 30, {
		expand:
			'platforms, network, genres_new',
		sort: '-created',
		filter
	});

	games.items = games.items.map((g) => {
		const r = ratings.find((x) => x.id === g.id) ?? { total_stars: 0, total_reviews: 0 };
		const { total_stars, total_reviews } = r;

		let rating = (total_stars / total_reviews).toPrecision(3);
		if (isNaN(rating)) rating = 0;
		return {
			...g,
			rating,
			reviews: total_reviews
		};
	});
	return json(games);
}
