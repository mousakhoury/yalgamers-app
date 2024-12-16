<script>
	import { locale } from '$lib/stores/i18n';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	let mainOptions = {
		type: 'loop',
		height: '21.44rem',
		width: '100%',
		perPage: 1,
		pagination: false,
		// gap: '30px',
		arrows: true,
		direction: $locale === 'ar' ? 'rtl' : 'ltr'
	};

	export let images = [];
</script>

<Splide options={mainOptions}>
	{#each images as image}
		<SplideSlide>
			<img src={image} alt="" />
		</SplideSlide>
	{/each}
</Splide>
