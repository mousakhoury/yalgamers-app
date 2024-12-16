<script>
	import { onMount, onDestroy } from 'svelte';
	import Steam from '$lib/assets/game-score/steam.svg';
	import Link from '$lib/assets/game-score/link.svg';
	import linkHover from '$lib/assets/profile/link-button-icon-hover.svg';
	import AIScan from '$lib/assets/game-score/ai-scan.svg';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';
	import { steam_data } from '$lib/stores/steamscore';

	export let isPublic = false;
	export let isLinked = false;
	export let isScanned = false;
	export let scanning = false;
	export let openPopup = false;

	// Countdown in seconds
	let countdown = 300;
	let countdownInterval;

	onMount(() => {
		countdownInterval = setInterval(() => {
			if (countdown > 0) {
				countdown--;
			} else {
				clearInterval(countdownInterval);
			}
		}, 1000); // Update every second
	});

	// Cleanup the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(countdownInterval);
	});

	// $: if ($steam_data) {
	// 	const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
	// 	const scanDate = new Date($steam_data.last_scan);
	// 	const now = new Date();
	// 	const diffInMs = now - scanDate;

	// 	if (diffInMs >= 0 && diffInMs < oneDayInMs) {
	// 		const remainingTimeInMs = oneDayInMs - diffInMs;
	// 		countdown = Math.floor(remainingTimeInMs / 1000);
	// 	} else {
	// 		countdown = 0; // Reset if the time has passed
	// 	}
	// }

	// Helper function to format the countdown into "00d : 00h : 00m : 00s"
	const formatCountdown = (seconds) => {
		const days = Math.floor(seconds / 86400);
		const hours = Math.floor((seconds % 86400) / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(
			minutes
		).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
	};

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

<div
	class="flex flex-col lg:flex-row items-center justify-between gap-[27px] w-full p-[12px] lg:p-[20px] lg:pr-[33px] rounded-[12px] border {isLinked
		? 'border-[#1FD0311A] bg-[#1FD0311A]'
		: 'border-[#F717561A] bg-[#F717561A]'}"
>
	<div class="flex items-start lg:items-center gap-[12px] lg:gap-[20px] w-full lg:w-auto">
		<img src={Steam} alt="" class="w-[40px] lg:w-[60px]" />
		<div class="flex flex-col items-start gap-[2px] lg:gap-[4px]">
			<p class="text-[#FFFFFFE5] text-[14px] lg:text-[20px] font-Gilroy-SemiBold">
				{#if isLinked}
					Steam linked!
				{:else}
					Steam not linked yet!
				{/if}
			</p>
			<p class="text-[#FFFFFF99] text-[12px] lg:text-[16px] font-Gilroy-Medium">
				{#if isLinked}
					Your steam account linked with yalgamers.
				{:else}
					Link your steam with yalgamers to get feedback about you account.
				{/if}
			</p>
		</div>
	</div>

	{#if isLinked}
		<div class="flex flex-col lg:flex-row items-center gap-[20px] lg:gap-[32px]">
			{#if countdown > 0 && isScanned}
				<div class="flex items-center gap-[8px]">
					<p class="text-[#FFFFFF99] text-[12px] lg:text-[16px] font-Gilroy-Medium">
						Scan Again in
					</p>
					<p class="text-[#FFFFFFCC] text-[12px] lg:text-[16px] font-Gilroy-Medium">
						{formatCountdown(countdown)}
					</p>
				</div>
			{/if}
			<button
				on:click={() => {
					if (isPublic) {
						openPopup = true;
						scanning = true;
					} else {
						errorToast('Please, Make your profile public and reload page.');
					}
				}}
				class="flex items-center gap-[12px] px-[35px] py-[8px] rounded-[8px] border border-[#FDEB56] bg-gradient-gold group disabled:opacity-40"
				disabled={countdown > 0 && isScanned}
			>
				<img src={AIScan} alt="" class="w-[24px]" />

				<p class="text-[#FDEB56] text-[16px] font-Gilroy-Medium">
					{isScanned ? 'Scan Again' : 'Scan Now'}
				</p>
			</button>
		</div>
	{:else}
		<button
			on:click={() => goto(`/api/steam/login`)}
			class="flex items-center gap-[8px] px-[10px] py-[12px] rounded-[4px] border border-[#8EC9ED26] bg-[#8EC9ED26] hover:bg-[#8ec9ed] group"
		>
			<img src={Link} alt="" class="w-[18px] group-hover:hidden" />
			<img src={linkHover} alt="" class="w-[18px] hidden group-hover:block" />

			<p class="text-[#8EC9ED] group-hover:text-[#182228] text-[16px] font-Gilroy-Medium">
				Link Now
			</p>
		</button>
	{/if}
</div>

<style>
	.bg-gradient-gold {
		background: linear-gradient(
			90deg,
			rgba(253, 235, 86, 0.4) 0%,
			rgba(253, 235, 86, 0.2) 20%,
			rgba(253, 235, 86, 0.1) 37.5%,
			rgba(253, 235, 86, 0.1) 64%,
			rgba(253, 235, 86, 0.2) 82.5%,
			rgba(253, 235, 86, 0.4) 100%
		);
	}

	.bg-gradient-gold:hover {
		background: linear-gradient(
			90deg,
			rgba(253, 235, 86, 0.6) 0%,
			rgba(253, 235, 86, 0.3) 20%,
			rgba(253, 235, 86, 0.2) 37.5%,
			rgba(253, 235, 86, 0.2) 64%,
			rgba(253, 235, 86, 0.3) 82.5%,
			rgba(253, 235, 86, 0.6) 100%
		);
	}
</style>
