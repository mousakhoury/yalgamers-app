<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import Subnavbar from './Subnavbar.svelte';
	import starSvg from '$lib/assets/star-fill.svg';
	import Button from '$components/Button.svelte';
	import Polygon from '$lib/assets/polygon.png';
	import shareIcon from '$lib/assets/share.svg';
	import closeSvg from '$lib/assets/close.svg';
	import MoreArticle from '$lib/assets/more=articles.png';
	import '../../../../app.css';
	import { browser } from '$app/environment';
	import { getImageUrl } from '$lib/utils';
	import AddReview from '$components/UserRating/AddReview.svelte';
	export let data;
	import MoreArticleCard from '$components/Articles/MoreArticleCard.svelte';
	import GameArticleHead from '$components/Articles/GameArticleHead.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ArticleUserReview from '$components/Articles/ArticleUserReview.svelte';
	import { games } from '$lib/assets/navicons';

	let showReview = false;
	$: if (showReview) {
		if (browser) document.body.style.overflow = 'hidden';
	} else {
		if (browser) document.body.style.overflow = 'scroll';
	}

	let selectedTab = 'overview';

	let starred = data.game.starred;

	async function stargame() {
		let res = await fetch(`/api/star-game?game=${data.game.id}`);
		res = await res.json();
		starred = res.id;
	}

	async function unstargame() {
		let res = await fetch(`/api/unstar-game?id=${data.game.starred}`);
		res = await res.json();
		starred = null;
	}

	$: moreGames = [];

	// JavaScript for sticky behavior
	let stickyElement;
	let stickyContainer;
	let stickyStart;
	let containerBottom;

	function similarGameArticles() {
		moreGames = $page.data.games.items.filter((f) => f.id != data.game.id);
		moreGames = moreGames.slice(0, 4).map((m) => ({
			title: m.title_en,
			image: getImageUrl(m.collectionId, m.id, m.banner_image),
			tags: m.expand.genres_new.map((m) => m.name_en),
			auth: 'Yalgamers',
			unique_title: m.unique_title
		}));
	}

	// Set up the event listener
	onMount(() => {
		similarGameArticles();
	});

	let progress = 0;

	function updateProgress() {
		const content = document.querySelector('.article-section');
		const contentHeight = content.scrollHeight;
		const scrollPosition = window.scrollY + window.innerHeight;
		const visibleContentHeight = window.innerHeight;
		const totalScrollableContent = contentHeight - visibleContentHeight;

		const progressPercentage = Math.min((scrollPosition / totalScrollableContent) * 100 - 60, 100);
		progress = progressPercentage;
		// console.log(progress);
	}

	onMount(() => {
		updateProgress(); // Update on mount
		window.addEventListener('scroll', updateProgress);
		return () => {
			window.removeEventListener('scroll', updateProgress);
		};
	});
</script>

<div
	class="w-[min(100%,2000px)] flex flex-col justify-center m-auto"
	dir={$locale == 'ar' ? 'rtl' : 'ltr'}
>
	<div>
		{#if showReview}
			<div
				class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[51] flex items-center justify-center w-full h-full p-4 backdrop-blur-md"
			>
				<div
					class="bg-accent-review lg:w-[min(800px,99%)] h-fit absolute rounded-[16px] flex justify-center items-start flex-col p-5 md:p-[40px] m-auto"
					style="scale: 0.6;"
				>
					<button
						class="absolute flex items-start justify-start p-2 rounded-full cursor-pointer w-7 h-7 sm:w-10 sm:h-10 top-5 md:top-[40px] {$locale ==
						'ar'
							? 'left-5 md:left-[40px]'
							: 'right-5 md:right-[40px]'} bg-white-20"
						on:click={() => (showReview = false)}
					>
						<img
							loading="lazy"
							alt="back icon"
							width="24px"
							height="24px"
							src={closeSvg}
							class="cursor-pointer"
						/>
					</button>
					<AddReview gameInfo={data.game} action="?/review" onSucces={() => (showReview = false)} />
				</div>
			</div>
		{/if}

		<div class="flex flex-col xl:flex-row">
			<div class="flex flex-col items-start gap-[24px] mt-[31px] px-[16px] sm:px-[30px] w-full">
				<div class="flex gap-[10px] justify-start items-center">
					<a
						href="/games"
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
						{$t('games')}
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
						{$locale === 'en' ? data.game.title_en : data.game.title}
					</p>
				</div>

				<div class="grid grid-flow-col items-start gap-[24px] w-full">
					<div class="w-full">
						<div class="flex flex-col items-start gap-[24px] w-full">
							<GameArticleHead {data} {starred} {stargame} {unstargame} />

							<div class="grid grid-flow-col items-start gap-[80px] w-full">
								<div class="flex flex-col items-start gap-[20px] w-full article-section">
									<div class="flex items-center justify-between w-full">
										<p class="text-[#FFFFFFE5] text-[18px] lg:text-[24px] font-Gilroy-SemiBold">
											{#if selectedTab === 'userReview'}
												{$t('Overall Rating')}
											{:else if selectedTab === 'overview'}
												{$t('GeneralDetails')}
											{/if}
										</p>
										<Subnavbar bind:selectedTab />
									</div>

									<div class="flex flex-col items-start gap-[6px] w-full">
										{#if selectedTab === 'overview'}
											{#key data.pathname}
												<slot />
											{/key}
										{:else if selectedTab === 'userReview'}
											<ArticleUserReview {data} />
										{/if}

										<div
											class="flex flex-col items-center justify-center gap-[28px] review w-full lg:aspect-[907/274] rounded-[12px] mt-[40px] py-[56.5px] lg:py-[66px]"
										>
											<p
												class="text-[#FFFFFFCC] text-[28px] font-Gilroy-SemiBold leading-[34px] text-center max-w-[393px]"
											>
												{$t('articleReviewText')}
											</p>
											<button
												on:click={() => (showReview = !showReview)}
												disabled={data.review !== null}
												class="px-[28px] py-[12px] rounded-[8px] bg-[#FDEB56]"
											>
												<p class="text-[#2A0D32] text-[18px] font-Gilroy-SemiBold leading-[22px]">
													{data.review ? 'Review Submitted' : `${$t('writeReview')}`}
												</p>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- More Articles -->

					<div class="lg:flex flex-col items-start gap-[12px] w-[289px] h-full relative hidden">
						<p class="text-[#FFFFFFE5] text-[24px] font-Gilroy-SemiBold leading-[29px]">
							{$t('MoreArticles')}
						</p>
						<div class="flex flex-col items-start gap-[12px] w-[289px] sticky top-[-600px]">
							{#each moreGames as article}
								<MoreArticleCard {article} />
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: #280e30;
	}

	.bg-accent-review {
		border: 2px solid var(--white-20, #533e59);
		background: var(--Accent-2, #200b26);
	}

	.review {
		background-image: url($lib/assets/article/write-review-bg.svg);
		background-position: center;
		background-size: cover;
	}

	.grid {
		overflow: visible;
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
