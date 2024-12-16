<script>
	export let title;
	export let team1;
	export let team2;
</script>

<div
	class="p-[12px] md:p-[0.801vw] 2xl:p-[12px] bg-[#2B1731] rounded-[4px] md:rounded-[0.267vw] border border-solid border-[#fdeb5600] flex flex-col items-start gap-[7px] md:gap-[0.467vw] 2xl:gap-[7px] w-[156px] md:w-[10.414vw] 2xl:w-[156px] h-[65px] md:h-[4.339vw] 2xl:h-[65px]"
>
	<h5
		class="text-[#fff] text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-SemiBold leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
	>
		{title}
	</h5>
	<div class="flex justify-between items-center w-[132px] md:w-[8.812vw] 2xl:w-[132px]">
		<p
			class="text-[#948798] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
		>
			{team1}
		</p>
		<p
			class="text-[#FDEB56] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
		>
			VS
		</p>
		<p
			class="text-[#948798] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
		>
			{team2}
		</p>
	</div>
</div>
