import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) throw redirect(301, '/login')
}

export const actions = {
    save_avatar: async ({ locals, request }) => {
        try {
            const data = await request.formData();
            data.append('on_boarding', true)
            await locals.pb.collection('users').update(locals.user.id, data);
            return { ok: true }
        } catch (error) {
            return { ok: false }
        }
    }
};