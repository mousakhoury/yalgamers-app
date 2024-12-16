<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	export let data;
	// @ts-nocheck
	import SearchBar from '$components/SearchBar.svelte';
	import Courses from '$components/Swiper/Courses.svelte';
	import Search from '$lib/assets/Header-Search.svg';

	import Filter from '$components/Filter.svelte';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { getOneWeekBeforeToday } from '$lib/utils.js';
	import TutorialsCard from '$components/Explore-Course/TutorialsCard.svelte';

	$: courses = data.courses.items;

	let isSearchOpen = false;
	let searchBarElement;
	let searchButtonElement;

	const filterData = [
		{
			title: $t('all'),
			name: 'All',
			data: data.courses.items
		},
		{
			title: $t('Latest'),
			name: 'Latest',
			data: data.courses.items.filter(
				(f) => new Date(f.created) > new Date(getOneWeekBeforeToday())
			)
		},
		{
			title: $t('Top Rated'),
			name: 'Top Rated',
			data: data.courses.items.filter((f) => f.stars > 3.5)
		}
	];

	let selectedFilter = 'All';

	const selectFilterHandler = (filter) => {
		selectedFilter = filter.name;
		courses = filter.data;
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
</script>

<!-- <SubNavbar/> -->
<div class="flex flex-col justify-center w-full px-3 mt-10 sm:mt-5 sm:px-5 gap-5">
	<p
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="text-white font-Gilroy-Bold text-xl min-[768px]:text-[28px] font-normal not-italic"
	>
		{$t('latestCourses')}
	</p>
	<div class=" w-full pt-0 min-[768px]:pt-5 min-[768px]:py-5 rounded-xl overflow-hidden">
		<Courses {courses} />
	</div>
</div>
<div class="mx-2 sm:mx-[30px]">
	<div class="flex justify-between items-center pt-[30px] gap-5 relative">
		<div class="flex items-center gap-[8px] lg:gap-[12px]">
			{#each filterData as data}
				<button
					on:click={() => selectFilterHandler(data)}
					class="p-[6px] lg:py-[8px] lg:px-[10px] rounded-[4px] cursor-pointer w-fit {selectedFilter ===
					data.name
						? 'bg-[#8EC9ED26]'
						: ''}"
				>
					<p
						class="text-[12px] lg:text-[16px] font-Gilroy-Medium {selectedFilter === data.name
							? 'text-[#8EC9ED]'
							: 'text-[#D4CFD6]'}"
					>
						{data.title} ({data.data.length})
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
			<SearchBar type="tutorials" placeholder={$t('SearchTutorial')} data={courses} />
		</div>

		<div class="hidden lg:block">
			<SearchBar type="tutorials" placeholder={$t('SearchTutorial')} data={courses} />
		</div>
		<!-- <Filter {filterableItems} /> -->
	</div>
	<div class="mt-[25px] md:mt-[50px] mb-[60px]">
		<!-- api called data -->
		<div>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="font-Gilroy-Bold min-[768px]:text-[28px] mb-[30px] text-white font-normal not-italic"
			>
				{$t('courses')}
			</p>
			<div
				class="w-full grid grid-flow-row justify-items-center items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1650px]:grid-cols-4 gap-x-[20px] gap-y-[30px]"
			>
				{#each courses as course (course.id)}
					<TutorialsCard {course} />
				{/each}
			</div>
		</div>
	</div>
</div>
