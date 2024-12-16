import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    const data = await request.json();
    let wallet_name = ''
    if (data.wallet_name.toLowerCase().includes('metamask')) {
        wallet_name = 'metamask_address'
    } else if (data.wallet_name.toLowerCase().includes('solana')) {
        wallet_name = 'solana_address'
    } else if (data.wallet_name.toLowerCase().includes('ronin')) {
        wallet_name = 'ronin_address'
    }

    if (wallet_name == '' || !data.wallet_address) {
        return json({ ok: false, msg: "wallet not found" })
    }

    let user = null
    try {
        user = await locals.pb.collection('users').getFirstListItem(`${wallet_name}='${data.wallet_address.toLowerCase()}'`);
    } catch (error) {
        return json({ ok: false, msg: "user not found, please signup" })
    }

    try {
        await locals.pb.collection('users').authWithPassword(user.username, data.password);
        if (!user.password_added) {
            await locals.pb.collection('users').update(user.id, { password_added: true })
        }
        await locals.pb.collection('users').authRefresh();
        let route = '/'
        if (!user.on_boarding) {
            route = '/personal-details'
        }
        return json({ ok: true, route })
    } catch (error) {
        return json({ ok: false, msg: "password is not correct" })
    }

}