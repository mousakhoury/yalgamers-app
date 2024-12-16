<script>
	import { t, locale } from '$lib/stores/i18n';
	import TicketsGiftCards from '$lib/assets/rewards/tickets-to-gift-cards.svg';
	import TicketsDiscounts from '$lib/assets/rewards/tickets-to-discounts.svg';
	import TicketsDigitalAssets from '$lib/assets/rewards/tickets-to-digital-assets.svg';
	import GiftCards from '$lib/assets/rewards/gift-cards.svg';
	import Discounts from '$lib/assets/rewards/discounts.svg';
	import DigitalAssets from '$lib/assets/rewards/digital-assets.svg';
	import Arrow from '$lib/assets/rewards/arrow.svg';
	import ticket from '$lib/assets/rewards/ticket.svg';

	$: replacements = [
		{
			title: $t('Tickets to GiftCards'),
			subText: $t('Tickets to GiftCards Text'),
			background: TicketsGiftCards,
			image: GiftCards
		},
		{
			title: $t('Tickets to Discounts'),
			subText: $t('Tickets to Discounts text'),
			background: TicketsDiscounts,
			image: Discounts
		},
		{
			title: $t('Tickets to Digital Assets'),
			subText: $t('Tickets to Digital Assets text'),
			background: TicketsDigitalAssets,
			image: DigitalAssets
		}
	];
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[12px] lg:gap-[24px] w-full">
	{#each replacements as item}
		<div
			class="flex flex-col items-start gap-[30px] lg:gap-[57px] p-[20px] lg:p-[24px] w-full rounded-[16px] background"
			style="background-image: url({item.background});"
		>
			<div class="flex flex-col items-start gap-[16px] w-full">
				<div class="px-[10px] py-[6px] rounded-full bg-[#792341]">
					<p
						class="text-[#FFFFFFE5] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
					>
						{$t('Coming Soon')}
					</p>
				</div>
				<div class="flex flex-col items-start gap-[6px] w-full">
					<p
						class="text-white text-[23px] lg:text-[32px] font-Gilroy-Bold leading-[28px] lg:leading-[40px]"
					>
						{item.title}
					</p>
					<p
						class="text-[#FFFFFFB2] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
					>
						{@html item.subText}
					</p>
				</div>
			</div>

			<div class="flex items-center justify-between w-full" dir="ltr">
				<img src={ticket} alt="" class="w-[69.923px] lg:w-[90px]" />
				<img src={Arrow} alt="" class="w-[93.231px] lg:w-[120px]" />
				<img src={item.image} alt="" class="h-[77.853px] lg:h-[100px] w-[92.795px] lg:w-[120px]" />
			</div>
		</div>
	{/each}
</div>

<style>
	.background {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
