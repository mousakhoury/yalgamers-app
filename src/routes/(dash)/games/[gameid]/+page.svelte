<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onMount } from 'svelte';

	import { twitter, youtube, discord, telegram, medium, website } from '$lib/assets/socials.js';
	import GamePageSwiper from '$components/Swiper/GamePageSwiper.svelte';
	import { getImageUrl } from '$lib/utils.js';
	import dashedHr from '$lib/assets/game-dashed-hr.svg';
	import gameHr from '$lib/assets/game-hr.svg';
	import playable from '$lib/assets/game-playable.svg';
	import gameVr from '$lib/assets/game-vr.svg';

	export let data;
	const game = data.game;
	const social_media_links = [
		{
			name: 'twitter',
			icon: twitter
		},
		{
			name: 'youtube',
			icon: youtube
		},
		{
			name: 'discord',
			icon: discord
		},
		{
			name: 'telegram',
			icon: telegram
		},
		{
			name: 'medium',
			icon: medium
		},
		{
			name: 'website',
			icon: website
		}
	];

	$: body = $locale === 'en' ? data.game.body_en : data.game.body;

	let progress = 0;

	function updateProgress() {
		const content = document.querySelector('.article');
		const contentHeight = content.scrollHeight;
		const scrollPosition = window.scrollY + window.innerHeight;
		const visibleContentHeight = window.innerHeight;
		const totalScrollableContent = contentHeight - visibleContentHeight;

		const progressPercentage = Math.min((scrollPosition / totalScrollableContent) * 100 - 60, 100);
		progress = progressPercentage;
	}

	onMount(() => {
		updateProgress(); // Update on mount
		window.addEventListener('scroll', updateProgress);
		return () => {
			window.removeEventListener('scroll', updateProgress);
		};
	});
</script>

<svelte:head>
	<title>Game - {game.title}</title>
</svelte:head>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div class="flex items-center gap-[15px] lg:gap-[50px] flex-col lg:flex-row w-full">
		<div class="flex items-start flex-col gap-[15px] w-full">
			{#if data.game.network.length > 0}
				<div class="flex items-center justify-between gap-[12px] w-full">
					<p class="text-[14px] lg:text-[16px] text-[#FFFFFFE5] font-Gilroy-Medium">
						{$t('Network')}
					</p>
					<img
						loading="lazy"
						src={dashedHr}
						alt=""
						class="w-[195px] sm:w-[unset] h-[2px] sm:h-[unset] object-cover"
					/>
					<div class="flex items-center gap-[12px]">
						{#each data.game.expand.network as netwrk}
							<div
								class="flex items-center gap-[10px] {$locale === 'ar' ? 'flex-row-reverse' : ''}"
							>
								<img
									loading="lazy"
									class="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px]"
									src={getImageUrl(netwrk.collectionId, netwrk.id, netwrk.img)}
									alt=""
								/>

								<p
									class="text-[14px] lg:text-[16px] text-[#FFFFFF99] font-Gilroy
									{data.game.expand.network.length >= 2 ? 'hidden' : ''}"
								>
									{netwrk.network}
								</p>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			{#if data.game.status}
				<div class="flex items-center justify-between gap-[12px] w-full">
					<p class="text-[14px] lg:text-[16px] text-[#FFFFFFE5] font-Gilroy-Medium">
						{$t('status')}
					</p>
					<img
						loading="lazy"
						src={dashedHr}
						alt=""
						class="w-[195px] sm:w-[unset] h-[2px] sm:h-[unset] object-cover"
					/>
					<div class="flex items-center gap-[10px] {$locale === 'ar' ? 'flex-row-reverse' : ''}">
						<img
							loading="lazy"
							class="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px]"
							src={playable}
							alt=""
						/>
						<p class="text-[14px] lg:text-[16px] text-[#FFFFFF99] font-Gilroy">
							{$t(data.game.status)}
						</p>
					</div>
				</div>
			{/if}
		</div>
		<img loading="lazy" src={gameVr} alt="" class="hidden lg:block" />
		<div class="flex items-start flex-col gap-[15px] w-full">
			{#if data.game.token}
				<div class="flex items-center justify-between gap-[12px] w-full">
					<p class="text-[14px] lg:text-[16px] text-[#FFFFFFE5] font-Gilroy-Medium">
						{$t('Token')}
					</p>
					<img
						loading="lazy"
						src={dashedHr}
						alt=""
						class="w-[195px] sm:w-[unset] h-[2px] sm:h-[unset] object-cover"
					/>
					<div class="flex items-center gap-[10px]">
						<p class="text-[14px] lg:text-[16px] text-[#FFFFFF99] font-Gilroy">
							{data.game.token ?? ''}
						</p>
					</div>
				</div>
			{/if}
			{#if data.game.platforms.length > 0}
				<div class="flex items-center justify-between gap-[12px] w-full">
					<p class="text-[14px] lg:text-[16px] text-[#FFFFFFE5] font-Gilroy-Medium">
						{$t('platforms')}
					</p>
					<img
						loading="lazy"
						src={dashedHr}
						alt=""
						class="w-[195px] sm:w-[unset] h-[2px] sm:h-[unset] object-cover"
					/>
					<div class="flex items-center gap-[10px]">
						{#each data.game.expand.platforms as platform}
							<div class="icon">
								<img
									loading="lazy"
									class="w-[16px] lg:w-[20px] h-[16px] lg:h-[20px] icon_default"
									src={getImageUrl(platform.collectionId, platform.id, platform.icon)}
									alt=""
								/>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
	<hr class="w-full border-[#ffffff1a]" />

	<div class="grid grid-flow-col items-start gap-[14px] w-full">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<article class="w-full max-w-[335px] sm:max-w-[550px] md:max-w-full article">
				{@html body}
			</article>
			<GamePageSwiper {game} />
			<footer class="flex flex-col items-start gap-[12px]">
				<p class="text-[#FFFFFFCC] text-[20px] font-Gilroy-SemiBold leading-[25px]">
					{$t('SocialMedia')}
				</p>
				<div class="flex items-center gap-[24px]">
					{#each social_media_links as link}
						{#if game?.[link.name] !== ''}
							<a href={game?.[link.name]} target="_blank">
								<img loading="lazy" class="w-[24px]" src={link.icon} alt={link.name} />
							</a>
						{/if}
					{/each}
				</div>
			</footer>
		</div>
	</div>
</div>

<style>
	.article :global() {
		font-size: 16px;
	}
	.article :global(h1) {
		font-family: 'Gilroy-SemiBold';
	}
	.article :global(h2) {
		font-size: 3rem;
		font-family: 'Gilroy-SemiBold';
	}
	.article :global(h3) {
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-SemiBold, fallback, All-Gender-Light;
		font-size: 30px;
		margin-bottom: 12px;
		margin-top: 24px;
	}
	.article :global(h3:first-child) {
		margin-top: 0;
	}
	.article :global(h4) {
		font-size: 1.8rem;
		font-family: 'Gilroy-SemiBold ,fallback,All-Gender-Light';
	}
	.article :global(p) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular, fallback, All-Gender-Light;
		font-size: 22px;
	}

	.article :global(p span) {
		font-size: 24px !important;
	}
	.article :global(a) {
		color: yellow;
		font-style: italic;
		text-decoration: underline;
	}
	.article :global(img) {
		margin: 20px 0 20px 0;
		/* width: 100%; */
		display: inline;
		border-radius: 10px;
	}

	.article :global(ol) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular;
		font-size: 22px;
		list-style-type: auto;
		margin-left: 15px;
	}

	.article :global(ol span),
	.article :global(ol li) {
		font-size: 24px !important;
	}

	.article :global(ul) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular;
		font-size: 22px;
		list-style-type: disc;
		margin-left: 15px;
	}

	.article :global(ul span),
	.article :global(ul li) {
		font-size: 24px !important;
	}

	.article :global(ol:lang(ar)) {
		margin-right: 15px;
		margin-left: 0;
	}

	.article :global(ul:lang(ar)) {
		margin-right: 15px;
	}

	.article :global(menu) {
		list-style: revert;
	}

	.progress-line::after {
		content: '';
		width: 20px;
		height: 20px;
		position: absolute;
		bottom: -1px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
		border: 4px solid #e2fd70;
		background: #1b1b1b;
	}
</style>
