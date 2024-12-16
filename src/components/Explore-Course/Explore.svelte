<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';
	import ExploreCard from './ExploreCard.svelte';
	import Swiper from '$components/Swiper/Swiper.svelte';
	import { SplideSlide } from '@splidejs/svelte-splide';
	export let courses = [];
</script>

<div
	class="items-center justify-start w-full py-10 overflow-y-hidden grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20 lg:py-0"
>
	<div class="w-full px-5 col-span-1">
		<div class="mb-10">
			<div
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-[28px] sm:text-[42px] leading-snug font-normal text-white font-Gilroy-Bold not-italic"
			>
				<p>
					{$t('courses.title')} <span class="gradient"> {$t('courses.title2')} </span>
					{$t('courses.title3')}
				</p>
			</div>
			<div
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white-60 leading-[22px] font-Gilroy font-medium text-[15px] sm:text-base not-italic mt-[15px]"
			>
				{$t('courses.desc')}
			</div>
		</div>
		<a href="/courses">
			<Button type="gradient" class="w-fit">{$t('seeAll')}</Button>
		</a>
	</div>
	<div
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="w-full py-0 overflow-hidden lg:py-20 col-span-2"
	>
		<Swiper>
			{#each courses as item (item.id)}
				<SplideSlide class="explor-sider">
					<ExploreCard
						id={item.id}
						image={item.card_image}
						userExpand={item.expand?.user}
						title={$locale === 'en' ? item.title_en : item.title}
					/>
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	:global(.cards .explor-sider) {
		width: 250px !important;
		position: relative;
	}
	:global(.cards .splide__list) {
		gap: unset;
	}
</style>
