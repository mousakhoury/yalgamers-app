import { json } from '@sveltejs/kit';

export async function PATCH({ params, locals }) {
	const pb = locals.pb;
	const ticket_id = params.id;

	const ticket = await pb.collection('support_tickets').update(ticket_id, {
		status: 'RESOLVED'
	});

	return json(ticket);
}
