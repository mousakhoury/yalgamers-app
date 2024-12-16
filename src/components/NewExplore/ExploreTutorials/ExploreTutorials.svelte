<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import ProjectQuestCard from '$components/QuestPage/ProjectQuestCard.svelte';
	import Swiper from '$components/Swiper/Swiper.svelte';
	import DoubleArrow from '$lib/assets/duble-right-yellow.svg';
	import { SplideSlide } from '@splidejs/svelte-splide';
	import ExploreTutorialsCard from './ExploreTutorialsCard.svelte';

	export let courses = [];
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div
		class="flex flex-col lg:flex-row gap-[8px] items-start lg:items-center justify-between w-full"
	>
		{#if $locale === 'ar'}
			<h6
				class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-SemiBold max-w-[216px] lg:max-w-[391px]"
			>
				اطلع على <span class="text-[#8EC9ED]">الدروس التعليمية</span> الجديدة على يالغيمرز!
			</h6>
		{:else}
			<h6
				class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-SemiBold max-w-[216px] lg:max-w-[360px]"
			>
				Check out the all new
				<span class="text-[#8EC9ED]">Tutorials</span> on Yalgamers!
			</h6>
		{/if}
		<div class="flex flex-col items-start gap-[10px] lg:gap-[12px] max-w-[466px]">
			<p class="text-[#FFFFFFB2] text-[11px] lg:text-[16px] font-Gilroy">
				{$t('TutorialsSubtitle')}
			</p>
			<a href="/tutorials" class="flex items-center gap-[4px] hover:gap-[8px] duration-300 group">
				<p
					class="text-[#FDEB56] group-hover:text-[#CABC45] text-[12px] lg:text-[16px] font-Gilroy-Medium duration-300"
				>
					{$t('View All')}
				</p>
				<img src={DoubleArrow} alt="" class="w-[16px] {$locale === 'ar' ? 'rotate-180' : ''}" />
			</a>
		</div>
	</div>
	<div class="w-full explorSider tutorial-slider">
		<Swiper gap="25px">
			{#each courses as course}
				<SplideSlide>
					<ExploreTutorialsCard {course} />
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>
