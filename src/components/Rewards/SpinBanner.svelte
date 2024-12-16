<script>
	import { t, locale } from '$lib/stores/i18n';
	import SpinWheen from './SpinWheen.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { spinStore } from '$lib/stores/spinStore';

	let showSpin = false;

	onMount(() => {
		spinStore.set($page.data.availableSpins);
	});

	function openSpinWheel() {
		showSpin = true;
	}

	function closeSpinWheel() {
		showSpin = false;
	}
</script>

<div
	class="flex items-start lg:items-center justify-start px-[20px] lg:px-[30px] py-[27px] lg:py-[40px] rounded-[14px] backgroundImage"
>
	<div
		class="flex flex-col items-start gap-[24px] lg:gap-[80px] w-full max-w-[242px] lg:max-w-[265px]"
	>
		<div class="flex flex-col items-start gap-[10px]">
			<div class="flex flex-col items-start gap-[8px]">
				<p
					class="text-gradient text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
				>
					{$t('All New Spinning Game')}
				</p>
				<p
					class="text-white text-[22px] lg:text-[28px] font-Gilroy-Bold leading-[27px] lg:leading-[35px]"
				>
					{$t('Spin and win daily rewards! Try your luck now!')}
				</p>
			</div>
			<div class="available-spins">
				<p
					class="text-[#BEB6C0] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
				>
					{$t('Available Spins')}:
				</p>
				<p
					class="{$spinStore == 0
						? 'text-[#F71756]'
						: 'text-[#FDEB56]'} text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
				>
					{$spinStore}
				</p>
			</div>
		</div>

		<button
			on:click={openSpinWheel}
			class="px-[28px] py-[12px] rounded-[8px] bg-[#FDEB56] box-shadow"
		>
			<p
				class="text-[#2A0D32] text-[14px] lg:text-[18px] font-Gilroy-SemiBold leading-[17px] lg:leading-[22px]"
			>
				{$t('Spin Now')}
			</p>
		</button>
	</div>
</div>

{#if showSpin}
	<SpinWheen {closeSpinWheel} items={$page.data.spinitems} weekly_spin={$page.data.weekly_spin} />
{/if}

<style>
	.backgroundImage {
		background-image: url('$lib/assets/rewards/spin-banner.svg');
		background-position: center;
		background-size: cover;
	}

	.backgroundImage:lang(ar) {
		background-image: url('$lib/assets/rewards/spin-banner-ar.svg');
	}

	.text-gradient {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.available-spins {
		display: flex;
		padding: 6px 12px 5px 10px;
		align-items: center;
		gap: 4px;
		border-radius: 100px;
		background: rgba(255, 255, 255, 0.08);
	}

	.box-shadow {
		box-shadow: 0px 4px 12px 0px rgba(253, 235, 86, 0.2);
	}

	@media (max-width: 1024px) {
		.backgroundImage,
		.backgroundImage:lang(ar) {
			background-image: url('$lib/assets/rewards/spin-banner-mobile.svg');
			aspect-ratio: 343/492;
		}

		.available-spins {
			padding: 4px 6px 3px 6px;
		}
	}
</style>
