import { error, json } from '@sveltejs/kit';

export const POST = async ({ params, locals, request }) => {
	const pb = locals.pb;
	const data = await request.formData();
	const course_id = params.courseid;
	const user = pb.authStore.model.id;

	const task = data.get('task');

	data.append('user', user);

	try {
		const quest = await pb.collection('quests').getFirstListItem(`course="${course_id}"`);
		if (quest.quests.includes(task)) {
			data.append('quest', quest.id);
			const log = await pb.collection('quests_logs').create(data);
			return json(log);
		}
		error(400, 'Failed');
	} catch (e) {
		error(400, 'Failed');
	}
};
