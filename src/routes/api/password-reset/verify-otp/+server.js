import { json } from '@sveltejs/kit';

export async function POST({ request, locals }) {
    try {
        const data = await request.json()
        if (data.code == "" || data.code.length != 6 || data.email == "" || !validateEmail(data.email)) return json({ ok: false, msg: 'Invalid fields' })

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

        try {
            const record = await locals.pb.collection('otp_codes').getFirstListItem(`user='${user_id}' && code='${data.code}'`);
            await locals.pb.collection('otp_codes').delete(record.id);
            return json({ ok: true })
        } catch (error) {
            return json({ ok: false, msg: 'code is not correct' })
        }
    } catch (error) {
        return json({ ok: false, msg: 'server error' })
    }

}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}