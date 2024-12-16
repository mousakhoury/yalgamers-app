<script>
	import { onDestroy, onMount } from 'svelte';
	import Plus from '$lib/assets/login/plus.svg';
	import Minus from '$lib/assets/login/minus.svg';
	import Croppie from 'croppie';
	import 'croppie/croppie.css';
	import LoginButton from './LoginButton.svelte';
	import LoadingPopup from './LoadingPopup.svelte';

	export let imageUrl;
	export let onCrop;
	export let startUploadSimulation;

	let croppieInstance;
	let croppieElement;
	let rangeValue = 50; // Initialize the range value for zoom

	// Initialize Croppie instance when the component mounts
	onMount(() => {
		// console.log('Image URL passed to Croppie: ', imageUrl);

		croppieInstance = new Croppie(croppieElement, {
			viewport: { width: 120, height: 120, type: 'circle' },
			boundary: { width: 120, height: 120 },
			enableExif: true,
			zoom: rangeValue / 100 // Set initial zoom
		});

		if (imageUrl) {
			croppieInstance
				.bind({
					url: imageUrl
				})
				.then(() => {
					// console.log('Image has been bound to Croppie.');
				})
				.catch((err) => {
					console.error('Error binding image to Croppie: ', err);
				});
		}
	});

	// Reactive statement to update zoom on range value change
	$: if (croppieInstance) {
		croppieInstance.setZoom(rangeValue / 100);
	}

	// Handle cropping
	function cropImage() {
		croppieInstance
			.result({ type: 'base64', size: { width: 160, height: 160 } })
			.then((croppedImage) => {
				onCrop(croppedImage);
				// Trigger the loading popup
				startUploadSimulation();
			})
			.catch((err) => {
				console.error('Error during cropping: ', err);
			});
	}

	// Handle zoom adjustments
	function increaseRange() {
		if (rangeValue < 100) {
			rangeValue += 1;
		}
	}

	function decreaseRange() {
		if (rangeValue > 0) {
			rangeValue -= 1;
		}
	}

	// Destroy the Croppie instance when the component is destroyed
	onDestroy(() => {
		if (croppieInstance) {
			croppieInstance.destroy();
		}
	});

	$: rangeStyle = `background: linear-gradient(to right, #8EC9ED ${rangeValue}%, #2B1731 ${rangeValue}%);`;
</script>

<div
	class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511e6] z-[90] px-[16px]"
>
	<div
		class="flex flex-col items-center gap-[30px] pb-[16px] w-full max-w-[408px] rounded-[12px] border border-[#321F37] bg-[#200B26] overflow-hidden"
	>
		<div class="flex p-[14px] w-full border border-[#2F1C35] bg-[#24102A]">
			<p class="text-[#FFFFFFE5] text-[18px] font-Gilroy-Medium">Uploading a new profile picture</p>
		</div>

		<div bind:this={croppieElement} />

		<div class="flex items-center gap-[6px] w-full px-[28px]">
			<button on:click={decreaseRange}><img src={Minus} alt="" class="w-[20px]" /></button>
			<input type="range" bind:value={rangeValue} style={rangeStyle} class="w-full" />
			<button on:click={increaseRange}><img src={Plus} alt="" class="w-[20px]" /></button>
		</div>

		<div class="flex gap-[16px] w-full px-[16px]">
			<button on:click={() => onCrop(null)} class="cancel-button">Cancel</button>
			<LoginButton on:click={cropImage} label="Upload" />
		</div>
	</div>
</div>

<style>
	/* Styling the range input */
	input[type='range'] {
		-webkit-appearance: none; /* Removes default styling */
		appearance: none;
		width: 100%;
		height: 4px;
		background: #ffffff1f; /* Fallback for no JS */
		border-radius: 4px;
		outline: none;
		transition: opacity 0.2s;
	}

	input[type='range']:hover {
		opacity: 1;
	}

	/* Styling the thumb (the draggable part) */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	input[type='range']::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	input[type='range']::-ms-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #ffffff;
		cursor: pointer;
	}

	.cancel-button {
		display: flex;
		width: 100%;
		padding: 14px 21px;
		justify-content: center;
		align-items: center;
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.08);
	}

	.cancel-button:hover {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
