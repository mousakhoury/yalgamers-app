<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Info from '$lib/assets/info-task.svg';
	import Join from '$lib/assets/join-telegram.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';
	export let selectedTask;
	export let taskNumber;
	export let main_tasks = false;
	export let submitHandler;

	let isJoinedChannel = false;
	let isJoinedGroup = false;
	let telegramUsername = ''; // Holds the username input value

	// Reactive statement to enable the submit button if criteria are met
	let canSubmitGroup = false;
	$: canSubmitGroup =
		isJoinedGroup && telegramUsername.trim() !== '' && telegramUsername.includes('@');

	let canSubmitChannel = false;
	$: canSubmitChannel =
		isJoinedChannel && telegramUsername.trim() !== '' && telegramUsername.includes('@');

	function joinChannelHandler() {
		window.open(selectedTask.link_to_task);
		isJoinedChannel = true;
	}

	function joinGroupHandler() {
		window.open(selectedTask.link_to_task);
		isJoinedGroup = true;
	}

	function _submitHandler() {
		submitHandler(telegramUsername);
	}

	const type = selectedTask.type.split(' - ')[1];
</script>

{#if !selectedTask.isCompleted}
	<div class="flex flex-col justify-between items-start gap-[30px] w-full mb-[24px]">
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">
					{$t('Task')}
					{taskNumber}:
				</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">
				{type === 'CHANNEL' ? $t('Join Telegram Channel') : $t('Join Telegram Group')}
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
		<div class="flex flex-col justify-center items-start gap-[30px] w-full mb-[40px]">
			<div class="flex flex-col items-start gap-[40px] w-full md:w-[500px]">
				<div class="flex flex-col items-start gap-[30px] w-full">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">
						{$t('To finish this task:')}
					</p>
					<div class="flex flex-col items-start gap-[24px] w-full">
						{#if type === 'CHANNEL'}
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-[12px]">
									<img src={Join} alt="" />
									<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
										{$t('Join Telegram Channel')}
									</p>
								</div>
								<TaskButton
									completed={selectedTask.isCompleted}
									checked={isJoinedChannel}
									text={$t('Join')}
									click={joinChannelHandler}
								/>
							</div>
						{:else}
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-[12px]">
									<img src={Join} alt="" />
									<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
										{$t('Join Telegram Group')}
									</p>
								</div>
								<TaskButton
									completed={selectedTask.isCompleted}
									checked={isJoinedGroup}
									text={$t('Join')}
									click={joinGroupHandler}
								/>
							</div>
						{/if}
					</div>
				</div>
			</div>
			<input
				type="text"
				name="telegramUsername"
				id="telegramUsername"
				class="task-input"
				placeholder={$t('Enter your telegram username')}
				bind:value={telegramUsername}
			/>

			<div class="flex items-center gap-[8px]">
				<img src={Info} alt="" />
				<p class="text-[#68566E] text-[12px] font-Gilroy-Medium max-w-[223px]">
					{$t('telegram.task.note')}
				</p>
			</div>
		</div>
	</div>

	{#if type === 'CHANNEL'}
		<TaskDoneButton click={_submitHandler} isDisabled={!canSubmitChannel} />
	{:else}
		<TaskDoneButton click={_submitHandler} isDisabled={!canSubmitGroup} />
	{/if}
{:else}
	<TaskCompleted taskNB={taskNumber} xp={selectedTask.xp} />
{/if}

<style>
	.task-input {
		padding: 15px 16px;
		border-radius: 6px;
		border: 1px solid var(--white-10, #3d2644);
		background: var(--text-dark, #2a0d32);
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		margin-top: 16px;
		width: 100%;
		direction: ltr;
	}
</style>
