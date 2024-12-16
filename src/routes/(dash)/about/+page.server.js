export async function load({ locals }) {
    async function get_about() {
        try {
            const records = await locals.pb.collection('about').getFullList();
            if (records.length == 0) {
                return null;
            }
            return records[0];
        } catch (error) {
            return null;
        }
    }

    const about = await get_about();
    return { about: structuredClone(about) }
}