import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
	const { email, password } = await request.json();
	let userData;
	try {
		// const response = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/users/records?filter=(email='${email}')`)
		// const user = await response.json()
		// console.log(user)
		userData = await locals.pb.collection('users').authWithPassword(email, password);
	} catch (error) {
		return json({ response_code: 500, response_message: error, response: null });
	}

	return json({ response_message: 'successfull', response_code: 200, response: userData });
}
