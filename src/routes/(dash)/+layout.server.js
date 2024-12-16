import { env } from '$env/dynamic/public';
import { getImageUrl } from '$lib/utils.js';

export const load = async ({ locals, url }) => {
	if (locals.user) {
		async function assigned_main_quests_fn() {
			try {
				await locals.pb.collection('assigned_main_quests').getFirstListItem('isCompleted=false && isPending=false');
				return true
			} catch (error) {
				return false
			}

		}

		async function global_search_fn() {
			try {
				const recrods = await locals.pb.collection('global_search').getFullList();
				return recrods.map(m => {
					return {
						title_en: m.title_en,
						title_ar: m.title_ar,
						link: m.link,
						type: m.type,
						image: `${env.PUBLIC_BASE_URL}${m.image}`
					}
				})
			} catch (error) {
				return []
			}

		}

		async function tickets_fn() {
			try {
				const list = await locals.pb.collection('ticket_logs').getFullList({
					filter: `user='${locals.user.id}'`
				});
				let sum = 0;
				list.forEach(item => {
					sum += item.ticket
				});
				return sum
			} catch (error) {
				return 0
			}
		}

		async function boxes_fn() {
			try {
				return await locals.pb.send('/boxes');
			} catch (error) {
				return 0
			}
		}

		const [pending_quests, global_search, boxes] = await Promise.all([assigned_main_quests_fn(), global_search_fn(), boxes_fn()]);

		const profile = locals.user;
		return JSON.parse(JSON.stringify({
			profile: structuredClone(profile),
			pathname: url.pathname,
			pending_quests,
			global_search,
			tickets: 0,
			boxes
		}));
	}
	return {
		pathname: url.pathname
	};
};

