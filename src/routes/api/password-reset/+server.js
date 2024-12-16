import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/public';

export async function POST({ locals, request }) {
    try {
        const data = await request.json();
        if (data.password == '' || data.passwordConfirm == "" || !validateEmail(data.email)) return json({ ok: false, msg: 'Invalid fields' });
        if (data.password.length < 8) return json({ ok: false, msg: 'Password must be at least 8 characters long' })
        if (data.password != data.passwordConfirm) return json({ ok: false, msg: 'Passwords do not match' })

        async function findUser() {
            try {
                const user = await locals.pb.collection('users').getFirstListItem(`email='${data.email}'`);
                return user.id;
            } catch (error) {
                return null
            }
        }

        const user_id = await findUser();
        if (user_id === null) return json({ ok: false, msg: 'User not found' })
        if (await changePassword(data.password, data.passwordConfirm, user_id)) {
            return json({ ok: true })
        }
        return json({ ok: false, msg: 'Something went wrong' })
    } catch (error) {
        return json({ ok: false, msg: 'Something went wrong' })

    }
}

async function changePassword(password, passwordConfirm, useid) {
    const form = new FormData();
    form.append('identity', 'xexhan17@gmail.com')
    form.append('password', 'Z123123123')

    let res = await fetch(`${env.PUBLIC_BASE_URL}/api/admins/auth-with-password`, {
        method: 'POST',
        body: form,
    })

    const admin_token = (await res.json()).token;
    const user = new FormData()
    user.append("password", password)
    user.append("passwordConfirm", passwordConfirm)
    res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/users/records/${useid}`, {
        method: 'PATCH',
        headers: {
            'Authorization': admin_token
        },
        body: user
    })
    return await res.json();
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}