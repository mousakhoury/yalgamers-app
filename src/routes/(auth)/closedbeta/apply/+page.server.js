import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';

export const actions = {
    apply: async ({ request, fetch }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');

        if (name == '' || email == '') {
            return { ok: false, msg: "fields are empty" }
        }

        if (!validateEmail(email)) {
            return { ok: false, msg: 'email is not correct' }
        }

        const pb = new PocketBase(env.PUBLIC_BASE_URL)

        try {
            await pb.collection('close_beta_apply').getFirstListItem(`email='${data.get('email')}'`);
            return { ok: false, msg: 'email already applied' }
        } catch (error) { }

        let code = getRandomSixDigitNumber();
        let exist = true;

        while (exist) {
            try {
                await pb.collection('close_beta_apply').getFirstListItem(`code='${code}'`);
                code = getRandomSixDigitNumber();
            } catch (error) {
                break;
            }
        }

        try {
            data.append('code', code)
            await pb.collection('close_beta_apply').create(data);
            return { ok: true, msg: 'Applied Success' }
        } catch (error) {
            return { ok: true, msg: error.message }
        }
    }
};

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function getRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}