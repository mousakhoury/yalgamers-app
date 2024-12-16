import { fail } from '@sveltejs/kit';
import { profile } from 'console';

export async function load({ locals, url }) {
	const referrals = await locals.pb.collection('users').getFullList({
		filter: `referred_by = "${locals.pb.authStore.model.id}"`
	});

	const userAuthProviders = await locals.pb
		.collection('users')
		.listExternalAuths(locals.pb.authStore.model.id);

	const authMethods = await locals.pb?.collection('users').listAuthMethods();
	if (!authMethods) {
		return {
			authProviderRedirect: '',
			authProviderState: ''
		};
	}

	const redirectURL = `${url.origin}/oauth/redirect`;
	const authProviders = authMethods.authProviders.map((x) => {
		if (x.name === 'oidc') {
			// HACK : Steam OIDC doesnt have email scope
			x.authUrl = x.authUrl.replace('+email', '');
		}
		return x;
	});

	locals.user.referral_url = `${url.origin}/signup?referral_code=${locals.user.referral_code}`;
	locals.user.referrals = referrals;

	if (locals.user) {
		return {
			profile: JSON.parse(JSON.stringify(locals.user)),
			authProviders: JSON.parse(JSON.stringify(authProviders)),
			userAuthProviders: JSON.parse(JSON.stringify(userAuthProviders)),
			redirectURL
		};
	}
}

export const actions = {
	cover: async ({ request, locals }) => {
		const formData = await request.formData();
		try {
			const { cover } = await locals.pb.collection('users').update(locals.user.id, formData);
			locals.user.cover = cover;
		} catch (e) {
			console.log(e);
			return fail(400, { success: false, message: e.message });
		}

		return {
			success: true,
			message: 'Successfully updated cover image.',
			user: JSON.parse(JSON.stringify(locals.user))
		};
	},
	avatar: async ({ request, locals }) => {
		const formData = await request.formData();
		try {
			const { avatar } = await locals.pb.collection('users').update(locals.user.id, formData);
			locals.user.avatar = avatar;
		} catch (e) {
			console.log(e);
			return fail(400, { success: false, message: e.message });
		}
		return {
			success: true,
			message: 'Successfully updated avatar.',
			user: JSON.parse(JSON.stringify(locals.user))
		};
	},

	bio: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		try {
			const { bio } = await locals.pb.collection('users').update(locals.user.id, { bio: data.bio });
			locals.user.bio = bio;
		} catch (e) {
			console.log('error', e);
		}
	},
	details: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		try {
			const userData = await locals.pb.collection('users').update(locals.user.id, data);
			locals.user = userData;
		} catch (err) {
			console.log('error', err);
		}
	},
	unfollow: async ({ locals, request }) => {
		try {
			const data = await request.formData();
			const record = await locals.pb.collection('followers').getFirstListItem(`user='${data.get('id')}'`);

			if (record.followers.find(f => f == locals.user.id)) {
				let followers = record.followers.filter(f => f != locals.user.id);
				await locals.pb.collection('followers').update(record.id, { followers });
				return { ok: true }
			}
			return { ok: false }
		} catch (error) {
			return { ok: false }
		}
	}
};
