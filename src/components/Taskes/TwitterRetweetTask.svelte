<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Follow from '$lib/assets/follow-twitter.svg';
	import Retweet from '$lib/assets/test-retweet.svg';
	import Info from '$lib/assets/info-task.svg';
	import NotLinked from '$lib/assets/twitter-not-linked.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';
	export let selectedTask;
	export let taskNumber;
	export let main_tasks = false;
	export let submitHandler;

	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let isLinked = false;

	function linkTwitterHandler() {
		goto('/profile');
	}

	let isFollowed = false;
	let isRetweeted = false;
	let xUsername = ''; // Add this line to hold the username input value

	// Reactive statement to enable the submit button
	let canSubmit = false;
	$: canSubmit = isRetweeted && xUsername.trim() !== '';

	function followHandler() {
		isFollowed = true;
	}

	function retweetHandler() {
		window.open(selectedTask.link_to_task);
		isRetweeted = true;
	}

	function _submitHandler() {
		submitHandler(xUsername);
	}
</script>

{#if !selectedTask.isCompleted}
	<div class="flex flex-col justify-between items-start gap-[30px] w-full mb-[24px]">
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{$t('Retweet a post')}</p>
		</div>
		<div class="flex justify-center items-center gap-[10px]">
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Reward')}</p>
			<XpContainer xp={selectedTask.xp} />
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-[40px] relative w-full pt-[24px] border-t-[1px] border-solid border-[#3D2644]"
	>
		<div class="flex justify-center items-start gap-[30px] flex-col lg:flex-row w-f">
			<!-- <div
				class="w-full lg:w-[375px] h-[340px] lg:h-[460px] flex items-center justify-center bg-white rounded-[8px]"
			>
				{@html selectedTask.embedHTML}
			</div> -->
			<div class="flex flex-col items-start gap-[40px] w-full max-w-full">
				<div class="flex flex-col items-start gap-[30px] w-full md:w-[500px]">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">
						{$t('To finish this task:')}
					</p>
					<div class="flex flex-col items-start gap-[24px] w-full">
						<div class="flex items-center justify-between w-full">
							<div class="flex items-center gap-[12px]">
								<img src={Retweet} alt="" />
								<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
									{$t('Retweet a post')}
								</p>
							</div>
							<TaskButton
								completed={selectedTask.isCompleted}
								checked={isRetweeted}
								text={$t('Retweet')}
								click={retweetHandler}
							/>
						</div>
						<input
							type="text"
							name="xUsername"
							id="xUsername"
							class="task-input"
							placeholder={$t('Enter your X username')}
							bind:value={xUsername}
						/>
					</div>
				</div>
				<div class="hidden lg:flex items-center gap-[8px]">
					<img src={Info} alt="" />
					<p class="text-[#68566E] text-[12px] font-Gilroy-Medium">
						{$t('twitter.task.note')}
					</p>
				</div>
			</div>
		</div>

		<TaskDoneButton click={_submitHandler} isDisabled={!canSubmit} />

		{#if isLinked}
			<div
				class="absolute w-[101%] h-[101%] top-[-1px] left-[-1px] bg-[#200b26f7] flex flex-col items-center justify-center gap-[30px] pb-[105px]"
			>
				<div class="flex flex-col items-center gap-[24px]">
					<img src={NotLinked} alt="" />
					<div class="flex flex-col items-center gap-[8px]">
						<p class="text-[#E9E6EA] text-[20px] font-Gilroy-SemiBold">
							<span class="text-[#F71756]">{$t('Error!')}</span>
							{$t('Twitter not linked yet.')}
						</p>
						<p
							class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium text-center max-w-[263px] leading-[19px]"
						>
							{$t('twitter.not.liked.text')}
						</p>
					</div>
				</div>

				<button class="link-twitter" on:click={linkTwitterHandler}>
					<p>{$t('Link Twitter')}</p>
				</button>
			</div>
		{/if}
	</div>
{:else}
	<TaskCompleted taskNB={taskNumber} xp={selectedTask.xp} />
{/if}

<style>
	.link-twitter {
		display: flex;
		padding: 8px 16px;
		align-items: center;
		gap: 10px;
		border-radius: 6px;
		background: linear-gradient(95deg, #f71756 0%, #fdeb56 100%);
	}

	.link-twitter p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

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
