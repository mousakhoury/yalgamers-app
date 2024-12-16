<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Info from '$lib/assets/info-task.svg';
	import Visit from '$lib/assets/website-task.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';
	import Page from '../../routes/(dash)/+page.svelte';
	export let selectedTask;
	export let submitHandler;
	export let taskNumber;
	export let main_tasks = false;

	let isLinked = false;

	function linkSteamHandler() {
		window.open(selectedTask.link_to_task);
		isLinked = true;
	}
</script>

{#if !selectedTask.isCompleted}
	<div class="flex flex-col justify-between items-start gap-[30px] w-full mb-[24px]">
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{$t('Subscribe to Youtube')}</p>
		</div>
		<div class="flex justify-center items-center gap-[10px]">
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Reward')}</p>
			<XpContainer xp={selectedTask.xp} />
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-[40px] pt-[24px] relative border-t-[1px] border-solid border-[#3D2644] w-full"
	>
		<div class="flex justify-center items-start w-full gap-[30px]">
			<div class="flex flex-col items-start gap-[40px] w-full md:w-[500px]">
				<div class="flex flex-col items-start gap-[30px] w-full">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">
						{$t('To finish this task:')}
					</p>
					<div class="flex flex-col items-start gap-[24px] w-full">
						<div class="flex items-center justify-between w-full">
							<div class="flex items-center gap-[12px]">
								<img src={Visit} alt="" />
								<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
									{$t('Subscribe to Youtube')}
								</p>
							</div>
							<TaskButton
								completed={selectedTask.isCompleted}
								checked={isLinked}
								text={$t('Visit')}
								click={linkSteamHandler}
							/>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-[8px]">
					<img src={Info} alt="" />

					<p class="text-[#68566E] text-[12px] font-Gilroy-Medium max-w-[223px]">
						{$t('visit.task.note')}
					</p>
				</div>
			</div>
		</div>

		<TaskDoneButton
			click={() => {
				submitHandler();
			}}
			isDisabled={!isLinked}
		/>
	</div>
{:else}
	<TaskCompleted taskNB={taskNumber} xp={selectedTask.xp} />
{/if}
