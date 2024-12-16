<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Info from '$lib/assets/info-task.svg';
	import Join from '$lib/assets/join-telegram.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let selectedTask;
	export let submitHandler;
	export let taskNumber;
	export let main_tasks = false;

	const hasSteam = !!($user.providers.find((p) => p.provider === 'oidc') ?? false);

	let isLinked = false;

	function linkSteamHandler() {
		isLinked = true;
		goto('/profile');
	}

	onMount(() => {
		if (hasSteam) {
			isLinked = true;
			submitHandler();
		}
	});
</script>

{#if !selectedTask.isCompleted}
	<div class="flex flex-col justify-between items-start gap-[30px] w-full mb-[24px]">
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{$t('Link to Steam')}</p>
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
								<img src={Join} alt="" />
								<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">{$t('Link to Steam')}</p>
							</div>
							<TaskButton
								completed={selectedTask.isCompleted}
								checked={isLinked}
								text={$t('Link')}
								click={linkSteamHandler}
							/>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-[8px]">
					<img src={Info} alt="" />

					<p class="text-[#68566E] text-[12px] font-Gilroy-Medium max-w-[223px]">
						{$t('steam.task.note')}
					</p>
				</div>
			</div>
		</div>

		<TaskDoneButton click={submitHandler} isDisabled={!isLinked} />
	</div>
{:else}
	<TaskCompleted taskNB={taskNumber} xp={selectedTask.xp} />
{/if}
