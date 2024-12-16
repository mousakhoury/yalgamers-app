<script>
	import { t, locale } from '$lib/stores/i18n';

	import image from '$lib/assets/footerbanner.png';
	import Button from '$components/Button.svelte';
</script>

<div class=" min-h-[505px] py-10 relative flex justify-center items-center mt-20">
	<img src={image} class="absolute h-full w-full top-0 left-0 right-0 -z-10 object-cover" />
	<div class="flex flex-col justify-center items-center">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="w-[90%] text-white text-center font-Gilroy-Bold text-[22px] sm:text-[42px] font-normal not-italic"
		>
			{$t('getStarted.title')}
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="pb-10 pt-[15px] w-[90%] text-white-60 text-center font-Gilroy-Medium text-base font-[12px] sm:font-base not-italic leading-[22px] max-w-[843px]"
		>
			{$t('getStarted.desc')}
		</p>
		<Button size="sm" type="gradient" class="w-fit px-8 py-4 h-[45px] lg:h-[50px]"
			>{$t('getStarted')}</Button
		>
	</div>
</div>
