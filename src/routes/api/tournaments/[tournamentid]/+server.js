import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function GET({ locals, params }) {
	const response = await fetch(
		`${env.PUBLIC_BASE_URL}/api/collections/tournaments/records/${params.tournamentid}`,
		{
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const data = await response.json();
	try {
		const registration = await locals.pb
			.collection('tournament_registrations')
			.getFirstListItem(
				`tournament="${params.tournamentid}" && user="${locals.pb.authStore.model.id}" `
			);
		data.registered = true;
	} catch {
		data.registered = false;
	}
	// console.log(data)
	return json(data);
}
