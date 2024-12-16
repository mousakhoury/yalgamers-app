import { env } from '$env/dynamic/public';
import { getImageUrl } from '$lib/utils';

export const load = async ({ locals }) => {
	const pb = locals.pb;

	async function fetchCourses() {
		try {
			const tutorials = await pb.collection('tutorials').getList(1, 10, {
				expand: 'user',
				sort: '-created'
			});
			return tutorials.items;
		} catch (error) {
			return [];
		}
	}

	async function fetchTournaments() {
		// && deadline > '${new Date().toISOString().slice(0, 10)}'
		const tournaments = await pb.collection('tournaments').getList(1, 10, {
			filter: `publish=true`,
			expand: 'game_center',
			sort: '-deadline,-created'
		});
		return tournaments.items;
	}

	async function fetchGames() {
		const games = await pb.collection('games').getList(1, 10, {
			sort: '-created',
			expand: 'platforms, network, genres_new',
		});
		return games.items;
	}

	async function fetchNews() {
		const news = await pb.collection('news').getList(1, 10, {
			sort: '-created'
		});
		return news.items;
	}

	async function fetchAnnouncements() {
		const announcements = await pb.collection('announcements').getList(1, 10, {
			sort: '-created'
		});
		return announcements.items;
	}

	async function fetchGenres() {
		return await pb.collection('genres').getFullList();
	}

	async function getProjects() {
		try {
			const current = new Date();
			const before_dealine = current.toISOString().slice(0, 10);
			let projects = await locals.pb.collection('projects').getList(1, 10, { filter: `publish=true && deadline >= '${before_dealine}'` });

			projects = projects.items;
			projects = [...projects.filter(f => f.isFeatured), ...projects.filter(f => !f.isFeatured)]

			let quests = [];

			if (locals.user) {
				quests = await locals.pb.collection('project_logs').getFullList({
					filter: `user='${locals.user.id}'`
				});
			}

			for (let index = 0; index < projects.length; index++) {
				let project = projects[index];

				const deadline = new Date(project.deadline);
				project.isActive = true;

				if (current > deadline) {
					project.isEnded = true;
					project.isActive = false;
				} else {
					project.isEnded = false;
				}

				project.isCompleted = true;

				const get_quest_tasks = async () => await locals.pb.collection('project_tasks').getFullList({ filter: `project='${project.id}'` });
				const get_rewards = async () => await locals.pb.collection('project_rewards').getFullList({ filter: `project='${project.id}'` });

				const [quest_tasks, rewards] = await Promise.all([get_quest_tasks(), get_rewards()]);

				if (locals.user) {
					project.quests = quest_tasks.map(m => m.id);
				} else {
					project.quests = [];
				}
				project.showXpIcon = quest_tasks.length > 0 ? true : false;
				project.showNftIcon = rewards.find(f => f.type == 'nft') ? true : false;
				project.showMoneyIcon = rewards.find(f => f.type == 'money') ? true : false;
				project.showTicketIcon = rewards.find(f => f.type == 'ticket') ? true : false;

				const tasks = project.quests.map((task) => {
					const quest = quests.find((log) => task === log.quest && log.project == project.id);
					if (quest) {
						if (quest.verified) {
							return { isCompleted: true, isPending: false }
						}
						project.isCompleted = false;
						return { isCompleted: false, isPending: true }
					} else {
						project.isCompleted = false;
						return { isCompleted: false, isPending: false }
					}
				});
				project.quests = tasks;

				projects[index] = project;
			}

			let topthree = projects.slice(0, 3);
			if (topthree.find(f => f.isFeatured)) {
				return topthree;
			}
			const featuredProject = projects.find(f => f.isFeatured);
			if (featuredProject) {
				topthree.push(featuredProject);
			}

			return topthree;
		} catch (error) {
			return [];
		}
	}

	const [courses, Alltournaments, games, news, announcements, projects, genres] = await Promise.all([
		fetchCourses(),
		fetchTournaments(),
		fetchGames(),
		fetchNews(),
		fetchAnnouncements(),
		getProjects(),
		fetchGenres()
	]);

	function get_status(event) {
		const today = new Date();
		const reg_start = new Date(event.registration_starting_date);
		const reg_deadline = new Date(event.registration_deadline);
		const start = new Date(event.start);
		const deadline = new Date(event.deadline);

		if (today > reg_start) {
			return 'comingsoon';
		} else if (today > reg_start && today < reg_deadline) {
			return 'upcoming';
		} else if (today >= start && today <= deadline) {
			return 'ongoing';
		} else if (today > deadline) {
			return 'finished';
		}
	}

	const tournaments = Alltournaments.filter(f => !f.local_event).map(m => ({
		...m,
		status: get_status(m)
	}))

	const local_events = Alltournaments.filter(f => f.local_event).map(m => ({
		...m,
		status: get_status(m)
	}))

	let d = {
		courses,
		tournaments,
		games,
		news,
		announcements,
		local_events,
		projects,
		genres: genres.slice(0, 7),
	};

	return JSON.parse(JSON.stringify(d));
};
