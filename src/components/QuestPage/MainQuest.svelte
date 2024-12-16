<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import WeeklyQuests from '$components/Quests/WeeklyQuests.svelte';
	import SelectedQuest from '$components/Quests/SelectedQuest.svelte';
	import Week from '$lib/assets/mastery-reward-week.svg';
	import Month from '$lib/assets/mastery-reward-month.svg';
	import XpContainer from '$components/XpContainer.svelte';

	export let data;
	let selectedTask;
	let selectedTaskIndex;
	let selectedTaskDay;

	let tasks = data.tasks;

	function selectOneTask(select, index) {
		selectedTask = select;
		selectedTaskIndex = index;
	}

	function selectOneTaskDay(day) {
		selectedTaskDay = day;
	}

	function closeSelectedTask() {
		selectedTask = null;
	}
</script>

{#if !!data && !!data.tasks && data.tasks.length > 0}
	<div class="px-[10px] sm:px-[30px]">
		<div
			class="grid grid-cols-1 lg:grid-cols-2 gap-[30px] p-[20px] w-full rounded-[14px] bg-[#200B26]"
		>
			<WeeklyQuests {tasks} {selectOneTask} {selectOneTaskDay} />
			{#if selectedTask}
				<SelectedQuest
					{closeSelectedTask}
					{selectedTask}
					{selectedTaskIndex}
					{selectedTaskDay}
					main_tasks={true}
				/>
			{/if}
		</div>
		<div
			class="rounded-[14px] bg-[#200B26] p-[20px] flex flex-col items-start gap-[20px] mt-[30px]"
		>
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{$t('Task Mastery Reward')}</p>
			<div class="grid grid-cols-2 gap-[20px] w-full">
				{#if data.week_prize}
					<div
						class="flex items-center gap-[24px] p-[6px] pr-[20px] rounded-[6px] border border-solid border-[#682F78] bg-[#301338] w-full"
					>
						<img src={Week} alt="" class="w-[154px]" />
						<div class="flex flex-col items-start gap-[12px]">
							<XpContainer xp={data.week_prize.xp ?? 0} />
							<div class="flex flex-col items-start gap-[8px]">
								<p class="text-[#BC5AD7] text-[24px] font-Gilroy-SemiBold">
									{$t('Weekly Task Completion Bonus')}
								</p>
								<p class="text-[#ACA1AF] text-[14px] font-Gilroy-Medium max-w-[456px]">
									{$t('WeeklyTaskText')}
								</p>
							</div>
						</div>
					</div>
				{/if}

				{#if data.month_prize}
					<div
						class="flex items-center gap-[24px] p-[6px] pr-[20px] rounded-[6px] border border-solid border-[#566888] bg-[#302744] w-full"
					>
						<img src={Month} alt="" class="w-[154px]" />
						<div class="flex flex-col items-start gap-[12px]">
							<XpContainer xp={data.month_prize.xp ?? 0} />
							<div class="flex flex-col items-start gap-[8px]">
								<p class="text-[#8EC9ED] text-[24px] font-Gilroy-SemiBold">
									{$t('Monthly Task Completion Bonus')}
								</p>
								<p class="text-[#ACA1AF] text-[14px] font-Gilroy-Medium max-w-[456px]">
									{$t('MonthlyTaskText')}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="px-[10px] sm:px-[30px]">
		<div class=" py-20 w-full rounded-[14px] bg-[#200B26]">
			<p class="text-white text-3xl text-center">Sorry, no tasks</p>
		</div>
	</div>
{/if}
