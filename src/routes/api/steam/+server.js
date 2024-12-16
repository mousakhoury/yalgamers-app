import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (locals.user) {
        try {
            let record = await locals.pb.collection('steam_data').getFirstListItem(`user="${locals.user.id}"`);
            if (record.profile_visible) {
                return json({ ok: true, data: record })
            }

            const apiKey = 'A279E6387551366E5A88A35AAAA62255'; // Your Steam API Key
            let res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${record.steam_id}`)
            res = await res.json();
            // @ts-ignore
            res = res.response.players[0];

            // @ts-ignore
            if (res.communityvisibilitystate == 3) {
                record = await locals.pb.collection('steam_data').update(record.id, { profile_visible: true });
                return json({ ok: true, data: record })
            }

            return json({ ok: false, msg: 'steam is linked. but profile is not public. make it public and reload page' })
        } catch (error) {
            return json({ ok: false, data: null, msg: error.message })
        }
    }
}