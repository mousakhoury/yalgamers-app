<script>
	// @ts-nocheck

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { t, locale } from '$lib/stores/i18n';
	import { onMount } from 'svelte';

	import '@splidejs/svelte-splide/css';
	import '@splidejs/svelte-splide/css/skyblue';
	import '@splidejs/svelte-splide/css/sea-green';
	import '@splidejs/svelte-splide/css/core';

	import arrowRight from '$lib/assets/game-arrow-right.svg';
	import arrowLeft from '$lib/assets/game-arrow-left.svg';
	import { getImageUrl } from '$lib/utils';

	let main;
	let thumbs;

	export let game;

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});
</script>

<div class=" max-w-[335px] sm:max-w-[550px] md:max-w-[966px] mx-auto">
	<div class="splide-main gamePageSwiper">
		<Splide
			bind:this={main}
			options={{
				type: 'loop',
				heightRatio: 720 / 1280,
				pagination: false,
				gap: '5rem',
				arrows: true,
				direction: 'rtl'
			}}
		>
			{#each game.gallery_images as slide}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('games', game.id, slide)}
						alt=""
						class="object-cover w-full"
					/>
				</SplideSlide>
			{/each}
		</Splide>
		<div class="left-circle" />
		<div class="right-circle" />
	</div>

	<div class="splide-thumbnails gamePageSwiperThumb hidden md:block">
		<Splide
			bind:this={thumbs}
			options={{
				type: 'loop',
				rewind: true,
				heightRatio: 155 / 274,
				perPage: 5,
				height: '100%',
				updateOnMove: true,
				isNavigation: true,
				gap: '10px',
				focus: 'center',
				pagination: false,
				arrows: false,
				cover: true,
				direction: 'rtl'
			}}
			class="splide"
		>
			{#each game.gallery_images as slide}
				<SplideSlide>
					<img
						loading="lazy"
						src={getImageUrl('games', game.id, slide)}
						alt=""
						class="object-cover"
					/>
				</SplideSlide>
			{/each}
		</Splide>
	</div>
</div>

<style>
	.gamePageSwiper img {
		margin: 0;
		aspect-ratio: 960/539.539;
	}

	:global(.gamePageSwiper .splide__arrow svg) {
		display: none;
		width: auto; /* Set width as needed */
		height: auto; /* Set height as needed */
	}

	:global(.gamePageSwiper .splide__arrow.splide__arrow--next) {
		background-image: url('$lib/assets/game-arrow-right.svg');
		background-position: center;
		background-size: cover;
		width: 42px !important; /* Example size, adjust as needed */
		height: 42px !important;
		display: flex !important;
	}

	:global(.gamePageSwiper .splide__arrow.splide__arrow--prev) {
		background-image: url('$lib/assets/game-arrow-left.svg');
		background-position: center;
		background-size: cover;
		width: 42px !important; /* Example size, adjust as needed */
		height: 42px !important;
		display: flex !important;
	}

	:global(.gamePageSwiper .splide__arrow.splide__arrow--next:lang(ar)) {
		background-image: url('$lib/assets/game-arrow-right.svg');
	}

	:global(.gamePageSwiper .splide__arrow.splide__arrow--prev:lang(ar)) {
		background-image: url('$lib/assets/game-arrow-left.svg');
	}

	.left-circle {
		content: '';
		width: 50.4px;
		height: 50.4px;
		position: absolute;
		top: 50%;
		left: 12px;
		transform: translate(0, -50%);
		background-color: #280e30;
		border-radius: 50%;
		z-index: 0;
	}

	.right-circle {
		content: '';
		width: 50.4px;
		height: 50.4px;
		position: absolute;
		top: 50%;
		right: 12px;
		transform: translate(0, -50%);
		background-color: #280e30;
		border-radius: 50%;
		z-index: 0;
	}

	:global(.gamePageSwiper .splide__arrow img) {
		width: 50px; /* Example size, adjust as needed */
		height: 50px; /* Example size, adjust as needed */
	}
	.splide-main {
		position: relative;
	}

	.splide-thumbnails {
		margin-top: 16px;
	}

	:global(.splide-thumbnails .splide__slide) {
		cursor: pointer;
		border: 2px solid transparent;
	}

	:global(.splide-thumbnails .splide__slide.is-active) {
		border-color: #60a5fa; /* Similar to Tailwind's blue-500 */
	}

	.object-cover {
		object-fit: cover;
	}

	.w-full {
		width: 100%;
	}

	.gamePageSwiper {
		overflow: hidden;
	}

	.gamePageSwiperThumb {
		max-width: 100%;
		margin: 0 auto;
		overflow-x: hidden;
		padding: 0 35px;
	}

	:global(.gamePageSwiperThumb .splide__track, .gamePageSwiper .splide__track) {
		overflow: hidden !important;
		padding: 3px !important;
		padding-right: 2px !important;
		border-radius: 10px !important;
	}

	:global(.gamePageSwiperThumb .splide__slide) {
		border-radius: 8px !important;
		border: 0 !important;
		aspect-ratio: 242/137;
	}

	:global(.gamePageSwiperThumb .splide__slide.is-active) {
		border: 2px solid #fdeb56 !important;
	}

	:global(.gamePageSwiper .splide) {
		padding: 18.2px 35px;
	}

	:global(.gamePageSwiper .splide__slide img) {
		border-radius: 16px;
	}

	:global(.gamePageSwiper .splide__slide::before) {
		width: calc(100% + 3px);
		height: calc(100% + 3px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 10px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	:global(.gamePageSwiperThumb .splide__slide::before) {
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 8px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	:global(.gamePageSwiperThumb .splide) {
		padding: 18.2px 0;
		overflow-x: hidden;
	}

	@media (max-width: 720px) {
		:global(.gamePageSwiper .splide) {
			padding: 18.2px 20px;
		}

		:global(.gamePageSwiper .splide__arrow.splide__arrow--next) {
			width: 35px !important; /* Example size, adjust as needed */
			height: 35px !important;
		}

		:global(.gamePageSwiper .splide__arrow.splide__arrow--prev) {
			width: 35px !important; /* Example size, adjust as needed */
			height: 35px !important;
		}

		.left-circle {
			width: 45.4px;
			height: 45.4px;
		}

		.right-circle {
			width: 45.4px;
			height: 45.4px;
		}
	}
</style>
