import { error, json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
    const pb = locals.pb;
    const req_data = await request.formData();
    const task = JSON.parse(req_data.get('quest'));

    try {
        const quest = await pb.collection('assigned_main_quests').getFirstListItem(`id="${task.id}"`, { expand: 'task' });
        if (task.type == quest.expand.task.type && !quest.isCompleted) {
            const direct_success_types = [
                "TWITTER - FOLLOW",
                "TWITTER - RETWEET",
                "TELEGRAM - CHANNEL",
                "TELEGRAM - GROUP",
                "WEBSITE - VISIT",
                "DISCORD - JOIN",
                "STEAM - LINK",
                "YOUTUBE - SUBSCRIBE"
            ]
            if (direct_success_types.includes(task.type)) {
                req_data.append('isCompleted', true);
            } else {
                req_data.append('isPending', true);
            }
            req_data.delete('quest');
            await pb.collection('assigned_main_quests').update(task.id, req_data)
            return json(200);
        }


        error(400, 'Failed');
    } catch (e) {
        error(400, 'Failed');
    }
};
