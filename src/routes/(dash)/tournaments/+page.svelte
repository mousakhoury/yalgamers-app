<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import SearchBar from '$components/SearchBar.svelte';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import DownArrow from '$lib/assets/Arrow - Down.svg';
	import Search from '$lib/assets/Header-Search.svg';

	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import Card from '$components/Tournaments/Tournament-card.svelte';
	import Filter from '$components/Filter.svelte';
	import NewTournamentsCard from '$components/Tournaments/NewTournamentsCard.svelte';
	export let data;
	import { page } from '$app/stores';
	import TopTournament from '$components/TopTournament.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	const { ongoing, upcoming, yours, past } = data.groupedData;

	const allTournament = [...upcoming, ...ongoing, ...past].sort(
		(a, b) => new Date(a.deadline) - new Date(b.deadline)
	);

	let isOpen = false;
	let isSearchOpen = false;
	let searchBarElement;
	let searchButtonElement;

	const filterData = [
		{
			name: $t('all'),
			data: 'all'
		},
		{
			name: $t('On-Going'),
			data: 'ongoing'
		},
		{
			name: $t('upcoming'),
			data: 'upcoming'
		},
		{
			name: $t('Completed'),
			data: 'completed'
		},
		{
			name: $t('yours'),
			data: 'yours'
		}
	];

	let selectedFilter = 'all';

	const selectFilterHandler = (filter) => {
		selectedFilter = filter;
		isOpen = false;
	};

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

	console.log(allTournament);
</script>

<div class=" px-[10px] sm:px-[30px]">
	<TopTournament tournament={data.groupedData} />
</div>
<!-- <SubNavbar/> -->

<div class="mx-[10px] lg:mx-[30px] mb-[60px]">
	<div class="flex items-center justify-between w-full mt-[80px] relative">
		<div class="relative lg:hidden">
			<button
				on:click={() => {
					isOpen = !isOpen;
				}}
				class="flex items-center justify-between gap-[12px] py-[12px] pr-[13px] pl-[16px] rounded-[6px] bg-[#140718] w-[167.71px]"
			>
				<p class="text-[#BEB6C0] text-[16px] font-Gilroy-SemiBold capitalize">
					{filterData.find((item) => item.data === selectedFilter)?.name}
				</p>
				<img src={DownArrow} alt="" class="w-[18px] {isOpen ? 'rotate-180' : ''}" />
			</button>
			{#if isOpen}
				<div
					class="flex flex-col items-start gap-[10px] py-[12px] px-[13px] rounded-[6px] bg-[#140718] absolute left-0 top-[110%] w-full z-[90]"
				>
					{#each filterData as data}
						<button
							on:click={() => selectFilterHandler(data.data)}
							class="flex justify-start py-[4px] px-[12px] rounded-[4px] cursor-pointer w-full {selectedFilter ===
							data.data
								? 'bg-[#3D2644] active'
								: ''}"
						>
							<p class="text-[#FFFFFFB2] text-[14px] font-Gilroy-Medium">
								{data.name}
							</p>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<div
			class="hidden lg:flex items-start justify-between lg:justify-start gap-[3px] lg:gap-[20px] px-[9px] lg:px-[14px] py-[8px] lg:py-[13px] rounded-[100px] bg-[#140718] w-full lg:w-auto"
		>
			{#each filterData as data}
				<button
					on:click={() => selectFilterHandler(data.data)}
					class="px-[10px] lg:px-[24px] py-[6px] lg:py-[8px] rounded-[100px] cursor-pointer hover:bg-[#3D2644] {selectedFilter ===
					data.data
						? 'bg-[#3D2644] active'
						: ''}"
				>
					<p class="text-[#BEB6C0] text-[11px] lg:text-[22px] font-Gilroy-SemiBold">{data.name}</p>
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
			<SearchBar type="tournaments" placeholder={$t('searchGames')} data={allTournament} />
		</div>
		<div class="hidden lg:block">
			<SearchBar type="tournaments" placeholder={$t('searchGames')} data={allTournament} />
		</div>
	</div>

	{#if selectedFilter === 'all'}
		<div class="mt-6">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white pb-6 font-Gilroy-Bold text-[28px] sm:text-[35px] min-[768px]:text-[42px] font-normal not-italic"
			>
				{$locale === 'ar' ? 'كل البطولات' : 'All Tournaments'}
			</p>

			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1650px]:grid-cols-6 gap-x-[20px] gap-y-[30px]"
			>
				{#each allTournament as item}
					<NewTournamentsCard tournament={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if selectedFilter === 'upcoming'}
		<div class="mt-6">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white pb-6 font-Gilroy-Bold text-[28px] sm:text-[35px] min-[768px]:text-[42px] font-normal not-italic"
			>
				{$locale === 'ar' ? 'البطولات القادمة' : 'Upcoming Tournaments'}
			</p>

			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1650px]:grid-cols-6 gap-x-[20px] gap-y-[30px]"
			>
				{#each upcoming as item}
					<NewTournamentsCard tournament={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if selectedFilter === 'ongoing'}
		<div class="mt-6">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white pb-6 font-Gilroy-Bold text-[28px] sm:text-[35px] min-[768px]:text-[42px] font-normal not-italic"
			>
				{$locale === 'ar' ? 'البطولات المتاحة' : 'On-Going Tournaments'}
			</p>

			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1650px]:grid-cols-6 gap-x-[20px] gap-y-[30px]"
			>
				{#each ongoing as item}
					<NewTournamentsCard tournament={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if selectedFilter === 'completed'}
		<div class="mt-6">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white pb-6 font-Gilroy-Bold text-[28px] sm:text-[35px] min-[768px]:text-[42px] font-normal not-italic"
			>
				{$locale === 'ar' ? 'البطولات المنتهية' : 'Completed Tournaments'}
			</p>

			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1650px]:grid-cols-6 gap-x-[20px] gap-y-[30px]"
			>
				{#each past as item}
					<NewTournamentsCard tournament={item} />
				{/each}
			</div>
		</div>
	{/if}

	{#if selectedFilter === 'yours'}
		<div class="mt-6">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white pb-6 font-Gilroy-Bold text-[28px] sm:text-[35px] min-[768px]:text-[42px] font-normal not-italic"
			>
				{$locale === 'ar' ? 'البطولات الخاصة بك' : 'Your Tournaments'}
			</p>

			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1650px]:grid-cols-6 gap-x-[20px] gap-y-[30px]"
			>
				{#each yours as item}
					<NewTournamentsCard tournament={item} />
				{/each}
			</div>
		</div>
	{/if}

	<!-- {#if yours.length > 0}
		
	{/if} -->
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
