// @ts-nocheck
export async function load({ fetch, locals }) {
	const fetchTournaments = async () => {
		const response = await fetch(`/api/tournaments`);
		const data = await response.json();
		return data;
	};

	const fetchUserTournaments = async () => {
		try {
			const tournaments = await locals.pb.collection('tournament_registrations').getList(1, 50, {
				fields: 'tournament',
				filter: `user="${locals.pb.authStore.model.id}"`,
				sort: '-created'
			});
			return tournaments.items.map((t) => t.tournament);
		} catch (error) {
			return [];
		}
	};

	const data = {
		upcoming: [],
		yours: [],
		past: [],
		ongoing: [],
	};

	const [tournaments, userTournaments] = await Promise.all([
		fetchTournaments(),
		fetchUserTournaments()
	]);

	const today = new Date();

	function get_status(event) {
		const today = new Date();
		const reg_start = new Date(event.registration_starting_date);
		const reg_deadline = new Date(event.registration_deadline);
		const start = new Date(event.start);
		const deadline = new Date(event.deadline);

		if (today > reg_start && today < reg_deadline) {
			return 'upcoming';
		} else if (today >= start && today <= deadline) {
			return 'ongoing';
		} else if (today > deadline) {
			return 'finished';
		}
	}

	tournaments.items.forEach((tournament) => {
		const deadline = new Date(tournament.deadline);
		const start = new Date(tournament.start);

		if (start > today) {
			tournament.status = get_status(tournament);
			data.upcoming.push(tournament);
		} else if (deadline < today) {
			tournament.status = get_status(tournament);
			data.past.push(tournament);
		} else if (start <= today && deadline > today) {
			tournament.status = get_status(tournament);
			data.ongoing.push(tournament)
		}
	});

	data.yours = tournaments.items.filter((t) => userTournaments.includes(t.id));

	data.yours = data.yours.map(m => ({
		...m,
		status: get_status(m)
	}))

	return {
		groupedData: data
	};
}
