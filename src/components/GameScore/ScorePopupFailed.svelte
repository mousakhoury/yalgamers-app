<script>
	import Sad from '$lib/assets/game-score/sad.svg';
	import AIScan from '$lib/assets/game-score/ai-scan.svg';
	import Laugh from '$lib/assets/game-score/laugh.webp';

	export let openPopup = false;
	export let scanning = false;
	export let finishScanning = false;
	export let msg = '';
</script>

<div class="flex flex-col items-center gap-[48px] w-full mt-[12px] lg:mt-[24px]">
	<div class="flex flex-col items-center gap-[32px] w-full max-w-[355px]">
		{#if msg.startsWith('Looks')}
			<img src={Sad} alt="" class="w-[120px]" />
		{:else}
			<img src={Laugh} alt="" class="w-[120px]" />
		{/if}
		<div class="flex flex-col items-center gap-[8px] w-full">
			<p class="text-[#FFFFFFE5] text-[20px] lg:text-[24px] text-center font-Gilroy-SemiBold">
				Scanning Failed
			</p>
			<p class="text-[#FFFFFF99] text-[12px] lg:text-[14px] text-center font-Gilroy-Medium">
				{msg}
			</p>
		</div>
	</div>

	<div class="flex flex-col items-center gap-[12px] w-full">
		<button
			on:click={() => (finishScanning = false)}
			class="flex items-center justify-center gap-[12px] px-[35px] py-[8px] lg:py-[12px] rounded-[8px] border border-[#FDEB56] bg-gradient-gold w-full group"
		>
			<img src={AIScan} alt="" class="w-[24px]" />

			<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold">Scan Again</p>
		</button>

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
