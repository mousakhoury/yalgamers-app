import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    try {
        const chatId = url.searchParams.get('id');
        const record = await locals.pb.collection('networking').getOne(chatId);
        if (record.online_members.find(f => f == locals.user.id)) {
            const online_members = record.online_members.filter(f => f != locals.user.id)
            await locals.pb.collection('networking').update(chatId, { online_members })
            return json(200);
        } else {
            return json(200);
        }
    } catch (error) {
        return json(200);
    }
}