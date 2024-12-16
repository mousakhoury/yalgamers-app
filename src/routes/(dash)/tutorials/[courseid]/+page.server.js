export async function load({ params, fetch, locals, ...rest }) {
	const redis = await locals.redisClient;

	const fetchCourse = async () => {
		const attendedStatus = async () => {
			let quiz_attended = false;
			let proof_uploaded = false;

			try {
				const tutorial_student = await locals.pb
					.collection('tutorial_student')
					.getFirstListItem(
						`course="${params.courseid}" && user="${locals.pb.authStore.model.id}"`
					);

				quiz_attended = tutorial_student?.quiz_attended;
				proof_uploaded = tutorial_student?.proof !== '';
			} catch { }
			return {
				quiz_attended,
				proof_uploaded
			};
		};

		const getQuests = async () => {
			try {
				const quest = await locals.pb
					.collection('quests')
					.getFirstListItem(`course = "${params.courseid}"`, {
						expand: 'quests'
					});

				const logs = await locals.pb.collection('quests_logs').getFullList({
					filter: `user = "${locals.pb.authStore.model.id}" && quest = "${quest.id}" `
				});

				const tasks = quest.expand.quests.map((task) => {
					const log = logs.find((log) => task.id === log.task);
					if (log) {
						task.isCompleted = true;
						task.isPendingVerification = !log.verified;
						if (task.isPendingVerification) {
							task.isCompleted = false;
						}
					} else {
						task.isCompleted = false;
						task.isPendingVerification = false;
					}
					return task;
				});

				quest.tasks = tasks;

				return quest;
			} catch (error) {
				return {
					tasks: []
				};
			}
		};

		const getProgress = async () => {
			try {
				const record = await locals.pb
					.collection('tutorial_watch_history')
					.getFirstListItem(
						`course="${params.courseid}" && user="${locals.pb.authStore.model.id}"`
					);
				return record.duration;
			} catch (error) {
				return 0;
			}
		};

		const [status, progress, quests] = await Promise.all([
			attendedStatus(),
			getProgress(),
			getQuests()
		]);

		return {
			...status,
			progress,
			quests
		};
	};

	const course = await fetchCourse();

	const _course = JSON.parse(JSON.stringify(course));

	return {
		_course
	};
}

export const actions = {
	review: async ({ request, locals, params }) => {

		const course = await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${params.courseid}'`);
		const formData = await request.formData();
		const user = locals.pb.authStore.model;

		const data = {
			stars: Number(formData.get('stars')),
			review: formData.get('review'),
			content: formData.get('content'),
			helpfulness: formData.get('helpfulness'),
			video_quality: formData.get('video_quality')
		};

		const ReviewXP = async () => {
			return;
			//const REVIEW_REWARD = course.xp !== 10 ? 20 : 2;
			//await locals.pb.collection('xp_logs').create({
			//user: user.id,
			//xp: REVIEW_REWARD,
			//type: 'COURSE_REVIEW',
			//data: {
			//course: course.id
			//}
			//});
		};

		const Review = async () =>
			await locals.pb.collection('tutorial_reviews').create({
				user: user.id,
				course: course.id,
				...data
			});

		const updateCourse = async () =>
			await locals.pb.collection('tutorials').update(course.id, {
				...data
			});

		await Review();
		await Promise.all([ReviewXP(), updateCourse()]);

		return 'success';
	},
	quizes: async ({ request, locals, params }) => {
		const recordF = async () =>
			await locals.pb.collection('tutorial_student').create({
				course: params.courseid,
				user: locals.pb.authStore.model.id
			});

		const courseF = async () => await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${params.courseid}'`);

		const [_, course] = await Promise.all([recordF(), courseF()]);

		const log = {
			quiz_attended: true
		};

		const tutorial_student = await locals.pb
			.collection('tutorial_student')
			.getFirstListItem(`course="${params.courseid}" && user="${locals.pb.authStore.model.id}"`);

		const user = locals.pb.authStore.model;
		await Promise.all([
			locals.pb.collection('xp_logs').create({
				user: user.id,
				xp: course.xp,
				type: 'COURSE_QUIZ',
				data: {
					course: course.id
				}
			}),
			locals.pb.collection('tutorial_student').update(tutorial_student.id, log)
		]);

		return {
			status: 200
		};
	}
};
