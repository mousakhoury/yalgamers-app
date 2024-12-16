<script>
	// @ts-nocheck

	import ArticleCard from './../../../components/Explore-Games/ArticleCard.svelte';
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Button from '$components/Button.svelte';
	import SearchBar from '$components/SearchBar.svelte';
	const filterableItems = ['Newest', 'Top Rated', 'All'];
	import filterSvg from '$lib/assets/filter.svg';
	import Filter from '$components/Filter.svelte';
	import ExploreGameCard from '$components/Explore-Games/ExploreGameCard.svelte';
	import GamesFilter from '$components/GamesFilter.svelte';
	import crossSvg from '$lib/assets/close.svg';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Genres from '$components/Genres.svelte';
	import LeftArrow from '$lib/assets/pagination-back-arrow.svg';
	import RightArrow from '$lib/assets/small-right-arrow.svg';
	export let data;

	let loadingRef;
	let loadingData = false;
	let filter = {
		Platform: [],
		Network: [],
		Status: [],
		Genres: [],
		Favorite: false,
		'Free to Play': false
	};
	if (browser && $page.url.search) {
		const filters = $page.url.search.slice(1).split('&');
		filters.forEach((e) => {
			let [key, value] = e.split('=');
			value = decodeURIComponent(value);
			key = decodeURIComponent(key);
			if (key == 'Free to Play' || key == 'Favorite') {
				if (value == 'true') {
					filter[`${key.toString()}`] = true;
				}
			} else {
				if (!filter[`${key}`].includes(value)) filter[`${key}`].push(value);
			}
		});
	}

	$: games = data.games;
	let query;
	let filterOpen = false;

	let filterCopy = {
		Platform: [],
		Network: [],
		Status: [],
		Genres: [],
		Favorite: false,
		'Free to Play': false
	};

	function updateQuery() {
		query = '?';
		if (filter.Platform.length != 0) {
			filter.Platform.forEach((e) => {
				query += `Platform=${e}&`;
			});
		}
		if (filter.Network.length != 0) {
			filter.Network.forEach((e) => {
				query += `Network=${e}&`;
			});
		}
		if (filter.Status.length != 0) {
			filter.Status.forEach((e) => {
				query += `Status=${e}&`;
			});
		}
		if (filter.Genres.length != 0) {
			filter.Genres.forEach((e) => {
				query += `Genres=${e}&`;
			});
		}
		if (filter.Favorite) {
			query += `Favorite=true&`;
		}
		if (filter['Free to Play']) {
			query += `Free to Play=true&`;
		}
		const len = query.length;
		if (query[len - 1] == '&' || len == 1) {
			if (len == 1) query = '';
			else query = query.slice(0, len - 1);
		}
		if (browser && decodeURIComponent($page.url.search) !== query) goto(`/games${query}`);
	}

	$: updateQuery(filter);

	function clearIndividualFilter(type) {
		if (type == 'Favorite' || type == 'Free to Play') filter[`${type}`] = false;
		else filter[`${type}`] = [];
		filter = filter;
	}

	function restoreScrollPosition() {
		const scrollPosition = sessionStorage.getItem('scrollPosition');
		if (scrollPosition) {
			window.scroll({
				top: parseInt(scrollPosition)
			});

			sessionStorage.removeItem('scrollPosition');
		}
	}
	onMount(() => {
		setTimeout(restoreScrollPosition, 100);
		if (!loadingRef) {
			return;
		}

		const loadingObserver = new IntersectionObserver((entries) => {
			const element = entries[0];
			if (element.isIntersecting) {
				fetchPaginatedData();
			}
		});

		loadingObserver.observe(loadingRef);
	});

	async function fetchPaginatedData() {
		let search = $page.url.search;
		if (games.page < games.totalPages) {
			loadingData = true;

			const page = games.page + 1;
			if (search == '') {
				search = `?page=${page}`;
			} else {
				search = search + `&page=${page}`;
			}

			let response = await fetch(`/api/games${search}`);
			response = await response.json();
			if (response) {
				response.items = [...games.items, ...response.items];
				games = response;
			}
			loadingData = false;
		}
	}

	function getPlatformNameById(value) {
		let item = games.items.find((f) => f.platforms.includes(value));
		item = item.expand.platforms.find((f) => f.id == value);
		return item.name;
	}

	function getNetworkNameById(value) {
		let item = games.items.find((f) => f.network.includes(value));
		item = item.expand.network.find((f) => f.id == value);
		return item.network;
	}

	function get_genre_Name_ById(id) {
		let item = data.genres.genres.find((f) => f.id == id);
		return item.name_en;
	}

	function change_page(currentPage) {
		const url = new URLSearchParams($page.url.search); // Get current search parameters
		url.set('page', `${currentPage}`); // Set the new page parameter

		// Navigate to the updated URL
		if (browser) {
			goto(`/games?${url.toString()}`); // Assuming you are on a page like `/games`
		}
	}
</script>

<div class=" px-[10px] sm:px-[30px]">
	<Genres genres={data.genres.genres} />
</div>
<div class=" px-[10px] sm:px-[30px]">
	<div>
		<div class="flex items-center justify-between mt-10">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white font-Gilroy-Bold text-xl md:text-[42px] font-normal not-italic"
			>
				{$t('games')}
			</p>
			<div class="flex justify-center items-center gap-[30px]">
				<div class="hidden min-[768px]:flex">
					<SearchBar type="games" placeholder={$t('searchGames')} data={games.items} />
				</div>
				<Filter {filterableItems} type="game" filteredItem="Newest" />

				<button
					class="p-[13px] flex justify-between gap-2 relative bg-accent rounded-[10px] cursor-pointer border-solid border"
					on:click|stopPropagation={() => {
						filterOpen = true;
					}}
				>
					<img loading="lazy" alt="filter icon" height="24px" width="24px" src={filterSvg} />
					<div class="flex items-center justify-center gap-5">
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal pointer-events-none text-white-30 font-Gilroy-Medium"
						>
							{$t('filter')}
						</p>
					</div>
				</button>
			</div>
		</div>

		<div class="w-full place-items-start place-content-start gap-[30px] mb-[60px]">
			<div class=" flex flex-wrap gap-[15px] mt-5">
				{#if filter.Platform.length != 0}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Platform
						</p>
						{#each filter.Platform as item}
							<div
								class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
							>
								{getPlatformNameById(item)}
							</div>
						{/each}
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Platform')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}

				{#if filter.Network.length != 0}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Network
						</p>
						{#each filter.Network as item}
							<div
								class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
							>
								{getNetworkNameById(item)}
							</div>
						{/each}
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Network')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}

				{#if filter.Status.length != 0}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Status
						</p>
						{#each filter.Status as item}
							<div
								class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
							>
								{item}
							</div>
						{/each}
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Status')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}

				{#if filter.Genres.length != 0}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Genres
						</p>
						{#each filter.Genres as item}
							<div
								class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
							>
								{get_genre_Name_ById(item)}
							</div>
						{/each}
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Genres')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}

				{#if filter['Free to Play']}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Free to Play
						</p>
						<div
							class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
						>
							On
						</div>
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Free to Play')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}

				{#if filter.Favorite}
					<div
						class="rounded-[100px] border-solid border-2 justify-center items-center px-[10px] border-white-10 w-fit flex py-[6px] gap-[10px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-base not-italic font-normal text-white-60 font-Gilroy-SemiBold"
						>
							Favorite
						</p>
						<div
							class="h-[28px] rounded-[100px] px-[10px] pt-[5px] pb-[3px] bg-accent-yellow-10 flex justify-center items-center text-accent-yellow font-Gilroy-SemiBold text-base font-normal not-italic"
						>
							On
						</div>
						<button
							class="h-5 w-5 rounded-full bg-white-10 p-[2px]"
							on:click={() => clearIndividualFilter('Favorite')}
							><img
								loading="lazy"
								src={crossSvg}
								alt="cross svg"
								height="16px"
								width="16px"
							/></button
						>
					</div>
				{/if}
			</div>

			<div
				class="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-8"
			>
				{#each games.items as item}
					<!-- <ExploreGameCard game={item} bind:filter /> -->
					<ArticleCard article={item} bind:filter />
				{/each}
			</div>

			<div class="loading-indicator" bind:this={loadingRef}>
				{#if loadingData}
					<div class="w-full text-center text-white-70 mt-5">Loading...</div>
				{/if}
			</div>
		</div>

		<GamesFilter
			genres={data.genres.genres.map((m) => ({
				title: m.name_en,
				focused: false,
				id: m.id
			}))}
			bind:visible={filterOpen}
			bind:filter
			{data}
		/>
	</div>
</div>
