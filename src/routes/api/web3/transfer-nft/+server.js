import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function POST({ request, locals, fetch }) {
    try {
        const req_data = await request.json();
        const email = locals.user.email;
        const chainId = req_data.chainId;
        const toAddress = req_data.toAddress;
        const tokenId = req_data.tokenId;

        if (!email || !chainId || !tokenId || !toAddress) {
            return json({ success: false, message: 'Server Error!' })
        }

        let res = await fetch(`${env.PUBLIC_WEB3_BACKEND_URL}/user/transfer-nft`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                chainId,
                tokenId,
                toAddress
            })
        })

        res = await res.json();
        return json(res);
    } catch (error) {
        return json({ success: false, message: error?.message })
    }
}