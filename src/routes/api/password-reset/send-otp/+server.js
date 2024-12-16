import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    try {
        const data = await request.json();

        if (!validateEmail(data.email)) {
            return json({ ok: false, msg: 'email is not correct' })
        }

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

        // remove if already code exist for this user 
        async function removePrevious() {
            try {
                const record = await locals.pb.collection('otp_codes').getFirstListItem(`user='${user_id}'`);
                await locals.pb.collection('otp_codes').delete(record.id);
            } catch (error) {
            }
        }

        await removePrevious();
        await locals.pb.collection('users').requestPasswordReset(data.email);
        return json({ ok: true, msg: 'success' })
    } catch (error) {
        return json({ ok: false, msg: 'server error' })
    }
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function getRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}