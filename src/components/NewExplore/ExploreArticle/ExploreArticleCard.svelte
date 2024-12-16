<script>
	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import calendar from '$lib/assets/calendar.svg';
	import calendarYellow from '$lib/assets/calendar-download-yellow.svg';
	import dollarCircle from '$lib/assets/dollar-circle.svg';
	import Squad from '$lib/assets/3 User.svg';
	import Location from '$lib/assets/location-06.svg';
	import Warehouse from '$lib/assets/warehouse.svg';
	import platformsIcon from '$lib/assets/platforms-icon.svg';
	import networkIcon from '$lib/assets/games-network-icon.svg';
	import TutorialVideo from '$lib/assets/tutorial-video.svg';
	import TutorialTime from '$lib/assets/tutorial-time.svg';
	import Yalgamers from '$lib/assets/tutorial-yalgamers.svg';
	import Alpha from '$components/GameStatus/Alpha.svelte';
	import Beta from '$components/GameStatus/Beta.svelte';
	import Playable from '$components/GameStatus/Playable.svelte';
	import InDev from '$components/GameStatus/InDev.svelte';
	import { goto } from '$app/navigation';

	export let article;

	$: courseImageUrl = getImageUrl('games', article.id, article.card_image) + '?thumb=0x400';
</script>

<button
	on:click={goto(`/games/${article.unique_title}`)}
	class="h-[301.742px] lg:h-[417px] w-[190px] lg:w-[256px] duration-300 rounded-[9px] p-[1px] relative overflow-hidden cardBG group hover:scale-110 selected-element block"
>
	<div
		class="flex items-start gap-[18px] w-full h-full bg-[#200B26] p-[4px] rounded-[8px] overflow-hidden articleCard"
	>
		<div class="relative overflow-hidden rounded-[4px] pb-[30px]">
			<img
				src={courseImageUrl}
				alt=""
				class="w-[182.578px] lg:w-[255.609px] h-[267.731px] lg:h-[374.816px] rounded-[4px] object-cover"
				loading="lazy"
			/>
			<div
				class="flex flex-row-reverse items-center justify-between w-full absolute top-0 left-0 p-[2px] lg:p-[5px] z-40"
			>
				<a href="games?Status={article.status}">
					{#if article.status === 'Alpha'}
						<Alpha />
					{:else if article.status === 'Beta'}
						<Beta />
					{:else if article.status === 'Playable'}
						<Playable />
					{:else}
						<!-- Default to InDev if no status matches -->
						<InDev />
					{/if}
				</a>
				<div class="px-[6px] py-[2px] rounded-[100px] border-1 border-[#8EC9ED33] bg-[#1C272D]">
					<p class="text-[#8EC9ED] text-[11px] lg:text-[12px] font-Gilroy-Medium">{$t('New')}!</p>
				</div>
			</div>

			<div
				class="absolute w-[190px] lg:w-[256px] h-[285.714px] lg:h-[140px] lg:group-hover:h-[400px] duration-300 bottom-0 left-0 gradient-bg z-10"
			/>
			<div
				class="flex flex-col items-start justify-end gap-[14.844px] lg:gap-[20.781px] absolute w-[180px] lg:w-[232px] h-[225.6px] p-[7px] lg:p-[12px] duration-300 bottom-0 lg:bottom-[-132px] lg:group-hover:bottom-0 left-0 z-30"
			>
				<div class="flex flex-col items-start gap-[1.484px] lg:gap-[2.078px]">
					<p class="text-white text-[16px] lg:text-[22.859px] font-Gilroy-Bold">
						{$locale === 'en' ? article.title_en : article.title}
					</p>
					<p class="text-[#FFFFFF66] text-[11px] lg:text-[12.469px] font-Gilroy-Medium">
						{$t('Multiplayer')}, {$t('Strategy')}
					</p>
				</div>
				<div
					class="flex flex-col items-start gap-[14.844px] lg:gap-[20.781px] lg:opacity-0 lg:group-hover:opacity-100"
				>
					<div class="flex flex-col items-start gap-[5.938px] lg:gap-[8.313px]">
						<div class="flex items-center gap-[2.969px] lg:gap-[4.1px]">
							<img loading="lazy" src={platformsIcon} alt="" class="w-[14px] lg:w-[14.547px]" />
							<p class="text-[#FFFFFF80] text-[11px] lg:text-[12.469px] font-Gilroy-Medium">
								{$t('availablePlatforms')}
							</p>
						</div>
						<div class="flex items-center gap-[10.391px] lg:gap-[14.547px]">
							{#each article.expand.platforms as platform}
								<div class="icon">
									<img
										class="icon_default w-[18px] lg:w-[18.703px]"
										loading="lazy"
										src={getImageUrl(platform.collectionId, platform.id, platform.icon)}
										alt=""
									/>
								</div>
							{/each}
						</div>
					</div>

					<div class="flex flex-col items-start gap-[5.938px] lg:gap-[8.313px]">
						<div class="flex items-center gap-[2.969px] lg:gap-[4.1px]">
							<img loading="lazy" src={networkIcon} alt="" class="w-[14px] lg:w-[14.547px]" />
							<p class="text-[#FFFFFF80] text-[11px] lg:text-[12.469px] font-Gilroy-Medium">
								{$t('networkStatus')}
							</p>
						</div>
						<div class="flex items-center gap-[10.391px] lg:gap-[14.547px]">
							{#each article.expand.network as network}
								<div class="icon">
									<img
										title={network.network}
										class="w-[18px] lg:w-[18.703px]"
										loading="lazy"
										src={getImageUrl(network.collectionId, network.id, network.img)}
										alt=""
									/>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</button>

<style>
	.gradient-bg {
		background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
	}

	.group:hover .gradient-bg {
		background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
	}

	.cardBG::after {
		width: 268px;
		height: 403px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 9px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.cardBG:hover::after {
		display: none;
	}

	.cardBG:hover {
		box-shadow: 0px 0px 25px 4px rgba(253, 235, 86, 0.15);
	}

	.cardBG:hover::before {
		width: 50%;
		height: 300%;
		top: 50%;
		left: 50%;
		transform: 0;
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 0x;
		transition: 0.1s ease-in;
		background: linear-gradient(90deg, transparent, #fdeb56, transparent);
		animation: rotate 4s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	:global(.selected-element:hover ~ .selected-element) {
		transform: scale(0.5);
		transition: transform 0.3s ease;
	}

	.articleCard :global(.status-container) {
		margin: 0;
	}

	@media (max-width: 1024px) {
		.gradient-bg {
			background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
		}

		.selected-element {
			transform: scale(1) !important;
		}
	}
</style>
