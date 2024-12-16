<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import XP from '$lib/assets/new-xp-icon2.svg';
	import Completed from '$lib/assets/main-quest-task-done.svg';
	import Pending from '$lib/assets/main-quest-task-pending.svg';
	import NotCompleted from '$lib/assets/main-quest-task-notcompleted.svg';
	import Complete from '$lib/assets/complete-this-task.svg';
	import completeCourse from '$lib/assets/complete-course.svg';
	import reviewGame from '$lib/assets/review-game.svg';
	import link from '$lib/assets/link-twitch.svg';
	import TaskContainer from '$components/Taskes/TaskContainer.svelte';
	import { page } from '$app/stores';
	import { project_tasks_store, show_NFT_button_store } from '$lib/stores/projectTasks';
	export let selectedTaskIndex;
	export let selectedTaskDay = false;
	export let selectedTask;
	export let closeSelectedTask;
	export let main_tasks = false;
	export let status = false;
	let showModal = false;

	let images = { completeCourse, reviewGame, link };

	function show_modal_fn() {
		console.log('here');
		if ($page.data.project && $page.data.project.isEnded) {
			alert('Project Ends');
			return;
		}
		showModal = true;
	}
</script>

<button
	on:click={closeSelectedTask}
	class="fixed w-full h-screen top-0 left-0 bg-[#140718b3] z-[50] block lg:hidden"
/>

<div
	class="flex flex-col items-center w-[90%] lg:w-full gap-[24px] lg:gap-[29px] rounded-[8px] bg-[#24102A] border border-[#FDEB56] lg:border-[#533E59] justify-between max-lg:fixed max-lg:top-[50%] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] max-lg:z-[61]"
>
	<div
		class="flex items-center justify-between p-[16px] lg:p-[20px] bg-[#2B1730] w-full rounded-t-[8px]"
	>
		{#if selectedTaskDay}
			<p class="text-[#E9E6EA] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
				{selectedTaskDay}
			</p>
		{/if}
		<div class="px-[8px] py-[4px] rounded-[1000px] bg-[#8EC9ED]">
			<p class="text-[#2A0D32] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[14px]">
				{$t('Task')}
				{selectedTaskIndex}
			</p>
		</div>
		{#if status}
			{#if selectedTask.isCompleted}
				<div
					class="flex items-center gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#293230] bg-[#293230] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={Completed} alt="" class="w-[18px]" />
					<p class="text-[#1FD031] text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('Completed')}
					</p>
				</div>
			{:else if selectedTask.isPending}
				<div
					class="flex items-center gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#493636] bg-[#493636] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={Pending} alt="" class="w-[18px]" />
					<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('PendingCompletion')}
					</p>
				</div>
			{:else}
				<div
					class="flex items-center gap-[6px] p-[2px] rounded-[1000px] border border-solid border-[#481736] bg-[#3F1734] {$locale ===
					'ar'
						? 'pl-[8px]'
						: 'pr-[8px]'}"
				>
					<img src={NotCompleted} alt="" class="w-[18px]" />
					<p class="text-[#F71756] text-[14px] font-Gilroy-SemiBold leading-[14px]">
						{$t('Uncompleted')}
					</p>
				</div>
			{/if}
		{/if}
	</div>

	<div class="flex flex-col items-center gap-[20px]">
		{#if selectedTask.type.includes('COURSE')}
			<img src={completeCourse} alt="" class="w-[118px] lg:w-[177px]" />
		{:else if selectedTask.type.includes('GAME')}
			<img src={reviewGame} alt="" class="w-[118px] lg:w-[177px]" />
		{:else}
			<img src={link} alt="" class="w-[118px] lg:w-[177px]" />
		{/if}
		<div class="flex flex-col items-center gap-[24px] max-w-[275px] lg:max-w-full">
			<div class="flex flex-col items-center gap-[8px]">
				<p class="text-[#E9E6EA] text-[24px] lg:text-[28px] text-center font-Gilroy-SemiBold">
					{#if $locale == 'ar'}
						{selectedTask.title_ar ?? ''}
					{:else}
						{selectedTask.title}
					{/if}
				</p>
				<p
					class="text-[#A99FAC] text-[12px] lg:text-[14px] text-center font-Gilroy-Medium max-w-[363px]"
				>
					{#if $locale == 'ar'}
						{selectedTask.description_ar ?? ''}
					{:else}
						{selectedTask.description}
					{/if}
				</p>
			</div>
			<div class="flex items-center gap-[18px]">
				{#if selectedTask.isCompleted}
					<div
						class="flex items-center gap-[6px] p-[2px] pr-[8px] rounded-[1000px] border border-solid border-[#293230] bg-[#293230]"
					>
						<img src={Completed} alt="" class="w-[18px]" />
						<p class="text-[#1FD031] text-[14px] font-Gilroy-SemiBold leading-[14px]">
							{$t('This Task is Completed')}
						</p>
					</div>
				{/if}

				{#if selectedTask.isPending}
					<div
						class="flex items-center gap-[6px] p-[2px] pr-[8px] rounded-[1000px] border border-solid border-[#493636] bg-[#493636]"
					>
						<img src={Pending} alt="" class="w-[18px]" />
						<p class="text-[#FDEB56] text-[14px] font-Gilroy-SemiBold leading-[14px]">
							{$t('PendingCompletion')}
						</p>
					</div>
					<!-- {:else}
					<div
						class="flex items-center gap-[6px] p-[2px] pr-[8px] rounded-[1000px] border border-solid border-[#481736] bg-[#3F1734]"
					>
						<img src={NotCompleted} alt="" class="w-[18px]" />
						<p class="text-[#F71756] text-[14px] font-Gilroy-SemiBold leading-[14px]">
							Uncompleted Task
						</p>
					</div> -->
				{/if}

				{#if !selectedTask.isCompleted && !selectedTask.isPending}
					<button
						on:click={show_modal_fn}
						class="flex items-center gap-[15px] cursor-pointer px-[16px] py-[8px] rounded-[6px] bg-[#fdeb561a]"
					>
						<p class="text-[#FDEB56] text-[16px] font-Gilroy-SemiBold">
							{$t('Complete This Task')}
						</p>
						<img src={Complete} alt="" class="w-[20px] {$locale === 'ar' ? 'rotate-180' : ''}" />
					</button>
				{/if}
			</div>
		</div>
	</div>

	{#if showModal}
		<TaskContainer
			markAsDone={async () => {
				if ($page.url.pathname.includes('quests')) {
					let copy = $project_tasks_store;
					let taskIndex = copy.findIndex((f) => f.id == selectedTask.id);
					copy[taskIndex].isCompleted = true;
					copy[taskIndex].isPending = false;
					project_tasks_store.set(copy);

					if (!$project_tasks_store.find((a) => !a.isCompleted)) {
						show_NFT_button_store.set(true);
					}
				}

				setTimeout(() => {
					showModal = false;
				}, 300);
			}}
			closeTaskContainer={() => (showModal = false)}
			{selectedTask}
			{main_tasks}
			taskNumber={selectedTaskIndex}
		/>
	{/if}

	<div class="p-[8px] lg:p-[20px] w-full">
		<div class="relative new-border">
			<div
				class="bg-[#301C35] rounded-[8px] flex justify-center items-center gap-[12px] p-[16px] lg:p-[20px]"
			>
				<p class="text-[#A99FAC] text-[14px] lg:text-[20px] font-Gilroy-SemiBold">
					{$t('rewards')}
				</p>

				<div dir="ltr" class="relative xpContainer">
					<div
						class="flex items-center gap-[11.667px] lg:gap-[14px] p-[4px] lg:p-[6px] pr-[12px] lg:pr-[16px] rounded-[6px] border border-[#ffffff1a] bg-[#3d2644]"
					>
						<img src={XP} alt="" class="w-[32px] lg:w-[40px]" />

						<p class="text-[#FDEB56] text-[18px] lg:text-[20px] font-Gilroy-SemiBold">
							{selectedTask.xp}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.xpContainer::after {
		width: calc(100% + 2px);
		height: calc(100% + 1px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 7px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.new-border {
		z-index: 1;
	}

	.new-border::before {
		width: calc(100% + 3px);
		height: calc(100% + 3px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 8px;
		background: linear-gradient(180deg, #6d5f71 0%, rgba(255, 255, 255, 0) 100%);
	}
</style>
