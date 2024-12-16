import { fail } from '@sveltejs/kit';

export const actions = {
	register_team: async ({ request, locals, url }) => {
		try {
			const formData = await request.formData();
			const data = Object.fromEntries(formData);

			const pathname = url.pathname.split('/')
			const t_id = pathname[2];

			const tournament = await locals.pb.collection("tournaments").getOne(t_id);

			if (tournament.teams_can_register == tournament.registered_teams) {
				return fail(402, {
					error: true,
					msg: "No more teams can registered."
				})
			}

			let players = []
			if (tournament.mode == "squad") {
				let selected_players = JSON.parse(data.selected_players);

				selected_players = selected_players.map(m => (
					{
						id: m.id,
						position: parseInt(m.position.match(/\d+/)[0])
					}
				))

				for (const item of selected_players) {
					const selected_player = {
						"leader": data.user,
						"player": item.id,
						"tournament": data.tournament,
						"state": "pending",
						"position": item.position
					};

					const record = await locals.pb.collection('tournament_selected_players').create(selected_player);
					players.push(record.id);
				}

				formData.set("selected_players", JSON.stringify(players));
			} else {
				formData.set('user', locals.user.id)
				const team_name = locals.user.name == "" ? locals.user.username : locals.user.name
				formData.set('name', team_name)
				formData.set('tournament', t_id)
			}
			formData.delete('check_term');
			const reg_team = await locals.pb.collection('tournament_registrations').create(formData);
			await locals.pb.collection('tournaments').update(tournament.id, { "registered_teams+": 1, "selected_players+": 1 });

			if (tournament.mode == "squad") {
				for (const id of players) {
					await locals.pb.collection('tournament_selected_players').update(id, {
						team: reg_team.id,
					});
				}
			}


			// // add team to match
			try {
				let match = await locals.pb.collection('tournament_matches').getFirstListItem(`tournament='${tournament.id}' && team_2=""`, {
					sort: '+match',
				});
				if (match.team_1 == "") {
					match.team_1 = reg_team.id;
				} else {
					match.team_2 = reg_team.id;
				}
				await locals.pb.collection('tournament_matches').update(match.id, match);
			} catch (error) {
				console.log(error)
			}

			return { success: true }
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	remove_team_member: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const pathname = url.pathname.split('/')
		const t_id = pathname[2];

		try {
			let member = await locals.pb.collection('tournament_selected_players').getOne(id, {
				filter: `tournament='${t_id}'`
			});

			member.player = ''
			member.state = "pending"

			await locals.pb.collection("tournament_selected_players").update(id, member)

			return {
				success: true,
			}

		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	invite_team_member: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const pathname = url.pathname.split('/')
		const t_id = pathname[2];
		let data = Object.fromEntries(formData);
		const { u_id, id } = data
		if (u_id == "" || t_id == "" || id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		data = {
			state: 'pending',
			player: u_id
		}

		try {
			await locals.pb.collection('tournament_selected_players').update(id, data);
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	replace_team_member: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const pathname = url.pathname.split('/')
		const t_id = pathname[2];
		let data = Object.fromEntries(formData);
		const { u_id, prev_u_id, id } = data
		if (prev_u_id == "" || u_id == "" || t_id == "" || id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		data = {
			state: 'pending',
			player: u_id
		}

		try {

			let getOne = await locals.pb.collection('tournament_selected_players').getOne(id);
			if (getOne.player == prev_u_id) {
				await locals.pb.collection('tournament_selected_players').update(id, data);
				return {
					success: true
				}
			}
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	send_join_req: async ({ request, url, locals }) => {
		const formData = await request.formData();
		let data = Object.fromEntries(formData);
		if (data.team == "" || data.player == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}
		try {
			await locals.pb.collection('tournament_team_requests').create(data);
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	rej_req: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		if (id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		try {
			let record = await locals.pb.collection('tournament_selected_players').getOne(id);
			record.player = "";
			record.state = 'pending'
			await locals.pb.collection('tournament_selected_players').update(id, record)
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	accept_req: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const pathname = url.pathname.split('/')
		const t_id = pathname[2];
		const id = formData.get("id");

		if (id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		try {
			let record = await locals.pb.collection('tournament_selected_players').getOne(id);
			record.state = 'accepted'
			await locals.pb.collection('tournament_selected_players').update(id, record);
			await locals.pb.collection('tournaments').update(t_id, { 'selected_players+': 1 })
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	send_req: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const id = formData.get("id");
		const p_id = formData.get("p_id");
		if (id == "" || p_id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		try {
			let res = await locals.pb.collection('tournament_team_requests').getFirstListItem(`player='${p_id}'`)
			return {
				error: true,
			}
		} catch (error) {
			console.log(error)
		}

		try {
			await locals.pb.collection('tournament_registrations').getOne(id);
			const data = {
				player: p_id,
				team: id
			}

			await locals.pb.collection('tournament_team_requests').create(data);
			return {
				success: true
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
	add_to_team: async ({ request, url, locals }) => {
		const formData = await request.formData();
		const empty_player_id = formData.get("empty_player_id");
		const player_id = formData.get("player_id");
		const req_id = formData.get("req_id");
		const pathname = url.pathname.split('/')
		const t_id = pathname[2];

		if (empty_player_id == "" || player_id == "" || req_id == "") {
			return {
				error: true,
				msg: 'server error!'
			}
		}

		try {
			let res = await locals.pb.collection('tournament_selected_players').getOne(empty_player_id)

			res.player = player_id;
			res.state = 'accepted'

			await locals.pb.collection('tournament_selected_players').update(empty_player_id, res);
			await locals.pb.collection('tournament_team_requests').delete(req_id)
			await locals.pb.collection('tournaments').update(t_id, { 'selected_players+': 1 })
			return {
				success: true,
			}
		} catch (error) {
			return fail(400, {
				error: true,
				msg: error.message,
				errors: error.response.data
			})
		}
	},
};
