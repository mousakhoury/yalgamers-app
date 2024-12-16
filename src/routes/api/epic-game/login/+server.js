import { redirect } from '@sveltejs/kit';

export async function GET({ url }) {
    const clientId = 'xyza7891FvO4kwWpgNr7dE2t5rR0K9Rr';
    const redirectUri = `${url.origin}/api/epic-game/callback`;
    const authUrl = `https://www.epicgames.com/id/authorize?client_id=${clientId}&response_type=code&scope=basic_profile&redirect_uri=${encodeURIComponent(redirectUri)}`;

    throw redirect(302, authUrl);
}
