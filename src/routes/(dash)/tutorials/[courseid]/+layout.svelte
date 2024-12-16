<script>
	import { t, locale } from '$lib/stores/i18n';

	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	export let data;
</script>

<div class="mt-[31px] px-[10px] sm:px-[30px]">
	<div class="flex gap-[10px] justify-start items-center">
		<img
			height="24px"
			width="24px"
			src={leftArrow}
			alt="left arrow icon"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<a
			href="/tutorials"
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold">{$t('courses')}</a
		>
		<img
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="inline-block overflow-hidden text-lg not-italic font-normal pointer-events-none text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			{data.course?.title}
		</p>
	</div>
	<slot />
</div>
