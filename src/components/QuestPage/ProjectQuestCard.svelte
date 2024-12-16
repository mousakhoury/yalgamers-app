<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onMount, onDestroy } from 'svelte';
	import CardXP from '$lib/assets/main-quest/proj_card_xp.svg';
	import CardNft from '$lib/assets/main-quest/card-nft.svg';
	import CardPrize from '$lib/assets/main-quest/card-prize.svg';
	import CardTicket from '$lib/assets/main-quest/proj_card_ticket.svg';
	import TimeCircle from '$lib/assets/main-quest/Time Circle.svg';
	import { getImageUrl } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	export let project;
	export let isSlider = false;

	let status = {};
	let countdown = '';
	let totalQuests = 0;
	let completedQuests = 0;
	let isSmallScreen = false; // Variable to check if the screen width is 640px or lower

	if (project.isActive) {
		status = { text: $t('Active'), color: '#1FD031', bg: '#031405b3' };
	} else if (project.isEnded) {
		status = { text: $t('Ended'), color: '#F71756', bg: '#140303b3' };
	}

	function updateCountdown() {
		const now = new Date();
		const endTime = new Date(project.deadline);
		const timeDifference = endTime - now;

		if (timeDifference > 0) {
			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			if (days > 0) {
				countdown = `${days}d ${hours}h`;
			} else if (hours > 0) {
				countdown = `${hours}h ${minutes}m`;
			} else {
				countdown = `${minutes}m ${seconds}s`;
			}
		} else {
			countdown = $t('Ended');
		}
	}

	function calculateQuests() {
		totalQuests = project.quests.length;
		completedQuests = project.quests.filter((quest) => quest.isCompleted).length;
	}

	function isScreenWidth640OrLower() {
		return window.innerWidth <= 640;
	}

	function handleResize() {
		isSmallScreen = isScreenWidth640OrLower();
	}

	onMount(() => {
		updateCountdown();
		calculateQuests();
		handleResize(); // Check initial screen width
		const interval = setInterval(updateCountdown, 1000);
		window.addEventListener('resize', handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', handleResize);
		};
	});

	function card_click() {
		if (!project.disabled) {
			goto(`/quests/${project.id}`);
		} else {
			errorToast("You're not reffered by this influncer");
		}
	}

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}
</script>

<button
	on:click={card_click}
	class={`project-card ${project.isFeatured && !isSmallScreen ? 'featured-card' : ''} ${
		isSlider ? 'slider-style' : ''
	}`}
>
	<img
		src={getImageUrl(project.collectionId, project.id, project.image)}
		alt=""
		class={`w-full object-cover rounded-[9px] card-image ${
			project.isFeatured && !isSmallScreen ? 'aspect-[664/417]' : 'aspect-[313/417]'
		}`}
	/>
	<div class="w-full h-full absolute top-0 left-0 flex flex-col justify-between items-start">
		<div class="flex items-center justify-between w-full p-[12px]">
			<div class="flex items-center gap-[12px]">
				<div
					class="pt-[3px] pb-[5px] rounded-[100px] {$locale === 'ar'
						? 'pl-[12px] pr-[25px]'
						: 'pr-[12px] pl-[25px]'}"
					style="color: {status.color}; background-color: {status.bg};"
				>
					<ul class="list-disc">
						<li class="text-[14px] font-semibold leading-[17px]">{status.text}</li>
					</ul>
				</div>

				{#if project.isFeatured}
					<div
						class="featured-badge pt-[3px] pb-[5px] rounded-[100px] text-[#8EC9ED] border border-[#8EC9ED] bg-[#13232eb3] {$locale ===
						'ar'
							? 'pl-[12px] pr-[25px]'
							: 'pr-[12px] pl-[25px]'}"
					>
						<ul class="list-disc">
							<li class="text-[14px] font-semibold leading-[17px]">{$t('Featured')}</li>
						</ul>
					</div>
				{/if}
			</div>

			<div class="flex items-center gap-[8px] p-[3px]">
				{#if project.showXpIcon}
					<img src={CardXP} alt="" class="w-[24px]" />
				{/if}
				{#if project.showNftIcon}
					<img src={CardNft} alt="" class="w-[24px]" />
				{/if}
				{#if project.showMoneyIcon}
					<img src={CardPrize} alt="" class="w-[24px]" />
				{/if}
				{#if project.showTicketIcon}
					<img src={CardTicket} alt="" class="w-[24px]" />
				{/if}
			</div>
		</div>
		<div
			class={`flex flex-col items-start justify-end gap-[16px] px-[3px] pb-[3px] w-full bg-linear-gradient ${
				project.isFeatured && !isSmallScreen ? 'aspect-[674/270]' : 'aspect-[323/270]'
			}`}
		>
			<div class="flex flex-col items-start gap-[12px] px-[9px] w-full">
				{#if !project.isEnded}
					<div
						class="flex items-center gap-[4px] p-[2px] rounded-[100px] bg-[#4a71894d] {$locale ===
						'ar'
							? 'pl-[10px]'
							: 'pr-[10px]'}"
					>
						<img src={TimeCircle} alt="" class="w-[20px]" />
						<p class="text-[#8EC9ED] text-[14px] font-Gilroy-Medium">
							{$t('Ending in')}
							{countdown}
						</p>
					</div>
				{/if}
				<div class="flex flex-col items-start gap-[6px]">
					<p
						class={`text-[#E9E6EA] font-Gilroy-Bold   ${
							project.isFeatured && !isSmallScreen
								? 'text-[28px] leading-[35px]'
								: 'text-[20px] leading-[25px]'
						}`}
					>
						{project.title}
					</p>
					<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium leading-[17px] max-w-[230px]">
						{project.subText}
					</p>
				</div>
			</div>
			<div
				class="flex flex-col items-start gap-[10px] w-full p-[10px] pt-[14px] rounded-[6px] bg-[#2B1832]"
			>
				<div class="flex items-center justify-center gap-[6px] w-full">
					{#each project.quests as quest}
						<div
							class={`w-full h-[6px] rounded-[100px] ${
								quest.isCompleted ? 'bg-[#BC5AD7]' : 'bg-[#533E59]'
							} `}
						/>
					{/each}
				</div>

				<div class="flex items-center justify-between w-full">
					<p class="text-[#BEB6C0] text-[14px] font-Gilroy-SemiBold">{$t('Quests')}</p>
					<p class="text-[#D4CFD6] text-[14px] font-Gilroy-SemiBold">
						{completedQuests}/<span class="text-[#A99FAC]">{totalQuests}</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</button>

<style>
	.project-card {
		display: block;
		width: 100%;
		aspect-ratio: 323/428;
		/* max-width: 323px; */
		border-radius: 13px;
		background: var(--Accent-2, #200b26);
		position: relative;
		transition: 0.3s;
		bottom: 0;
		border: 4px solid #200b26;
	}

	.project-card.slider-style {
		width: 323px;
	}

	.featured-card {
		grid-column: span 2;
		aspect-ratio: 674/428;
		/* max-width: 674px; */
	}
	.featured-card.slider-style {
		width: 674px;
	}

	.project-card:hover {
		bottom: 13px;
	}

	.project-card::after {
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 14px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, #635467 0%, rgba(255, 255, 255, 0) 100%);
	}

	.featured-card::after {
		background: linear-gradient(180deg, #8dc8ec 0%, rgba(255, 255, 255, 0) 100%);
	}

	.project-card:hover::after {
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		background: linear-gradient(180deg, rgba(253, 235, 86, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
		/* box-shadow: 0 -6px 14px -9px rgba(253, 235, 86, 0.6); */
	}

	.project-card:hover::before {
		content: '';
		width: calc(100% + 14px);
		height: calc(100% + 14px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		filter: blur(3px);
		padding: 20px;
		border-radius: 8px;
		/* Adjust the alpha values in the RGBA colors to control opacity */
		background: linear-gradient(to top, rgba(255, 126, 0, 0), rgba(254, 180, 123, 0.8));
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		z-index: -1;
	}

	.bg-linear-gradient {
		background: linear-gradient(
			180deg,
			rgba(32, 11, 38, 0) 0%,
			rgba(32, 11, 38, 0.29) 16.19%,
			rgba(32, 11, 38, 0.66) 27.45%,
			rgba(32, 11, 38, 0.9) 45%,
			rgba(32, 11, 38, 0.95) 80.5%
		);
	}

	@media (max-width: 1024px) {
		.project-card.slider-style {
			width: unset;
		}

		.project-card {
			aspect-ratio: 323/428;
		}

		.card-image {
			aspect-ratio: 313/417;
		}
	}
</style>
