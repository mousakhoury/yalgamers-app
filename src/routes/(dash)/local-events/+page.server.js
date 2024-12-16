import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.user) {
        let data = {
            all: [],
            ongoing: [],
            upcoming: [],
            finished: [],
        }
        const { pb } = locals

        try {
            const tournaments = await pb.collection('tournaments').getFullList({
                filter: 'local_event=true',
                fields: 'title, title_en, mode, image, registration_starting_date, game_center, location, registration_deadline, start, deadline, prizemoney, id, collectionId, expand',
                expand: 'game_center',
            });
            data.all = tournaments;

            function get_status(event) {
                const today = new Date();
                const reg_start = new Date(event.registration_starting_date);
                const reg_deadline = new Date(event.registration_deadline);
                const start = new Date(event.start);
                const deadline = new Date(event.deadline);

                if (today > reg_start && today < reg_deadline) {
                    return 'upcoming';
                } else if (today >= start && today <= deadline) {
                    return 'ongoing';
                } else if (today > deadline) {
                    return 'finished';
                }
            }

            const today = new Date();
            tournaments.forEach(event => {
                const reg_start = new Date(event.registration_starting_date);
                const start = new Date(event.start);
                const deadline = new Date(event.deadline);

                if (reg_start > today) {
                    event.status = get_status(event)
                    data.upcoming.push(event)
                } else if (deadline < today) {
                    event.status = get_status(event)
                    data.finished.push(event)
                } else if (start <= today && deadline >= today) {
                    event.status = get_status(event)
                    data.ongoing.push(event);
                }
            });
            return JSON.parse(JSON.stringify({ localevents: data }))
        } catch (error) {
            return JSON.parse(JSON.stringify({ localevents: data }))
        }
    } else {
        redirect(300, '/')
    }
};