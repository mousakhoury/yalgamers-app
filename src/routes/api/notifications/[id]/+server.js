import { json } from '@sveltejs/kit';

export async function POST({ locals, params }) {
	const pb = locals.pb;

	try {
		await pb.collection('notifications').update(params.id, {
			read: true
		});

        const n = await pb.collection('notifications').getOne(params.id);

		return json(n);
	} catch (error) {
        console.log(error);
		return json({
			status: 'failed'
		});
	}
}
