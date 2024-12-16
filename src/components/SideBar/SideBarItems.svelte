<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Arrow from '$lib/assets/subItemsArrow.svg';
	import SupportTicket from '$lib/assets/Ticket-Star-mobile1.svg';
	import logoutSvg from '$lib/assets/logout1.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	export let logOutHandler;
	export let openTicketsHandler;
	export let btnHandler;

	import {
		explore,
		courses,
		games,
		networking,
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

<nav dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="flex flex-col items-start gap-[30px] w-full">
	{#if $page}
		<div class="flex flex-col gap-[16px] items-start justify-center w-full">
			<p class="text-[#68566E] text-[14px] font-Gilroy-Medium">{$t('mainMenu')}</p>
			<div class="flex flex-col gap-[20px] items-start w-full">
				{#each navitems as item}
					<button
						on:click={item.path ? btnHandler : ''}
						class="relative w-full"
						on:click={() => openSubNavHandler(item.id)}
					>
						<a
							href={item.path}
							class="flex items-center justify-between relative cursor-pointer {isParentActive(
								item,
								$page.url.pathname
							) && item.available
								? 'active'
								: 'unActive'} {item.available ? '' : 'notAvailable'} {openSubNavId === item.id
								? 'openedSub'
								: ''}"
						>
							<div class="flex items-center gap-[12px] relative">
								<img src={item.svg} alt="" class="w-[20px] normal duration-200 navImage" />
								<img src={item.focusedSvg} alt="" class="w-[20px] focusedSvg" />

								<p class="text-[#A99FAC] text-[14px] font-Gilroy-Medium duration-200 navText">
									{item.title}
								</p>
								{#if item.isnew}
									<span class="new">{$t(`New`)}</span>
								{/if}
							</div>

							{#if item.subItems}
								<img src={Arrow} alt="" class="duration-200 arrow" />
							{/if}

							{#if !item.available}
								<span class="coming-soon">{$t(`comingSoon`)}</span>
							{/if}
						</a>

						{#if item.subItems}
							<button
								on:click={btnHandler}
								class="flex flex-col items-start gap-[12px] mt-[12px] ml-[32px] submenu {openSubNavId ===
								item.id
									? 'submenuActive'
									: 'h-0 hidden opacity-0'}"
							>
								{#each item.subItems as subitem}
									<a
										href={subitem.path}
										class="flex items-center gap-[12px] w-full {$page.url.pathname === subitem.path
											? 'subactive'
											: ''}"
									>
										<img src={subitem.svg} alt="" class="w-[18px]" />
										<div class="flex flex-col items-start gap-[4px] w-full max-w-[244px]">
											<p
												class="text-[#D4CFD6] text-[14px] font-Gilroy-SemiBold leading-[17px] subitemTitle"
											>
												{subitem.title}
											</p>
											<p
												class="text-[#7E6E83] text-[10px] font-Gilroy-Regular leading-[12px] subitemText"
											>
												{subitem.subText}
											</p>
										</div>
									</a>
									<div class="h-[1px] w-full bg-[#342139]" />
								{/each}
							</button>
						{/if}
					</button>
				{/each}
			</div>
		</div>
		<button onclick={btnHandler} class="flex flex-col gap-[16px] items-start justify-center w-full">
			<p class="text-[#68566E] text-[14px] font-Gilroy-Medium">{$t('other')}</p>
			<div class="flex flex-col gap-[20px] items-start w-full">
				<button
					on:click={() => {
						openTicketsHandler();
						btnHandler();
					}}
					class="flex items-center gap-[12px] relative"
				>
					<img src={SupportTicket} alt="" class="w-[20px]" />

					<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium duration-200">
						{$t('Support Ticket')}
					</p>
				</button>
				<button on:click={logOutHandler} class="flex items-center gap-[12px] relative">
					<img src={logoutSvg} alt="" class="w-[20px]" />

					<p class="text-[#F71756] text-[14px] font-Gilroy-Medium duration-200">
						{$t('logout')}
					</p>
				</button>
			</div>
		</button>
	{/if}
</nav>

<style>
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
		padding: 2px 4px 1px 4px;
		position: absolute;
		width: 22px;
		height: 10px;
		left: -9px;
		top: -6px;
		border-radius: 100px;
		border: 2px solid #19081d;
		background: var(--Accent, #8ec9ed);
		color: #17242c;
		font-family: Gilroy-SemiBold;
		font-size: 6px;
		transition: 200ms;
	}

	.new:lang(ar) {
		left: unset;
		right: -9px;
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
	}

	.unActive:hover img {
		filter: invert(78%) sepia(66%) saturate(352%) hue-rotate(1deg) brightness(186%) contrast(108%);
	}

	.unActive:hover.openedSub .arrow {
		transform: rotate(180deg);
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

	.notAvailable:hover .coming-soon {
		top: 10px;
		opacity: 1;
	}

	.submenu {
		opacity: 0;
		transition: opacity 200ms, transform 200ms;
		pointer-events: none;
	}

	.submenuActive {
		opacity: 1;
		pointer-events: auto;
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
