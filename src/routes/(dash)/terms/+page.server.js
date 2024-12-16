export async function load({ locals }) {

    async function getTermsandConditions() {
        try {
            return (await locals.pb.collection('terms_conditions').getFirstListItem(`data!=''`)).data;
        } catch (error) {
            return null
        }
    }

    const [data] = await Promise.all([getTermsandConditions()])
    return { data: structuredClone(data) }
};