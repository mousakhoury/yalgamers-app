export async function load({ params, fetch, locals, ...rest }) {
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

		const [status, progress] = await Promise.all([attendedStatus(), getProgress()]);

		return {
			...status,
			progress
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

		const ReviewXP = async () => {
			const REVIEW_REWARD = 20;
			const user = locals.pb.authStore.model;
			locals.pb.collection('users').update(user.id, {
				xp: user.xp + REVIEW_REWARD
			});
			locals.pb.collection('xp_log').create({
				user: user.id,
				data: {
					type: 'COURSE_REVIEW',
					course: course.id
				}
			});
		};
		await locals.pb.collection('tutorials').update(course.id, {
			stars: course.stars + Number(formData.get('stars')),
			reviews: course.reviews + 1
		});

		ReviewXP();

		return 'success';
	},
	quizes: async ({ request, locals, params }) => {
		await locals.pb.collection('tutorial_student').create({
			course: params.courseid,
			user: locals.pb.authStore.model.id
		});
		const course = await locals.pb.collection('tutorials').getFirstListItem(`unique_title='${params.courseid}'`);
		const formData = await request.formData();
		let resp;
		try {
			resp = await locals.pb.collection('quizes').getFirstListItem(`id="${formData.get('quiz')}"`, {
				expand: 'questions'
			});
		} catch (e) {
			console.log(e);
		}

		const questions = resp.expand.questions.reduce(
			(acc, x) => ({ ...acc, [x.id]: x.question }),
			{}
		);

		formData.delete('quiz');
		let score = 0;
		const entries = [...formData.entries()];
		for (const index in entries) {
			const entry = entries[index];
			const question = entry[0];
			const q = questions[question];
			if (q.answer === entry[1]) {
				score += 1;
			}
		}

		const xp = Math.floor(course.xp * (score / resp.expand.questions.length));

		const log = {
			quiz_attended: true
		};

		const tutorial_student = await locals.pb
			.collection('tutorial_student')
			.getFirstListItem(`course="${params.courseid}" && user="${locals.pb.authStore.model.id}"`);

		const user = locals.pb.authStore.model;
		await locals.pb.collection('users').update(user.id, {
			xp: user.xp + xp
		});

		await locals.pb.collection('tutorial_student').update(tutorial_student.id, log);
		return {
			status: 200
		};
	}
};
