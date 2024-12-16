import { json } from '@sveltejs/kit';

export async function POST({ locals, request }) {
    if (locals.user) {
        try {
            const data = await request.json();

            await locals.pb.collection('daily_spin_logs').create({
                user: locals.user.id,
                prize: data.label,
                date: new Date(),
            })

            if (data.type && data.expand.type.name == 'xp') {
                await locals.pb.collection('xp_logs').create({
                    user: locals.user.id,
                    xp: parseInt(extractNumber(data.label)),
                    type: 'SPIN_WHEEL',
                    data: JSON.stringify({ "date": new Date().toDateString() })
                })
            } else if (data.type && data.expand.type.name == 'ticket') {
                await locals.pb.collection('ticket_logs').create({
                    user: locals.user.id,
                    ticket: parseInt(extractNumber(data.label)),
                    type: 'SPIN_WHEEL',
                })
            }
            return json(200)
        } catch (error) {
        }
    }
}

function extractNumber(text) {
    let numberPattern = /\d+/;
    let match = text.match(numberPattern);
    return match ? match[0] : null;
}