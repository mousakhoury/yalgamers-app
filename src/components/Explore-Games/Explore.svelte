<script>
	// import ExploreCard from '$components/Explore-Course/ExploreCard.svelte';
	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';
	// import { Navigation, Pagination, A11y } from 'swiper';
	// import { Swiper, SwiperSlide as SwiperItem } from 'swiper/svelte';
	import ExploreCard from './ExploreCard.svelte';
	import banner from '$lib/assets/explore-games-trending.png';
	import { SplideSlide } from '@splidejs/svelte-splide';

	import '@splidejs/svelte-splide/css/core';
	import Swiper from '$components/Swiper/Swiper.svelte';

	export let games;
</script>

<div
	class="relative items-center justify-center w-full h-full py-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-20 lg:py-15"
>
	<img
		loading="lazy"
		src={banner}
		class="absolute top-0 right-0 object-cover w-full h-full -z-10"
	/>
	<div class="w-full px-5 lg:col-span-1">
		<div class="w-full mb-5 sm:mb-10">
			<div
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-[28px] sm:text-[42px] leading-snug font-normal w-full lg:w-[325px] text-white font-Gilroy-Bold not-italic"
			>
				{$t('games.title')} <span class="gradient"> {$t('games.title2')} </span>
				{$t('games.title3')}
			</div>
			<div
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white-60 w-full lg:w-[366px] leading-[22px] font-Gilroy font-medium text-[15px] sm:text-base not-italic mt-[15px]"
			>
				{$t('games.desc')}
			</div>
		</div>
		<a href="/games">
			<Button type="gradient" class="w-fit">{$t('seeAll')}</Button>
		</a>
	</div>
	<div class="w-full overflow-hidden gamesCard lg:col-span-2">
		<Swiper>
			{#each games as items}
				<SplideSlide class="explor-sider">
					<!-- <ExploreCard game={items} /> -->
					<ExploreCard
						id={items.id}
						image={items.card_image}
						status={items.status}
						title={$locale === 'en' ? items.title_en : items.title}
					/>
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>

<style>
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	@media screen and (max-width: 640px) {
		:global(.gamesCard .splide__slide) {
			width: fit-content !important;
		}
	}
</style>
