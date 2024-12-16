import { redirect } from '@sveltejs/kit';
import { getDateFromTimestamp } from '$lib/utils.js'
export async function load({ locals }) {
    try {
        if (locals.user) {
            async function getTasks() {
                let explore_quest_tasks = await locals.pb.collection('assigned_main_quests').getList(1, 50, {
                    filter: `user='${locals.user.id}'`,
                    expand: 'task',
                    sort: 'created'
                })

                explore_quest_tasks = explore_quest_tasks.items;
                explore_quest_tasks = explore_quest_tasks.sort((a, b) => new Date(a.expand.task.task_date) - new Date(b.expand.task.task_date));

                async function checkForWatchCourseStatus(quest) {
                    try {
                        let url = quest.link_to_task
                        url = url.replace(/\/$/, '');
                        const course_title = url.substring(url.lastIndexOf('/') + 1);
                        const course = await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${course_title}'`);
                        const history = await locals.pb.collection('tutorial_watch_history').getFirstListItem(`course='${course.id}'&&user='${locals.user.id}'`);
                        if (history && history.duration > 99) {
                            return await locals.pb.collection('assigned_main_quests').update(quest.id, { isCompleted: true });
                        }
                        return null;
                    } catch (error) {
                        return null;
                    }
                }

                async function checkForCourse_ReviewStatus(quest) {
                    try {
                        let url = quest.link_to_task
                        url = url.replace(/\/$/, '');
                        const course_title = url.substring(url.lastIndexOf('/') + 1);
                        const course = await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${course_title}'`);
                        await locals.pb.collection('tutorial_reviews').getFirstListItem(`course='${course.id}'&&user='${locals.user.id}'`);
                        let data = {
                            course: course.id
                        }
                        data = JSON.stringify(data);
                        await locals.pb.collection('assigned_main_quests').update(quest.id, { isPending: true, data });
                        return true;
                    } catch (error) {
                        return null;
                    }
                }

                let tasks = explore_quest_tasks.map(m => {
                    return {
                        id: m.id,
                        isCompleted: m.isCompleted,
                        isPending: m.isPending,
                        title: m.expand.task.title,
                        description: m.expand.task.description,
                        date: getDateFromTimestamp(m.expand.task.task_date),
                        type: m.expand.task.type,
                        xp: m.expand.task.xp,
                        link_to_task: m.expand.task.link_to_task,
                    }
                })

                for (let index = 0; index < tasks.length; index++) {
                    if (tasks[index].type == 'COURSE - WATCH' && !tasks[index].isCompleted) {
                        if (await checkForWatchCourseStatus(tasks[index])) {
                            tasks[index].isCompleted = true;
                        }
                    }
                    if (tasks[index].type == 'COURSE - REVIEW' && !tasks[index].isCompleted && !tasks[index].isPending) {
                        if (await checkForCourse_ReviewStatus(tasks[index])) {
                            tasks[index].isPending = true;
                        }
                    }
                }
                return tasks;
            }

            async function getWeekPrize() {
                const today_date = new Date();
                const dayOfWeek = (today_date.getDay() + 6) % 7; // Adjust dayOfWeek to make Monday=0 Sunday=6
                const weekStart = new Date(today_date);
                weekStart.setDate(today_date.getDate() - dayOfWeek); // Monday
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 7); // Sunday

                // Format the dates to YYYY-MM-DD
                const formatDate = (date) => date.toISOString().slice(0, 10);

                const weekStartFormatted = formatDate(weekStart);
                const weekEndFormatted = formatDate(weekEnd);

                try {
                    return await locals.pb.collection('weekly_main_tasks_prize').getFirstListItem(`date >= '${weekStartFormatted}' && date < '${weekEndFormatted}'`)
                } catch (error) {
                    return null;
                }

            }

            async function getMonthlyPrize() {
                const today_date = new Date();
                const taskMonth = today_date.getMonth() + 1;
                const taskYear = today_date.getFullYear();

                const monthStart = `${taskYear}-${taskMonth < 10 ? '0' + taskMonth : taskMonth}-01`; // Start of the month
                let monthEnd = '';

                if (taskMonth == 12) {
                    monthEnd = `${taskYear + 1}-01-01`
                } else if (taskMonth < 12) {
                    monthEnd = `${taskYear}-${taskMonth < 9 ? '0' + (taskMonth + 1) : taskMonth + 1}-01`
                }

                try {
                    return await locals.pb.collection('monthly_main_tasks_prize').getFirstListItem(`date >= '${monthStart}' && date < '${monthEnd}'`)
                } catch (error) {
                    return null;
                }

            }

            async function getProjects() {
                try {
                    const current = new Date();
                    let projects = await locals.pb.collection('projects').getFullList({ filter: `publish=true` });
                    projects = [...projects.filter(f => f.isFeatured), ...projects.filter(f => !f.isFeatured)]
                    let quests = await locals.pb.collection('project_logs').getFullList({
                        filter: `user='${locals.user.id}'`
                    });

                    for (let index = 0; index < projects.length; index++) {
                        let project = projects[index];

                        const deadline = new Date(project.deadline);
                        project.isActive = true;

                        if (current > deadline) {
                            project.isEnded = true;
                            project.isActive = false;
                        } else {
                            project.isEnded = false;
                        }

                        project.isCompleted = true;

                        const get_quest_tasks = async () => await locals.pb.collection('project_tasks').getFullList({ filter: `project='${project.id}'` });
                        const get_rewards = async () => await locals.pb.collection('project_rewards').getFullList({ filter: `project='${project.id}'` });

                        const [quest_tasks, rewards] = await Promise.all([get_quest_tasks(), get_rewards()]);

                        project.quests = quest_tasks.map(m => m.id);
                        project.showXpIcon = quest_tasks.length > 0 ? true : false;
                        project.showNftIcon = rewards.find(f => f.type == 'nft') ? true : false;
                        project.showMoneyIcon = rewards.find(f => f.type == 'money') ? true : false;
                        project.showTicketIcon = rewards.find(f => f.type == 'ticket') ? true : false;
                        project.showBoxIcon = rewards.find(f => f.type == 'box') ? true : false;

                        const tasks = project.quests.map((task) => {
                            const quest = quests.find((log) => task === log.quest && log.project == project.id);
                            if (quest) {
                                if (quest.verified) {
                                    return { isCompleted: true, isPending: false }
                                }
                                project.isCompleted = false;
                                return { isCompleted: false, isPending: true }
                            } else {
                                project.isCompleted = false;
                                return { isCompleted: false, isPending: false }
                            }
                        });
                        project.quests = tasks;

                        if (project.kols_user && project.kols_user != locals.user.referred_by) {
                            project.disabled = true;
                        } else {
                            project.disabled = false;
                        }

                        delete project.collectionName;
                        delete project.created;
                        delete project.expand;
                        delete project.updated;

                        projects[index] = project;
                    }
                    return projects;
                } catch (error) {
                    return [];
                }
            }

            // const [tasks, week_prize, month_prize, projects] = await Promise.all([getTasks(), getWeekPrize(), getMonthlyPrize(), getProjects()]);
            const [projects] = await Promise.all([getProjects()]);

            return JSON.parse(JSON.stringify({ projects }))
        }
        return { projects: [] }
    } catch (error) {
        return { projects: [] }
    }
}

export const actions = {
    mark_action_complete: async ({ locals, request }) => {
        try {
            if (!locals.user) {
                throw redirect(303, '/login');
            }
            let data = await request.formData();
            locals.pb.collection('assigned_main_quests').update(data.get('task_id'), { isPending: false, isCompleted: true })

        } catch (error) {
            return {
                success: false,
                msg: error
            }
        }
    }
};