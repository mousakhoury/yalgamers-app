<script>
	import { t, locale } from '$lib/stores/i18n';
	import Box from '$lib/assets/rewards/box.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let closeMysteryBox;
	export let openMysteryBox;
	export let availableBox;
	export let selectedReward;

	let show_time = false;
	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let intervalId;

	onMount(() => {
		if ($page.data.box_open_time && new Date() < new Date($page.data.box_open_time)) {
			show_time = true;
			const targetTime = new Date($page.data.box_open_time).getTime();

			function updateCountdown() {
				const now = new Date().getTime();
				const distance = targetTime - now;

				if (distance < 0) {
					clearInterval(intervalId);
					days = hours = minutes = seconds = 0;
					return;
				}

				days = Math.floor(distance / (1000 * 60 * 60 * 24));
				hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				seconds = Math.floor((distance % (1000 * 60)) / 1000);
			}

			updateCountdown();
			intervalId = setInterval(updateCountdown, 1000);
		} else {
			show_time = false;
		}
	});
</script>

<div
	class="flex items-center justify-center w-full h-screen fixed top-0 left-0 z-[60] bg-[#0e0511e6] p-[16px]"
>
	<div class="w-full max-w-[744px] p-[2px] rounded-[14px] bg-border">
		<div
			class="flex flex-col lg:flex-row items-center gap-[20px] lg:gap-[30px] w-full h-full rounded-[12px] bg-[#200b26] p-[8px]"
		>
			<div
				class="flex items-center justify-center w-full lg:max-w-[300px] aspect-[300/400] rounded-[10px]"
			>
				<img src={Box} alt="" class="w-full" />
			</div>
			<div
				class="flex flex-col items-center justify-end gap-[55px] w-full lg:h-[400px] lg:pr-[16px] pb-[6px] lg:pb-[16px]"
			>
				{#if selectedReward}
					<div
						class="hidden lg:flex flex-col items-center gap-[6px] {selectedReward.type === 'xp'
							? 'max-w-[184px]'
							: 'max-w-[237px]'} "
					>
						<p class="text-[32px] font-Gilroy-SemiBold" style="color: #FFFFFF">
							{selectedReward.value}!
						</p>
						<p class="text-white text-[20px] text-center font-Gilroy-SemiBold">
							{#if selectedReward.type === 'nft' || selectedReward.type === 'token' || selectedReward.type == 'money'}
								Congratulations! You got {selectedReward.value}
								, it will be sent on your wallet.
							{:else}
								{selectedReward.type}
							{/if}
						</p>
					</div>
				{:else}
					<div class="text-white text-[20px] text-center font-Gilroy-SemiBold">
						BE READY TO REVEAL WHAT'S <br /> INSIDE YOUR BOXES...!!!
					</div>
				{/if}
				<div class="flex flex-col items-center gap-[20px] w-full">
					<hr class="w-full border-[#36233C]" />
					<div class="flex flex-col items-center gap-[16px] w-full">
						<div class="available-spins">
							<p
								class="text-[#BEB6C0] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
							>
								{$t('Available Box')}:
							</p>
							<p
								class="{availableBox === 0
									? 'text-[#F71756]'
									: 'text-[#8EC9ED]'} text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
							>
								{availableBox}
							</p>
						</div>
						<button
							on:click={openMysteryBox}
							disabled={availableBox === 0 || show_time}
							class="w-full h-[50px] rounded-[6px] bg-[#FDEB56] disabled:bg-[#27132D] group p-[15px]"
						>
							<p
								class="text-[#343111] text-[16px] font-Gilroy-SemiBold group-disabled:text-[#FFFFFF4D]"
							>
								{#if show_time}
									{days}d {hours}h {minutes}m {seconds}s
								{:else}
									Open Again
								{/if}
							</p>
						</button>
						<button
							on:click={closeMysteryBox}
							class="w-full h-[50px] rounded-[6px] bg-[#FFFFFF1A] p-[15px]"
						>
							<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-SemiBold">Cancel</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.bg-border {
		background: linear-gradient(180deg, #624e34 0%, #200b26 100%);
	}

	.available-spins {
		display: flex;
		padding: 6px 12px 5px 10px;
		align-items: center;
		gap: 4px;
		border-radius: 100px;
		background: rgba(255, 255, 255, 0.08);
	}

	@media (max-width: 1024px) {
		.available-spins {
			padding: 4px 6px 3px 6px;
		}
	}
</style>
