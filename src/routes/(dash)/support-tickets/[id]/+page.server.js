export async function load({ locals, params }) {
	const pb = locals.pb;
	const ticket_id = params.id;

	const ticket = await pb.collection('support_tickets').getOne(ticket_id, {
		expand: 'user,manager'
	});

	return {
		ticket: JSON.parse(JSON.stringify(ticket))
	};
}
