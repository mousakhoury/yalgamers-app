<script lang="ts">
	import { t, locale } from '$lib/stores/i18n';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	import '@splidejs/svelte-splide/css';

	import '@splidejs/svelte-splide/css/core';
	import { onMount } from 'svelte';
	import Button from '$components/Button.svelte';

	import ios from '$lib/assets/ios.svg';
	import apple from '$lib/assets/apple.svg';
	import windows from '$lib/assets/windows.svg';
	import android from '$lib/assets/android.svg';
	import web from '$lib/assets/internet-white.svg';
	import offline from '$lib/assets/offline.svg';
	import online from '$lib/assets/online.svg';

	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IoIosArrowRoundForward from 'svelte-icons/io/IoIosArrowRoundForward.svelte';

	let main: Splide;
	let thumbs: SplideSlide;

	export let genreList;
	let intervalTiming = 50000000000000000;
	const mainOptions = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		gap: '1rem',
		direction: $locale === 'ar' ? 'rtl' : 'ltr',
		pagination: false,
		breakpoints: {
			992: {
				height: 'auto'
			},
			768: {
				height: 'auto'
			},
			640: {
				height: 'auto'
			}
		},
		arrows: true,
		pauseOnFocus: false,
		pauseOnHover: false
	};

	const thumbsOptions = {
		type: 'slide',
		rewind: true,
		autoplay: true,
		interval: intervalTiming,
		gap: '30px',
		pagination: false,
		// fixedWidth: 'min(350px,100%)',
		// fixedHeight: '160px',
		perPage: 2,
		perMove: 1,
		cover: true,
		focus: 'left',
		isNavigation: true,
		updateOnMove: true,
		pauseOnFocus: false,
		resetProgress: false,
		pauseOnHover: false,
		direction: $locale === 'ar' ? 'rtl' : 'ltr',

		arrows: false
		// direction: 'ttb',
		// breakpoints: {
		// 	992: {
		// 		fixedWidth: 'min(300px,100%)'
		// 	},
		// 	768: {
		// 		fixedWidth: 'min(200px,100%)',
		// 		pauseOnHover: false
		// 	},
		// 	640: {
		// 		direction: 'ltr'
		// 	}
		// },
		// height: 'auto'
	};

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});
	let progressBar;
	$: innerWidth = 0;

	let images = {
		ios: ios,
		web: web,
		apple: apple,
		windows: windows,
		android: android,
		offline: offline,
		online: online
	};
</script>

<svelte:window bind:innerWidth />

{#if !browser}
	<div
		class="flex flex-col w-full overflow-hidden genres animate-pulse justify-evenly sm:flex-row"
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
	>
		<Splide
			options={mainOptions}
			bind:this={main}
			aria-labelledby="thumbnails-example-heading"
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		>
			<SplideSlide>
				<div
					class="lg:pl-10 order-2 sm:order:1 h:[40%] sm:h-full bg-gradient-90 overflow-hidden w-full flex sm:justify-center items-start flex-col pl-1 px-0 sm:px-1 lg:px-10"
				>
					<div class="mt-5 lg:mt-0 min-w-[270px] min-[490px]:min-w-[170px]">
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="w-8 h-5 mb-1 bg-white-10 rounded-md lg:mb-5"
						/>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="h-5 bg-white-10 rounded-md w-72 md:mt-5"
						/>
					</div>
					<div
						class="w-full flex gap-x-[60px] gap-y-[20px] min-[490px]:gap-x-[30px] items-center mt-5 flex-wrap min-w-[270px] min-[490px]:min-w-[170px]"
					>
						<div>
							<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="w-20 h-5 bg-white-10 rounded-md" />
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="w-20 h-5 mt-1 bg-white-10 rounded-md"
							/>
						</div>
						<div class="min-w-[270px] min-[490px]:min-w-[170px]">
							<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="h-5 bg-white-10 rounded-md w-18" />
							<div class="flex mt-1 gap-2">
								{#each [1, 2, 3] as network}
									<div class="w-[25px] h-[25px] bg-white-10 rounded-md" />
								{/each}
							</div>
						</div>
						<div class="min-w-[270px] min-[490px]:min-w-[170px]">
							<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="h-5 bg-white-10 rounded-md w-18" />
							<div class="flex mt-1 gap-2">
								{#each [1, 2, 3] as network}
									<div class="w-[25px] h-[25px] bg-white-10 rounded-md" />
								{/each}
							</div>
						</div>
					</div>
					<div class="hidden w-32 h-10 mt-5 sm:mt-5 sm:flex bg-white-10 rounded-md" />
				</div>
				<div
					class="w-full h-full bg-white-10 sliderImg order-1 sm:order-2 h-[60%] rounded-[7px] lg:max-w-[576px]"
				/>
			</SplideSlide>
		</Splide>

		<Splide options={thumbsOptions} bind:this={thumbs}>
			<SplideSlide>
				<div class="w-[325px] rounded-lg h-[200px] object-contain bg-white-10" />
				<div
					class="absolute flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-180"
				>
					<div class="">
						<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="w-32 h-5 bg-white-10 rounded-md" />
					</div>
				</div>
			</SplideSlide>
		</Splide>
	</div>
{:else}
	<div
		class="flex flex-col w-full gap-[30px] overflow-hidden genres items-center justify-evenly sm:flex-row"
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
	>
		<Splide
			options={mainOptions}
			bind:this={main}
			aria-labelledby="thumbnails-example-heading"
			on:arrowsMounted={(e) => {
				e.detail.next.innerHTML = `<svg width="24" height="24"   style="transform:rotate(180deg)"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Iconly/Light/Arrow - Left"><g id="Arrow - Left"><path id="Stroke 1" d="M4.25 12.2744L19.25 12.2744" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path id="Stroke 3" d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg>`;
				e.detail.prev.innerHTML = `<svg width="24" height="24" style="transform:rotate(180deg)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Iconly/Light/Arrow - Right"><g id="Arrow - Right"><path id="Stroke 1" d="M19.75 11.7257L4.75 11.7257" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path id="Stroke 3" d="M13.7002 5.70131L19.7502 11.7253L13.7002 17.7503" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g></g></svg>`;
			}}
			class="order-1 overflow-x-hidden"
			dir="ltr"
		>
			{#each genreList as genres}
				<SplideSlide dir={$locale == 'ar' ? 'rtl' : 'ltr'}>
					<div
						class="slide-container"
						style={`background-image: url(${genres.src + '?thumb=0x400'});`}
					>
						<div class="slide-other-container">
							<img
								loading="lazy"
								class="sliderImg order-1 sm:order-2 !aspect-[340/453.33] !h-[453.33px] rounded-0 max-w-[340px]"
								src={genres.src + '?thumb=0x400'}
								alt={'Alt'}
							/>
							<div
								class="order-2 sm:order:1 h:[40%] sm:h-full overflow-hidden w-full flex sm:justify-center items-start flex-col pl-1 px-0 sm:px-1 {$locale ==
								'ar'
									? 'lg:pl-[10.5rem] lg:px-[4.5rem]'
									: 'lg:pl-[4.5rem] lg:px-[4.5rem]'}"
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							>
								<div
									class="mt-5 lg:mt-0 min-w-[270px] min-[490px]:min-w-[170px]"
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								>
									<p
										class="text-lg not-italic font-normal leading-normal text-white w-fit font-Gilroy-Bold gradient lg:mb-5"
									>
										{$t(`${genres.genre}`)}
									</p>
									<p
										class="w-fit font-normal font-Gilroy-Medium not-italic leading-[20px] lg:leading-[30px] text-base sm:text-[16px] lg:text-[20px] xl:text-[26px] md:mt-5 text-white-70 font-Gilroy-Bold"
									>
										{genres.title}
										<!--{$t(`${genres.title}`)}-->
									</p>
								</div>
								<div
									class="w-full flex gap-x-[60px] gap-y-[20px] min-[490px]:gap-x-[30px] items-center mt-5 flex-wrap min-w-[270px] min-[490px]:min-w-[170px]"
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
											{genres.gamesCount}
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
											{#each genres.platforms as platform}
												<img loading="lazy" src={images[platform]} alt={platform} />
											{/each}
										</div>
									</div>
									<!-- <div class="min-w-[270px] min-[490px]:min-w-[170px]">
										<p class="w-fit text-white-40 text-[14px] lg:text-[18px]">
											{$t('networkStatus')}
										</p>
										<div class="flex mt-1 gap-2">
											{#each genres.networks as network}
												<img loading="lazy" src={images[network]} alt={network} />
											{/each}
										</div>
									</div> -->
								</div>
								<div class="hidden mt-5 sm:mt-5 sm:flex">
									<Button
										on:click={() => {
											goto(`${$page.url.pathname}/genres/${genres.genre}`);
										}}
										type="gradient"
										class="text-base not-italic font-normal text-black font-Gilroy-Semibold"
									>
										{$t('View All Games')}
										<div class="w-[30px] {$locale == 'ar' ? 'rotate-180' : ''}">
											<IoIosArrowRoundForward />
										</div>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>

		<Splide options={thumbsOptions} bind:this={thumbs} class="order-2 hidden lg:block the-thumb">
			{#each genreList as genres}
				<SplideSlide class="rounded-[8px]">
					<img loading="lazy" src={genres.src} alt={'Alt'} class="object-contain w-full h-full" />
					<div
						class="absolute flex flex-col items-center justify-center w-full h-full overflow-hidden bg-gradient-990"
					>
						<div class="">
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-white font-normal font-Gilroy-Bold not-italic text-[28px] sm:text-lg leading-normal"
							>
								{$t(`${genres.genre}`)}
							</p>
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
{/if}

<style>
	:global(.genres .splide .splide__track) {
		margin: 0 !important;
		border-radius: 0px !important;
	}
	:global(.the-thumb .splide__slide.is-active) {
		display: none !important;
	}
	:global(.splide__arrow) {
		width: 30px !important;
		height: 30px !important;
		display: flex;
		align-items: center;
		justify-content: center;
		display: none !important;
	}
	:global(.splide__arrow svg) {
		fill: transparent !important;
	}
	:global(.gradient) {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	:global(.genres .splide:nth-child(1)) {
		padding: 0rem 0;
		height: 485px !important;
		width: 69.57% !important;
	}

	:global(.genres .splide:nth-child(2)) {
		padding: 0;
		visibility: visible;
		width: 28.26% !important;
		overflow: hidden;
		height: 415px !important;
		margin-top: 71px !important;
	}
	:global(.genres .splide .splide__track) {
		height: 100%;
		margin: 0 1rem;
		border-radius: 14px;
	}

	:global(.genres .splide:nth-child(1) .splide__slide) {
		width: 100%;
		height: 100%;
		align-items: flex-end;
	}

	:global(.genres .splide__progress) {
		position: absolute;
		height: 100px;
	}
	:global(.genres .splide .sliderImg) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: translate(30px, -46px);
		border-radius: 6px;
		border: 2px solid #ffffff3b;
	}
	:global(.genres .splide .sliderImg:lang(ar)) {
		transform: translate(-30px, -46px);
	}
	:global(.genres .splide__slide) {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		visibility: visible;
		border-radius: 8px !important;
		border: none !important;
		overflow: hidden !important;
	}
	:global(.genres .splide:nth-child(2) .is-active .bg-gradient-90) {
		background-image: none;
	}

	.bg-gradient-990 {
		border-radius: 8px;
		border: 2px solid #ffffff3b;
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
	:global(.genres .splide__progress__bar) {
		background: transparent;
		height: 100%;
	}
	:global(.genres .is-active .splide__progress__bar) {
		background: #d4cfd6;
		opacity: 0.8;
	}

	.slide-container {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border-radius: 9px;
		height: 415px;
	}

	.slide-other-container {
		background: linear-gradient(270deg, rgba(22, 7, 26, 0.9) 50.68%, rgba(32, 11, 38, 0.5) 100%);
		display: flex;
		align-items: center;
		border-radius: 8px;
		border: 2px solid #ffffff3b;
		height: 415px;
	}

	@media screen and (max-width: 1024px) {
		:global(.genres .splide:nth-child(1)) {
			width: 100% !important;
			height: fit-content;
			height: auto !important;
		}

		.slide-container {
			height: auto;
			background: unset !important;
		}

		.slide-other-container {
			height: auto;
			flex-direction: column;
			padding: 10px;
		}

		:global(.genres .splide .sliderImg) {
			transform: translate(0, 0);
		}
		:global(.genres .splide .sliderImg:lang(ar)) {
			transform: translate(0, 0);
		}

		:global(.genres .splide:nth-child(2)) {
			display: none;
		}
	}
	@media screen and (max-width: 768px) {
		:global(.genres .splide:nth-child(1) .splide__slide) {
			flex-direction: column;
			height: 460px;
			padding: 10px;
			justify-content: start;
			--tw-bg-opacity: 1;
			background-color: rgb(20 7 24 / var(--tw-bg-opacity));
		}
		:global(.genres .splide:nth-child(1) .sliderImg) {
			height: auto !important;
			order: 1;
		}
		:global(.genres .splide .splide__track) {
			padding: 5px;
			margin: 0;
		}
		:global(.genres .splide__arrow) {
			top: 27% !important;
		}
	}

	@media screen and (max-width: 640px) {
		:global(.genres .splide:nth-child(1) .splide__slide) {
			flex-direction: column;
			height: 100%;
			padding: 10px;
			justify-content: start;
			--tw-bg-opacity: 1;
			background-color: rgb(20 7 24 / var(--tw-bg-opacity));
		}
		:global(.genres .splide:nth-child(1) .sliderImg) {
			height: 200px;
		}
		:global(.genres .splide .splide__track) {
			padding: 5px;
			margin: 0;
		}
		:global(.genres .splide__arrow) {
			top: 27% !important;
		}
	}
	@media screen and (max-width: 490px) {
		:global(.genres .splide__arrow) {
			top: 25% !important;
		}
	}
</style>
