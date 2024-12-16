import { env } from '$env/dynamic/public';
import { signUpSchema } from '$lib/schema.js';
import { validateData } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';

// export async function load({ locals }) {
//     if (locals.user?.password_added) {
//         throw redirect(300, '/upload-image')
//     }
// }

export const actions = {
    save_user_details: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            const email = locals.user.email;
            const password = data.get('password');

            data.append('id', locals.user.id)
            const res = await change_password(data)

            if (res) {
                await locals.pb.collection('users').authWithPassword(email, password);
                return { ok: true }
            }

            return { ok: false }
        } catch (error) {
            return { ok: false }
        }
    },
    signup: async ({ locals, request }) => {
        if (locals.user) throw redirect(303, '/');

        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        const { errors } = validateData(formData, signUpSchema);
        if (errors) {
            return fail(401, { success: false, email: data.email, message: errors.fieldErrors });
        }

        data.emailVisibility = true;
        // data.on_boarding = true;
        data.password_added = true;

        if (data.password !== data.passwordConfirm) {
            return fail(400, {
                success: false,
                email: data.email,
                passwordMatch: true,
                message: "passwords doesn't match"
            });
        }
        if (data.password.length < 8) {
            return fail(400, {
                success: false,
                email: data.email,
                passwordLength: true,
                message: 'password must be a minimum of 8 characters long'
            });
        }

        try {
            const user = await locals.pb.collection('users').getFirstListItem(`email='${data.email}'`);
            if (user) return fail(400, { userExist: true, message: 'email already registered' });
        } catch (e) {
        }

        try {
            await locals.pb.collection('users').create(data);
            await locals.pb.collection('users').authWithPassword(data.email, data.password);
            await locals.pb.collection('users').requestVerification(data.email);
            // await locals.pb.collection('users').authRefresh();
            return { ok: true }
        } catch (err) {
            return fail(400, { message: err.message });
        }
    }
};


async function change_password(data) {
    const form = new FormData();
    form.append('identity', 'xexhan17@gmail.com')
    form.append('password', 'Z123123123')

    let res = await fetch(`${env.PUBLIC_BASE_URL}/api/admins/auth-with-password`, {
        method: 'POST',
        body: form,
    })
    const admin_token = (await res.json()).token;

    data.append('password_added', true);
    // data.append('password_added', true)upload-image;

    res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/users/records/${data.get('id')}`, {
        method: 'PATCH',
        headers: {
            'Authorization': admin_token
        },
        body: data
    })
    return await res.json();
}
