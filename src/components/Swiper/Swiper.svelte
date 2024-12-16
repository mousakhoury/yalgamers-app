<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	// or other themes
	import '@splidejs/svelte-splide/css/skyblue';
	import '@splidejs/svelte-splide/css/sea-green';
	// or only core styles
	import '@splidejs/svelte-splide/css/core';

	export let gap;

	const options = {
		gap: gap,
		pagination: false,
		arrows: true,
		// perPage: 1,
		perMove: 1,
		direction: $locale === 'ar' ? 'rtl' : 'ltr',
		arrows: false
	};
</script>

<div class="cards w-full">
	<Splide hasTrack={false} aria-label="..." {options}>
		<SplideTrack>
			<slot><!-- optional fallback --></slot>
		</SplideTrack>
	</Splide>
</div>

<style>
</style>
