<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import Placeholder from '$lib/assets/news/news-placeholder.png';
	import LatestNewsCard from '$components/News/LatestNewsCard.svelte';
	import NewsArticleHead from '$components/News/NewsArticleHead.svelte';
	import { onMount } from 'svelte';

	export let data;

	let newsItem = data.news_item;

	let latestNews = data.latest_news;

	let progress = 0;

	function updateProgress() {
		const content = document.querySelector('.article-section');
		const contentHeight = content.scrollHeight;
		const scrollPosition = window.scrollY + window.innerHeight;
		const visibleContentHeight = window.innerHeight;
		const totalScrollableContent = contentHeight - visibleContentHeight;

		const progressPercentage = Math.min((scrollPosition / totalScrollableContent) * 100 - 100, 100);
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

<div class="flex flex-col items-start gap-[24px] mt-[31px] px-[16px] sm:px-[30px] w-full">
	<div class="flex gap-[10px] justify-start items-center">
		<a
			href="/news"
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
			{$t('news')}
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
			{newsItem.title}
		</p>
	</div>
	<div class="grid grid-flow-col items-start gap-[24px] w-full">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<NewsArticleHead {newsItem} />
			<div class="grid grid-flow-col items-start gap-[80px] w-full">
				<article class="w-full article article-section">
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
					<h3>Introduction:</h3>
					<p>
						Spider Tanks is a unique shooter game based on the PvP system, which runs on computers
						and allows players to choose from a variety of tanks and weapons before embarking on an
						exciting battle in the arena. The game showcases the players' skills and strategies in
						leading the battle and achieving victory.
					</p>
					<p>&nbsp;</p>
					<ul>
						<li>Armor: The amount of damage the tank can take before it is destroyed.</li>
						<li>Speed: How fast the tank can move.</li>
						<li>Energy: How quickly the tank gains energy to use abilities.</li>
					</ul>
				</article>

				<div class="h-full w-[8px] relative hidden lg:block">
					<div class="h-[80vh] rounded-[100px] bg-[#fdeb5626] sticky top-[110px] w-[8px]">
						<div
							class="w-[8px] rounded-[100px] bg-[#FDEB56] progress-line relative"
							style="height: {progress}%;"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="lg:flex flex-col items-start gap-[12px] w-[289px] h-full relative hidden">
			<p class="text-[#FFFFFFE5] text-[24px] font-Gilroy-SemiBold leading-[29px]">
				{$t('LatestNews')}
			</p>
			<div class="flex flex-col items-start gap-[12px] w-[289px] sticky top-[-600px]">
				{#each latestNews as item}
					<LatestNewsCard newsItem={item} />
				{/each}
			</div>
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
