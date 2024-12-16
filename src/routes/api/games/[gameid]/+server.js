import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function GET(event) {
	const response = await fetch(
		`${env.PUBLIC_BASE_URL}/api/collections/games/records/${event.params.gameid}`,
		{
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const pb = event.locals.pb;
	const data = await response.json();

	try {
		const r = await pb.collection('reviews').getFullList({
			fields: 'stars',
			filter: `game = "${event.params.gameid}"`
		});
		const reviews = r.length;
		let rating = r.reduce((acc, cur) => acc + cur.stars, 0) / reviews;
		if (isNaN(rating)) rating = 0;
		data.reviews = reviews;
		data.rating = rating;
	} catch (e) {
		data.reviews = 0;
		data.rating = 0;
	}
	return json(data);
}

