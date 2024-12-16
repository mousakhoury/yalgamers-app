import { json } from '@sveltejs/kit';

export async function GET({ url, fetch }) {
    const clientId = 'xyza7891FvO4kwWpgNr7dE2t5rR0K9Rr';
    const clientSecret = 'hb9POrW4fsv+AbEWgQw2XmjV6Rl0VY4IjiSHi5vgrsU';
    const redirectUri = `${url.origin}/api/epic-game/callback`;
    const code = url.searchParams.get('code');

    if (!code) {
        return json({ error: 'Authorization code is missing' });
    }

    try {
        // Step 1: Exchange authorization code for an access token
        const tokenResponse = await fetch('https://api.epicgames.dev/epic/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                scope: 'basic_profile' // Add scope if required
            })
        });

        // Log the token response for debugging
        const tokenResponseText = await tokenResponse.text();
        if (!tokenResponse.ok) {
            const errorDetails = JSON.parse(tokenResponseText);
            console.error('Token Response Error:', errorDetails);

            // Check if corrective action is needed for scope consent
            if (errorDetails.correctiveAction === 'SCOPE_CONSENT') {
                const continuationUrl = errorDetails.continuationUrl;
                return json({ error: 'User consent required', redirectTo: continuationUrl });
            }

            return json({ error: 'Failed to obtain access token', details: errorDetails }, { status: tokenResponse.status });
        }

        const tokenData = JSON.parse(tokenResponseText);
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return json({ error: 'Access token is missing from response' });
        }

        // Step 2: Fetch user info
        const userInfoResponse = await fetch('https://api.epicgames.dev/epic/id/v2/accounts', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (!userInfoResponse.ok) {
            const userInfoError = await userInfoResponse.text();
            console.error('User Info Response Error:', userInfoError);
            return json({ error: 'Failed to fetch user info', details: userInfoError }, { status: userInfoResponse.status });
        }

        const userInfo = await userInfoResponse.json();

        // Step 3: Fetch game details
        const gamesResponse = await fetch('https://api.epicgames.dev/user/v1/product-users', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (!gamesResponse.ok) {
            const gamesError = await gamesResponse.text();
            console.error('Game Details Response Error:', gamesError);
            return json({ error: 'Failed to fetch game details', details: gamesError }, { status: gamesResponse.status });
        }

        const games = await gamesResponse.json();

        // Step 4: Send all data back as a JSON response
        return json({
            userInfo,
            games
        });
    } catch (error) {
        console.error('Error during OAuth callback:', error);
        return json({ error: 'Failed to fetch user data' });
    }
}
