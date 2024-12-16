import { getImageUrl, getOneWeekBeforeToday } from '$lib/utils.js';

export async function load({ locals }) {
    async function get_news() {
        try {
            const news = await locals.pb.collection('news').getFullList({
                filter: 'publish=true'
            });

            // @ts-ignore
            return news.map(m => ({
                id: m.id,
                title: m.title,
                title_en: m.title_en,
                subTitle: m.subtitle_ar,
                subTitle_en: m.subtitle_en,
                image: m.image,
                auth: 'Yalgamers',
                collectionId: m.collectionId,
                created: m.created
            }));
        } catch (error) {
            return [];
        }
    }

    const [news] = await Promise.all([get_news()]);
    const weekBefore = getOneWeekBeforeToday();
    const latest = news.filter(f => new Date(f.created) > new Date(weekBefore))

    return { news, latest };
};