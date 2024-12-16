export async function load({ locals, params }) {
    if (locals.user) {
        async function get_chat() {
            try {
                const id = params.chat;
                const record = await locals.pb.collection('networking').getOne(id)
                return {
                    title: record.name,
                    members: record.members.length
                }
            } catch (error) {
                return null
            }
        }

        const [chat] = await Promise.all([get_chat()]);
        return { chat: structuredClone(chat) }
    }
}