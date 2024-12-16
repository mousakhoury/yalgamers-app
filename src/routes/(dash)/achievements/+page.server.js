import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    if (!locals.user) throw redirect(301, '/login')
    const userid = locals.user.id;
    const { pb } = locals;

    async function fetchMyNfts() {
        try {
            return await pb.collection('project_nft_logs').getFullList({
                filter: `user='${userid}'`,
                expand: 'project.blockchain_network, blockchain_network',
            })
        } catch (error) {
            return []
        }
    }

    async function claimed_badges_fn() {
        try {
            return await pb.collection('claimed_badges').getFullList({
                filter: `user='${userid}'`,
            })
        } catch (error) {
            return []
        }
    }

    const [my_nfts, claimed_badges] = await Promise.all([fetchMyNfts(), claimed_badges_fn()])

    return { my_nfts: structuredClone(my_nfts), claimed_badges: structuredClone(claimed_badges) };
};