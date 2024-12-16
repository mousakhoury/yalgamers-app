export async function load({ locals }) {
    async function get_contact() {
        try {
            const records = await locals.pb.collection('contact').getFullList();
            if (records.length == 0) {
                return null;
            }
            return records[0];
        } catch (error) {
            return null;
        }
    }

    const contact = await get_contact();
    return { contact: structuredClone(contact) }
}