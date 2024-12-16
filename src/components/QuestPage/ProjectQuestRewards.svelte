<script>
	// @ts-nocheck

	import XPIcon from '$lib/assets/main-quest/xp-icon.svg';
	import NftIcon from '$lib/assets/main-quest/nft-icon.svg';
	import TokensIcon from '$lib/assets/main-quest/mony-icon.svg';
	import MoneyIcon from '$lib/assets/main-quest/tokens-icon.svg';
	import XPbg from '$lib/assets/main-quest/proj_xp_reward.png';
	import TicketBG from '$lib/assets/main-quest/proj_ticket_reward.png';
	import Gift from '$lib/assets/rewards/gift.svg';

	import { getImageUrl } from '$lib/utils';
	import { onMount } from 'svelte';

	export let project;
	export let rewards = [];

	onMount(() => {
		if (project && project.quests && project.quests.length > 0) {
			const amount = project.quests.reduce((sum, obj) => sum + obj.xp, 0);
			const xp_reward = {
				type: 'xp',
				amount
			};
			rewards = [xp_reward, ...rewards];
		}
	});

	function getIcon(type) {
		if (type == 'xp') {
			return XPIcon;
		} else if (type == 'nft') {
			return NftIcon;
		} else if (type == 'money') {
			return MoneyIcon;
		} else if (type == 'box') {
			return Gift;
		}

		// else if (type == 'ticket') {
		// 	return TokensIcon;
		// }
	}

	function getColor(type) {
		if (type == 'xp') {
			return '#FDEB56';
		} else if (type == 'nft') {
			return '#BC5AD7';
		} else if (type == 'money') {
			return '#8EC9ED';
		} else if (type == 'box') {
			return '#8EC9ED';
		}
		// else if (type == 'ticket') {
		// 	return '#17DCF7';
		// }
	}
</script>

{#if rewards.length > 0}
	<div class="flex flex-col items-start w-full gap-[20px]">
		<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">Rewards</p>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[30px] w-full">
			{#each rewards as reward}
				<div
					class="w-full aspect-[240/320] rounded-[12px] p-[5px] border bg-[#412E4C] relative"
					style={`border-color: ${getColor(reward.type)}; box-shadow: 0 0 20px -7px ${getColor(
						reward.type
					)};`}
				>
					{#if reward.img}
						<img
							src={getImageUrl(reward.collectionId, reward.id, reward.img)}
							alt=""
							class="w-full aspect-[230/310] object-cover rounded-[8px]"
						/>
					{:else if reward.type == 'xp'}
						<img src={XPbg} alt="" class="w-full aspect-[230/310] object-cover rounded-[8px]" />
					{:else if reward.type == 'ticket'}
						<img src={TicketBG} alt="" class="w-full aspect-[230/310] object-cover rounded-[8px]" />
					{:else}
						<img
							src={getImageUrl(project.collectionId, project.id, project.image)}
							alt=""
							class="w-full aspect-[230/310] object-cover rounded-[8px]"
						/>
					{/if}

					<div
						class="flex flex-col items-start justify-end absolute top-0 left-0 w-full h-full p-[10px]"
					>
						<div
							class="flex items-center gap-[12px] p-[5px] rounded-[4px] bg-[#9090901a] backdrop-blur-[10px] w-full relative rewardData"
						>
							<img src={getIcon(reward.type)} alt="" />
							<div class="flex w-full items-center justify-between">
								<div>
									<p class="text-[#FFFFFF99] text-[12px] font-Gilroy-Medium">You will Get</p>
									<p
										class="text-[20px] font-Gilroy-SemiBold"
										style={`color: ${getColor(reward.type)};`}
									>
										{reward.amount}
									</p>
								</div>
								{#if reward.type == 'nft'}
									<a target="_blank" href={reward.nft_link}>
										<img
											class="w-12 h-12 rounded-[4px] hover:cursor-pointer bg-[#9090901a] hover:bg-[#90909049] backdrop-blur-[10px] p-2.5 hover:p-2 transition-all"
											src={getImageUrl(
												reward.expand.nft_network.collectionId,
												reward.expand.nft_network.id,
												reward.expand.nft_network.img
											)}
											alt="nft network icon"
										/>
									</a>
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
</style>
