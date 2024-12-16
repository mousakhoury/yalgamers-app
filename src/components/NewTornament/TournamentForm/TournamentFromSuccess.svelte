<script>
	import Success from '$lib/assets/tournament-form-success.svg';
	export let success = true;
	export let msg = '';
</script>

<div class="p-[56px] flex flex-col items-center gap-[32px]">
	{#if success}
		<img src={Success} alt="" />
		<div class="flex flex-col items-center gap-[12px]">
			<p class="text-[#1FD031] text-[24px] font-Gilroy-SemiBold">Registration Successful!</p>
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-Medium text-center max-w-[377px]">
				We will send all the details about the tournament on your mail.
			</p>
		</div>
	{:else}
		<p class="text-[#A99FAC] text-[16px] font-Gilroy-Medium text-center max-w-[377px]">
			{msg}
		</p>
	{/if}
</div>
