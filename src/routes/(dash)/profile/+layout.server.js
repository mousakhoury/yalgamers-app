import { redirect } from '@sveltejs/kit';
export async function load({ locals }) {
	if (!locals.pb.authStore.model) {
		throw redirect(307, '/login');
	}
}
