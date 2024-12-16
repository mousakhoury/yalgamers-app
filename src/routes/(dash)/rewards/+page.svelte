<script>
	import MysteryBoxBanner from '$components/Rewards/MysteryBoxBanner.svelte';
	import { t, locale } from '$lib/stores/i18n';
	import MyBalance from '$components/Rewards/MyBalance.svelte';
	import SpinBanner from '$components/Rewards/SpinBanner.svelte';
	import RewardsEarnMore from '$components/Rewards/RewardsEarnMore.svelte';
	import RedeemCode from '$components/Rewards/RedeemCode.svelte';
	import ReplaceTickets from '$components/Rewards/ReplaceTickets.svelte';
	import SpinWheen from '$components/Rewards/SpinWheen.svelte';

	export let data;
</script>

<div
	class="flex flex-col items-start gap-[12px] lg:gap-[24px] w-full px-[10px] sm:px-[30px] pt-[16px] lg:pt-[24px] pb-[60px] lg:pb-[80px]"
>
	<p class="text-white text-[20px] lg:text-[28px] font-Gilroy-SemiBold">{$t('rewards')}</p>
	<div class="flex flex-col items-start gap-[16px] lg:gap-[40px] w-full">
		<MyBalance />
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[24px] w-full">
			<MysteryBoxBanner />
			<SpinBanner />
		</div>

		<RedeemCode />

		<ReplaceTickets />

		<RewardsEarnMore />
	</div>
</div>
