import ytdl from '@distube/ytdl-core';

export const load = async ({ fetch, params, locals }) => {
	const redis = locals.redisClient;

	const record = await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${params.courseid}'`, {
		expand: 'user'
	});

	try {
		const key = `tutorials-${params.courseid}-videoinfo`;
		let videoinfoData = await redis.get(key);

		if (videoinfoData === null) {
			const videoinfo = await ytdl.getInfo(record.ytlink);
			record.videoinfo = videoinfo;
			redis.set(`tutorials-${params.courseid}-videoinfo`, JSON.stringify(videoinfo), {
				EX: 60 * 60 * 2 // 2 hrs
			});
		} else {
			const videoinfo = JSON.parse(videoinfoData);
			record.videoinfo = videoinfo;
		}
	} catch {
		record.videoinfo = {
			description: ''
		};
	}

	let reviews = [];
	try {
		reviews = (
			await locals.pb.collection('tutorial_reviews').getList(1, 100, {
				filter: `course = "${record.id}"`,
				expand: 'user'
			})
		).items;
	} catch {
		reviews = [];
	}

	record.reviewsList = reviews;

	const data = {
		course: record
	};
	return JSON.parse(JSON.stringify(data));
};
