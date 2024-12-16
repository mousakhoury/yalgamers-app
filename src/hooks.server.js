import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

import { createClient } from 'redis';

export async function handle({ event, resolve }) {
	event.locals.pb = new PocketBase(env.PUBLIC_BASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	const client = await createClient({
		url: env.PUBLIC_REDIS_URL
	}).on('error', (err) => console.log('Redis Client Error', err))
		.connect();
	event.locals.redisClient = client;

	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = await event.locals.pb
				.collection('users')
				.getOne(event.locals.pb.authStore.model.id);
			event.locals.user.xp = event.locals.user._xp; // BAD

			const providers = await event.locals.pb
				.collection('users')
				.listExternalAuths(event.locals.user.id);

			event.locals.user.providers = providers;
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = null;
	}

	const response = await resolve(event);
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: false, HttpOnly: true, sameSite: 'lax' })
	);

	await client.disconnect();
	return response;
}
