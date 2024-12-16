import { json, error } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    if (locals.user) {
        const id = url.searchParams.get('id')
        try {
            await locals.pb.collection('favourite_games').delete(id)
            return json(200);
        } catch (err) {
            throw error(401)
        }
    }
}