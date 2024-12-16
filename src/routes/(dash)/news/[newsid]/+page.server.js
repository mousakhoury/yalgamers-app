import { getImageUrl } from '$lib/utils.js';

export async function load({ locals, params }) {

    async function get_news() {
        try {
            const news = await locals.pb.collection('news').getFirstListItem(`id='${params.newsid}'`);

            return {
                id: news.id,
                title: news.title,
                title_en: news.title_en,
                subTitle: news.subtitle_ar,
                subTitle_en: news.subtitle_en,
                content: news.content,
                content_en: news.content_en,
                image: getImageUrl(news.collectionId, news.id, news.image),
                auth: 'Yalgamers',
                created: news.created
            };
        } catch (error) {
            return null;
        }
    }

    async function get_latest_news() {
        try {
            const news = await locals.pb.collection('news').getList(1, 5, {
                filter: 'publish=true'
            });

            // @ts-ignore
            return news.items.map(m => ({
                id: m.id,
                title: m.title,
                title_en: m.title_en,
                subTitle: m.subtitle_ar,
                subTitle_en: m.subtitle_en,
                image: getImageUrl(m.collectionId, m.id, m.image),
                auth: 'Yalgamers',
                created: m.created
            }));
        } catch (error) {
            return [];
        }
    }

    const [news_item, latest_news] = await Promise.all([get_news(), get_latest_news()]);

    return { news_item: structuredClone(news_item), latest_news: structuredClone(latest_news) };
};