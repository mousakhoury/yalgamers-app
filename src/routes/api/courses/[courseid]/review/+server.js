import { json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {

	const data = await request.json();
	const userid = locals.pb.authStore.model.id;

	await locals.pb.collection('tutorial_reviews').create({
		user: userid,
		course: params.courseid,
		...data
	});

	await locals.pb.collection('tutorials').update(params.courseid, { 'stars+': data.stars, 'reviews+': 1 });

	return json({
		status: 'success'
	});
}
