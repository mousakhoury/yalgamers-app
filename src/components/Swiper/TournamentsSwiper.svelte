<script>
	import IoIosArrowRoundForward from 'svelte-icons/io/IoIosArrowRoundForward.svelte';
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
	import prizemoney from '$lib/assets/prizemoney-icon.svg';
	import upcoming from '$lib/assets/upcoming-icon.svg';
	import Ongoing from '$lib/assets/Ongoing.svg';
	import Finished from '$lib/assets/Finished.svg';

	import Button from '$components/Button.svelte';
	import { getImageUrl } from '$lib/utils';

	import squad from '$lib/assets/squad-icon.svg';
	import solo from '$lib/assets/solo-icon.svg';

	export let tournamentList;

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

	$: modes = {
		solo: solo,
		squad: squad
	};

	// Assuming tournamentList is an array of tournaments
	$: deadlineDates = tournamentList.map((tournament) => new Date(tournament.deadline));

	// Function to get deadline status
	function getDeadlineStatus(deadline) {
		const now = new Date();
		const endOfDay = new Date(deadline);
		endOfDay.setHours(23, 59, 59, 999); // Set to the end of the deadline day

		if (now < deadline) {
			return 'upcoming'; // Deadline is in the future
		} else if (now >= deadline && now <= endOfDay) {
			return 'ongoing'; // Deadline is today
		} else {
			return 'finished'; // Deadline has passed
		}
	}

	// Reactive statement to update the status when 'deadline' changes
	$: deadlineStates = deadlineDates.map((date) => getDeadlineStatus(date));
</script>

<div class="gamesSwiperContainer">
	<div class="gamesSwiper">
		<Splide bind:this={main} options={mainOptions}>
			{#each tournamentList as tournament, index}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('tournaments', tournament.id, tournament.image) + '?thumb=0x400'}
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
							src={getImageUrl('tournaments', tournament.id, tournament.image) + '?thumb=0x400'}
							class=" slider-top-image"
							alt=""
						/>
						<div
							class="order-2 sm:order:1 max-w-[515px] h-fit lg:h-full overflow-hidden w-full flex justify-start lg:justify-center items-start flex-col gap-[40px]"
						>
							<div class="flex flex-col items-start gap-[20px]">
								<h6 class="text-[24px] text-[#E9E6EA] font-Gilroy-Bold w-full">
									{$locale === 'en' ? tournament.title_en : tournament.title}
								</h6>
								<div class="flex items-start gap-[8px] md:gap-[30px] flex-wrap">
									<div class="flex flex-col items-start gap-[14px] w-[140px]">
										<p class="text-[14px] text-[#BEB6C0] font-Gilroy-SemiBold">
											{$t('prizeMoney')}:
										</p>
										<div class="flex items-center gap-[8px]">
											<img loading="lazy" src={prizemoney} alt="" />
											<p class="price text-[18px] font-Gilroy-SemiBold">{tournament.price} USD</p>
										</div>
									</div>
									<div class="flex flex-col items-start gap-[14px] w-[140px]">
										<p class="text-[14px] text-[#BEB6C0] font-Gilroy-SemiBold">
											{$t('status')}:
										</p>

										{#if deadlineStates[index] === 'upcoming'}
											<div class="flex items-center gap-[8px]">
												<img loading="lazy" src={upcoming} alt="" />
												<p class=" text-[18px] font-Gilroy-SemiBold text-[#FDEB56]">
													{$t('upcoming')}
												</p>
											</div>
										{:else if deadlineStates[index] === 'ongoing'}
											<div class="flex items-center gap-[8px]">
												<img loading="lazy" src={Ongoing} alt="" />
												<p class=" text-[18px] font-Gilroy-SemiBold text-[#1FD031]">
													{$t('Ongoing')}
												</p>
											</div>
										{:else}
											<div class="flex items-center gap-[8px]">
												<img loading="lazy" src={Finished} alt="" />
												<p class=" text-[18px] font-Gilroy-SemiBold text-[#F71756]">
													{$t('Completed')}
												</p>
											</div>
										{/if}
									</div>
									<div class="flex flex-col items-start gap-[14px] w-[140px]">
										<p class="text-[14px] text-[#BEB6C0] font-Gilroy-SemiBold">
											{$t('game mode')}:
										</p>
										<div class="flex items-center gap-[8px]">
											<img loading="lazy" src={modes[tournament.mode]} alt="" />
											<p class=" text-[18px] font-Gilroy-SemiBold text-[#FDEB56]">
												{$t(tournament.mode)}
											</p>
										</div>
									</div>
								</div>
								<Button
									type="gradient"
									class="mt-[25px] text-base not-italic font-normal text-black font-Gilroy-Semibold"
								>
									{$t('enrollNow')}
									<div class="w-[30px] {$locale == 'ar' ? 'rotate-180' : ''}">
										<IoIosArrowRoundForward />
									</div>
								</Button>
							</div>
						</div>
					</div>
				</SplideSlide>
			{/each}
		</Splide>
	</div>

	<div class="gamesSwiperThumb">
		<Splide bind:this={thumbs} options={thumbOptions}>
			{#each tournamentList as tournament}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('tournaments', tournament.id, tournament.image)}
						alt=""
						class="object-cover aspect-[180/415] w-full"
					/>
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
		background: linear-gradient(270deg, rgb(22 7 26 / 80%) 50.68%, rgba(32, 11, 38, 0.5) 100%);
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
		aspect-ratio: 440/340;
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

	.price {
		background: linear-gradient(99deg, #f71756 59.04%, #fdeb56 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
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
