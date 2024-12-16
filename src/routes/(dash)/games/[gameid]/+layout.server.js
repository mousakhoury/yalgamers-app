import ytdl from '@distube/ytdl-core';

export async function load({ params, fetch, url, locals }) {
	try {

		let gameId = ''
		const fetchGame = async () => {
			const game = await locals.pb.collection('games').getFirstListItem(`unique_title='${params.gameid}'`, { expand: 'network, platforms, genres_new' });
			gameId = game.id;
			const video_id = ytdl.getURLVideoID(game.youtube_video);
			game.youtube_video_id = video_id;
			return game;
		};

		const fetchReview = async () => {
			try {
				const record = await locals.pb
					.collection('reviews')
					.getFirstListItem(`user="${locals.pb.authStore.model.id}" && game="${gameId}"`);
				return JSON.parse(JSON.stringify(record));
			} catch (err) {
				return null;
			}
		};

		const favourite_game = async () => {
			try {
				const record = await locals.pb.collection('favourite_games').getFirstListItem(`user="${locals.pb.authStore.model.id}" && game="${gameId}"`);
				return record.id;
			} catch (err) {
				return null;
			}
		};

		const ActivityLog = async () => {
			const records = await locals.pb.collection('activity_log').getFullList({
				fields: 'id',
				filter: `user="${locals.pb.authStore.model.id}" && data.game_id="${gameId}" && data.type="GAME_VIEW"`
			});

			if (records.length) return;

			locals.pb.collection('activity_log').create({
				user: locals.pb.authStore.model.id,
				data: {
					game_id: gameId,
					type: 'GAME_VIEW'
				}
			});
		};


		async function fetch_game_reviews() {
			try {
				return (await locals.pb.collection('reviews').getList(1, 50, {
					filter: `game.unique_title="${params.gameid}" && accepted=true`,
					sort: '-created',
					expand: 'user'
				})).items;
			} catch (error) {
				return []
			}
		}

		const [game, reviews] = await Promise.all([fetchGame(), fetch_game_reviews()])

		const review = await fetchReview()
		const data = game;
		data.starred = await favourite_game();

		try {
			const r = await locals.pb.collection('game_ratings').getOne(gameId);
			data.reviews = r.total_reviews;
			data.rating = r.total_stars / r.total_reviews;
		} catch (e) {
			data.reviews = 0;
			data.rating = 0;
		}

		await ActivityLog();

		return {
			review,
			game: JSON.parse(JSON.stringify(data)),
			params,
			reviews: structuredClone(reviews),
			pathname: url.pathname
		};
	} catch (error) {
		console.log(error)
	}
}
