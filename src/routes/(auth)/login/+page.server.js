import { fail, redirect } from '@sveltejs/kit';
import { validateData } from '$lib/utils';
import { loginSchema } from '$lib/schema';

export const load = async ({ locals, url }) => {
    const authMethods = await locals.pb?.collection('users').listAuthMethods();
    if (!authMethods) {
        return {
            authProviderRedirect: '',
            authProviderState: ''
        };
    }

    const redirectURL = `${url.origin}/oauth/redirect`;
    const currentAllowedOAuth = ['google', 'twitter']
    const authProviders = authMethods.authProviders.filter(f => currentAllowedOAuth.includes(f.name))

    return {
        authProviders,
        redirectURL
    };
};

export const actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        const { errors } = validateData(formData, loginSchema);
        if (errors) {
            return { ok: false, msg: errors.fieldErrors };
        }

        let user;
        try {
            user = await locals.pb.collection('users').authWithPassword(data.email, data.password);
            user = user.record;
            if (!user.password_added) {
                await locals.pb.collection('users').update(user.id, { password_added: true })
            }
            await locals.pb.collection('users').authRefresh();
            locals.user = locals.pb.authStore.model;
        } catch (err) {
            return { ok: false, msg: "email and password doesn't match" };
        }

        if (user.on_boarding) {
            return { ok: true, route: '/' }
        } else {
            return { ok: true, route: '/personal-details' }
            // throw redirect(303, '/personal-details');
        }
    }
};