export async function load({ locals }) {
    const genres = await locals.pb.collection('genres').getFullList();
    return {
        genres: JSON.parse(JSON.stringify(genres))
    };
}
