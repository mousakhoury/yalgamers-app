<script>
	import { t, locale } from '$lib/stores/i18n';

	import MainQuest from '$components/QuestPage/MainQuest.svelte';
	import ProjectQuest from '$components/QuestPage/ProjectQuest.svelte';
	import { onMount } from 'svelte';

	export let data;

	// State variable to manage the toggle, initialized from local storage if available
	let activeQuest = 'project';
	// onMount(() => {
	// 	activeQuest = localStorage.getItem('activeQuest') || 'main';
	// });

	// function toggleQuest(quest) {
	// 	activeQuest = quest;
	// 	localStorage.setItem('activeQuest', activeQuest);
	// }
</script>

<div class="my-[30px] px-[10px] sm:px-[30px]">
	<div class="flex gap-[10px] justify-between items-center">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-[#FFF] text-[24px] lg:text-[42px] font-Gilroy-Bold"
		>
			{$t('Quests')}
		</p>
	</div>
</div>

<ProjectQuest projects={data.projects} />

<!-- <style>
	button.active {
		color: #e9e6ea;
		background: #ffffff33;
	}
</style> -->
