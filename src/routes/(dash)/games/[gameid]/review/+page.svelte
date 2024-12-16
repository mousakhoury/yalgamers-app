<script>
	import { t, locale } from '$lib/stores/i18n';

	import pubgImg from '$lib/assets/pubg-full.png';
	import ThumbnailSwiper from '$components/Swiper/ThumbnailSwiper.svelte';
	const images = [
		{ src: pubgImg, title: 'image' },
		{ src: pubgImg, title: 'image' },
		{ src: pubgImg, title: 'image' },
		{ src: pubgImg, title: 'image' }
	];
</script>

<div class="flex flex-col items-center justify-between w-full wrapper xl:flex-row gap-10 xl:gap-0">
	<div class="w-full xl:w-[40%]">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic"
		>
			Introduction
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5"
		>
			Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque
			convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing
			massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget
			quam.
		</p>
	</div>
	<div class="w-full xl:w-[50%]">
		<ThumbnailSwiper {images} />
	</div>
</div>

<div
	class="flex flex-col items-center justify-between w-full my-16 wrapper xl:flex-row xl:my-28 gap-10 xl:gap-0"
>
	<div class="w-full xl:w-[50%] order-2 xl:order-1">
		<img src={pubgImg} alt="" class="object-contain w-full h-full" />
	</div>
	<div class="w-full xl:w-[40%]">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic"
		>
			Overview
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5"
		>
			Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque
			convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing
			massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget
			quam.
		</p>
	</div>
</div>

<div
	class="flex flex-col items-center justify-between w-full wrapper xl:flex-row mb-28 xl:my-28 gap-10 xl:gap-0"
>
	<div class="w-full xl:w-[40%]">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic"
		>
			Context
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5"
		>
			Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque
			convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing
			massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget
			quam.
		</p>
	</div>
	<div class="w-full xl:w-[50%]">
		<img src={pubgImg} alt="" class="object-contain w-full h-full" />
	</div>
</div>

<!--
<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic">Introduction</p>
<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5">Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget quam.</p>

<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic mt-10">Overview</p>
<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5">Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget quam.</p>

<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white font-Gilroy-Bold text-[42px] font-normal not-italic mt-10">Introduction</p>
<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5">Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget quam.</p>

<img src={pubgImg} alt="banner image" class="w-full h-full object-fill rounded-[14px] my-10"/>
<p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-white-60 text-[18px] font-normal not-italic font-Gilroy-Medium mt-5">Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat metus amet purus pellentesque convallis sem. Eleifend turpis eleifend sit velit massa habitant montes luctus. Adipiscing massa ultricies eget augue sed integer consequat sem. Vestibulum sodales posuere diam eget quam.</p>
-->
