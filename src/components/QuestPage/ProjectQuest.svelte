<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import ProjectQuestCard from './ProjectQuestCard.svelte';
	import { onMount } from 'svelte';

	export let projects = [];

	// Sort projects by start date in descending order
	function sortProjectsByDate(projects) {
		return projects.sort((a, b) => new Date(b.start) - new Date(a.start));
	}

	function moveFeaturedToPosition(projects, width) {
		const featuredIndex = projects.findIndex((project) => project.isFeatured);
		if (featuredIndex === -1) {
			return projects;
		}
		const [featuredProject] = projects.splice(featuredIndex, 1);
		if (width > 1280) {
			projects.splice(2, 0, featuredProject);
		} else {
			projects.splice(0, 0, featuredProject);
		}
		return projects;
	}

	function handleResize() {
		updatedProjects = moveFeaturedToPosition(sortProjectsByDate([...projects]), window.innerWidth);
	}

	onMount(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
		updatedProjects = sortProjectsByDate(projects);
	});

	const filterData = [
		{ name: $t('all'), data: 'all' },
		{ name: $t('Available'), data: 'available' },
		{ name: $t('Ended'), data: 'ended' },
		{ name: $t('Completed'), data: 'completed' }
	];

	let selectedFilter = 'all';

	function countProjects(filter) {
		if (filter === 'all') {
			return projects.length;
		} else if (filter === 'available') {
			return projects.filter((f) => f.isActive).length;
		} else if (filter === 'ended') {
			return projects.filter((f) => f.isEnded).length;
		} else if (filter === 'completed') {
			return projects.filter((f) => f.isCompleted).length;
		}
		return 0;
	}
</script>

<div class="flex flex-col items-start w-full gap-[24px] px-[10px] sm:px-[30px]">
	<div class="flex items-start gap-[12px]">
		{#each filterData as data}
			<button
				on:click={() => (selectedFilter = data.data)}
				class="px-[10px] py-[8px] cursor-pointer rounded-[4px] hover:bg-[#8ec9ed26] {selectedFilter ===
				data.data
					? 'bg-[#8ec9ed26] active'
					: ''}"
			>
				<p class="text-[#D4CFD6] font-Gilroy-SemiBold">{data.name} ({countProjects(data.data)})</p>
			</button>
		{/each}
	</div>

	<div class="w-full">
		<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[29px]">
			<!-- <div class="w-full"> -->
			{#if selectedFilter == 'all'}
				{#each sortProjectsByDate(projects) as project}
					<ProjectQuestCard {project} />
				{/each}
			{:else if selectedFilter == 'available'}
				{#each sortProjectsByDate(projects.filter((f) => f.isActive)) as project}
					<ProjectQuestCard {project} />
				{/each}
			{:else if selectedFilter == 'ended'}
				{#each sortProjectsByDate(projects.filter((f) => f.isEnded)) as project}
					<ProjectQuestCard {project} />
				{/each}
			{:else if selectedFilter == 'completed'}
				{#each sortProjectsByDate(projects.filter((f) => f.isCompleted)) as project}
					<ProjectQuestCard {project} />
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.active {
		background-color: #8ec9ed26;
	}
	.active p {
		color: #8ec9ed;
	}
</style>
