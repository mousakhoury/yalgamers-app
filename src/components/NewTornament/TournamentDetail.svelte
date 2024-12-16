<script>
	export let image;
	export let title;
	export let text;
</script>

<div
	class="flex items-center gap-[10px] p-[10px] bg-[#29152F] border-[1px] border-solid border-[#3D2644] rounded-[6px] w-[249px]"
>
	<img src={image} alt="" class="w-[60px] h-[60px] rounded-[3px] object-cover" />
	<div class="flex flex-col items-start gap-[5px]">
		<p class="text-[#948798] text-[12px] font-Gilroy-Medium leading-[10px]">{title}</p>
		<p class="text-[#E9E6EA] text-[16px] font-Gilroy-SemiBold w-[159px] leading-[21px]">{text}</p>
	</div>
</div>
