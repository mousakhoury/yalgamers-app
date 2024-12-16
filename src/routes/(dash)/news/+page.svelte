<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import NewsCard from '$components/News/NewsCard.svelte';
	import SearchBar from '$components/SearchBar.svelte';
	import Placeholder from '$lib/assets/news/news-placeholder.png';
	import Search from '$lib/assets/Header-Search.svg';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	// Create a new variable to store sorted news items in descending order by date
	let sortedNews = data.news.slice().sort((a, b) => new Date(b.created) - new Date(a.created));

	let filter = [
		{ title: 'All', type: 'all', number: data.news.length, list: sortedNews },
		{
			title: 'Latest',
			type: 'latest',
			number: data.latest.length,
			list: data.latest.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
		}
	];

	let selectedFilter = 'all';
	let isOpen = false;
	let isSearchOpen = false;
	let searchBarElement;
	let searchButtonElement;

	const handleClickOutside = (event) => {
		if (
			isSearchOpen &&
			searchBarElement &&
			!searchBarElement.contains(event.target) &&
			searchButtonElement &&
			!searchButtonElement.contains(event.target)
		) {
			isSearchOpen = false;
		}
	};

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleClickOutside);
		}
	});

	// Clean up the event listener when the component is destroyed
	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="flex flex-col items-start gap-[80px] w-full px-[16px] lg:px-[30px] pt-[40px]">
	<div class="flex items-center justify-between w-full">
		<div class="flex items-center gap-[12px]">
			{#each filter as item}
				<button
					on:click={() => {
						selectedFilter = item.type;
						sortedNews = item.list.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
					}}
					class="px-[10px] py-[8px] rounded-[4px] {selectedFilter === item.type
						? 'bg-[#8EC9ED26]'
						: ''}"
				>
					<p
						class="text-[16px] font-Gilroy-Medium {selectedFilter === item.type
							? 'text-[#8EC9ED]'
							: 'text-[#D4CFD6]'}"
					>
						{item.title} ({item.number})
					</p>
				</button>
			{/each}
		</div>
		<button
			class="lg:hidden"
			on:click={() => {
				isSearchOpen = !isSearchOpen;
			}}
			bind:this={searchButtonElement}
		>
			<img src={Search} alt="" class="w-[20px]" />
		</button>
		<div
			class="absolute right-0 duration-200 {isSearchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}"
			bind:this={searchBarElement}
		>
			<SearchBar type="news" placeholder="Search News" data={sortedNews} />
		</div>
		<div class="hidden lg:block">
			<SearchBar type="news" placeholder="Search News" data={sortedNews} />
		</div>
	</div>
	<div class="flex flex-col items-start gap-[20px] w-full">
		<h1 class="text-white text-[32px] font-Gilroy-Bold">{$t('LatestNews')}</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
			{#each sortedNews as newsItem}
				<NewsCard {newsItem} />
			{/each}
		</div>
	</div>
</div>
