import { json } from '@sveltejs/kit';
import ytdl from '@distube/ytdl-core';

export async function GET({ params, locals }) {
	const record = await locals.pb.collection('tutorials').getOne(params.courseid);
	const videoinfo = await ytdl.getInfo(record.ytlink);

	const data = {
		...record,
		videoinfo
	};
	return json(data);
}
