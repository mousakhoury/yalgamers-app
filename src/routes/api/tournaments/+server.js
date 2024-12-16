import { json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	const tournaments = await locals.pb.collection('tournaments').getFullList({
		filter: 'local_event=false',
		sort: '-created',
		fields: 'id,title,title_en,image,price,deadline,mode,start'
	});
	return json(JSON.parse(JSON.stringify({ items: tournaments })));
}
