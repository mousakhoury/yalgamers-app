<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onMount } from 'svelte';
	import Logo from '$lib/assets/rewards/wheel-logo.svg';
	import Button from '$lib/assets/rewards/wheel-button.svg';
	import Arrow from '$lib/assets/rewards/wheel-arrow.svg';
	import CloseButton from '$lib/assets/rewards/close-button.svg';
	import SpinResult from './SpinResult.svelte';
	import { tickets } from '$lib/stores/tickets';
	import { user } from '$lib/stores/user';
	import SpinClaim from './SpinClaim.svelte';
	import { spinStore } from '$lib/stores/spinStore';

	export let weekly_spin = {};
	export let items = [];
	export let closeSpinWheel;

	let selectedItem = null;
	let spinning = false; // Variable to track if the wheel is spinning
	let rotation = 0;
	const arcSize = (2 * Math.PI) / items.length;
	let lightInterval;
	let lightSpeed = 500;
	const gapSize = 0; // Gap size in radians

	onMount(() => {
		drawWheel();
		// Center the wheel on the first item
		const canvas = document.getElementById('wheel');
		const initialAngle = 90 - (arcSize * 180) / Math.PI / 2;
		rotation = -initialAngle; // Negative to rotate in the correct direction
		canvas.style.transform = `rotate(${rotation}deg)`;

		// Start the light toggle effect
		toggleLights();
	});

	function drawWheel() {
		const canvas = document.getElementById('wheel');
		const ctx = canvas.getContext('2d');
		const radius = canvas.width / 2;

		// Increase the resolution for better text quality
		const scale = 2;
		canvas.width = canvas.width * scale;
		canvas.height = canvas.height * scale;
		ctx.scale(scale, scale);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw the wheel segments
		for (let i = 0; i < items.length; i++) {
			ctx.beginPath();
			ctx.moveTo(radius, radius);
			ctx.arc(
				radius,
				radius,
				radius - 20,
				i * arcSize + gapSize / 2,
				(i + 1) * arcSize - gapSize / 2
			);
			ctx.closePath();
			ctx.fillStyle = items[i].color;
			ctx.fill();
			ctx.stroke();

			ctx.save();
			ctx.translate(radius, radius);
			ctx.rotate(i * arcSize + arcSize / 2);
			ctx.textAlign = 'right'; // Center the text
			ctx.textBaseline = 'middle'; // Vertically center the text
			ctx.fillStyle = items[i].textColor; // Set the text color from the items array
			ctx.font = '12px Lexend'; // Use the Lexend font
			ctx.fillText(items[i].label, radius - 30, 0); // Adjust positioning to center text
			ctx.restore();
		}

		// Reset the scale to avoid affecting other drawings
		ctx.scale(1 / scale, 1 / scale);
	}

	function spin() {
		if (spinning || $spinStore <= 0) return; // Disable if spinning or no spins left
		spinning = true;
		spinStore.update((n) => n - 1);

		// Slow down the light toggle effect during the spin
		lightSpeed = 1000;
		clearInterval(lightInterval);
		toggleLights();

		const duration = 5000; // Spin duration in ms
		const spins = 10; // Number of spins before stopping

		const probabilities = items.map((item) => parseFloat(item.probability) / 100);
		const selected = selectItem(probabilities);

		const selectedAngle = (selected * arcSize * 180) / Math.PI;
		const offset = 90 + (arcSize * 180) / Math.PI / 2; // Adjust to center the segment
		const finalAngle = 360 * spins + (360 - selectedAngle) - offset;

		const canvas = document.getElementById('wheel');
		canvas.style.transition = `transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
		canvas.style.transform = `rotate(${finalAngle}deg)`;

		setTimeout(() => {
			selectedItem = items[selected];
			updateBalance();
			let obj = selectedItem;
			obj.day = weekly_spin.day;
			fetch(`/api/inc_spin`, {
				method: 'POST',
				body: JSON.stringify(obj),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			spinning = false; // Reset spinning variable
			rotation = finalAngle % 360;
			canvas.style.transition = '';
			canvas.style.transform = `rotate(${rotation}deg)`;

			// Reset the light toggle speed after spin
			lightSpeed = 500;
			clearInterval(lightInterval);
			toggleLights();
		}, duration);
	}

	// Function to extract number from text
	function extractNumber(text) {
		let numberPattern = /\d+/;
		let match = text.match(numberPattern);
		return match ? match[0] : null;
	}

	function updateBalance() {
		if (selectedItem.type) {
			const type = selectedItem.expand.type.name;
			const addValue = parseInt(extractNumber(selectedItem.label));
			if (type == 'xp') {
				user.update((u) => ({
					...u,
					xp: $user.xp + addValue
				}));
			} else if (type == 'ticket') {
				tickets.update((n) => n + addValue);
			}
		}
	}

	function selectItem(probabilities) {
		const sum = probabilities.reduce((acc, prob) => acc + prob, 0);
		const rand = Math.random() * sum;
		let total = 0;
		for (let i = 0; i < probabilities.length; i++) {
			total += probabilities[i];
			if (rand <= total) {
				return i;
			}
		}
		return probabilities.length - 1;
	}

	function toggleLights() {
		const lights = document.querySelectorAll('.light');
		let isOn = true;

		lightInterval = setInterval(() => {
			lights.forEach((light, i) => {
				if (i % 2 === 0) {
					if (isOn) {
						light.classList.add('light-active');
					} else {
						light.classList.remove('light-active');
					}
				} else {
					if (!isOn) {
						light.classList.add('light-active');
					} else {
						light.classList.remove('light-active');
					}
				}
			});
			isOn = !isOn;
		}, lightSpeed); // Toggle every lightSpeed ms
	}

	function closeItem() {
		selectedItem = null;

		setTimeout(() => {
			spin();
		}, 1000);
	}
</script>

<div
	class="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-[60] bg-[#0e0511e6]"
>
	{#if selectedItem}
		<SpinResult bind:selectedItem availableSpins={$spinStore} {closeItem} {closeSpinWheel} />
	{/if}
	<div
		class="rounded-[14px] w-full max-w-[440px] wheel relative z-1 scale-90 lg:scale-100 {selectedItem
			? 'hidden'
			: ''}"
	>
		<div class="flex flex-col items-center gap-[30px] pb-[20px] bg-[#200B26] rounded-[14px]">
			<button on:click={closeSpinWheel} class="absolute top-[-18px] right-[-18px]">
				<img src={CloseButton} alt="" class="w-[32px]" />
			</button>
			<div
				class="flex items-center justify-between px-[20px] pt-[18px] pb-[17px] w-full rounded-t-[14px] bg-[#2B1730]"
			>
				<p class="text-[#E9E6EA] text-[20px] font-Gilroy-Bold leading-[25px]">{$t('Daily Spin')}</p>
				<p class="text-[#FDEB56] text-[16px] font-Gilroy-Medium leading-[19px]">
					{$spinStore}
					{$t('Spin Available')}
				</p>
			</div>
			<button
				on:click={spin}
				class="flex items-center justify-center wheel-background w-[320px] h-[320px] relative"
			>
				<div id="wheel-container">
					<canvas id="wheel" width="255" height="255" />
					<div id="pin">
						<img src={Arrow} alt="Pin" class="w-[41.605px]" />
					</div>
					<div class="lights">
						{#each items as _, i}
							<div
								class="light"
								style="transform: rotate({i * arcSize - Math.PI / 2}rad) translate(146px);"
							>
								<div class="light-color" />
							</div>
						{/each}
					</div>
				</div>
				<div class="w-[74px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<img src={spinning ? Logo : Button} alt="" />
					<p
						class="text-[#fdeb56] text-[18px] font-Gilroy-Bold bg-[#140718] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
					>
						{$locale === 'ar' ? 'تدوير' : 'Spin'}
					</p>
				</div>
			</button>
			<div class="flex flex-col items-start gap-[12px] w-full">
				<p class="text-[#FFFFFFE5] text-[22px] font-Gilroy-SemiBold px-[20px]">
					{$t('Weekly Reward Spins')}
				</p>
				<SpinClaim {weekly_spin} />
			</div>
		</div>
	</div>
</div>

<style>
	.wheel::before {
		width: calc(100% + 2px);
		height: calc(100% + 4px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 15px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, #69563b 0%, rgba(255, 255, 255, 0) 100%);
		box-shadow: 0 4px 6px #69563b;
	}
	.wheel-background {
		background-image: url('$lib/assets/rewards/Spin Wheel background.svg');
		background-position: center;
		background-size: cover;
	}
	#wheel-container {
		position: relative;
		width: 310px;
		height: 310px;
		margin: auto;
	}

	#wheel {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transform: rotate(0deg); /* Ensure the wheel starts with no rotation initially */
	}

	#pin {
		position: absolute;
		top: -4px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
	}

	.lights {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.light {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 48%;
		left: 48%;
		width: 12px;
		height: 12px;
		background-color: #3f2913;
		border-radius: 50%;
		transform-origin: center;
	}

	.light .light-color {
		background-color: #655020;
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}

	:global(.light-active .light-color) {
		background-color: #fdeb56 !important;
		box-shadow: 0 0 6px 0 #fdeb56;
	}

	@keyframes slideLeftRight {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(6px);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes slideRightLeft {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-6px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
