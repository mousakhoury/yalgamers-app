<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';

	export let newsItem;
</script>

<div class="flex flex-col items-start gap-[16px] lg:gap-[32px] w-full">
	<img
		loading="lazy"
		src={newsItem.image}
		height="100%"
		class="w-full aspect-[343/220] lg:aspect-[907/300] rounded-[12px] object-cover"
		alt="banner"
	/>

	<div class="flex flex-col items-start gap-[8px] w-full">
		<p class="text-white text-[20px] lg:text-[32px] font-Gilroy-Bold">
			{newsItem.title}
		</p>
		<p class="text-[12px] lg:text-[22px] font-Gilroy text-[#FFFFFF80]">
			{newsItem.subTitle}
		</p>
	</div>
	<hr class="w-full border-[#ffffff1a]" />
</div>

<style>
</style>
