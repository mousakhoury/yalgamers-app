<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { t, locale } from '$lib/stores/i18n';
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	import '@splidejs/svelte-splide/css';
	import '@splidejs/svelte-splide/css/skyblue';
	import '@splidejs/svelte-splide/css/sea-green';
	import '@splidejs/svelte-splide/css/core';

	import ios from '$lib/assets/ios.svg';
	import apple from '$lib/assets/apple.svg';
	import windows from '$lib/assets/windows.svg';
	import android from '$lib/assets/android.svg';
	import web from '$lib/assets/internet-white.svg';
	import offline from '$lib/assets/offline.svg';
	import online from '$lib/assets/online.svg';
	import Button from '$components/Button.svelte';
	import { getImageUrl } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let genreList;

	let intervalTiming = 500000000000000;
	let mainOptions = {
		type: 'loop',
		height: '320px',
		pagination: false,
		gap: '30px',
		arrows: true,
		direction: $locale === 'ar' ? 'rtl' : 'ltr',
		breakpoints: {
			1023: {
				height: '100%'
			}
		}
	};

	let thumbOptions = {
		type: 'loop',
		rewind: true,
		autoplay: true,
		interval: intervalTiming,
		heightRatio: 125 / 180,
		perPage: 7,
		perMove: 1,
		height: '100%',
		updateOnMove: true,
		isNavigation: true,
		gap: '20px',
		focus: 'center',
		pagination: false,
		arrows: true,
		cover: true,
		direction: $locale === 'ar' ? 'rtl' : 'ltr',
		breakpoints: {
			1200: {
				perPage: 5
			},
			960: {
				perPage: 3,
				gap: '10px'
			}
		}
	};

	let main;
	let thumbs;

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});

	let images = {
		ios: ios,
		web: web,
		apple: apple,
		windows: windows,
		android: android,
		offline: offline,
		online: online
	};

	let container; // This will hold the reference to your element
	let heightOfDiv = '360px'; // This will store the height of the element

	onMount(() => {
		// Create a new ResizeObserver that will call the callback function whenever the size of the observed element changes
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { height } = entry.contentRect;
				if (window.innerWidth < 1024) {
					heightOfDiv = `${height + 43}px`;
				} else if (window.innerWidth < 364) {
					heightOfDiv = `${height}px`;
				} else {
					heightOfDiv = '360px';
				}
			}
		});

		// Start observing the container element
		if (container) {
			resizeObserver.observe(container);
		}

		// Cleanup the observer when the component is unmounted
		return () => {
			resizeObserver.disconnect();
		};
	});

	function handleViewAllGames(genreName) {
		goto(`/games?Genres=${genreName}`);
	}
</script>

<div class="gamesSwiperContainer">
	<div class="gamesSwiper">
		<Splide bind:this={main} options={mainOptions}>
			{#each genreList as genre}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('genres', genre.id, genre.background_image) + '?thumb=0x400'}
						alt=""
						class="object-cover h-full lg:!h-[320px] w-full rounded-[6px]"
						style="height: {heightOfDiv};"
					/>
					<div
						bind:this={container}
						class="absolute bottom-0 left-0 w-full h-full background-999 calculated-height"
					>
						<img
							loading="lazy"
							src={getImageUrl('genres', genre.id, genre.main_image) + '?thumb=0x400'}
							class="slider-top-image"
							alt=""
						/>
						<div
							class="order-2 sm:order:1 max-w-[515px] h-fit lg:h-full overflow-hidden w-full flex justify-start lg:justify-center items-start flex-col"
						>
							<div
								class="mt-5 lg:mt-0 min-w-[270px] min-[490px]:min-w-[170px]"
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							>
								<p
									class="text-lg not-italic font-normal leading-normal text-white w-fit font-Gilroy-Bold gradient lg:mb-5"
								>
									{$locale == 'ar' ? genre.name_ar : genre.name_en}
								</p>
								<p
									class="w-fit font-normal font-Gilroy-Medium not-italic leading-[20px] lg:leading-[30px] text-base sm:text-[14px] lg:text-[16px] xl:text-[16px] md:mt-5 text-white-70 font-Gilroy-Bold"
								>
									{$locale == 'ar' ? genre.description_ar : genre.description_en}
								</p>
							</div>
							<div
								class="w-full flex flex-col sm:flex-row gap-x-[60px] gap-y-[20px] min-[490px]:gap-x-[30px] items-start mt-5 flex-wrap min-w-[270px] min-[490px]:min-w-[170px]"
							>
								<div>
									<p
										dir={$locale == 'ar' ? 'rtl' : 'ltr'}
										class=" text-white-40 text-[14px] lg:text-[18px]"
									>
										{$t('totalGames')}
									</p>
									<p
										dir={$locale == 'ar' ? 'rtl' : 'ltr'}
										class="text-white-80 text-[16px] lg:text-[20px] mt-1 font-Gilroy-Bold"
									>
										{genre?.game_count}
										{$t('games')}
									</p>
								</div>
								<div>
									<p
										dir={$locale == 'ar' ? 'rtl' : 'ltr'}
										class=" text-white-40 text-[14px] lg:text-[18px]"
									>
										{$t('availablePlatforms')}
									</p>
									<div class="flex mt-1 gap-2">
										<!-- {JSON.stringify(genre.platforms[0])} -->
										{#each genre.platforms as platform}
											<div class="icon">
												<img
													class="icon_default h-[18px] w-[19px]"
													loading="lazy"
													src={getImageUrl(platform.CollectionId, platform.id, platform.icon)}
													alt={platform}
												/>
												<img
													class="icon_hover h-[18px] w-[19px]"
													loading="lazy"
													src={getImageUrl(platform.CollectionId, platform.id, platform.icon_hover)}
													alt={platform}
												/>
											</div>
										{/each}
									</div>
								</div>
								<!-- <div class="min-w-[270px] min-[490px]:min-w-[170px]">
                                        <p class="w-fit text-white-40 text-[14px] lg:text-[18px]">
                                            {$t('networkStatus')}
                                        </p>
                                        <div class="flex mt-1 gap-2">
                                            {#each genre.networks as network}
                                                <img loading="lazy" src={images[network]} alt={network} />
                                            {/each}
                                        </div>
                                    </div> -->
							</div>
							<Button
								type="gradient"
								class="mt-[25px] text-base not-italic font-normal text-black font-Gilroy-Semibold"
								on:click={() => handleViewAllGames(genre.name_en)}
							>
								{$t('View All Games')}
							</Button>
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>

	<div class="gamesSwiperThumb">
		<Splide bind:this={thumbs} options={thumbOptions}>
			{#each genreList as genre}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('genres', genre.id, genre.main_image)}
						alt=""
						class="object-cover aspect-[180/415] w-full"
					/>
					<div
						class="absolute flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-990"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-white text-center font-normal font-Gilroy-Bold not-italic text-[10px] md:text-[18px] sm:text-lg leading-normal"
						>
							{$locale == 'ar' ? genre.name_ar : genre.name_en}
						</p>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</div>

<style>
	.gamesSwiperContainer {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.gamesSwiper {
		overflow-x: hidden;
	}

	.gamesSwiperThumb {
		overflow-x: hidden;
		width: 100%;
	}

	.gamesSwiperThumb :global(.splide__slide) {
		aspect-ratio: 180/125;
		border: 0px solid #ffffff96 !important;
		border-radius: 6px;
	}

	.gamesSwiperThumb :global(.splide__slide.is-active) {
		border: 2px solid rgb(253, 235, 86) !important;
	}

	.gamesSwiper :global(.splide) {
		padding: 65px 0 0;
	}

	.gamesSwiperThumb :global(.splide) {
		padding: 0;
	}

	.bg-gradient-990 {
		background: linear-gradient(
			180deg,
			transparent,
			transparent,
			transparent,
			rgba(32, 11, 38, 0.9)
		);
		height: 100%;
		width: 100%;
		justify-content: flex-end;
		padding-bottom: 12%;
		border-radius: 6px;
	}

	.background-999 {
		background: rgb(22 7 26 / 80%);
		display: flex;
		gap: 60px;
		border: 0px solid #ffffff73;
		border-radius: 6px;
		padding: 0 7%;
	}

	.slider-top-image {
		transform: translate(0, -63px);
		object-fit: cover;
		width: 440px;
		height: 340px;
		border: 1px solid #ffffff73;
		border-radius: 6px;
	}

	.gamesSwiper :global(.splide__arrow) {
		display: block !important;
		width: 40px !important;
		height: 40px !important;
		top: 60%;
	}

	.gamesSwiper :global(.splide__arrow--prev) {
		background-image: url('$lib/assets/group-1171275306.svg');
	}

	.gamesSwiper :global(.splide__arrow--prev:lang(ar)) {
		transform: rotate(180deg);
	}

	.gamesSwiper :global(.splide__arrow--next) {
		background-image: url('$lib/assets/group-1171275364.svg');
	}

	.gamesSwiper :global(.splide__arrow--next:lang(ar)) {
		transform: rotate(180deg);
	}

	.gamesSwiper :global(.splide__arrow svg) {
		display: none !important;
	}

	.icon .icon_hover {
		display: none;
	}

	.icon:hover .icon_hover {
		display: block;
	}

	.icon:hover .icon_default {
		display: none;
	}

	@media (max-width: 1023px) {
		.background-999 {
			flex-direction: column;
			padding: 21px;
			height: fit-content;
			gap: 0px;
		}
		.slider-top-image {
			transform: translate(0, 0);
			width: 100%;
			height: unset;
			aspect-ratio: 440/340;
		}

		.gamesSwiper :global(.splide__arrow) {
			display: none !important;
		}
	}
</style>
