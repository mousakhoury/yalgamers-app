<script>
	import { t, locale } from '$lib/stores/i18n';
	import XPIcon from '$lib/assets/rewards/xp-icon.svg';
	import Gift from '$lib/assets/rewards/gift.svg';
	import MintedTickets from '$lib/assets/rewards/minted-tickets-icon.svg';
	import MintTickets from '$lib/assets/rewards/mint-tickets.svg';
	import { boxes } from '$lib/stores/boxes.js';
	import { tickets } from '$lib/stores/tickets';
	import { user } from '$lib/stores/user';

	$: balance = [
		{
			title: $t('MysteryBox'),
			amount: $boxes,
			image: Gift,
			background: '#302744',
			color: '#8EC9ED'
		},
		{
			title: $t('XP'),
			amount: $user.xp,
			image: XPIcon,
			background: '#482F36',
			color: '#FDEB56'
		}
	];


		console.log('helelo')
</script>

<div
	class="flex flex-col items-start gap-[14px] lg:gap-[12px] p-[12px] lg:p-[20px] rounded-[14px] bg-[#200B26] w-full"
>
	<p class="text-[#FFFFFFCC] text-[16px] lg:text-[14px] font-Gilroy-Medium">{$t('My Balances')}</p>
	<div class="flex flex-col lg:flex-row items-start gap-[12px] lg:gap-[20px] w-full">
		{#each balance as item}
			<div
				class="flex items-center gap-[16px] p-[6px] lg:p-[8px] w-full rounded-[8px]"
				style="background-color: {item.background};"
			>
				<img src={item.image} alt="" class="w-[48px] lg:w-[52px]" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#FFFFFFE5] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
						{item.title}
					</p>
					<p class="text-[14px] lg:text-[16px] font-Gilroy-Medium" style="color: {item.color};">
						{item.amount}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>
