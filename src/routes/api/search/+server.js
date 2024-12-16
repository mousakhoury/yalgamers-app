import { json } from '@sveltejs/kit';

export const GET = async ({ url, params, locals }) => {
	const search = url.searchParams.get('search');
	const pb = locals.pb;

	const getCourses = async () => {
		return pb.collection('tutorials').getList(1, 5, {
			filter: `title~"${search} || title_en~"${search}`,
			fields: 'title,id,image,title_en',
			sort: '-created'
		});
	};

	const getGames = async () => {
		return pb.collection('games').getList(1, 5, {
			filter: `title~"${search} || title_en~"${search}`,
			fields: 'title,id,image,title_en',
			sort: '-created'
		});
	};

	const getTournaments = async () => {
		return pb.collection('tournaments').getList(1, 5, {
			filter: `title~"${search} || title_en~"${search}`,
			fields: 'title,id,image,title_en',
			sort: '-created'
		});
	};

	const [courses, games, tournaments] = await Promise.all([
		getCourses(),
		getGames(),
		getTournaments()
	]);

	return json({
		courses: courses.items,
		games: games.items,
		tournaments: tournaments.items
	});
};
