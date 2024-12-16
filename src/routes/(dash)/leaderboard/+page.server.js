import dateFormat from '$lib/dateFormat.js';

export async function load({ locals }) {
	try {
		const pb = locals.pb;
		const today = new Date();
		const formattedDate = dateFormat(today);


		async function get_current_season() {
			try {
				return await pb
					.collection('seasons')
					.getFirstListItem(`start <= "${formattedDate}" && "${formattedDate}" <= end`, {
						expand: 'diamond_sponsors,participating_sponsors'
					});
			} catch (error) {
				return null;
			}
		}

		async function get_all_seasons() {
			try {
				return await pb.collection('seasons').getFullList({
					filter: `id!='azffdwuvuywsi7a'`,
					expand: 'participating_sponsors, diamond_sponsors'
				});
			} catch (error) {
				return [];
			}
		}


		async function get_leaders() {
			try {
				return await pb.collection('leaderboard').getList(1, 50, {
					sort: '-xp'
				});
			} catch (error) {
				return [];
			}
		}

		async function get_seasons() {
			try {
				return await pb.collection('season_history').getFullList({
					expand: 'season,season.participating_sponsors,season.diamond_sponsors',
					sort: '-created'
				});
			} catch (error) {
				return [];
			}
		}

		/**
		 * @param {string} inputString
		 */
		function formatStringWithNumber(inputString) {
			// Use a regular expression to find the number in the input string
			const match = inputString.match(/\d+/);

			// Check if a number was found
			if (match) {
				// Extract the number from the match
				const number = match[0];
				// Return the formatted string
				return `s${number}_leaderboard`;
			} else {
				// Return a default value or handle the case where no number is found
				return 'No number found';
			}
		}

		/**
		 * @param {string} collectionName
		 */
		async function get_leaderboard_by_season(collectionName) {
			try {
				return (await pb.collection(collectionName).getList(1, 50, { sort: '-xp' })).items;
			} catch (error) {
				return [];
			}
		}

		const [season, seasons] = await Promise.all([get_current_season(), get_all_seasons()]);

		let leaders = []
		let next_season = '';

		if (season) {
			leaders = await get_leaders();
		} else {
			next_season = seasons.length + 1
		}

		for (let index = 0; index < seasons.length; index++) {
			const season = seasons[index];
			const leaderboard = await get_leaderboard_by_season(formatStringWithNumber(season.title_en));
			seasons[index].leaderboard = leaderboard;
		}

		let userRank;

		try {
			userRank = await pb.collection('leaderboard').getOne(pb.authStore.model.id);
		} catch (error) { }

		const res = {
			ranking: leaders.items,
			user: userRank,
			season,
			seasons,
			next_season,
		};

		return JSON.parse(JSON.stringify(res));
	} catch (error) {
		// console.log(error);
		return {};
	}
}
