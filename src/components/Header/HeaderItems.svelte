<script>
	// @ts-nocheck

	import { t, locale, locales } from '$lib/stores/i18n';
	import Arrow from '$lib/assets/subItemsArrow.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		explore,
		courses,
		games,
		networking,
		networkingActive,
		gamesFocused,
		tournaments,
		exploreFocused,
		tournamentFocused,
		haveFun,
		haveFunFocused,
		leadboard,
		leadboardFocused,
		LocalEvents,
		OnlineEvents,
		Quests,
		QuestsActive,
		ProjectQuest,
		GeneralQuest,
		Articles,
		Rewards,
		RewardsActive,
		News
	} from '$lib/assets/navicons.js';

	$: navitems = [
		{
			id: 1,
			title: $t(`Explore`),
			focusedSvg: exploreFocused,
			path: '/',
			svg: explore,
			available: true,
			isnew: false
		},
		{
			id: 2,
			title: $t(`games`),
			focusedSvg: gamesFocused,
			svg: games,
			available: true,
			isnew: false,
			subItems: [
				{
					title: $t(`courses`),
					path: '/tutorials',
					svg: courses,
					available: true,
					isnew: false,
					subText: $t('tutorialsSubText')
				},
				{
					title: $t(`articles`),
					path: '/games',
					svg: Articles,
					available: true,
					isnew: false,
					subText: $t('articlesSubText')
				},
				{
					title: $t(`news`),
					path: '/news',
					svg: News,
					available: true,
					isnew: false,
					subText: $t('newsSubText')
				}
			]
		},
		{
			id: 3,
			title: $t(`tournaments`),
			focusedSvg: tournamentFocused,
			svg: tournaments,
			available: true,
			isnew: false,
			subItems: [
				{
					title: $t('localTournaments'),
					path: '/local-events',
					svg: LocalEvents,
					available: true,
					isnew: false,
					subText: $t('localTournamentsText')
				},
				{
					title: $t(`onlineTournament`),
					path: '/tournaments',
					svg: OnlineEvents,
					available: true,
					isnew: false,
					subText: $t('onlineTournamentsText')
				}
			]
		},
		{
			id: 4,
			title: $t(`Quests`),
			focusedSvg: QuestsActive,
			svg: Quests,
			available: true,
			isnew: true,
			subItems: [
				{
					title: $t('generalQuests'),
					path: '/main-quests',
					svg: GeneralQuest,
					available: true,
					isnew: false,
					subText: $t('mainQuestsText')
				},
				{
					title: $t(`projectQuests`),
					path: '/quests',
					svg: ProjectQuest,
					available: true,
					isnew: false,
					subText: $t('projectQuestsText')
				}
			]
		},
		{
			id: 5,
			title: $t(`havefun`),
			focusedSvg: haveFunFocused,
			path: '/have-fun',
			svg: haveFun,
			available: true,
			isnew: false
		},
		{
			id: 6,
			title: $t(`leaderboard`),
			focusedSvg: leadboardFocused,
			path: '/leaderboard',
			svg: leadboard,
			available: true,
			isnew: false
		},

		{
			id: 7,
			title: $t(`rewards`),
			focusedSvg: RewardsActive,
			path: '/rewards',
			svg: Rewards,
			available: true,
			isnew: false
		},
		{
			id: 8,
			title: $t(`networking`),
			focusedSvg: networkingActive,
			path: '/networking',
			svg: networking,
			available: true,
			isnew: false
		}
	];

	let isScrollingDown = false;
	let isHovered = false;
	let openSubNavId = null;

	function openSubNavHandler(id) {
		openSubNavId = openSubNavId === id ? null : id;
	}

	function handleClickOutside(event) {
		const nav = document.querySelector('nav');
		if (nav && !nav.contains(event.target)) {
			openSubNavId = null;
		}
	}

	onMount(() => {
		let lastScrollTop = 0;

		const handleScroll = () => {
			const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (currentScrollTop > lastScrollTop && !isHovered) {
				isScrollingDown = true;
				openSubNavId = null; // Remove submenu when scrolling down
			} else {
				isScrollingDown = false;
			}

			lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
		};

		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleMouseEnter() {
		isHovered = true;
		isScrollingDown = false;
	}

	function handleMouseLeave() {
		isHovered = false;
		const nav = document.querySelector('nav');
		if (nav) {
			nav.classList.add('scroll-down');
			nav.classList.remove('scroll-up');
		}
	}

	function isParentActive(item, currentPath) {
		if (currentPath === item.path) {
			return true;
		}
		if (item.subItems) {
			return item.subItems.some((subitem) => currentPath === subitem.path);
		}
		return false;
	}
</script>

<nav
	dir={$locale == 'ar' ? 'rtl' : 'ltr'}
	class="bg-accent px-[30px] sticky w-full z-[50] transition-all duration-300 lg:block hidden"
	class:scroll-down={isScrollingDown}
	class:scroll-up={!isScrollingDown}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	{#if $page}
		<div class="flex items-center justify-center w-full border-t border-[#2C202F]">
			<div class="flex items-center justify-around w-full max-w-[1371.44px]">
				{#each navitems as item}
					<button class="relative" on:click={() => openSubNavHandler(item.id)}>
						<a
							href={item.path}
							class="flex items-center gap-[8px] py-[20px] relative cursor-pointer {isParentActive(
								item,
								$page.url.pathname
							) && item.available
								? 'active'
								: 'unActive'} {item.available ? '' : 'notAvailable'} {openSubNavId === item.id
								? 'openedSub'
								: ''}"
						>
							<img src={item.svg} alt="" class="w-[24px] normal duration-200 navImage" />
							<img src={item.focusedSvg} alt="" class="w-[24px] focusedSvg" />

							<p class="text-[#A99FAC] text-[16px] font-Gilroy-Medium duration-200 navText">
								{item.title}
							</p>

							{#if item.subItems}
								<img src={Arrow} alt="" class="duration-200 arrow" />
							{/if}

							{#if !item.available}
								<span class="coming-soon">{$t(`comingSoon`)}</span>
							{/if}

							{#if item.isnew}
								<span class="new">{$t(`New`)}</span>
							{/if}
						</a>

						{#if item.subItems}
							<div
								class="flex flex-col items-start gap-[8px] p-[8px] absolute top-[100%] w-[380px] rounded-[8px] border border-[#ffffff26] bg-[#140718] submenu {$locale ===
								'ar'
									? 'right-[6px]'
									: 'left-[6px]'} {openSubNavId === item.id ? 'submenuActive' : ''}"
							>
								{#each item.subItems as subitem}
									<a
										href={subitem.path}
										class="flex items-center gap-[14px] p-[14px] rounded-[6px] bg-[#ffffff0d] hover:bg-[#ffffff1a] w-full {$page
											.url.pathname === subitem.path
											? 'subactive'
											: ''}"
									>
										<img src={subitem.svg} alt="" class="w-[30px]" />
										<div class="flex flex-col items-start gap-[4px] w-full max-w-[244px]">
											<p
												class="text-[#D4CFD6] text-[16px] font-Gilroy-SemiBold leading-[20px] subitemTitle"
											>
												{subitem.title}
											</p>
											<p
												class="text-[#7E6E83] text-[14px] font-Gilroy-Regular leading-[17px] text-start subitemText"
											>
												{subitem.subText}
											</p>
										</div>
									</a>
								{/each}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	.scroll-down {
		top: 0 !important;
	}

	.scroll-up {
		top: 80px !important;
	}

	.normal {
		display: block;
	}

	.focusedSvg {
		display: none;
	}

	.new {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2px 4px 2px 4px;
		position: absolute;
		width: 28px;
		height: 15px;
		left: -19px;
		top: 13px;
		border-radius: 100px;
		border: 2px solid #19081d;
		background: var(--Accent, #8ec9ed);
		color: #17242c;
		font-family: Gilroy-SemiBold;
		font-size: 8px;
		transition: 200ms;
	}

	.new:lang(ar) {
		left: unset;
		right: -19px;
	}

	.openedSub .navImage {
		filter: invert(78%) sepia(66%) saturate(352%) hue-rotate(1deg) brightness(186%) contrast(108%);
	}

	.openedSub p {
		color: #ffeb53;
	}

	.openedSub .arrow {
		transform: rotate(180deg);
	}

	.active::after {
		content: '';
		width: 130%;
		height: 2px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
	}

	.active p {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.active .normal {
		display: none;
	}

	.active .focusedSvg {
		display: block;
	}

	.unActive:hover p {
		color: #ffeb53;
		transform: translate(-1px, -5px);
	}

	.unActive:hover p:lang(ar) {
		transform: translate(1px, -5px);
	}

	.unActive:hover img {
		transform: translate(1px, -5px);
		filter: invert(78%) sepia(66%) saturate(352%) hue-rotate(1deg) brightness(186%) contrast(108%);
	}

	.unActive:hover.openedSub .arrow {
		transform: translate(1px, -5px) rotate(180deg);
	}

	.unActive:hover img:lang(ar) {
		transform: translate(-1px, -5px);
	}

	.unActive:hover .new {
		left: -18px;
		top: 8px;
	}

	.unActive:hover .new:lang(ar) {
		left: unset;
		right: -18px;
	}

	.coming-soon {
		padding: 4px 5px;
		width: 73px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		background: #792341;
		color: #fff;
		font-family: Gilroy-SemiBold;
		font-size: 10px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 20px;
		opacity: 0;
		transition: 200ms;
	}

	.notAvailable:hover p {
		transform: translate(-1px, 10px);
	}

	.notAvailable:hover img {
		transform: translate(1px, 10px);
	}

	.notAvailable:hover .coming-soon {
		top: 10px;
		opacity: 1;
	}

	.submenu {
		opacity: 0;
		transform: translateY(-10px);
		transition: opacity 200ms, transform 200ms;
		pointer-events: none;
	}

	.submenuActive {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.subactive {
		background: rgba(253, 235, 86, 0.08);
	}

	.subactive .subitemTitle {
		color: #ffeb53;
	}

	.subactive .subitemText {
		color: #fdeb56b3;
	}

	.subactive img {
		filter: invert(78%) sepia(66%) saturate(352%) hue-rotate(1deg) brightness(186%) contrast(108%);
	}
</style>
