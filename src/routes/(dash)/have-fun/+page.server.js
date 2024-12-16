export async function load({ locals }) {
	const pb = locals.pb;

	const gamesP = pb.collection('mini_games').getFullList({
		expand: 'sponsors'
	});

	const statsP = pb.collection('mini_games_stats').getFullList();

	const [games, stats] = await Promise.all([gamesP, statsP]);

	const gamesWithStats = games.map((g) => ({
		...g,
		total_played: stats.find((s) => s.id === g.id)?.total_played
	}));

	return {
		games: JSON.parse(JSON.stringify(gamesWithStats))
	};
}
