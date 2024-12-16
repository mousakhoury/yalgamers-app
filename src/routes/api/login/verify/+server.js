import { json } from '@sveltejs/kit';

export async function POST({ locals }) {
	const pb = locals.pb;
	const email = await pb.authStore.model.email;
	await pb.collection('users').requestVerification(email);

	return json({
		status: 'success'
	});
}
