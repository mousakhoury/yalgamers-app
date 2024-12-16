import { json } from '@sveltejs/kit';

export async function POST({ params, locals, request }) {
    if (locals.user) {
        const reviewid = params.id;
        const data = await request.json();
        const user = locals.user.id;

        try {
            let obj = {}
            if (data.action == 'like') {
                if (data.dislike) {
                    obj = { 'likes+': user, 'dislikes-': user }
                } else if (data.like) {
                    obj = { 'likes-': user }
                } else {
                    obj = { 'likes+': user }
                }
            }

            if (data.action == 'dislike') {
                if (data.like) {
                    obj = { 'dislikes+': user, 'likes-': user };
                } else if (data.dislike) {
                    obj = { 'dislikes-': user };
                } else {
                    obj = { 'dislikes+': user };
                }
            }
            await locals.pb.collection('tutorial_reviews').update(reviewid, obj);
            return json({ ok: true })
        } catch (error) {
            return json({ ok: false })
        }
    }
    return json({ ok: false })
}