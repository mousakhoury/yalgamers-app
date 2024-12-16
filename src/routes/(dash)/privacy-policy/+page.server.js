export async function load({ locals }) {
    async function get_privacy_policy() {
        try {
            const records = await locals.pb.collection('privacy_policy').getFullList();
            if (records.length == 0) {
                return null;
            }
            return records[0];
        } catch (error) {
            return null;
        }
    }

    const privacy = await get_privacy_policy();
    return { privacy: structuredClone(privacy) }
}