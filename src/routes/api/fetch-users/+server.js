import { getImageUrl } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    const recrods = await locals.pb.collection('users').getFullList();
    let list = recrods.map(m => {
        return {
            title_en: m.username,
            title_ar: m.username,
            link: `/${m.username}`,
            type: "USER",
            image: m.avatar ? getImageUrl('users', m.id, m.avatar) : null
        }
    })

    return json({ list })
}