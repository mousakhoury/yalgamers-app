<script>
	import NoData from '$lib/assets/game-score/no-data.svg';

	$: requirements = [
		'Make your Steam My Profile public.',
		'Make your Steam Game details public.',
		'Make your Steam Inventory public.'
	];
</script>

<div
	class="flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[80px] w-full mt-[36px]"
>
	<img src={NoData} alt="" class="w-full max-w-[500px]" />

	<div class="flex flex-col items-start gap-[32px] w-full max-w-[400px]">
		<div class="flex flex-col items-start gap-[8px]">
			<p class="text-[#FFFFFFE5] text-[24px] font-semibold">
				Sorry, Looks like your steam account is not liked with yalgamers!
			</p>
			<p class="text-[#FFFFFF99] text-[14px] font-Medium">
				Your Steam account is now linked with Yalgamers. Before you link your steam, make sure you
				follow the following steps.
			</p>
		</div>

		<div class="flex flex-col items-start gap-[18px]">
			{#each requirements as requirement, index}
				<div class="flex items-center gap-[12px]">
					<div class="flex items-center justify-center w-[28px] h-[28px] rounded-full bg-[#BC5AD7]">
						<p class="text-white text-[14px] font-Medium">0{index + 1}</p>
					</div>
					<p class="text-[#FFFFFFE5] text-[14px] font-Medium">{requirement}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
