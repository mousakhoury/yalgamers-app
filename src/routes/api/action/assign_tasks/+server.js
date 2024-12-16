import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {

    const user = url.searchParams.get('user');

    try {
        await locals.pb.collection('users').getOne(user);
    } catch (error) {
        return json(404);
    }

    async function getTasks() {
        try {
            return await locals.pb.collection('assigned_main_quests').getFullList();
        } catch (error) {
            return null;
        }
    }

    const tasks = await getTasks();
    if (tasks) {
        for (let index = 0; index < tasks.length; index++) {
            try {
                const data = {
                    user,
                    task: tasks[index].id,
                    isCompleted: false,
                    isPending: false,
                }
                await locals.pb.collection('assigned_assigned_main_quests').create(data)
                console.log('created');
            } catch (error) {
            }
        }
    }

    return json(200);
}
