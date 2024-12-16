<script>
	import { t, locale } from '$lib/stores/i18n';

	import ArrowYellow from '$lib/assets/duble-right-arrow-yellow.svg';
	import ArrowBlack from '$lib/assets/duble-right-arrow-black.svg';
	import Swiper from '$components/Swiper/Swiper.svelte';
	import { SplideSlide } from '@splidejs/svelte-splide';
	import Placeholder from '$lib/assets/news/news-placeholder.png';
	import NewsCard from './NewsCard.svelte';

	export let news;
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div
		class="flex items-start lg:items-center justify-between gap-[10px] w-full flex-col lg:flex-row"
	>
		{#if $locale === 'ar'}
			<h6 class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-Bold max-w-[395px]">
				استكشف أحدث الأخبار في ألعاب <span class="text-[#8EC9ED]">الويب 3.0</span>
			</h6>
		{:else}
			<h6 class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-Bold max-w-[395px]">
				Explore the Latest News in
				<span class="text-[#8EC9ED]">Web 3.0</span> Gaming
			</h6>
		{/if}
		<a href="/news">
			<div
				class="flex items-center gap-[4px] px-[10px] py-[6px] rounded-[4px] bg-[#FDEB561A] hover:bg-[#FDEB56] group"
			>
				<p class="text-[#FDEB56] group-hover:text-[#201E0A] text-[16px] font-Gilroy-Medium">
					{$t('View All')}
				</p>
				<img
					src={ArrowYellow}
					alt=""
					class="w-[16px] group-hover:hidden {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
				<img
					src={ArrowBlack}
					alt=""
					class="w-[16px] hidden group-hover:block {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
			</div>
		</a>
	</div>
	<div class="w-full explorSider">
		<Swiper gap="24px">
			{#each news as newsItem}
				<SplideSlide>
					<div class="w-[309px] lg:w-[444px]">
						<NewsCard {newsItem} />
					</div>
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>
