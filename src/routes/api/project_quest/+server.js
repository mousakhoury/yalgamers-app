import { error, json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
    if (!locals.user) return;
    const pb = locals.pb;
    const req_data = await request.formData();
    req_data.append('user', locals.user.id);

    try {
        const project_tasks = await pb.collection('project_tasks').getFullList({ filter: `project='${req_data.get('project')}'` });
        let xp_reward = 0;
        project_tasks.forEach(e => {
            xp_reward += e.xp;
        })
        const quest = project_tasks.find(f => f.id == req_data.get('quest'));

        if (quest.project == req_data.get('project')) {
            try {
                await pb.collection('project_logs').getFirstListItem(`user='${locals.user.id}' && quest='${req_data.get('quest')}' && project='${req_data.get('project')}'`);
            } catch (error) {
                await pb.collection('project_logs').create(req_data);
                const project_logs = await pb.collection('project_logs').getFullList({ filter: `project='${req_data.get('project')}' && user='${locals.user.id}'` });
                const logs = project_logs.map(m => ({ verified: m.verified, project_task: m.quest }));
                let allcomplete = true;

                project_tasks.forEach(task => {
                    const exist = logs.find(f => f.project_task == task.id && f.verified);
                    if (!exist) {
                        allcomplete = false;
                    }
                });

                if (allcomplete) {
                    try {
                        const project = await pb.collection('projects').getOne(req_data.get('project'));
                        for (let i = 0; i < project.blockchain_network.length; i++) {
                            const blockchain_network = project.blockchain_network[i];
                            await locals.pb.collection('project_nft_logs').create({ user: locals.user.id, project: req_data.get('project'), blockchain_network })
                            
                        }

                        if(xp_reward) {
                            await locals.pb.collection('xp_logs').create({
                                user: locals.user.id,
                                xp: xp_reward,
                                type: 'PROJECT_REWARD'
                            });
                        }

                        try {
                            const ticket_reward = await locals.pb.collection('project_rewards').getFirstListItem(`project='${project.id}' && type='ticket'`);
                            await locals.pb.collection('proj_reward_logs').create({
                                user: locals.user.id,
                                reward: ticket_reward,
                                project: project.id
                            });
                        } catch (error) {
                            
                        }
                    } catch { }
                }
                return json(200);
            }
        }

        error(400, 'Failed');
    } catch (e) {
        error(400, 'Failed');
    }
};
