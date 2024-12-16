import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export async function POST({ request, locals, fetch }) {
    try {
        const req_data = await request.json();
        const email = locals.user.email;
        const address = req_data.address;
        const amount = req_data.amount;
        const coin = req_data.coin;
        const network = req_data.network;

        if (!email || !address || amount <= 0 || !coin) {
            return json({ success: false, message: 'Server Error!' })
        }

        let res = await fetch(`${env.PUBLIC_WEB3_BACKEND_URL}/user/transfer`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                toAddress: address,
                amount: Number(amount),
                coin: coin.toLowerCase(),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        res = await res.json();
        return json(res);
    } catch (error) {
        return json({ success: false, message: error?.message })
    }
}