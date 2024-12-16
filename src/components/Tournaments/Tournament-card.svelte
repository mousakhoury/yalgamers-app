<script>
	import { t, locale } from '$lib/stores/i18n';

	// @ts-nocheck

	export let image;
	export let deadline;
	export let title;
	export let price;
	export let powered;
	export let logo;
	export let id;
	export let mode;
	import calendar from '$lib/assets/calendar.svg';
	import calendarContainer from '$lib/assets/calendar-container.svg';
	import Button from '$components/Button.svelte';
	import arrowRight from '$lib/assets/arrow-right.svg';
	import prizemoney from '$lib/assets/prizemoney-icon.svg';
	import upcoming from '$lib/assets/upcoming-icon.svg';
	import Ongoing from '$lib/assets/Ongoing.svg';
	import Finished from '$lib/assets/Finished.svg';
	import squad from '$lib/assets/squad-icon.svg';
	import solo from '$lib/assets/solo-icon.svg';
	import { slide } from 'svelte/transition';
	import { getImageUrl } from '$lib/utils';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import IoIosArrowRoundForward from 'svelte-icons/io/IoIosArrowRoundForward.svelte';
	import Card from '$components/Card.svelte';
	let enter = false;

	let date = new Date(deadline);
	let processedDeadline = `${date.getDate()} ${date.toLocaleString('en-GB', {
		month: 'short'
	})}, ${date.getFullYear()}`;

	let tournamentUrl;
	$: tournamentUrl = getImageUrl('tournaments', id, image) + '?thumb=0x400';
	$: poweredUrl = getImageUrl('tournaments', id, logo);
	$: innerWidth = 0;
	$: animate = true;
	$: if (innerWidth < 640) {
		animate = false;
		enter = true;
	} else {
		enter = true;
		animate = false;
	}

	$: modes = {
		solo: solo,
		squad: squad
	};

	// Ensure 'deadline' is a Date object
	let deadlineDate = new Date(deadline);

	// Reactive statement to update the status when 'deadline' changes
	$: deadlineState = getDeadlineStatus(deadlineDate);

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
</script>

<svelte:window bind:innerWidth />
<Card image={tournamentUrl}>
	<div class="card-content-container">
		<div class="deadline" dir="ltr">
			<img loading="lazy" src={calendar} alt="" />
			<p>{processedDeadline}</p>
		</div>
		<div class="card-content">
			<h6>{title}</h6>
			<div class="card-info">
				<div class="sub-content">
					<p class="subtitle">{$t('prizeMoney')}:</p>
					<div class="sub-content-info">
						<img loading="lazy" src={prizemoney} alt="" />
						<p class="prize">{price} {$t('usd')}</p>
					</div>
				</div>
				<div class="sub-content">
					<p class="subtitle">{$t('status')}:</p>
					{#if deadlineState === 'upcoming'}
						<div class="sub-content-info">
							<img loading="lazy" src={upcoming} alt="" />
							<p>{$t('upcoming')}</p>
						</div>
					{:else if deadlineState === 'ongoing'}
						<div class="sub-content-info">
							<img loading="lazy" src={Ongoing} alt="" />
							<p class="text-[#1FD031]">{$t('Ongoing')}</p>
						</div>
					{:else}
						<div class="sub-content-info">
							<img loading="lazy" src={Finished} alt="" />
							<p class="text-[#F71756]">{$t('Completed')}</p>
						</div>
					{/if}
				</div>
				<div class="sub-content">
					<p class="subtitle">{$t('game mode')}:</p>
					<div class="sub-content-info">
						<img loading="lazy" src={modes[mode]} alt="" />
						<p>{$t(mode)}</p>
					</div>
				</div>
			</div>
		</div>
		{#if deadlineState === 'finished'}
			<a href="/tournaments/{id}" class="w-full">
				<Button class="w-[100%] button-new-bg btn mb-[6px]" type="transparent" size="lg"
					>{$user ? `${$t('enrollNow')}` : `${$t('learnMore')}`}
					<div class="w-[30px] {$locale == 'ar' ? 'rotate-180' : ''}">
						<IoIosArrowRoundForward />
					</div>
				</Button>
			</a>
		{:else}
			<a href="/tournaments/{id}" class="w-full">
				<Button class="w-[100%] button-new-bg btn mb-[6px]" type="transparent" size="lg"
					>{$user ? `${$t('enrollNow')}` : `${$t('learnMore')}`}
					<div class="w-[30px] {$locale == 'ar' ? 'rotate-180' : ''}">
						<IoIosArrowRoundForward />
					</div>
				</Button>
			</a>
		{/if}
	</div>
</Card>

<style lang="postcss">
	.card-content-container {
		height: calc(100% + 1px);
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		width: calc(100% + 2px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.deadline {
		width: 100%;
		max-width: 170px;
		aspect-ratio: 170/30;
		background-image: url('$lib/assets/calendar-container.svg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}

	.deadline img {
		width: 20px;
	}

	.deadline p {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 10px; /* 71.429% */
	}

	.card-content {
		padding: 0 17px;
		width: calc(100% + 9px);
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
		justify-content: flex-end;
		height: 274px;
		background: linear-gradient(
			180deg,
			rgba(15, 12, 0, 0) 0%,
			rgba(34, 12, 40, 0) 0.01%,
			rgba(34, 12, 40, 0.5) 20.83%,
			rgba(34, 12, 40, 0.95) 41.67%
		);
		padding-bottom: 15px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -59px;
		transition: 0.3s;
		z-index: -1;
	}

	.card-content h6 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.card-info {
		display: flex;
		flex-direction: column;
		gap: 15px;
		visibility: hidden;
		opacity: 0;
	}

	.sub-content {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.subtitle {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.sub-content-info {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.prize {
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: linear-gradient(99deg, #f71756 59.04%, #fdeb56 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.sub-content-info {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.card-content-container:hover .card-content {
		bottom: 53px;
	}

	.card-content-container:hover .card-info {
		visibility: visible;
		opacity: 1;
	}

	:global(.splide__track) {
		overflow: visible !important;
	}

	@media (max-width: 1023px) {
		.card-content-container .card-content {
			bottom: 59px;
		}
		.card-content-container .card-info {
			visibility: visible;
			opacity: 1;
		}
	}
</style>
