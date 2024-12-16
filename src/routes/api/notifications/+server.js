import { json } from '@sveltejs/kit';

export async function GET(params) {
	const pb = params.locals.pb;

	if (!pb?.authStore?.model) return json([]);

	const notifications = await pb.collection('notifications').getFullList({
		filter: `user="${pb.authStore.model.id}"`,
		sort: 'created'
	});

	let list = [];
	notifications.forEach(element => {
		let obj = element.data;
		obj.id = element.id;
		obj.read = element.read;
		list.push(obj);
	});

	// try {
	// 	const x = list.sort((a, b) => new Date(a.date) - new Date(b.date));
	// 	list = x;
	// } catch (error) { }

	return json(list);
}
