import { redirect } from "@sveltejs/kit"

export async function POST({ locals }) {
    locals.pb.authStore.clear()
    locals.user = undefined
    throw redirect(303, '/login')
}