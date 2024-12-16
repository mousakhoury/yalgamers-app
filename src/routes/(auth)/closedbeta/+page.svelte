<script>
	// @ts-nocheck

	import Timer from '$lib/assets/closed_beta/timer.svg';
	import { goto } from '$app/navigation';
	import Model from '$components/closed_beta/Model.svelte';
	import LoginButton from '$components/NewLogin/LoginButton.svelte';

	let targetDate = new Date('2024-08-16T15:15:00');
	let timeLeft = '';

	function calculateTimeLeft() {
		const now = new Date();
		const difference = targetDate - now;

		if (difference > 0) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((difference / 1000 / 60) % 60);
			const seconds = Math.floor((difference / 1000) % 60);

			timeLeft = `${days}d : ${hours}h : ${minutes}m : ${seconds}s Left for registration`;
		} else {
			timeLeft = 'Registration has ended';
		}
	}

	// Update countdown every second
	setInterval(calculateTimeLeft, 1000);

	// Initial calculation
	calculateTimeLeft();
</script>

<div class="flex flex-col lg:flex-row items-center justify-between gap-[12px] w-full">
	<div
		class="flex flex-col items-center lg:items-start gap-[24px] lg:gap-[42px] w-full max-w-[282px] lg:max-w-[519px]"
	>
		<div class="flex flex-col items-center lg:items-start gap-[12px] lg:gap-[20px]">
			<div
				class="px-[12px] lg:px-[14px] py-[4px] lg:py-[6px] rounded-[100px] border border-[#fdeb560d] bg-[#22151C] relative moving-border overflow-hidden"
			>
				<p class="text-[#FDEB56] text-[12px] lg:text-[16px] font-Gilroy-Medium relative z-10">
					1st Web3 MENA-Based Gaming Platform
				</p>
			</div>
			<h1
				class="text-[26px] lg:text-[48px] font-Gilroy-Bold text-center lg:text-start leading-[42px] lg:leading-[64px] tracking-[0.26px] lg:tracking-[0.48px]"
			>
				Powering the Future of Web 3.0 Gaming in the MENA Region
			</h1>
		</div>
		<div class="flex flex-col items-center lg:items-start gap-[20px] lg:gap-[24 px]">
			<LoginButton
				on:click={() => {
					goto('/closedbeta/apply');
				}}
				label="Apply for Beta"
			/>
			<!-- <div class="flex items-center gap-[6px]">
				<img src={Timer} alt="" class="w-[14px] lg:w-[16px]" />
				<p class="text-[#FFFFFF5C] text-[12px] lg:text-[14px] font-Gilroy">{timeLeft}</p>
			</div> -->
		</div>
	</div>

	<div class="w-full max-w-[629px] aspect-[629/590]">
		<Model />
	</div>
</div>

<style>
	.moving-border {
		--offset: 2px;
	}
	.moving-border::before {
		content: '';
		background: conic-gradient(transparent 270deg, #ddcc4d, transparent);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		aspect-ratio: 1;
		width: 100%;
		animation: rotate 2s linear infinite;
	}

	.moving-border::after {
		content: '';
		background: inherit;
		border-radius: inherit;
		position: absolute;
		inset: var(--offset);
		height: calc(100% - 2 * var(--offset));
		width: calc(100% - 2 * var(--offset));
	}

	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
		}

		to {
			transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
		}
	}

	h1 {
		background: radial-gradient(#fff 40.98%, rgba(255, 255, 255, 0.7) 59.99%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
