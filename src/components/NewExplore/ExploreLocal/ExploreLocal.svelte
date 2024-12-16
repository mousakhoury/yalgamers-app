<script>
	import { onMount } from 'svelte';
	import { t, locale } from '$lib/stores/i18n';
	import ArrowYellow from '$lib/assets/duble-right-arrow-yellow.svg';
	import ArrowBlack from '$lib/assets/duble-right-arrow-black.svg';
	import Swiper from '$components/Swiper/Swiper.svelte';
	import { SplideSlide } from '@splidejs/svelte-splide';
	import ExploreLocalCard from './ExploreLocalCard.svelte';

	export let tournaments;

	let isMobile = false;

	onMount(() => {
		// Set the isMobile variable based on the initial screen width
		isMobile = window.matchMedia('(max-width: 768px)').matches;

		// Add an event listener to update isMobile if the screen size changes
		const handleResize = () => {
			isMobile = window.matchMedia('(max-width: 768px)').matches;
		};

		window.addEventListener('resize', handleResize);

		// Clean up the event listener when the component is destroyed
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div class="flex items-center justify-between w-full">
		<h6 class="text-[#FFFFFFE5] text-[20px] lg:text-[28px] font-Gilroy-Bold">
			{$t('localTournaments')}
		</h6>
		<a href="/local-events">
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
		<Swiper gap={isMobile ? '16px' : '30px'}>
			{#each tournaments as tournament}
				<SplideSlide>
					<ExploreLocalCard {tournament} />
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>
