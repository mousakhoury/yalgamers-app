<script>
	import Twitter from '$lib/assets/game-score/twitterx.svg';
	import Copy from '$lib/assets/game-score/copy.svg';
	import { score, steam_data } from '$lib/stores/steamscore.js';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import Barcode from '$lib/assets/game-score/barcod.svg';
	import GamerScoreBg from '$lib/assets/gamer-score-bg.svg';
	import Logo from '$lib/assets/logo.png';

	export let openPopup = false;
	export let linkSharing = false;
	export let scanning = false;

	$: currentLevel = findLevel($score);
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div
		class="flex items-center justify-center w-full aspect-[416/400] p-[45px] rounded-[12px] bg-[#FFFFFF0D]"
	>
		<img src={$levels[currentLevel].img} alt="" class="w-full object-contain" />
	</div>
	<div class="flex flex-col items-start gap-[24px] w-full">
		<div class="flex items-center justify-between w-full">
			<div class="flex flex-col items-start gap-[6px] lg:gap-[8px]">
				<p class="text-[#FFFFFFE5] text-[18px] lg:text-[20px] font-Gilroy-SemiBold">
					{$levels[currentLevel].title}
				</p>
				<!-- <p class="text-[#FFFFFF99] text-[12px] lg:text-[14px] font-Gilroy-Medium">
					You are among the best 10%
				</p> -->
			</div>
			<!-- <div
				class="relative w-[50px] h-[50px] rounded-full flex items-center justify-center"
				style="background: conic-gradient(#1FD031 {(percentage / 100) *
					360}deg, #2C2A39 {(percentage / 100) * 360}deg);"
			>
				<div class="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#2e183a]">
					<p class="text-[#FFFFFF80] text-[12px] font-Gilroy-Medium">{percentage}%</p>
				</div>
			</div> -->
		</div>
		<hr class="w-full border-[#FFFFFF1A]" />
		<div class="flex flex-col items-start gap-[12px] w-full">
			<div class="flex items-center gap-[12px] w-full">
				<!-- <button
					class="flex items-center justify-center gap-[8px] w-full max-w-[220px] p-[14px] rounded-[8px] bg-[#FDEB561A] hover:bg-[#FDEB5633]"
				>
					<img src={Twitter} alt="" class="w-[20px]" />
					<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold">Share On X</p>
				</button> -->
				<button
					on:click={() => {
						linkSharing = true;
						openPopup = false;
						scanning = false;
					}}
					class="flex items-center justify-center gap-[8px] w-full p-[14px] rounded-[8px] bg-[#8EC9ED1A] hover:bg-[#8EC9ED33]"
				>
					<!-- <img src={Copy} alt="" class="w-[16px]" /> -->

					<p class="text-[#8EC9EDCC] text-[14px] font-Gilroy-SemiBold">Share</p>
				</button>
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
	</div>
</div>
