<script>
	import VectorTop from '$lib/assets/game-score/Vector-top.svg';
	import VectorBottom from '$lib/assets/game-score/Vector-Bottom.svg';
	import Twitter from '$lib/assets/game-score/twitterx.svg';
	import Copy from '$lib/assets/game-score/copy.svg';
	import { score, steam_data } from '$lib/stores/steamscore';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import { getImageUrl } from '$lib/utils';

	export let isScanned = true;
	export let linkSharing = false;
	$: currentLevel = findLevel($score);
</script>

<div
	class="flex flex-col items-start gap-[17px] lg:gap-[17px] p-[16px] lg:p-[20px] w-full lg:max-w-[420px] rounded-[16px] border border-[#8EC9ED26] bg-[#2D173A] h-[539px] lg:h-[95%] relative overflow-hidden z-10"
>
	<img src={VectorTop} alt="" class=" absolute top-0 left-0 z-[-1]" />
	<img src={VectorBottom} alt="" class=" absolute bottom-0 right-0 z-[-1]" />

	<p class="text-[#FFFFFFE5] text-[16px] lg:text-[20px] font-Gilroy-SemiBold">My Profile</p>

	{#if $score > 0}
		<div class="flex flex-col items-start gap-[20px] w-full">
			<div
				class="flex items-center justify-center w-full aspect-[416/400] p-[45px] rounded-[12px] bg-[#FFFFFF0D]"
			>
				<img src={$levels[currentLevel].img} alt="" class="w-full object-contain" />
			</div>
			<div class="flex flex-col items-start gap-[20px] w-full">
				<div class="flex items-center justify-between w-full">
					<div class="felx flex-col items-start gap-[6px] lg:gap-[8px]">
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
						<div
							class="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#2e183a]"
						>
							<p class="text-[#FFFFFF80] text-[12px] font-Gilroy-Medium">{percentage}%</p>
						</div>
					</div> -->
				</div>
				<hr class="w-full border-[#FFFFFF1A]" />
				<!-- <div class="flex items-center gap-[12px] w-full"> -->
				<!-- <a
						target="_blank"
						href={twitter(sharelink)}
						class="flex items-center justify-center gap-[8px] w-full max-w-[220px] p-[14px] rounded-[8px] bg-[#FDEB561A] hover:bg-[#FDEB5633]"
					>
						<img src={Twitter} alt="" class="w-[20px]" />
						<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold">Share On X</p>
					</a>
					<a
						target="_blank"
						href={facebook(sharelink)}
						class="flex items-center justify-center gap-[8px] w-full max-w-[220px] p-[14px] rounded-[8px] bg-[#FDEB561A] hover:bg-[#FDEB5633]"
					>
						<img src={Twitter} alt="" class="w-[20px]" />
						<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold">Share On FB</p>
					</a> -->
				<button
					on:click={() => (linkSharing = true)}
					class="flex items-center justify-center gap-[8px] w-full p-[14px] rounded-[8px] bg-[#8EC9ED1A] hover:bg-[#8EC9ED33]"
				>
					<!-- <img src={Copy} alt="" class="w-[16px]" /> -->

					<p class="text-[#8EC9EDCC] text-[14px] font-Gilroy-SemiBold">Share</p>
				</button>
				<!-- </div> -->
			</div>
		</div>
	{:else}
		<div class="flex items-center justify-center w-full h-full rounded-[12px] bg-[#FFFFFF0D]">
			<p class="text-[#FFFFFFE5] text-[16px] lg:text-[20px] text-center font-Gilroy-SemiBold">
				Nothing Found<br />Animation Place Holder
			</p>
		</div>
	{/if}
</div>
