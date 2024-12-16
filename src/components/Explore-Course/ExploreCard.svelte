<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import emptyUser from '$lib/assets/profil-piture.svg';

	export let image;
	export let userExpand;
	export let id;
	export let title;
	export let unique_title = '';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { getImageUrl } from '$lib/utils';
	import Card from '$components/Card.svelte';
	let progressElement;
	onMount(() => {
		if (browser && progress) progressElement.style.width = progress * 3 + 'px';
	});
	let progress = 0;
	let courseimageUrl;
	$: courseimageUrl = getImageUrl('tutorials', id, image) + '?thumb=0x400';
	let userimageUrl;
	$: userimageUrl = userExpand.avatar
		? getImageUrl('users', userExpand.id, userExpand.avatar) + '?thumb=0x250'
		: emptyUser;
</script>

<a href={`/tutorials/${unique_title}`}>
	<Card image={courseimageUrl}>
		<div class="card-content-container">
			<div class="card-content">
				<h6>{title}</h6>
				<div class="user-info">
					<img loading="lazy" src={userimageUrl} alt="" />
					<p>{userExpand.username}</p>
				</div>
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
		height: 225px;
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
		bottom: -50px;
		transition: 0.3s;
		z-index: -1;
	}

	.card-content-container:hover .card-content {
		height: 225px;
		bottom: 0px;
	}

	.card-content h6 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.user-info {
		display: flex;
		align-items: center;
		gap: 12px;
		opacity: 0;
		visibility: hidden;
	}

	.card-content-container:hover .user-info {
		opacity: 1;
		visibility: visible;
	}
	.user-info img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}

	.user-info p {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	@media (max-width: 1023px) {
		.card-content-container .card-content {
			height: 225px;
			bottom: 0px;
		}
		.card-content-container .user-info {
			opacity: 1;
			visibility: visible;
		}
	}
</style>
