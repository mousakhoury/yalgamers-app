import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function GET({ locals, fetch }) {
    if (locals.user && locals.pb) {
        const userId = locals.user.id;
        const email = locals.user.email;
        try {
            let res = await fetch(`${env.PUBLIC_WEB3_BACKEND_URL}/user/mint/og-nft`, {
                method: "POST",
                body: JSON.stringify({
                    email
                })
            });

            if (res.ok) {
                res = await res.json();
                if (res?.success) {
                    await locals.pb.collection('claimed_badges').create({ user: userId, name: 'OG Badge' });
                    return json({ ok: true });
                } else {
                    return json({ ok: false, msg: res?.message });
                }
            }
            return json({ ok: false, msg: res?.message });
        } catch (error) {
            return json({ ok: false, msg: error?.message });
        }
    }

}
