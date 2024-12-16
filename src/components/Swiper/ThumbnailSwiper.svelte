<script lang="ts">
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';

	export let images;
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';

	import '@splidejs/svelte-splide/css';

	// or other themes
	import '@splidejs/svelte-splide/css/skyblue';
	import '@splidejs/svelte-splide/css/sea-green';

	// or only core styles
	import '@splidejs/svelte-splide/css/core';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let main: Splide;
	let thumbs: SplideSlide;
	let intervalTiming = 4000;
	const mainOptions = {
		type: 'loop',
		perPage: 1,
		perMove: 1,
		gap: '1rem',
		pagination: false,
		height: 'auto',
		arrows: false,
		pauseOnFocus: false,
		pauseOnHover: false
	};

	const thumbsOptions = {
		type: 'slide',
		rewind: true,
		autoplay: true,
		interval: intervalTiming,
		gap: '1rem',
		pagination: false,
		fixedWidth: 'min(200px,90%)',
		fixedHeight: '100%',
		contain: true,
		focus: 'start',
		isNavigation: true,
		updateOnMove: true,
		pauseOnFocus: false,
		pauseOnHover: false,

		resetProgress: false
	};

	onMount(() => {
		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	});
	let progressBar;
	$: reachedEnd = false;
</script>

<div class="flex flex-col items-center justify-center thumbnailWrapper">
	<Splide
		options={mainOptions}
		bind:this={main}
		aria-labelledby="thumbnails-example-heading"
		dir="ltr"
	>
		{#each images as image}
			<SplideSlide>
				<img loading="lazy" src={image.src} alt={'Alt'} />
			</SplideSlide>
		{/each}
	</Splide>

	<Splide
		options={thumbsOptions}
		bind:this={thumbs}
		on:active={(e) => {
			if (reachedEnd) {
				if (document.querySelector('.splide__progress__bar')) {
					document.querySelector('.splide__progress__bar')?.remove();
				}
				reachedEnd = false;
			}
			let outerDiv = document.createElement('div');
			outerDiv.className = 'splide__progress';
			let innerDiv = document.createElement('div');
			innerDiv.className = 'splide__progress__bar';
			outerDiv.appendChild(innerDiv);
			e.detail.Slide.slide.appendChild(outerDiv);
		}}
		on:autoplayPlaying={(rate) => {
			if (document.querySelector('.splide__progress__bar')) {
				document.querySelector('.splide__progress__bar').style.width = rate.detail.rate * 100 + '%';
				if (rate.detail.rate == 1) {
					reachedEnd = true;
				}
			}
		}}
		on:click={() => {
			if (document.querySelector('.splide__progress__bar')) {
				document.querySelector('.splide__progress__bar')?.remove();
			}
		}}
		on:moved={() => {
			if (document.querySelector('.splide__progress__bar')) {
				reachedEnd = true;
			}
		}}
	>
		{#each images as image}
			<SplideSlide>
				<img loading="lazy" src={image.src} alt={'Alt'} />
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	:global(.thumbnailWrapper .splide:nth-child(2)) {
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 4rem;
		padding-right: 4rem;

		width: 83%;
	}

	:global(.thumbWrapper .splide__progress) {
		position: absolute;
		height: 100px;
	}
	:global(.thumbnailWrapper .splide__slide) {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(.thumbnailWrapper .splide:nth-child(2) .is-active) {
		border-radius: 4px;
		border: 1.606px solid var(--White, #fff);
		background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 0.8) 63.02%,
				rgba(255, 255, 255, 0) 63.03%
			),
			linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
			lightgray 50% / cover no-repeat;
		box-shadow: 0px 0px 8.02811px 2.00703px rgba(255, 255, 255, 0.3);
	}
	:global(.is-active .splide__progress) {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		top: 0;
		border-radius: 5px;
		background: transparent !important;
	}
	:global(.thumbnailWrapper .splide__progress__bar) {
		background: transparent;
		height: 100%;
	}
	:global(.thumbnailWrapper .is-active .splide__progress__bar) {
		background: #d4cfd6;
		opacity: 0.8;
	}
	@media screen and (max-width: 768px) {
		:global(.thumbnailWrapper .splide:nth-child(1)) {
			padding: 2rem 0;
		}
	}
</style>
