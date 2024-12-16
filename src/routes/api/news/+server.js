import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function GET({ url }) {
	const response = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/news/records${url?.search}`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	return json(data);
}

