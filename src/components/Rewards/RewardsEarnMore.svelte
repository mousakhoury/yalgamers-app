<script>
	import { t, locale } from '$lib/stores/i18n';
</script>

<div class="flex items-center justify-center w-full lg:h-[360px] rounded-[16px] backgroundImage">
	<div class="flex flex-col items-center gap-[24px] w-full max-w-[222px] lg:max-w-[390px]">
		<div class="flex flex-col items-center gap-[8px] w-full">
			<p
				class="text-white text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
			>
				{$t('Want to earn more XP and Tickets?')}
			</p>
			<p
				class="text-[#FFFFFF99] text-[12px] lg:text-[14px] text-center font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
			>
				{$t('Want to earn more XP and Tickets text')}
			</p>
		</div>

		<a href="/main-quests" class="px-[28px] py-[12px] rounded-[8px] bg-[#FDEB56] box-shadow">
			<p
				class="text-[#2A0D32] text-[14px] lg:text-[18px] font-Gilroy-SemiBold leading-[17px] lg:leading-[22px]"
			>
				{$t('Get Started')}
			</p>
		</a>
	</div>
</div>

<style>
	.backgroundImage {
		background-image: url('$lib/assets/rewards/earn-more-banner.svg');
		background-position: center;
		background-size: cover;
	}

	@media (max-width: 1024px) {
		.backgroundImage {
			background-image: url('$lib/assets/rewards/earn-more-banner-mobile.svg');
			aspect-ratio: 343/289;
		}
	}
</style>
