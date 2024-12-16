import { fail } from '@sveltejs/kit';
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
            return fail(401, { email: data.email, message: errors.fieldErrors });
        }

        try {
            await locals.pb.collection('users').getFirstListItem(`email='${data.email}'`);
        } catch (e) {
            return fail(400, { message: 'email is not registered' });
        }

        try {
            await locals.pb.collection('users').authWithPassword(data.email, data.password);
            locals.user = locals.pb.authStore.model;
        } catch (err) {
            return fail(400, { email: data.email, message: "email and password doesn't match" });
        }

        return {
            success: true
        };
    }
};