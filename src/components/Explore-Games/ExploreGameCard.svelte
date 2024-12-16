<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import starSvg from '$lib/assets/star-fill.svg';
	import internetSvg from '$lib/assets/internet-white.svg';
	import windowSvg from '$lib/assets/windows.svg';
	import InDev from '$components/GameStatus/InDev.svelte';
	import Playable from './../GameStatus/Playable.svelte';
	import Beta from './../GameStatus/Beta.svelte';
	import Alpha from './../GameStatus/Alpha.svelte';

	import platformsIcon from '$lib/assets/platforms-icon.svg';
	import networkIcon from '$lib/assets/games-network-icon.svg';
	import wifiSvg from '$lib/assets/wifi.svg';
	import iosSvg from '$lib/assets/ios.svg';
	import androidSvg from '$lib/assets/android.svg';
	import appleSvg from '$lib/assets/apple.svg';
	import { getImageUrl } from '$lib/utils';
	import { goto } from '$app/navigation';

	const platformImg = {
		iOS: iosSvg,
		Android: androidSvg,
		Web: internetSvg,
		Apple: appleSvg,
		Windows: windowSvg
	};

	const networks = [
		'Binance Smart Chain',
		'Polygon',
		'Immutable X',
		'Ethereum',
		'Solana',
		'Ronin',
		'Sui',
		'Arbitrum',
		'NEAR',
		'AVAX',
		'G4AL',
		'Solana',
		'IMX',
		'Skale',
		'GALA(ETH)',
		'Solana-ETH',
		'Polygon-ETH'
	];

	export let game = null;
	export let filter = null;

	const handleClick = (field, title) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (filter[`${field}`].includes(title)) {
			const index = filter[`${field}`].indexOf(title);
			filter[`${field}`].splice(index, 1);
		} else {
			filter[`${field}`].push(title);
		}
		filter = filter;
	};
	$: gameImg = getImageUrl('games', game.id, game.card_image) + '?thumb=0x400';
	$: fill = 'none';
</script>

<div class="card w-full rounded-[14px] p-[1px] col-span-1">
	<!-- svelte-ignore a11y-interactive-supports-focus -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<a
		href="/games/{game.unique_title}"
		class=" lg:h-fit sm:h-full w-full rounded-[14px] bg-accent-2 px-[4px] py-[4px] flex justify-start items-stretch gap-[20px] flex-wrap sm:flex-nowrap relative"
	>
		<div class="games-card-container">
			<div class="relative">
				<img loading="lazy" class="main-image" src={gameImg} alt="" />
				<div class="rating">
					<img loading="lazy" src={starSvg} alt="" />
					<p>{game.rating}</p>
				</div>
			</div>
			<div class="games-card-info">
				<h6>{$locale === 'en' ? game.title_en : game.title}</h6>
				<p>
					{#each game.expand.genres_new as genre}
						<span>{genre.name_en}<i>,</i> </span>
					{/each}
				</p>
				{#if game.status === 'Alpha'}
					<Alpha filter={handleClick('Status', 'Alpha')} />
				{:else if game.status === 'Beta'}
					<Beta filter={handleClick('Status', 'Beta')} />
				{:else if game.status === 'Playable'}
					<Playable filter={handleClick('Status', 'Playable')} />
				{:else}
					<!-- Default to InDev if no status matches -->
					<InDev filter={handleClick('Status', 'Under Develop')} />
				{/if}

				<div class="games-card-data">
					{#if !game.platforms.length == 0}
						<div class="card-single-data">
							<div class="single-data-head">
								<img loading="lazy" src={platformsIcon} alt="" />
								<p>{$t('availablePlatforms')}</p>
							</div>
							<div class="single-data-images">
								{#each game.expand.platforms as platform}
									<button class="icon" on:click={handleClick('Platform', platform.id)}>
										<img
											class="icon_default"
											loading="lazy"
											src={getImageUrl(platform.collectionId, platform.id, platform.icon)}
											alt=""
										/>
										<img
											title={platform.name}
											class="icon_hover"
											loading="lazy"
											src={getImageUrl(platform.collectionId, platform.id, platform.hover_icon)}
											alt=""
										/>
									</button>
								{/each}
							</div>
						</div>
					{/if}

					{#if !game.network.length == 0}
						<div class="card-single-data">
							<div class="single-data-head">
								<img loading="lazy" src={networkIcon} alt="" />
								<p>{$t('networkStatus')}</p>
							</div>
							<div class="single-data-images">
								{#each game.expand.network as network}
									<a
										class="icon"
										href={`Network=${network.id}`}
										on:click={handleClick('Network', network.id)}
									>
										<img
											title={network.network}
											class=""
											loading="lazy"
											src={getImageUrl(network.collectionId, network.id, network.img)}
											alt=""
										/>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</a>
</div>

<style>
	:global(.card) {
		position: relative;
		background: #200b26 !important;
		z-index: 3;
		margin-top: 4.8px;
	}
	:global(.card::before) {
		width: calc(100% + 1.6px);
		height: calc(100% + 1.6px);
		top: -0.8px;
		left: -0.8px;
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: inherit;
		transition: 0.08s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}
	:global(.card:hover::before) {
		width: calc(100% + 3.2px);
		height: calc(100% + 3.2px);
		top: -1.6px;
		left: -1.6px;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
	}
	.card::before {
		border-radius: 16px;
	}
	.games-card-container {
		display: flex;
		gap: 12.8px;
	}
	.games-card-container .main-image {
		max-width: 184px;
		aspect-ratio: 184/245.34;
		border-radius: 14px;
		max-height: 245.34px;
	}

	.games-card-info {
		padding: 8px 0;
	}

	.games-card-info h6 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 20.8px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 4px;
	}

	.games-card-info p {
		color: var(--white-40, #7e6e83);
		font-family: Gilroy-SemiBold;
		font-size: 11.2px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.games-card-info p span:last-child i {
		display: none;
	}

	.games-card-info p:lang(ar) {
		font-size: 8px;
	}

	.games-card-data {
		margin-top: 18.4px;
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 11.2px;
	}

	.card-single-data {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8.8px;
	}

	.single-data-head {
		display: flex;
		align-items: center;
		gap: 4.8px;
	}

	.single-data-head p {
		color: var(--white-40, #7e6e83);
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 11.2px !important;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.single-data-images {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.single-data-images img {
		width: 17.6px;
	}

	.rating {
		display: inline-flex;
		height: 27.2px;
		padding: 4.8px 9.6px 4.8px 6.4px;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		border-radius: 8000px;
		background: var(--white-20, #533e59);
		position: absolute;
		top: 4.8px;
		right: 4.8px;
	}

	.rating p {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 14.4px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.rating p span {
		color: var(--white-50, #948798);
		font-family: Gilroy-Regular;
		font-size: 14.4px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.icon .icon_hover {
		display: none;
	}

	.icon:hover .icon_hover {
		display: block;
	}

	.icon:hover .icon_default {
		display: none;
	}

	@media (max-width: 460px) {
		.games-card-container {
			flex-direction: column;
			width: 100%;
		}

		.games-card-container .main-image {
			max-width: 100%;
			max-height: unset;
			width: 100%;
		}

		.single-data-head p {
			font-size: 12px;
		}
	}
</style>
