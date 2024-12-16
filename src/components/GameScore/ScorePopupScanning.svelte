<script>
	import { onMount, onDestroy } from 'svelte';
	import Steam from '$lib/assets/game-score/steam.svg';
	import ScanningAnimation from '$lib/assets/game-score/scanning-animation.png';
	import DotsAnimation from '$lib/assets/game-score/dots-animation.png';
	import { score } from '$lib/stores/steamscore.js';

	export let openPopup = false;
	export let scanning = false;
	export let finishScanning = false;
	export let isScanned = false;
	export let isFailed = false;
	export let msg;
	let scanPercentage = 0;

	let interval;

	async function fetchData() {
		const res = await fetch('/api/steam/scan');
		return await res.json();
	}

	onMount(async () => {
		scanning = true;

		// Start visual progress
		interval = setInterval(() => {
			if (scanPercentage < 100) {
				scanPercentage += 1; // Increment progress
			}
		}, 500);

		// Call the API and wait for its response
		const result = await fetchData();

		// Stop the progress bar once the API call is complete
		clearInterval(interval);

		// Ensure progress reaches 100 after the API call
		scanPercentage = 100;
		finishScanning = true;

		if (result.ok) {
			score.set(result.score);
			isScanned = true; // Successful scan
		} else {
			msg = result.msg;
			isFailed = true; // API failed
		}
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<div class="flex flex-col items-start gap-[46px] w-full">
	<div class="flex flex-col items-start gap-[20px] lg:gap-[24px] w-full">
		<p class="text-[#FFFFFFE5] text-[18px] lg:text-[20px] font-Gilroy-SemiBold">
			Scanning Your Steam Profile
		</p>
		<div class="flex flex-col items-center gap-[32px] w-full">
			<div
				class="flex items-center justify-center w-[240px] h-[240px] lg:w-[280px] lg:h-[280px] relative"
			>
				<img src={Steam} alt="" class="w-[80px]" />
				<img src={ScanningAnimation} alt="" class="w-full absolute top-0 left-0 rotate-animation" />
				<img
					src={DotsAnimation}
					alt=""
					class="w-[177px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blink-animation"
				/>
			</div>
			<div class="flex flex-col items-center gap-[12px] w-full">
				<p class="text-[#FFFFFFE5] text-[16px] lg:text-[20px] font-Gilroy-SemiBold">
					Scanning... {scanPercentage}%
				</p>
				<div class="w-full h-[8px] rounded-full bg-[#2B1731] overflow-hidden">
					<div class="h-[8px] bg-[#1FD031]" style="width: {scanPercentage}%" />
				</div>
			</div>
		</div>
	</div>

	<button
		on:click={() => {
			openPopup = false;
			scanning = false;
		}}
		class="flex items-center justify-center px-[35px] py-[12px] rounded-[8px] border bg-[#FFFFFF0D] hover:bg-[#FFFFFF26] w-full group"
	>
		<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy-SemiBold">Cancel</p>
	</button>
</div>

<style>
	.rotate-animation {
		animation: rotate 5s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	.blink-animation {
		animation: blink 2s linear infinite;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}
</style>
