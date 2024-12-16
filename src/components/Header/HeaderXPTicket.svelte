<script>
	import Ticket from '$lib/assets/new-header-ticket2.svg';
	import XP from '$lib/assets/new-xp-icon2.svg';
	import { tickets } from '$lib/stores/tickets';
	import { boxes } from '$lib/stores/boxes.js';
	import Gift from '$lib/assets/gift.svg';
	import { page } from '$app/stores';
</script>

<div class="flex items-center gap-[8px] lg:gap-[25px]">
	<a href="/profile/xp_history" dir="ltr" class="relative xpContainer">
		<div
			class="flex items-center gap-[11.667px] lg:gap-[14px] p-[4px] lg:p-[6px] pr-[12px] lg:pr-[16px] rounded-[6px] border border-transparent bg-[#1D1021]"
		>
			<img src={XP} alt="" class="w-[26.6px] lg:w-[32px]" />

			<p class="text-[#FDEB56] text-[12px] lg:text-[16px] font-Gilroy-SemiBold">
				{$page.data.profile.xp}
			</p>
		</div>
	</a>

	<a dir="ltr" class="relative xpContainer">
		<div
			class="flex items-center gap-[11.667px] lg:gap-[14px] p-[4px] lg:p-[6px] pr-[12px] lg:pr-[16px] rounded-[6px] border border-transparent bg-[#1D1021]"
		>
			<img src={Gift} alt="" class="w-[24px] h-[24px] lg:w-[32px]" />
			<p class="text-[#8EC9ED] text-[12px] lg:text-[16px] font-Gilroy-SemiBold">{$boxes}</p>
		</div>
	</a>
	<!-- <a dir="ltr" class="relative xpContainer">
		<div
			class="flex items-center gap-[11.667px] lg:gap-[14px] p-[4px] lg:p-[6px] pr-[12px] lg:pr-[16px] rounded-[6px] border border-transparent bg-[#1D1021]"
		>
			<img src={Ticket} alt="" class="w-[26.6px] lg:w-[32px]" />

			<p class="text-[#FDEB56] text-[12px] lg:text-[16px] font-Gilroy-SemiBold">{$tickets}</p>
		</div>
	</a> -->
</div>

<style>
	.xpContainer::after {
		width: calc(100% + 2px);
		height: calc(100% + 1px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 7px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}
</style>
