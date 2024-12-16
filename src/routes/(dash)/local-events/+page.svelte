<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onDestroy, onMount } from 'svelte';

	import EventsList from '$components/LocalEvents/EventsList.svelte';
	import SearchBar from '$components/SearchBar.svelte';
	import DownArrow from '$lib/assets/Arrow - Down.svg';
	import Search from '$lib/assets/Header-Search.svg';
	import { browser } from '$app/environment';

	export let data;


	let isOpen = false;
	let isSearchOpen = false;
	let searchBarElement;
	let searchButtonElement;

	let tabs = [$t('all'), $t('On-Going'), $t('upcoming'), $t('finished')];
	let activeTab = $t('all');
	$: copyList = [];

	onMount(() => {
		copyList = assignList();
	});

	function assignList() {
		if (activeTab == $t('all')) {
			return data.localevents.all;
		} else if (activeTab == $t('On-Going')) {
			return data.localevents.ongoing;
		} else if (activeTab == $t('upcoming')) {
			return data.localevents.upcoming;
		} else if (activeTab == $t('finished')) {
			return data.localevents.finished;
		}
	}

	function setActiveTab(tab) {
		activeTab = tab;
		copyList = assignList();
		isOpen = false;
	}

	function search(value) {
		if (value == '') {
			copyList = assignList();
		} else {
			copyList = assignList().filter((f) => f.title.toLowerCase().includes(value.toLowerCase()));
		}
	}

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

<div class="p-[1rem] sm:p-[30px] overflow-x-hidden">
	<div class="flex flex-col items-start gap-[40px] w-full">
		<div class="flex justify-between items-center gap-[10px] w-full relative">
			<div class="relative lg:hidden">
				<button
					on:click={() => {
						isOpen = !isOpen;
					}}
					class="flex items-center justify-between gap-[12px] py-[12px] pr-[13px] pl-[16px] rounded-[6px] bg-[#140718] w-[167.71px]"
				>
					<p class="text-[#BEB6C0] text-[16px] font-Gilroy-SemiBold capitalize">
						{activeTab}
					</p>
					<img src={DownArrow} alt="" class="w-[18px] {isOpen ? 'rotate-180' : ''}" />
				</button>
				{#if isOpen}
					<div
						class="flex flex-col items-start gap-[10px] py-[12px] px-[13px] rounded-[6px] bg-[#140718] absolute left-0 top-[110%] w-full z-[90]"
					>
						{#each tabs as tab}
							<button
								class="flex justify-start py-[4px] px-[12px] rounded-[4px] cursor-pointer w-full"
								class:active={activeTab === tab}
								on:click={() => setActiveTab(tab)}
							>
								<p class="text-[#FFFFFFB2] text-[14px] font-Gilroy-Medium">{tab}</p>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="hidden lg:flex items-center gap-[12px] p-[8px] rounded-[100px] bg-[#140718]">
				{#each tabs as tab}
					<button
						class="py-[8px] px-[18px] rounded-[100px] cursor-pointer"
						class:active={activeTab === tab}
						on:click={() => setActiveTab(tab)}
					>
						<p class="text-[#BEB6C0] text-[16px] font-Gilroy-SemiBold">{tab}</p>
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
				class="absolute right-0 duration-200 {isSearchOpen
					? 'w-full opacity-100'
					: 'w-0 opacity-0'}"
				bind:this={searchBarElement}
			>
				<SearchBar type="tournaments" placeholder={$t('searchGames')} data={data.localevents.all} />
			</div>
			<div class="hidden lg:block">
				<SearchBar type="tournaments" placeholder={$t('searchGames')} data={data.localevents.all} />
			</div>
		</div>

		<EventsList type={activeTab} list={copyList} />
		<!-- {#if activeTab === 'All'}
			<EventsList type="all" list={data.localevents.all} />
		{:else if activeTab === 'On-Going'}
			<EventsList type="on-going" list={data.localevents.ongoing} />
		{:else if activeTab === 'Upcoming'}
			<EventsList type="upcoming" list={data.localevents.upcoming} />
		{:else if activeTab === 'Finished'}
			<EventsList type="finished" list={data.localevents.finished} />
		{/if} -->
	</div>
</div>

<style>
	.active {
		background-color: #3d2644;
	}

	.active p {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
