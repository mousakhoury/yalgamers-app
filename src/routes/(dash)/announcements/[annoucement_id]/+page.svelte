<script>
	import '../../../../app.css';
	import { t, locale } from '$lib/stores/i18n';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';

	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { getImageUrl } from '$lib/utils';
	//import Button from '$components/Button.svelte';

	export let data;
	const annoucement = data.annoucement;
	$: imgUrl = getImageUrl('announcements', annoucement.id, annoucement.main_banner_image);
	$: cardImageUrl = getImageUrl('announcements', annoucement.id, annoucement.article_image);

	$: content = $locale === 'en' ? annoucement.article_en : annoucement.article_ar;
</script>

<div class="mt-[30px] w-full">
	<div class="flex gap-[10px] justify-start items-center px-[10px] sm:px-[30px]">
		<a
			href="/"
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="flex text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold gap-1"
		>
			<img
				loading="lazy"
				height="24px"
				width="24px"
				src={leftArrow}
				alt="left arrow icon"
				style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
			/>
			{$t('explore')}
		</a>
		<img
			loading="lazy"
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			class="inline-block not-italic font-normal pointer-events-none overflow-hidden text-lg text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			{$locale === 'en' ? annoucement.title_en : annoucement.title_ar}
		</p>
	</div>
	<div
		class="w-full overflow-hidden rounded-[16px] relative mt-[30px] bg-image"
		style="background-image: url({imgUrl});"
	>
		<div
			class="w-full top-0 left-0 right-0 h-full px-[10px] sm:px-[30px] pt-[30px] pb-10 overflow-hidden"
		>
			<div class="absolute top-0 left-0 z-0 w-full h-full gradient" />
			<div class="flex justify-between gap-[30px] items-start flex-col-reverse lg:flex-row">
				<div>
					<div class=" flex justify-start items-center gap-[10px] z-10 relative">
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class=" text-white-90 font-Gilroy-Bold text-[32px] lg:text-[56px] lg:w-[100%] font-normal not-italic"
						>
							{$locale === 'en' ? annoucement.title_en : annoucement.title_ar}
						</p>
					</div>
					<div class="flex justify-between gap-[30px] flex-col-reverse lg:flex-row mt-[30px]">
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class=" text-white-60 w-[100%] text-[18px] font-Gilroy-Medium font-normal not-italic py-6 content relative z-10"
						>
							{@html content}
						</p>
					</div>
				</div>
				<img
					src={cardImageUrl}
					alt=""
					class="w-full max-w-full md:max-w-[372px] aspect-[300/400] relative object-cover rounded-[8px]"
				/>
			</div>
			<ul
				class="flex flex-col sm:flex-row sm:gap-x-10 gap-y-3 list-disc pl-4 mt-4 text-accent-yellow lg:w-[50%] text-[18px] font-Gilroy-Medium font-normal not-italic pb-3 relative z-10"
			>
				<!-- <Button-->
				<!--type="secondary"-->
				<!--dir={$locale == 'ar' ? 'rtl' : 'ltr'}-->
				<!--class="text-base not-italic font-normal text-white font-Gilroy-Semibold"-->
				<!--on:click={() => window.open(annoucement.learn_more)}-->
				<!-->-->
				<!--{$t('learnMore')}-->
				<!--</Button>-->
			</ul>
		</div>
	</div>
</div>

<div class="grid grid-cols-3 mt-[30px] gap-[30px]">
	<div class="col-span-2">
		{#key data.pathname}
			<div
				in:fade|local={{ easing: cubicOut, duration: 300, delay: 400 }}
				out:fade|local={{ easing: cubicIn, duration: 300 }}
			>
				<slot />
			</div>
		{/key}
	</div>
</div>

<style>
	.gradient {
		background: linear-gradient(
			0deg,
			#280e30 54.69%,
			rgba(40, 14, 48, 0.9) 76.56%,
			rgba(40, 14, 48, 0.95) 100%
		);
	}
	.bg-image {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>
