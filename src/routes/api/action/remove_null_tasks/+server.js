import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    const list = await locals.pb.collection('assigned_main_quests').getFullList({
        filter: 'user=""'
    });

    for (let index = 0; index < list.length; index++) {
        try {
            await locals.pb.collection('assigned_main_quests').delete(list[index].id);
        } catch (error) {
        }
    }

    return json(200);
}
