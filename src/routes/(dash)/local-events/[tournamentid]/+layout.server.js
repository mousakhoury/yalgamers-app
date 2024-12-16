import { getImageUrl } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load({ locals, params }) {

    if (!locals.user) {
        throw redirect(301, '/login');
    }
    const { pb } = locals;
    const tournament_id = params.tournamentid;
    let tournament = undefined
    let current_user_id = locals.user.id;

    try {
        tournament = await pb.collection('tournaments').getOne(tournament_id, { expand: 'third_winner.user' });
    } catch (error) {
        return { msg: 'not found' };
    }

    async function get_tournament_registrations() {
        try {
            return await pb.collection("tournament_registrations").getFullList({
                filter: `tournament='${tournament_id}' `,
                expand: "user, players.player"
            });
        } catch (error) {
            return [];
        }
    }

    async function get_tournament_selected_players() {
        try {
            return await pb.collection("tournament_selected_players").getFullList({
                filter: `tournament='${tournament_id}'`,
                expand: "player, leader, team"
            });
        } catch (error) {
            return [];
        }
    }

    async function get_tournament_team_requests() {
        try {
            return await pb.collection("tournament_team_requests").getFullList({
                filter: `tournament='${tournament_id}'`,
            });
        } catch (error) {
            return [];
        }
    }

    async function get_tournament_matches() {
        try {
            return await pb.collection("tournament_matches").getFullList({
                filter: `tournament='${tournament_id}'`,
                expand: 'team_1.user, team_2.user, winner'
            });
        } catch (error) {
            return [];
        }
    }

    async function get_stream_links() {
        try {
            return await pb.collection("stream_links").getFullList({
                filter: `tournament='${tournament_id}'`,
            });
        } catch (error) {
            return [];
        }
    }

    async function get_sponsors() {
        try {
            return await pb.collection("sponsors").getFullList({
                filter: `tournament='${tournament_id}'`,
            });
        } catch (error) {
            return [];
        }
    }

    async function get_leaderboard() {
        try {
            let list = await pb.collection("tournaments_leaderboard").getFullList({
                filter: `tournament='${tournament_id}' && user!=""`,
                expand: 'user'
            });

            return list.map(m => ({
                name: m.expand.user.username,
                username: m.in_game_username,
                score: m.score
            })).sort((a, b) => b.score - a.score).map((item, index) => ({
                ...item,
                rank: index + 1
            }));
        } catch (error) {
            return [];
        }
    }
    async function get_users() {
        try {
            let users = await pb.collection('users').getFullList({
                sort: '-created',
            });

            return users.map(m => (
                {
                    id: m.id,
                    name: m.name,
                    username: m.username,
                    avatar: m.avatar ? getImageUrl(m.collectionId, m.id, m.avatar) : null
                }
            ))
        } catch (error) {
            return [];
        }
    }

    async function main() {
        if (tournament) {
            if (tournament.type == 'bracket') {
                const [registered_teams, team_requests, matche_list, stream_links, sponsors, users, selected_players] = await Promise.all([
                    get_tournament_registrations(),
                    get_tournament_team_requests(),
                    get_tournament_matches(),
                    get_stream_links(),
                    get_sponsors(),
                    get_users(),
                    get_tournament_selected_players(),
                ]);

                tournament.registered = registered_teams.find(f => f.user == current_user_id) ? true : false;

                let reg_teams = [];
                let my_team = null;

                if (tournament.mode == 'solo') {
                    reg_teams = registered_teams;
                } else if (tournament.mode == 'squad') {
                    const { _my_team, teams } = squad_teams(registered_teams, current_user_id, team_requests);
                    reg_teams = teams;
                    my_team = _my_team;
                }

                const exist_as_player = selected_players.find(f => f.player == current_user_id);
                const brackets = [...matche_list];
                const matches = groupBy(matche_list, "label");
                const winners = get_winners(matche_list.sort(({ match }) => match), tournament, selected_players);
                return { tournament, users, reg_teams, my_team, stream_links, sponsors, exist_as_player, matches, brackets, winners }
            } else {
                if (tournament.mode == 'solo') {
                    const [stream_links, sponsors, users, leaderboard] = await Promise.all([
                        get_stream_links(),
                        get_sponsors(),
                        get_users(),
                        get_leaderboard()
                    ]);

                    return { tournament, users, stream_links, sponsors, leaderboard }
                } else {
                    const [registered_teams, team_requests, leaderboard, stream_links, sponsors, users, selected_players] = await Promise.all([
                        get_tournament_registrations(),
                        get_tournament_team_requests(),
                        get_leaderboard(),
                        get_stream_links(),
                        get_sponsors(),
                        get_users(),
                        get_tournament_selected_players(),
                    ]);

                    tournament.registered = registered_teams.find(f => f.user == current_user_id) ? true : false;


                    const { _my_team, teams } = squad_teams(registered_teams, current_user_id, team_requests);
                    const reg_teams = teams;
                    const my_team = _my_team;

                    const exist_as_player = selected_players.find(f => f.player == current_user_id);

                    return { tournament, users, reg_teams, my_team, stream_links, sponsors, exist_as_player, leaderboard }
                }
            }
        }
    }

    const return_data = await main();
    return JSON.parse(JSON.stringify(return_data));
}

function squad_teams(param_teams, current_user_id, team_requests) {
    let my_team_id = null;
    let my_team = null;
    let registered_teams = param_teams.map(m => (
        {
            id: m.id,
            name: m.name,
            team_logo: m.team_logo,
            leader: m.expand.user,
            members: m.expand.players ?? [],
            selected_players: [],
        }
    ));

    let teams = [];

    registered_teams.map(reg_team => {
        reg_team.members.map(member => {
            if (member.player == '') {
                reg_team.selected_players.push({
                    id: member.id,
                    team_id: member.team,
                    isPending: null,
                    name: null,
                    image: null,
                    userName: null,
                    isLeader: false,
                    isEmpty: true,
                    position: member.position
                })
            } else {
                if (current_user_id == member.player && member.state == "accepted") {
                    my_team_id = reg_team.id;
                }
                reg_team.selected_players.push({
                    id: member.id,
                    isPending: member.state == "pending" ? true : false,
                    name: member.expand.player.name == "" ? member.expand.player.username : member.expand.player.name,
                    image: member.expand.player.avatar == "" ? null : getImageUrl('_pb_users_auth_', member.expand.player.id, member.expand.player.avatar),
                    userName: member.expand.player.username,
                    isLeader: false,
                    isEmpty: false,
                    team_id: member.team,
                    position: member.position,
                    player: member.expand.player.id
                })
            }
        });

        if (current_user_id == reg_team.leader.id) {
            my_team_id = reg_team.id;
        }

        let leader = {
            id: reg_team.leader.id,
            name: reg_team.leader.name,
            userName: reg_team.leader.username,
            image: getImageUrl('_pb_users_auth_', reg_team.leader.id, reg_team.leader.avatar),
            isLeader: true,
            position: 1,
            team_id: reg_team.id,
        }

        teams.push({
            id: reg_team.id,
            name: reg_team.name,
            team_logo: reg_team.team_logo != "" ? getImageUrl('tournament_registrations', reg_team.id, reg_team.team_logo) : null,
            leader: leader.id,
            members: [leader, ...reg_team.selected_players],
            reqs: team_requests.filter(f => f.team == reg_team.id)
        })
    });

    if (my_team_id) {
        my_team = teams.find(f => f.id == my_team_id);
    }

    return { _my_team: my_team, teams }
}

function get_winners(matchlist, event, selected_players) {
    let first_winner = undefined
    let second_winner = undefined
    let third_winner = undefined
    const winners = matchlist.find(f => f.match == matchlist.pop().match);

    if (winners) {
        if (winners.winner != "" && winners.team_1 != "" && winners.team_2 != "") {
            first_winner = {
                id: winners.expand.winner.id,
                leader: {
                    id: winners.expand.winner.expand.user.id,
                    name: winners.expand.winner.expand.user.name == "" ? winners.expand.winner.expand.user.username : winners.expand.winner.expand.user.name,
                    img: winners.expand.winner.expand.user.avatar == "" ? null : winners.expand.winner.expand.user.avatar
                },
                name: winners.expand.winner.name,
                img: winners.expand.winner.team_logo,
                players: winners.expand.winner.selected_players
            }

            let team_b = winners.winner != winners.team_1 ? winners.expand.team_1 : winners.expand.team_2;
            second_winner = {
                id: team_b.id,
                leader: {
                    id: team_b.expand.user.id,
                    name: team_b.expand.user.name == "" ? team_b.expand.user.username : team_b.expand.user.name,
                    img: team_b.expand.user.avatar == "" ? null : team_b.expand.user.avatar
                },
                name: team_b.name,
                img: team_b.team_logo,
                players: team_b.selected_players
            }

            if (event.mode == 'squad') {
                first_winner.players.map(id => {
                    const pl = selected_players.find(f => f.id == id)
                    if (pl) {
                        return {
                            id: pl.expand.player.id,
                            name: pl.expand.player.name == "" ? pl.expand.player.username : pl.expand.player.name,
                            img: pl.expand.player.avatar == "" ? null : pl.expand.player.avatar
                        }
                    }
                });

                second_winner.players.map(id => {
                    const pl = selected_players.find(f => f.id == id)
                    if (pl) {
                        return {
                            id: pl.expand.player.id,
                            name: pl.expand.player.name == "" ? pl.expand.player.username : pl.expand.player.name,
                            img: pl.expand.player.avatar == "" ? null : pl.expand.player.avatar
                        }
                    }
                });
            }

            if (event.third_winner != "") {
                third_winner = {
                    id: event.expand.third_winner.id,
                    leader: {
                        id: event.expand.third_winner.expand.user.id,
                        name: event.expand.third_winner.expand.user.name == "" ? event.expand.third_winner.expand.user.username : event.expand.third_winner.expand.user.name,
                        img: event.expand.third_winner.expand.user.avatar == "" ? null : event.expand.third_winner.expand.user.avatar
                    },
                    name: event.expand.third_winner.name,
                    img: event.expand.third_winner.team_logo,
                    players: event.expand.third_winner.selected_players
                }

                if (event.mode == "squad") {
                    third_winner.players.map(id => {
                        const pl = selected_players.find(f => f.id == id)
                        if (pl) {
                            return {
                                id: pl.expand.player.id,
                                name: pl.expand.player.name == "" ? pl.expand.player.username : pl.expand.player.name,
                                img: pl.expand.player.avatar == "" ? null : pl.expand.player.avatar
                            }
                        }
                    });
                }
            }
        }
    }

    return { first_winner, second_winner, third_winner }
}

function groupBy(array, keyOrIterator) {
    let iterator, key;

    // use the function passed in, or create one
    if (typeof key !== 'function') {
        key = String(keyOrIterator);
        iterator = function (item) { return item[key]; };
    } else {
        iterator = keyOrIterator;
    }

    return array.reduce(function (memo, item) {
        let key = iterator(item);
        memo[key] = memo[key] || [];
        memo[key].push(item);
        return memo;
    }, {});
}