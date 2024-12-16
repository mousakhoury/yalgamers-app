import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
    if (locals.user) {
        try {
            const res = await locals.pb.send('/open-box');
            return json({ ok: true, box: res })
        } catch (error) {
            console.log(error);
        }
    }
    return json({ ok: false })
}


// export async function POST({ request, locals }) {
//     if (locals.user) {
//         try {
//             const data = await request.json();
//             if (!data.prize || typeof data.prize != 'string' || typeof data.type != 'string') {
//                 return json({ ok: false })
//             }
//             const prize = data.prize;
//             const user = locals.user.id;
//             const type = data.type;

//             await locals.pb.collection('mystery_box_logs').create({
//                 prize,
//                 user
//             })

//             let value = extractNumber(prize);
//             if (type == 'XP') {
//                 await locals.pb.collection('xp_logs').create({
//                     user,
//                     xp: value,
//                     type: 'MYSTERY BOX',
//                     data: JSON.stringify({ "date": new Date().toDateString() })
//                 })
//             }

//             if (type == 'BOX') {
//                 await locals.pb.collection('box_logs').create({
//                     user,
//                     box: value,
//                     type: 'MYSTERY BOX',
//                 })
//             }

//             return json({ ok: true })
//         } catch (error) {
//             return json({ ok: false })
//         }
//     } else {
//         throw redirect(301, '/login')
//     }
// }

// function extractNumber(text) {
//     let numberPattern = /\d+/;
//     let match = text.match(numberPattern);
//     return match ? match[0] : null;
// }