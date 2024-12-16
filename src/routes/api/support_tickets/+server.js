import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const pb = locals.pb;

	const user = pb.authStore.model.id;

	const tickets = await pb.collection('support_tickets').getFullList({
		filter: `user = '${user}'`,
		expand: 'manager'
	});

	return json(tickets);
}

export async function POST({ locals, request }) {
	const pb = locals.pb;

	const data = await request.formData();

	const user = pb.authStore.model.id;

	data.append('user', user);
	data.append('status', 'OPEN');

	if (data.get('file') === undefined || data.get('file') === 'undefined') {
		data.delete('file');
	}

	const ticket = await pb.collection('support_tickets').create(data);

	return json(ticket);
}
