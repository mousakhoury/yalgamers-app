import { redirect, json } from '@sveltejs/kit';

export async function GET({ locals }) {
    const apiKey = 'A279E6387551366E5A88A35AAAA62255';
    const steamId = locals.user.steam;
    try {
        let res = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=true`);
        res = await res.json();
        // @ts-ignore
        const games = res.response.games || [];

        if (games.length > 0) {
            const response = await locals.pb.send('/steam_games', {
                method: 'POST',
                body: JSON.stringify({ games, steamId })
            });

            return json({ ok: true, score: response.score })
        } else {
            return json({ ok: false, msg: `Oh, look at this guy scanning his Steam account on Yalgamers to get points… only to find out his biggest achievement is downloading Steam! Someone give him a participation trophy!` })
        }

    } catch (error) {
        // @ts-ignore
        return json({ ok: false, msg: "Make sure your steam profile is set to public. My profile, Game details and Inventory. If still facing problem raise a ticket." })
    }
}
