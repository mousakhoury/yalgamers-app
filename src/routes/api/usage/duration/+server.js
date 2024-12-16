import { json } from '@sveltejs/kit';

export const POST = async ({ request, locals, url }) => {
	if (!locals.pb?.authStore?.model) {
		return json({
			status: 'success'
		});
	}

	const data = await request.formData();

	const timestamp = Number(data.get('timestamp'));

	locals.pb.collection('activity_log').create({
		user: locals.pb.authStore.model.id,
		data: {
			type: 'SESSION',
			timestamp
		}
	});

	return json({
		status: 'success'
	});
};
