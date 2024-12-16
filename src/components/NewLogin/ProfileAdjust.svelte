<script>
	import ProfilePlaceholder from '$lib/assets/login/profile-placeholder.svg';
	import Plus from '$lib/assets/login/plus.svg';
	import Minus from '$lib/assets/login/minus.svg';
	import LoginButton from './LoginButton.svelte';

	let rangeValue = 50; // Initialize the range value

	function increaseRange() {
		if (rangeValue < 100) {
			// Assuming the max value is 100
			rangeValue += 1;
		}
	}

	function decreaseRange() {
		if (rangeValue > 0) {
			// Assuming the min value is 0
			rangeValue -= 1;
		}
	}

	$: rangeStyle = `background: linear-gradient(to right, #8EC9ED ${rangeValue}%, #2B1731 ${rangeValue}%);`;
</script>

<div class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511e6]">
	<div
		class="flex flex-col items-center gap-[30px] pb-[16px] w-full max-w-[408px] rounded-[12px] border border-[#321F37] bg-[#200B26] overflow-hidden"
	>
		<div class="flex p-[14px] w-full border border-[#2F1C35] bg-[#24102A]">
			<p class="text-[#FFFFFFE5] text-[18px] font-Gilroy-Medium">Uploading a new profile picture</p>
		</div>

		<div class="w-[120px] h-[120px] rounded-full border border-[#ffffff1f]">
			<img src={ProfilePlaceholder} alt="" class="w-full h-full" />
		</div>

		<div class="flex items-center gap-[6px] w-full px-[28px]">
			<button on:click={decreaseRange}><img src={Minus} alt="" class="w-[20px]" /></button>
			<input type="range" bind:value={rangeValue} style={rangeStyle} class="w-full" />
			<button on:click={increaseRange}><img src={Plus} alt="" class="w-[20px]" /></button>
		</div>

		<div class="flex gap-[16px] w-full px-[16px]">
			<button class="cancel-button">Cancel</button>
			<LoginButton label="Upload" />
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
