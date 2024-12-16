import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (locals.user && locals.pb) {
        const userId = locals.user.id;
        try {
            const user = await locals.pb.collection('users').getOne(userId);
            return json({
                metamask_address: user.metamask_address,
                ronin_address: user.ronin_address,
                solana_address: user.solana_address
            })
        } catch (error) {
            return json({
                metamask_address: '',
                ronin_address: "",
                solana_address: ''
            })
        }
    }
    return json({
        metamask_address: '',
        ronin_address: "",
        solana_address: ''
    })
}
