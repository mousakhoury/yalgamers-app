import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';

export async function GET(event) {
	const response = await fetch(
		`${env.PUBLIC_BASE_URL}/api/collections/tutorials/records/${event.params.courseid}?expand=quiz.questions`,
		{
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
	const data = await response.json();
	return json(data);
}

export async function POST(event) {
	const courseid = event.params.courseid;
	const pb = event.locals.pb;
	const data = await event.request.text();

	const user = pb.authStore.model.id;
	try {
		const record = await pb
			.collection('tutorial_watch_history')
			.getFirstListItem(`course="${courseid}" && user="${user}"`);

		if (record.duration > Number(data)) return json('not required');
		pb.collection('tutorial_watch_history').update(record.id, {
			duration: Number(data)
		});
	} catch (error) {
		pb.collection('tutorial_watch_history').create({
			duration: Number(data),
			course: courseid,
			user
		});
	}

	return json('success');
}
