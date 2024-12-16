<script>
	import InDev from '$components/GameStatus/InDev.svelte';
	import Playable from './../GameStatus/Playable.svelte';
	import Beta from './../GameStatus/Beta.svelte';
	import Alpha from './../GameStatus/Alpha.svelte';
	import { t, locale } from '$lib/stores/i18n';

	// @ts-nocheck

	export let image;
	// export let userExpand;
	// export let subUser;
	export let status;
	export let id;
	export let title;
	// export let subTitle;
	import verify from '$lib/assets/verify.svg';
	import betaSvg from '$lib/assets/beta.svg';
	// import Alpha from '$lib/assets/game-alpha-image.svg';
	// import Beta from '$lib/assets/game-beta-image.svg';
	// import UnderDevelopment from '$lib/assets/game-under-image.svg';
	// import Playable from '$lib/assets/game-playable-image.svg';
	import joystickSvg from '$lib/assets/joystick.svg';
	import underdevSvg from '$lib/assets/under-develop.svg';
	import platformSvg from '$lib/assets/platform.svg';
	import Button from '$components/Button.svelte';
	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getImageUrl } from '$lib/utils';
	import IoIosArrowRoundForward from 'svelte-icons/io/IoIosArrowRoundForward.svelte';
	import Card from '$components/Card.svelte';
	let progressElement;
	onMount(() => {
		if (browser && progress) progressElement.style.width = progress * 3 + 'px';
	});

	// const STATUS = {
	// 	Alpha: Alpha,
	// 	Beta: Beta,
	// 	Playable: Playable,
	// 	'In Dev': InDev
	// };

	let progress = 0;
	let courseimageUrl;
	$: courseimageUrl = getImageUrl('games', id, image) + '?thumb=0x400';
	let userimageUrl;
	// $: userimageUrl = getImageUrl('users', userExpand?.id, userExpand?.avatar)+"?thumb=0x250";
</script>

<a href={`/games/${id}`}>
	<Card image={courseimageUrl}>
		<div class="card-content-container">
			<div class="card-content">
				<!-- <Alpha /> -->
				<!-- <img src={STATUS[status]} alt="" /> -->
				{#if status === 'Alpha'}
					<Alpha />
				{:else if status === 'Beta'}
					<Beta />
				{:else if status === 'Playable'}
					<Playable />
				{:else}
					<!-- Default to InDev if no status matches -->
					<InDev />
				{/if}
				<h6>{title}</h6>
			</div>
		</div>
	</Card>
</a>

<style lang="postcss">
	.card-content-container {
		height: calc(100% + 1px);
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		width: calc(100% + 2px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.card-content {
		padding: 0 17px;
		width: calc(100% + 9px);
		display: flex;
		flex-direction: column;
		gap: 15px;
		align-items: flex-start;
		justify-content: flex-end;
		height: 185px;
		background: linear-gradient(
			180deg,
			rgba(15, 12, 0, 0) 0%,
			rgba(34, 12, 40, 0) 0.01%,
			rgba(34, 12, 40, 0.5) 20.83%,
			rgba(34, 12, 40, 0.95) 41.67%
		);
		padding-bottom: 20px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0px;
		transition: 0.3s;
		z-index: -1;
	}

	.card-content h6 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	/* 
	.card-content-container:hover .card-content {
	}

	.card-content-container:hover .card-info {
		visibility: visible;
		opacity: 1;
	} */
</style>
