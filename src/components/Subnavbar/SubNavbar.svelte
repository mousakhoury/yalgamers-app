<script>
	import { t, locale } from '$lib/stores/i18n';

	import burger from '$lib/assets/desktop-burger-icone.svg';

	import {
		explore,
		courses,
		earn,
		games,
		networking,
		scholarship,
		gamesFocused,
		streams,
		tournaments,
		exploreFocused,
		courseFocused,
		tournamentFocused,
		haveFun,
		haveFunFocused,
		leadboard,
		leadboardFocused,
		LocalEvents,
		LocalEventsFocused,
		Quests,
		QuestsActive
	} from '$lib/assets/navicons.js';
	import NavItem from './NavItem.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	$: navitems = [
		{
			title: $t(`Explore`),
			focusedSvg: exploreFocused,
			path: '/',
			svg: explore,
			available: true,
			isnew: false
		},
		{
			title: $t(`courses`),
			focusedSvg: courseFocused,
			path: '/courses',
			svg: courses,
			available: true,
			isnew: false
		},
		{
			title: $t(`games`),
			focusedSvg: gamesFocused,
			path: '/games',
			svg: games,
			available: true,
			isnew: false
		},
		{
			title: $t('Local Events'),
			focusedSvg: LocalEventsFocused,
			path: '/local-events',
			svg: LocalEvents,
			available: true,
			isnew: false
		},
		{
			title: $t(`tournaments`),
			focusedSvg: tournamentFocused,
			path: '/tournaments',
			svg: tournaments,
			available: true,
			isnew: false
		},
		{
			title: $t(`havefun`),
			focusedSvg: haveFunFocused,
			path: '/have-fun',
			svg: haveFun,
			available: true,
			isnew: false
		},
		{
			title: $t(`leaderboard`),
			focusedSvg: leadboardFocused,
			path: '/leaderboard',
			svg: leadboard,
			available: true,
			isnew: false
		},
		{
			title: $t(`Quests`),
			focusedSvg: QuestsActive,
			path: '/quests',
			svg: Quests,
			available: true,
			isnew: true
		},
		{
			title: $t(`networking`),
			path: 'networking',
			svg: networking,
			available: false,
			isnew: false
		}
	];
	let pathname = [];
	$: pathname = $page.url.pathname.split('/');

	// This function will be called on scroll

	let isNavVisible = false; // Variable to control the visibility of the navitems

	function toggleNavVisibility() {
		isNavVisible = true; // Toggle the visibility
	}

	function leaveNavVisibility() {
		isNavVisible = false; // Toggle the visibility
	}

	function handleKeydown(event) {
		// Check if the key pressed is 'Enter' or 'Space'
		if (event.key === 'Enter' || event.key === ' ') {
			toggleNavVisibility();
		}
	}

	import { onMount } from 'svelte';
	let showAfterScroll = false; // Controls the visibility based on scroll position

	// Function to handle scroll events
	function handleScroll() {
		const scrollPosition = window.scrollY;
		showAfterScroll = scrollPosition > 50;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		// Initial check in case the page is already scrolled past 20px
		handleScroll();
	});
</script>

{#if pathname[1] != 'login' && pathname[1] != 'signup'}
	{#if !showAfterScroll}
		<div
			class="before-scroll flex justify-center items-center mt-5 hidden lg:flex w-full fixed top-5 z-50"
		>
			<!-- <div
				class="flex justify-around gap-[10px] items-center bg-accent rounded-2xl px-3 border-2 border-solid border-[#533E59]"
			>
				{#each navitems as { title, svg, available, path, focusedSvg }}
					<NavItem {available} {path}>
						<svelte:fragment slot="title">
							{title}
						</svelte:fragment>
						<svelte:fragment slot="icon">
							{#if $page.url.pathname == path && available}
								<img class="" src={focusedSvg} height="28px" width="28px" alt={`${title}-icon`} />
							{:else}
								<img class="" height="28px" width="28px" src={svg} alt={`${title}-icon`} />
							{/if}
						</svelte:fragment>
					</NavItem>
				{/each}
			</div> -->
		</div>
	{/if}
	{#if showAfterScroll}
		<div
			class="after-scroll flex justify-center items-center mt-5 hidden lg:flex w-fit fixed top-5 z-50 left-[50%] translate-x-[-50%]"
		>
			<div
				class="flex justify-around gap-[10px] items-center bg-accent {isNavVisible
					? 'rounded-2xl opacity-100'
					: 'rounded-[2rem] opacity-50 hover:opacity-100'}  px-3 border-2 border-solid border-[#533E59]"
				on:mouseleave={leaveNavVisibility}
				on:mouseover={toggleNavVisibility}
				role="menu"
				tabindex="0"
			>
				{#if !isNavVisible}
					<div
						role="button"
						tabindex="0"
						on:keydown={handleKeydown}
						class=" text-[#fff] cursor-pointer flex items-center gap-[12px] p-[12px]"
						on:click={toggleNavVisibility}
					>
						<img src={burger} alt="Toggle navigation menu" />
						<p>Menu</p>
					</div>
				{/if}
				{#if isNavVisible}
					{#each navitems as { title, svg, available, path, focusedSvg, isnew }}
						<NavItem {available} {path} {isnew}>
							<svelte:fragment slot="title">
								{title}
							</svelte:fragment>
							<svelte:fragment slot="icon">
								{#if $page.url.pathname == path && available}
									<img class="" src={focusedSvg} height="28px" width="28px" alt={`${title}-icon`} />
								{:else}
									<img class="" height="28px" width="28px" src={svg} alt={`${title}-icon`} />
								{/if}
							</svelte:fragment>
						</NavItem>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
{/if}
