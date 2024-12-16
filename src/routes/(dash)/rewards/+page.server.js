import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (locals.user) {
        async function getSpinList() {
            try {
                return await locals.pb.collection('spinwheel').getFullList({ expand: 'type' });
            } catch (error) {
                return [];
            }
        }

        async function getavailableSpins() {
            try {
                return (await locals.pb.collection('daily_spin_logs').getFullList({ filter: `date>'${new Date().toISOString().slice(0, 10)}'` })).length;
            } catch (error) {
                return -1;
            }
        }

        async function getWeeklySpins() {
            try {
                let record = await locals.pb.collection('weekly_spin').getFirstListItem(`user='${locals.user.id}'`);
                const today = new Date().setHours(0, 0, 0, 0);
                const updated = new Date(record.updated).setHours(0, 0, 0, 0);
                let yesterday = new Date((new Date()).getTime() - (24 * 60 * 60 * 1000)).setHours(0, 0, 0, 0);

                if (updated == today) {
                    return {
                        id: record.id,
                        day: record.day,
                        isClaimed: record.claim,
                        spins: record.spins
                    };
                } else if (updated == yesterday && record.claim) {
                    if (record.day < 7) {
                        const updatedRecord = await locals.pb.collection('weekly_spin').update(record.id, { day: record.day + 1, claim: false, spins: record.spins + 1 })
                        return {
                            id: record.id,
                            day: updatedRecord.day,
                            isClaimed: updatedRecord.claim,
                            spins: updatedRecord.spins
                        };
                    } else {
                        await locals.pb.collection('weekly_spin').update(record.id, { day: 1, claim: false, spins: 1 })
                        return {
                            id: record.id,
                            day: 1,
                            isClaimed: false,
                            spins: 1
                        };
                    }
                } else {
                    await locals.pb.collection('weekly_spin').update(record.id, { day: 1, claim: false, spins: 1 + record.spins })
                    return {
                        id: record.id,
                        day: 1,
                        isClaimed: false,
                        spins: 1 + record.spins
                    };
                }

            } catch (error) {
                let obj = {
                    user: locals.user.id,
                    day: 1,
                    isClaimed: false,
                    spins: 1
                };
                const record = await locals.pb.collection('weekly_spin').create(obj)
                delete obj.user;
                obj.id = record.id;
                return obj;
            }
        }

        async function get_box_open_time() {
            try {
                const record = await locals.pb.collection('timelines').getFirstListItem(`type='reward_box'`)
                return record.date_time
            } catch (error) {
                return null;
            }
        }

        const [spinitems, availableSpins, weekly_spin, box_open_time] = await Promise.all([getSpinList(), getavailableSpins(), getWeeklySpins(), get_box_open_time()])
        let spins = 0;
        if (weekly_spin.isClaimed) {
            spins = weekly_spin.spins - availableSpins;
        }

        return { spinitems: structuredClone(spinitems), availableSpins: spins, weekly_spin: structuredClone(weekly_spin), box_open_time }
    } else {
        throw redirect(301, '/login')
    }
};