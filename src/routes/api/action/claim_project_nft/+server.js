import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function POST({ locals, request, fetch }) {
    const data = await request.json();

    if (locals.user && locals.pb && data && data.id && data.pid && data.chainId) {
        const userId = locals.user.id;
        try {
            let res = await fetch(`${env.PUBLIC_WEB3_BACKEND_URL}/user/mint/quest-nft`, {
                method: 'POST',
                body: JSON.stringify({
                    email: locals.user.email,
                    chainId: data.chainId,
                    projectId: data.pid,
                })
            });

            if (res.ok) {
                res = await res.json();
                if (res.success) {
                    const update = await locals.pb.collection('project_nft_logs').update(data.id, { claimed: true });
                    return json({
                        ok: true
                    })
                } else {
                    return json({
                        ok: false,
                        msg: res.message
                    })
                }
            } else {
                return json({
                    ok: false,
                    msg: res.message
                })
            }

        } catch (error) {
            return json({
                ok: false,
                msg: error.message
            })
        }
    }
}
