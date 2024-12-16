import { json } from '@sveltejs/kit';

export async function GET({ locals, params }) {
	const pb = locals.pb;

	const chat = await pb.collection('support_ticket_chats').getFullList({
		filter: `support_ticket = '${params.id}'`,
		expand: 'user,manager',
		sort: '-created'
	});

	return json(chat);
}

export async function POST({ locals, params, request }) {
	const ticket_id = params.id;
	const pb = locals.pb;
	const user = pb.authStore.model.id;

	const data = await request.formData();
	if (data.get('media')?.size !== 0) {
		data.set('message', data.get('media').type);
	} else {
		data.delete('media');
	}
	data.append('user', user);
	data.append('support_ticket', ticket_id);

	const message = await pb.collection('support_ticket_chats').create(data);

	return json(message);
}
