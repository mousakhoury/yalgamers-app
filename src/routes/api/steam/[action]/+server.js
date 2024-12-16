import { redirect, json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const apiKey = 'A279E6387551366E5A88A35AAAA62255'; // Your Steam API Key
    const returnUrl = `${url.origin}/api/steam/callback`; // Replace with your actual callback URL
    if (url.pathname.endsWith('/login')) {
        // Redirect to Steam OpenID login page
        throw redirect(
            302,
            `https://steamcommunity.com/openid/login?openid.mode=checkid_setup&openid.ns=http://specs.openid.net/auth/2.0&openid.return_to=${encodeURIComponent(
                returnUrl
            )}&openid.realm=${url.origin}/&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select`
        );
    } else if (url.pathname.endsWith('/callback')) {
        // Extract Steam ID from the OpenID response
        const openidParams = new URLSearchParams(url.search);
        // @ts-ignore
        const steamId = openidParams.get('openid.claimed_id').split('/').pop(); // Extract Steam ID from the OpenID claimed ID

        const user = await locals.pb.collection('users').update(locals.user.id, {
            steam: steamId,
        });
        locals.user = user;

        try {
            let res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`)
            res = await res.json();
            // @ts-ignore
            res = res.response.players[0];

            const data = {
                user: locals.user.id,
                steam_id: steamId,
                // @ts-ignore
                person_name: res.personaname,
                // @ts-ignore
                profile_url: res.profileurl,
                // @ts-ignore
                profile_visible: res.communityvisibilitystate == 3 ? true : false
            }

            const record = await locals.pb.collection('steam_data').create(data);
        } catch (error) {
            console.log(error);
        }

        // Now that you have the steamId, redirect or send it as needed
        throw redirect(302, `/gamer-score`);
    }
    return json(200)
}
