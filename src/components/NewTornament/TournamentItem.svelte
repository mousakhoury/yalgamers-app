<script>
	import { t, locale } from '$lib/stores/i18n';

	// import Price from '$lib/assets/main-quest/card-prize.svg';
	import Price from '$lib/assets/tournament-price.svg';
	// import Xp from '$lib/assets/tournament-xp.svg';
	import Ticket from '$lib/assets/main-quest/proj_card_ticket.svg';
	import Xp from '$lib/assets/main-quest/proj_card_xp.svg';
	import Box from '$lib/assets/box.svg';

	export let image;
	export let bg;
	export let text;
	export let span = '';
	export let type = 'default';
</script>

{#if type === 'price'}
	<div
		class="flex items-center rounded-[100px] p-[4px] gap-[10px] bg-[#200B26] relative price-container {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'}"
	>
		<img src={Price} alt="" class="w-[20px] lg:w-[34px] h-[20px] lg:h-[34px]" />
		<p class="text-[#FDEB56] text-[18px] font-Gilroy-SemiBold">
			${text}
			{$t('Total')}
		</p>
	</div>
{:else if type === 'xp'}
	<div
		class="flex items-center rounded-[100px] p-[4px] gap-[10px] bg-[#200B26] relative price-container {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'}"
	>
		<img src={Xp} alt="" class="w-[20px] lg:w-[34px] h-[20px] lg:h-[34px]" />
		<p class="text-[#FDEB56] text-[18px] font-Gilroy-SemiBold">
			{text}
			{$t('Total')}
		</p>
	</div>
{:else if type === 'xpEach'}
	<div
		class="flex items-center rounded-[100px] p-[4px] gap-[10px] bg-[#200B26] relative price-container {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'}"
	>
		<img src={Xp} alt="" class="w-[20px] lg:w-[34px] h-[20px] lg:h-[34px]" />
		<p class="text-[#FDEB56] text-[18px] font-Gilroy-SemiBold">
			{text} Total Each Team
		</p>
	</div>
{:else if type == 'ticket'}
	<div
		class="flex items-center rounded-[100px] p-[4px] gap-[10px] bg-[#200B26] relative price-container {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'}"
	>
		<img src={Ticket} alt="" class="w-[20px] lg:w-[36px] h-[20px] lg:h-[36px]" />
		<p class="text-[#FDEB56] text-[18px] font-Gilroy-SemiBold">
			{text}
			{$t('Total')}
		</p>
	</div>
{:else if type == 'box'}
	<div
		class="flex items-center rounded-[100px] p-[4px] gap-[10px] bg-[#200B26] relative price-container {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'}"
	>
		<img src={Box} alt="" class="w-[20px] lg:w-[34px] h-[20px] lg:h-[34px]" />
		<p class="text-[#FDEB56] text-[18px] font-Gilroy-SemiBold">
			{text}
			{$t('Total')}
		</p>
	</div>
{:else}
	<div
		class="flex items-center rounded-[100px] p-[2px] lg:p-[3px] gap-[7px] md:gap-[15px] {$locale ===
		'ar'
			? 'pl-[8px] lg:pl-[15px]'
			: 'pr-[8px] lg:pr-[15px]'} "
		style={`background: ${bg}`}
	>
		<img src={image} alt="" class="w-[20px] lg:w-[34px] h-[20px] lg:h-[34px]" />
		<p class="text-[#FFF] text-[12px] md:text-[20px] font-Gilroy-SemiBold">
			{text}<span class="text-[#BEB6C0] font-Gilroy-Medium">{span}</span>
		</p>
	</div>
{/if}

<style>
	.price-container::after {
		width: calc(100% + 2px);
		height: calc(100% + 1px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 100px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}
</style>
