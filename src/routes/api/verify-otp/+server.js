import { env } from '$env/dynamic/public';
import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const data = await request.json();
    const code = data.code;
    const userid = locals.user.id;

    if (!userid && !code) return json({ ok: false });

    try {
        const today = (new Date()).toISOString().slice(0, 10);
        const otp_code = await locals.pb.collection('otp_codes').getFirstListItem(`user='${userid}' && created>'${today}' && code='${code}'`);
        await locals.pb.collection('otp_codes').delete(otp_code.id);
        await verify(userid);
        await locals.pb.collection('users').authRefresh();
        return json({ ok: true })
    } catch (error) {
        return json({ ok: false })
    }
}

async function verify(useid) {
    const form = new FormData();
    form.append('identity', 'xexhan17@gmail.com')
    form.append('password', 'Z123123123')

    let res = await fetch(`${env.PUBLIC_BASE_URL}/api/admins/auth-with-password`, {
        method: 'POST',
        body: form,
    })

    const admin_token = (await res.json()).token;
    const user = new FormData()
    user.append("verified", true);

    res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/users/records/${useid}`, {
        method: 'PATCH',
        headers: {
            'Authorization': admin_token
        },
        body: user
    })
    res = await res.json();
}