export async function load({ locals, params }) {
	const annoucement = await locals.pb.collection('announcements').getOne(params.annoucement_id);

	return {
		annoucement: structuredClone(annoucement)
	};
}
