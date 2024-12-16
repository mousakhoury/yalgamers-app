import { redirect } from '@sveltejs/kit';

export async function load(event) {
    const projectId = event.params.projectid;
    if (event.locals.user) {
        const pb = event.locals.pb;

        async function getProject() {
            try {
                let record = await pb.collection('projects').getOne(projectId, {
                    expand: 'gen_client_boxes, gen_kols_boxes'
                });
                const current = new Date();
                const start = new Date(record.start);
                const deadline = new Date(record.deadline);
                record.isActive = start <= current ? true : false;

                if (current > deadline) {
                    record.isEnded = true;
                    record.isActive = false;
                } else {
                    record.isEnded = false;
                }

                delete record.collectionName;

                return record;
            } catch (error) {
                return null
            }
        }

        async function getTasks() {
            try {
                return await pb.collection('project_tasks').getFullList({
                    filter: `project='${projectId}'`
                });
            } catch (error) {
                return []
            }
        }

        async function getQuests() {
            try {
                return await pb.collection('project_logs').getFullList({
                    filter: `project='${projectId}' && user='${event.locals.user.id}'`,
                    expand: 'quest'
                });
            } catch (error) {
                return []
            }
        }

        async function getRewards() {
            try {
                return await pb.collection('project_rewards').getFullList({
                    filter: `project='${projectId}'`,
                    expand: 'nft_network'
                });
            } catch (error) {
                return []
            }
        }

        async function check_total_box_rewards() {
            try {
                return await pb.send(`/open-boxes/project/${projectId}`)
            } catch (error) {
                return {
                    used_boxes: 0,
                    exist: null
                };
            }
        }

        async function checkForWatchCourseStatus(quest) {
            try {
                const url = quest.link_to_task.replace(/\/$/, '');
                const course_id = url.substring(url.lastIndexOf("/") + 1);
                const history = await pb.collection('tutorial_watch_history').getFirstListItem(`course='${course_id}' && user='${event.locals.user.id}'`);
                if (history && history.duration > 99) {
                    const data = {
                        user: event.locals.user.id,
                        project: projectId,
                        quest: quest.id,
                        verified: true,
                    }
                    await pb.collection('project_logs').create(data);
                    return true;
                }
                return false;
            } catch (error) {
                return false;
            }
        }

        async function checkForCourse_ReviewStatus(quest) {
            try {
                const url = quest.link_to_task.replace(/\/$/, '');
                const course_id = url.substring(url.lastIndexOf("/") + 1);
                await pb.collection('tutorial_reviews').getFirstListItem(`course='${course_id}' && user='${event.locals.user.id}'`);
                const data = {
                    user: event.locals.user.id,
                    project: projectId,
                    quest: quest.id,
                    data: JSON.stringify({ course: course_id })
                }

                await pb.collection('project_logs').create(data);
                return true;
            } catch (error) {
                return false;
            }
        }

        async function checkForNftStatus() {
            try {
                return await pb.collection('project_nft_logs').getFirstListItem(`project='${projectId}' && user='${event.locals.user.id}'`);
            } catch (error) {
                return null;
            }
        }

        async function check_xp_logs() {
            try {
                return await pb.collection('xp_logs').getFirstListItem(`user='${event.locals.user.id}' && type='PROJECT_REWARD' && data.project='${projectId}'`);
            } catch (error) {
                return null;
            }
        }

        async function checkForRewardStatus(rid) {
            try {
                await pb.collection('proj_reward_logs').getFirstListItem(`project='${projectId}' && user='${event.locals.user.id}' && rewards='${rid}'`);
            } catch (error) {
                await pb.collection('proj_reward_logs').create({
                    project: projectId,
                    user: event.locals.user.id,
                    rewards: rid
                });
            }
        }

        const [project, quests, quest_tasks, rewards, nftExist, total_box_rewards_used, xp_log_status] = await Promise.all([getProject(), getQuests(), getTasks(), getRewards(), checkForNftStatus(), check_total_box_rewards(), check_xp_logs()]);

        if (!project.publish) {
            throw redirect(302, '/quests');
        }

        if (project.kols_user && project.kols_user != event.locals.user.referred_by) {
            throw redirect(302, '/quests');
        }

        if (project.gen_client_boxes) {
            project.boxes = project.expand.gen_client_boxes.boxes;
        } else if (project.gen_kols_boxes) {
            project.boxes = project.expand.gen_kols_boxes.boxes;
        } else {
            project.boxes = 0;
        }

        project.quests = quest_tasks;
        if (nftExist) {
            project.showNFTButton = !nftExist.claimed;
        } else {
            project.showNFTButton = false;
        }

        for (let index = 0; index < project.quests.length; index++) {
            let m = project.quests[index];
            const quest = quests.find(f => f.quest == m.id);
            if (quest) {
                if (quest.verified) {
                    m.isCompleted = true;
                    m.isPending = false;
                } else {
                    m.isCompleted = false;
                    m.isPending = true;
                }
            } else {
                if (m.type == "COURSE - WATCH" && await checkForWatchCourseStatus(m)) {
                    m.isCompleted = true;
                    m.isPending = false;
                } else if (m.type == "COURSE - REVIEW" && await checkForCourse_ReviewStatus(m)) {
                    m.isCompleted = false;
                    m.isPending = true;
                } else {
                    m.isCompleted = false;
                    m.isPending = false;
                }
            }

            if (!m.title) {
                m.title = m.type;
            }
            if (!m.description) {
                m.description = 'Discover the latest games on YalGamers! Check them out and share your thoughts in a friendly review to complete the task. Happy gaming!';
            }

            project.quests[index] = m;
        }
        const allcomplete = project.quests.find(a => !a.isCompleted)
        let xp_reward = 0;
        project.quests.forEach(e => {
            xp_reward += e.xp
        })

        if (allcomplete) {
            project.isCompleted = false;
        } else {
            project.isCompleted = true;
            if (project.quests.length > 0) {
                if (!nftExist) {
                    try {
                        for (let i = 0; i < project.blockchain_network.length; i++) {
                            const blockchain_network = project.blockchain_network[i];
                            await pb.collection('project_nft_logs').create({ project: projectId, user: event.locals.user.id, blockchain_network })
                        }
                        project.showNFTButton = true;
                    } catch (error) { }
                }

                if (xp_reward > 0 && !xp_log_status) {
                    try {
                        await event.locals.pb.collection('xp_logs').create({
                            user: event.locals.user.id,
                            xp: xp_reward,
                            type: 'PROJECT_REWARD',
                            data: {
                                project: projectId
                            }
                        });
                    } catch (error) {
                        console.log(JSON.stringify(error.response.data))
                    }
                }

                if (!total_box_rewards_used.exist && project.boxes - total_box_rewards_used.used_boxes > 0) {
                    try {
                        const res = await pb.send(`/project/get-box`, {
                            method: 'POST',
                            body: JSON.stringify({
                                win_place: 'PROJECT COMPLETE',
                                data: {
                                    title: project.title,
                                    project: projectId,
                                    date: new Date().toISOString()
                                }
                            })
                        });

                    } catch (error) {
                        console.log(error);
                    }
                }

                // const ticket_reward = rewards.find(f => f.type == 'ticket');
                // if (ticket_reward) {
                //     await checkForRewardStatus(ticket_reward.id)
                // }
            }
        }

        let allRewards = rewards;
        if (project.boxes > 0) {
            allRewards.push({
                type: 'box',
                amount: project.boxes - total_box_rewards_used.used_boxes
            })
        }

        return JSON.parse(JSON.stringify({ project, rewards: allRewards }))
    }
    return { project: null };
}