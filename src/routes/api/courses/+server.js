import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const data = await locals.pb.collection('tutorials').getList(1, 200, {
		expand: 'user',
		sort: '-created'
	});

	return json(data);
}
