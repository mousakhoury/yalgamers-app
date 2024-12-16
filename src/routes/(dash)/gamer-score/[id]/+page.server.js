import { getImageUrl } from '$lib/utils.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, params }) {
    if (locals.user) {
        throw redirect(302, '/gamer-score');
    }
    const userid = params.id;
    const record = await locals.pb.collection('steam_data').getFirstListItem(`user='${userid}'`);
    const url = getImageUrl(record.collectionId, record.id, record.img);
    return { id: userid, img: url };
};