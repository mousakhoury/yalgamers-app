import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    try {
        const id = url.searchParams.get('id');
        const msgs = await locals.pb.collection('messages').getFullList({
            filter: `chat='${id}'`,
            expand: 'user, chat',
            sort: 'created'
        })

        return json({ msgs })
    } catch (error) {
        return json({
            msgs: []
        })
    }
}