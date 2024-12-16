<script>
	import MysteryBox from './MysteryBox.svelte';
	import { t } from '$lib/stores/i18n';
	import { page } from '$app/stores';
	import { boxes } from '$lib/stores/boxes.js';

	let openBox = false;

	let selectedReward = null;

	async function openMysteryBox() {
		if ($boxes > 0 && new Date() < new Date($page.data.box_open_time)) {
			let res = await fetch('/api/mystery-box');
			res = await res.json();
			if (res.ok) {
				selectedReward = res.box;
				boxes.set($boxes - 1);
				openBox = true;
			} else {
				selectedReward = null;
			}
		}
	}

	function closeMysteryBox() {
		openBox = false;
	}
</script>

<div
	class="flex items-start lg:items-center justify-start px-[20px] lg:px-[30px] py-[27px] lg:py-[40px] rounded-[14px] border border-[#8EC9ED] mystery-box-shadow backgroundImage"
>
	<div
		class="flex flex-col items-start gap-[24px] lg:gap-[80px] w-full max-w-[242px] lg:max-w-[265px]"
	>
		<div class="flex flex-col items-start gap-[10px]">
			<div class="flex flex-col items-start gap-[8px]">
				<p
					class="text-gradient text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
				>
					{$t('Mystery Box is Here!')} 😍
				</p>
				<p
					class="text-white text-[22px] lg:text-[28px] font-Gilroy-Bold leading-[27px] lg:leading-[35px]"
				>
					{$t('Discover Hidden Treasures in Every Mystery Box!')}
				</p>
			</div>
			<div class="available-spins">
				<p
					class="text-[#BEB6C0] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
				>
					{$t('Available Box')}:
				</p>
				<p
					class="{$boxes === 0
						? 'text-[#F71756]'
						: 'text-[#8EC9ED]'} text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
				>
					{$boxes}
				</p>
			</div>
		</div>

		<button
			on:click={() => (openBox = true)}
			class="px-[28px] py-[12px] rounded-[8px] bg-[#FDEB56] disabled:bg-[#27132D] box-shadow disabled:shadow-none group"
		>
			<p
				class="text-[#2A0D32] text-[14px] lg:text-[18px] font-Gilroy-SemiBold leading-[17px] lg:leading-[22px] group-disabled:text-[#FFFFFF4D]"
			>
				{$t('Open Box')}
			</p>
		</button>
	</div>
</div>

{#if openBox}
	<MysteryBox {closeMysteryBox} availableBox={$boxes} {selectedReward} {openMysteryBox} />
{/if}

<style>
	.backgroundImage {
		background-image: url('$lib/assets/rewards/mystery-banner.svg');
		background-position: center;
		background-size: cover;
	}

	.backgroundImage:lang(ar) {
		background-image: url('$lib/assets/rewards/mystery-banner-ar.svg');
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

	.mystery-box-shadow {
		box-shadow: 0px 0px 20px 2px rgba(142, 201, 237, 0.3) inset,
			0px 0px 20px 4px rgba(142, 201, 237, 0.25);
	}

	.box-shadow {
		box-shadow: 0px 4px 12px 0px rgba(253, 235, 86, 0.2);
	}

	@media (max-width: 1024px) {
		.backgroundImage,
		.backgroundImage:lang(ar) {
			background-image: url('$lib/assets/rewards/mystery-banner-mobile.svg');
			aspect-ratio: 343/492;
		}

		.available-spins {
			padding: 4px 6px 3px 6px;
		}
	}
</style>
