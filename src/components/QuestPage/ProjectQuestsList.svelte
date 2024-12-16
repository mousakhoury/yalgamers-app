<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Quest from '$components/Quests/Quest.svelte';
	import { onMount } from 'svelte';

	export let quests;
	export let selectOneTask;

	let selectedTask;
	$: completedQuests = quests.filter((f) => f.isCompleted).length;

	function selectTask(task, index) {
		selectedTask = task;
		selectOneTask(selectedTask, index);
	}

	onMount(() => {
		// Select the first quest by default
		if (quests.length > 0) {
			selectedTask = quests[0];
			selectOneTask(selectedTask, 0);
		}
	});
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div class="flex flex-col items-start gap-[19px] p-[16px] w-full rounded-[8px] bg-[#2A0D32]">
		<p class="text-[#68566E] text-[18px] font-Gilroy-Medium leading-[22px]">
			<span class="text-[#BEB6C0]">{completedQuests} {$t('Completed Quest')}</span> / {$t(
				'Total Quest'
			)}
			{quests.length}
		</p>
		<div class="flex items-center justify-center gap-[6px] w-full">
			{#each quests as quest}
				<div
					class={`w-full h-[6px] rounded-[100px] ${
						quest.isCompleted ? 'bg-[#BC5AD7]' : 'bg-[#533E59]'
					} `}
				/>
			{/each}
		</div>
	</div>

	<div
		class="flex flex-col items-start gap-[16px] p-[16px] pr-[8px] rounded-[8px] bg-[#24102A] w-full h-auto max-h-[418px] overflow-y-scroll"
	>
		{#each quests as task, index}
			<Quest {task} {index} on:click={() => selectTask(task, index)} {selectedTask} />
		{/each}
	</div>
</div>

<style>
	.overflow-y-scroll::-webkit-scrollbar {
		width: 8px;
	}
	.overflow-y-scroll::-webkit-scrollbar-track {
		background: rgba(253, 235, 86, 0.1);
		width: 8px;
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.overflow-y-scroll::-webkit-scrollbar-thumb {
		background: #fdeb56;
		width: 2px;
	}
</style>
