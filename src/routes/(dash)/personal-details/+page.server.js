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
            let email = '';
            if (locals.user.email) {
                email = locals.user.email
            } else {
                email = data.get('email');
            }

            if (!email) {
                return { ok: false, msg: 'email is required' }
            }

            const password = data.get('password');
            data.append('id', locals.user.id)
            const res = await change_password(data)

            let referred_by = null;
            if (data.get('referral_code')) {
                referred_by = await locals.pb.send('/find-user-by-referral_code', {
                    method: 'POST',
                    body: JSON.stringify({ referal_code: data.get('referral_code') })
                })
            }

            if (res) {
                if (password) {
                    const user = await locals.pb.collection('users').authWithPassword(email, password);
                    await locals.pb.collection('users').authRefresh();
                    const referral_code = await locals.pb.send('/get-unique-referral_code');
                    let obj = {
                        referral_code
                    }
                    if (referred_by) {
                        obj.referred_by = referred_by;
                    }
                    await locals.pb.collection('users').update(user.id, obj)
                }
                return { ok: true }
            }

            return { ok: false, msg: 'Sorry, server error.' }
        } catch (error) {
            return { ok: false, msg: 'Sorry, server error.' }
        }
    },
    signup: async ({ locals, request }) => {
        if (locals.user) throw redirect(303, '/');
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        const { errors } = validateData(formData, signUpSchema);
        if (errors) {
            return { ok: false, msg: errors.fieldErrors };
        }

        data.emailVisibility = true;
        // data.on_boarding = true;
        data.password_added = true;

        const referal_code = data.referral_code;

        if (data.password !== data.passwordConfirm) {
            return {
                ok: false,
                msg: "passwords doesn't match"
            };
        }
        if (data.password.length < 8) {
            return {
                ok: false,
                msg: "password must be a minimum of 8 characters long"
            };
        }

        if (referal_code) {
            const reffered_by = await locals.pb.send('/find-user-by-referral_code', {
                method: 'POST',
                body: JSON.stringify({ referal_code })
            })
            if (reffered_by) {
                data.referred_by = reffered_by;
            }
        }

        data.referral_code = await locals.pb.send('/get-unique-referral_code');

        try {
            await locals.pb.collection('users').create(data);
            await locals.pb.collection('users').authWithPassword(data.email, data.password);
            await locals.pb.collection('users').requestVerification(data.email);
            await locals.pb.collection('users').authRefresh();
            return { ok: true, msg: 'success register' }
        } catch (err) {
            return { ok: false, msg: err.message };
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