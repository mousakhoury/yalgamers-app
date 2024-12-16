<script>
	import xp_icon from '$lib/assets/xp-icon.svg';
	import XP from '$lib/assets/new-xp-icon2.svg';

	export let xp;
</script>

<div dir="ltr" class="relative xpContainer">
	<div
		class="flex items-center gap-[11.667px] lg:gap-[14px] p-[4px] lg:p-[6px] pr-[12px] lg:pr-[16px] rounded-[6px] border border-transparent bg-[#200b26]"
	>
		<img src={XP} alt="" class="w-[26.6px] lg:w-[32px]" />

		<p class="text-[#FDEB56] text-[12px] lg:text-[16px] font-Gilroy-SemiBold">{xp}</p>
	</div>
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
