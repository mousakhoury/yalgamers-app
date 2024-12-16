import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const GET = async ({ locals, url, event, cookies }) => {
	const redirectURL = `${url.origin}/oauth/redirect`;
	const expectedState = cookies.get('state');

	const query = new URLSearchParams(url.search);
	const state = query.get('state');
	const providerName = cookies.get('provider');
	const codeVerifier = cookies.get('codeVerifier');
	const code = query.get('code');

	const authMethods = await locals.pb?.collection('users').listAuthMethods();
	if (!authMethods?.authProviders) {
		// console.log('authy providers');
		throw redirect(303, '/login');
	}
	const provider = authMethods.authProviders.find((p) => p.name === providerName);
	if (!provider) {
		// console.log('Provider not found');
		throw redirect(303, '/login');
	}

	if (expectedState !== state) {
		// console.log('state does not match expected', expectedState, state);
		throw redirect(303, '/login');
	}

	try {
		const res = await locals.pb
			?.collection('users')
			.authWithOAuth2Code(provider.name, code || '', codeVerifier, redirectURL);

		if (res.meta.name || res.meta.first_name) {
			await fetch(`${env.PUBLIC_BASE_URL}/api/collections/users/records/${res.record.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'authorization': res.token
				},
				body: JSON.stringify({ name: res.meta.name })
			})
		}

		const response = new Response('Success');
		response.headers.append('set-cookie', locals.pb.authStore.exportToCookie({ secure: false }));
		response.headers.append('Location', '/');
		response.headers.append('Refresh', '1');

		if (!res.record.on_boarding) {
			throw redirect(303, '/personal-details');
		}
		return response;
	} catch (err) {
		if (err.status == 303) {
			throw redirect(303, '/personal-details');
		}
		console.log('Error logging in with 0Auth user', err);
	}

	throw redirect(303, '/');
};
