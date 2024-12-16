export const actions = {
	default: async ({ params, locals, request }) => {
		const data = await request.formData();
		data.set('course', params.courseid);
		data.set('user', locals.pb.authStore.model.id);
		await locals.pb.collection('tutorial_student').create(data);

		return {
			status: '200'
		};
	}
};
