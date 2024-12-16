import { json, error } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    if (locals.user) {
        const user = locals.user.id;
        const game = url.searchParams.get('game')
        try {
            const record = await locals.pb.collection('favourite_games').create({ user, game })
            return json({
                id: record.id,
            });
        } catch (err) {
            throw error(401)
        }
    }
}