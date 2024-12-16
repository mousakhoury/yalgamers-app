import { error, json } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const t_id = params.tournamentid;

        const tournament = await locals.pb.collection("tournaments").getOne(t_id);

        if (tournament.teams_can_register == tournament.registered_teams) {
            throw error(400, 'No more teams can registered.')
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
            // formData.set("players", players);
        } else {
            formData.set('user', locals.user.id)
            const team_name = locals.user.name == "" ? locals.user.username : locals.user.name
            formData.set('name', team_name)
            formData.set('tournament', t_id)
        }
        formData.delete('check_term');

        const reg_team = await locals.pb.collection('tournament_registrations').create(formData);
        await locals.pb.collection('tournaments').update(tournament.id, { "registered_teams+": 1, "selected_players+": 1 });
        await locals.pb.collection('tournament_registrations').update(reg_team.id, {
            players
        })

        if (tournament.mode == "squad") {
            for (const id of players) {
                await locals.pb.collection('tournament_selected_players').update(id, {
                    team: reg_team.id,
                });
            }
        }

        // // add team to match
        try {
            const match = await locals.pb.collection('tournament_matches').getFirstListItem(`tournament='${tournament.id}' && team_2=""`, {
                sort: '+match',
            });
            if (match.team_1 == "") {
                await locals.pb.collection('tournament_matches').update(match.id, { team_1: reg_team.id });
            } else {
                await locals.pb.collection('tournament_matches').update(match.id, { team_2: reg_team.id });
            }
        } catch { }

        return json(201);
    } catch (err) {
        throw error(401)
    }
}

export async function GET({ locals, params }) {
    try {
        const formData = new FormData();
        const t_id = params.tournamentid;

        const tournament = await locals.pb.collection("tournaments").getOne(t_id);

        if (tournament.teams_can_register == tournament.registered_teams) {
            throw error(400, 'No more registerations.')
        }

        formData.set('user', locals.user.id)
        const team_name = locals.user.name == "" ? locals.user.username : locals.user.name;
        formData.set('name', team_name)
        formData.set('tournament', t_id)

        const reg_team = await locals.pb.collection('tournament_registrations').create(formData);
        await locals.pb.collection('tournaments').update(tournament.id, { "registered_teams+": 1, "selected_players+": 1 });

        // // add team to match
        try {
            const match = await locals.pb.collection('tournament_matches').getFirstListItem(`tournament='${tournament.id}' && team_2=""`, {
                sort: '+match',
            });
            if (match.team_1 == "") {
                await locals.pb.collection('tournament_matches').update(match.id, { team_1: reg_team.id });
            } else {
                await locals.pb.collection('tournament_matches').update(match.id, { team_2: reg_team.id });
            }
        } catch { }

        return json(201);
    } catch (err) {
        throw error(401)
    }
}
