import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals }) => {
	const { email } = await request.json();

	const pb = locals.pb;

	const user = locals.pb.authStore.model;

	await pb.collection('newsletter_subscriptions').create({
		email,
		user: user.id
	});

	await pb.collection('users').update(user.id, {
		subscribed_to_newsletter: true
	});

	return json({
		status: 'Success'
	});
};
