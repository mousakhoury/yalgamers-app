<script lang="ts">
	import { t, locale } from '$lib/stores/i18n';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	import '@splidejs/svelte-splide/css';

	import '@splidejs/svelte-splide/css/core';
	import { onMount } from 'svelte';
	import Button from '$components/Button.svelte';
	import { goto } from '$app/navigation';
	import { getImageUrl } from '$lib/utils';

	let main: Splide;
	let thumbs: SplideSlide;

	export let items;
	let intervalTiming = 50000000000000000;
	const mainOptions = {
		type: 'loop',
		autoplay: true,
		interval: intervalTiming,
		perPage: 1,
		perMove: 1,
		gap: '1rem',
		pagination: true,
		height: 450,
		breakpoints: {
			992: {
				height: 400
			},
			768: {
				height: 300
			}
		},
		arrows: false,
		pauseOnFocus: false,
		pauseOnHover: false
	};

	const thumbsOptions = {
		type: 'slide',
		rewind: true,
		autoplay: true,
		interval: intervalTiming,
		gap: '1rem',
		pagination: false,
		fixedWidth: 'min(350px,100%)',
		fixedHeight: '100',
		perMove: 1,
		contain: true,
		focus: 'center',
		isNavigation: true,
		updateOnMove: true,
		pauseOnFocus: false,
		resetProgress: false,
		pauseOnHover: false,

		arrows: false,
		direction: 'ttb',
		breakpoints: {
			992: {
				direction: 'ltr',
				fixedWidth: 'min(300px,100%)'
			},
			768: {
				fixedWidth: 'min(200px,100%)',
				pauseOnHover: false
			}
		},
		height: 'auto'
	};

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});
	let progressBar;
	$: reachedEnd = false;

	const bannerSrc = (d) => getImageUrl('announcements', d.id, d.main_banner_image);

	const logoSrc = (d) => getImageUrl('announcements', d.id, d.logo);
</script>

<div
	class="flex flex-col w-full overflow-hidden landingThumbnailWrapper justify-evenly min-[992px]:flex-row main-banner"
>
	<Splide
		options={mainOptions}
		bind:this={main}
		aria-labelledby="thumbnails-example-heading"
		dir="ltr"
		class="order-2 min-[992px]:order-2"
	>
		{#each items as item}
			<SplideSlide>
				<div
					class={`flex flex-col items-start justify-between w-full h-full p-[20px] lg:p-[30px] overflow-hidden bg-gradient-900 relative z-10`}
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				>
					<img
						loading="lazy"
						alt="logo"
						src={logoSrc(item)}
						class="h-[32px] lg:h-[50px] aspect-[70/50] object-contain"
					/>
					<div
						class="flex flex-col items-start gap-[6px] lg:gap-[10px] max-w-[400px] {$locale == 'ar'
							? 'text-right'
							: 'text-left'}"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-white text-[18px] lg:text-[36px] font-Gilroy-Bold"
						>
							{$locale == 'ar' ? item.title_ar : item.title_en}....
						</p>
						<span class="text-[#BEB6C0] text-[11px] lg:text-[16px] font-Gilroy-Medium">
							{$locale === 'ar' ? item.subtitle_ar : item.subtitle_en}...
						</span>
					</div>
					<div class="mt-5 sm:mt-10 sm:ml-5">
						<button
							on:click={() => goto(`/announcements/${item.id}`)}
							class="px-[14px] lg:px-[24px] py-[6px] lg:pt-[9px] lg:pb-[7px] rounded-[4px] lg:rounded-[6px] bg-[#792341]"
						>
							<p class="text-white text-[14px] lg:text-[16px] font-Gilroy-SemiBold">
								{$t('learnMore')}
							</p>
						</button>
					</div>
				</div>
				<img loading="lazy" class="sliderImg" src={bannerSrc(item) + '?thumb=0x400'} alt={'Alt'} />
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	:global(.landingThumbnailWrapper .splide:nth-child(1)) {
		padding: 0rem 0;
		height: 360px;
		width: 100% !important;
	}
	:global(.landingThumbnailWrapper .splide:nth-child(2)) {
		padding: 0;
		visibility: visible;
		width: 20%;
		overflow: visible;
		height: 360px;
		position: absolute;
		z-index: 1;
		right: 20px;
	}

	:global(.landingThumbnailWrapper .splide:nth-child(2):lang(ar)) {
		right: unset;
		left: 20px;
	}
	:global(.landingThumbnailWrapper .splide .splide__track) {
		height: 100%;
		/* margin: 0 1rem; */
	}

	:global(.landingThumbnailWrapper .splide:nth-child(1) .splide__slide) {
		width: 100% !important;
		height: 100% !important;
	}

	:global(.landingThumbnailWrapper .splide__progress) {
		position: absolute;
		height: 100px;
	}
	:global(.landingThumbnailWrapper .splide:nth-child(1) .sliderImg) {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		aspect-ratio: 16/9;
	}
	:global(.landingThumbnailWrapper .splide__slide) {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		visibility: visible;
		border-radius: 10px !important;
	}
	:global(.landingThumbnailWrapper .splide:nth-child(2) .is-active) {
		border-radius: 4px;
		border: 1.606px solid var(--White, rgba(255, 221, 85, 0.8)) !important;
		background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.8) 63.02%,
				rgba(255, 255, 255, 0) 63.03%
			),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
			lightgray 50% / cover no-repeat;
		box-shadow: 0px 0px 8.02811px 2.00703px rgba(255, 255, 255, 0.3);
	}
	:global(.is-active .splide__progress) {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		top: 0;
		border-radius: 5px;
		background: transparent !important;
	}
	:global(.landingThumbnailWrapper .splide__progress__bar) {
		background: transparent;
		height: 100%;
	}
	:global(.landingThumbnailWrapper .is-active .splide__progress__bar) {
		background: rgba(255, 221, 85, 0.8);
		opacity: 0.8;
	}

	.main-banner :global(.splide__pagination__page) {
		width: 8px !important;
		height: 8px !important;
		background: #fdeb564d !important;
		border-radius: 50% !important;
		transition: 0.3s;
		margin: 2px;
	}

	.main-banner :global(.splide__pagination__page.is-active) {
		width: 24px !important;
		height: 8px !important;
		background: #fdeb56 !important;
		border-radius: 100px !important;
		transform: scale(1);
	}

	@media screen and (max-width: 992px) {
		:global(.landingThumbnailWrapper .splide:nth-child(1)) {
			width: 100%;
			height: fit-content;
		}
		:global(.landingThumbnailWrapper .splide:nth-child(2)) {
			width: 100%;
			height: fit-content;
			padding-top: 1rem;
			position: unset;
			padding-bottom: 1rem;
		}
		:global(.landingThumbnailWrapper .splide:nth-child(2) .splide__slide) {
			height: fit-content !important;
		}
	}
	@media screen and (max-width: 768px) {
		:global(.landingThumbnailWrapper .splide:nth-child(1)) {
			height: 200px;
		}
		:global(.landingThumbnailWrapper .splide:nth-child(2)) {
			width: 100%;
			padding-top: 1.5rem;
		}
		:global(.landingThumbnailWrapper .splide:nth-child(2) .splide__slide) {
			height: fit-content !important;
		}
	}

	.bg-gradient-900 {
		background-image: linear-gradient(90deg, rgb(20 7 24 / 51%) 28.13%, rgba(20, 7, 24, 0) 100%);
	}

	.bg-gradient-900:lang(ar) {
		background-image: linear-gradient(270deg, rgb(20 7 24 / 51%) 28.13%, rgba(20, 7, 24, 0) 100%);
	}

	.main-banner :global(.splide__pagination__page) {
		width: 6px !important;
		height: 6px !important;
		background: #fdeb564d !important;
		border-radius: 50% !important;
		transition: 0.3s;
		margin: 2px;
	}

	.main-banner :global(.splide__pagination__page.is-active) {
		width: 18px !important;
		height: 6px !important;
		background: #fdeb56 !important;
		border-radius: 100px !important;
		transform: scale(1);
	}
</style>
