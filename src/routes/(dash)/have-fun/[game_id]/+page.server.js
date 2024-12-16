import { getOneWeekBeforeToday } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const pb = locals.pb;

	async function getGame() {
		try {
			return await pb.collection('mini_games').getOne(params.game_id, {
				expand: 'sponsors'
			});
		} catch (error) {
			throw redirect(300, '/login');
		}
	}

	async function getStats() {
		try {
			return (await pb.collection('mini_games_stats').getOne(params.game_id)).total_played;
		} catch (error) {
			return 0;
		}
	}

	async function getRanks() {
		try {
			return await pb.collection('mini_game_ticket_rewards').getFullList();
		} catch (error) {
			return [];
		}
	}

	async function get_my_total_score() {
		try {
			let scores = await pb.collection('min_games_scores').getFullList({
				filter: `user='${locals.user.id}' && game='${params.game_id}'`,
				expand: 'user'
			});
			let total_score = 0;
			scores.forEach(e => {
				total_score += e.score;
			})
			return total_score;
		} catch (error) {
			return 0;
		}
	}

	async function get_min_game_score() {
		try {
			const date = getOneWeekBeforeToday();
			// filter: `created >= '2024-03-27'`
			let scores = await pb.collection('min_games_scores').getFullList({
				filter: `created>='${date}' && game='${params.game_id}'`,
				expand: 'user'
			});

			let list = [];
			scores.forEach(element => {
				const index = list.findIndex(f => f.user == element.user);
				if (index >= 0) {
					list[index].score = list[index].score + element.score
				} else {
					list.push(element);
				}
			});

			let full_sorted_list = list.sort((a, b) => b.score - a.score);
			let top50 = full_sorted_list.slice(0, 50);
			if (!top50.find(f => f.user == locals.user.id)) {
				let index = list.findIndex(f => f.user == locals.user.id);
				if (index >= 0) {
					list[index].my_rank = index + 1;
					top50.push(list[index]);
				}
			} else {
				const my_index = top50.findIndex(f => f.user == locals.user.id);
				top50[my_index].my_rank = my_index + 1;
			}
			return top50;
		} catch (error) {
			return [];
		}
	}
	const [game, total_played, leaderboard, ranks] = await Promise.all([getGame(), getStats(), get_min_game_score(), getRanks()])
	const comulative_score = await get_my_total_score();

	return {
		game: JSON.parse(JSON.stringify({ ...game, total_played: total_played })),
		leaderboard: JSON.parse(JSON.stringify(leaderboard)),
		comulative_score,
		ranks: structuredClone(ranks)
	};
}
