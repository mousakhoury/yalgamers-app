<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Visit from '$lib/assets/task-watch.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	export let closeTaskContainer;
	export let selectedTask;
	export let taskNumber;
	export let main_tasks = false;

	function _close() {
		window.open(selectedTask.link_to_task);
		closeTaskContainer();
	}
</script>

<div class="flex flex-col justify-between items-start gap-[30px] w-full mb-[24px]">
	<div class="flex flex-col gap-[8px]">
		{#if !main_tasks}
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
		{/if}
		<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">
			{$t('Complete watching this course')}
		</p>
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
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('To finish this task:')}</p>
				<div class="flex flex-col items-start gap-[24px] w-full">
					<div class="flex justify-between items-center w-full">
						<div class="flex items-center gap-[12px]">
							<img src={Visit} alt="" />
							<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
								{$t('Watch the full course')}
							</p>
						</div>
						<TaskButton
							completed={selectedTask.isCompleted}
							text={$t('Watch Now')}
							click={_close}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
