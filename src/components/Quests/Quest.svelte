<script>
	import { t, locale } from '$lib/stores/i18n';

	import XpContainer from '$components/XpContainer.svelte';
	import Completed from '$lib/assets/main-quest-task-done.svg';
	import Pending from '$lib/assets/main-quest-task-pending.svg';
	import NotCompleted from '$lib/assets/main-quest-task-notcompleted.svg';
	import Selected from '$lib/assets/main-quest-task-selected.svg';

	export let task;
	export let index;
	export let selectedTask;

	$: isSelected = selectedTask && task.id === selectedTask.id;
</script>

<button
	on:click
	class:isSelected
	class="rounded-[6px] bg-[#2B1730] hover:bg-[#3A283F] p-[20px] flex justify-between items-center w-full border border-solid border-transparent hover:border-[#68566E] cursor-pointer"
>
	<div class="flex flex-col items-start gap-[8px]">
		<div class="flex flex-row items-start gap-[12px]">
			<div class="px-[6px] lg:px-[8px] py-[3px] lg:py-[4px] rounded-[1000px] bg-[#8EC9ED]">
				<p class="text-[#2A0D32] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[14px]">
					{$t('Task')}
					{index + 1}
				</p>
			</div>
			{#if task.isCompleted}
				<div
					class="flex items-center gap-[4px] lg:gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#293230] bg-[#293230] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={Completed} alt="" class="w-[16px] lg:w-[18px]" />
					<p class="text-[#1FD031] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('Completed')}
					</p>
				</div>
			{:else if task.isPending}
				<div
					class="flex items-center gap-[4px] lg:gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#493636] bg-[#493636] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={Pending} alt="" class="w-[16px] lg:w-[18px]" />
					<p class="text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('PendingCompletion')}
					</p>
				</div>
			{:else}
				<div
					class="flex items-center gap-[4px] lg:gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#481736] bg-[#3F1734] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={NotCompleted} alt="" class="w-[16px] lg:w-[18px]" />
					<p class="text-[#F71756] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('Uncompleted')}
					</p>
				</div>
			{/if}
		</div>
		<p
			class="text-[#E9E6EA] text-[18px] lg:text-[20px] font-Gilroy-SemiBold leading-[20px] lg:leading-[25px] max-w-[165px] lg:max-w-full"
		>
			{#if $locale == 'ar'}
				{task.title_ar ?? ''}
			{:else}
				{task.title}
			{/if}
		</p>
	</div>
	<div class="flex justify-center items-center gap-[12px]">
		<XpContainer xp={task.xp} />
		<!-- {#if isSelected}
			<img src={Selected} alt="" />
		{/if} -->
	</div>
</button>

<style>
	.isSelected {
		border: 1px solid var(--white-30, #68566e);
		background: #3a283f;
	}
</style>
