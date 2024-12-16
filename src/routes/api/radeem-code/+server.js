import { json } from '@sveltejs/kit';

export async function GET({ locals, url }) {
    const code = url.searchParams.get('code');
    if (locals.pb) {
        try {
            const record = await locals.pb.collection('radeem_codes').getFirstListItem(`code='${code}'`);
            if (!record.radeemed) {
                try {
                    await locals.pb.collection('radeem_codes').update(record.id, { radeemed: true });
                    await locals.pb.collection('ticket_logs').create({
                        user: locals.user.id,
                        type: "RADEEM CODE",
                        ticket: record.tickets
                    })
                    return json({
                        msg: 'Successfully Radeem',
                        success: true
                    });
                } catch {
                    return json({
                        msg: 'Server Error',
                        success: false
                    });
                }
            }
            return json({
                msg: 'Already Radeemed',
                success: false
            });
        } catch {
            return json({
                msg: 'Invalid code',
                success: false
            });
        }
    }
}
