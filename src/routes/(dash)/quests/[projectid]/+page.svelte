<script>
	// @ts-nocheck

	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import { t, locale } from '$lib/stores/i18n';
	import BigCheck from '$lib/assets/main-quest/big-check.svg';
	import SmallCheck from '$lib/assets/main-quest/small-check.svg';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import TimeCircle from '$lib/assets/main-quest/Time Circle.svg';
	import ProjectQuestsList from '$components/QuestPage/ProjectQuestsList.svelte';
	import SelectedQuest from '$components/Quests/SelectedQuest.svelte';
	import ProjectQuestRewards from '$components/QuestPage/ProjectQuestRewards.svelte';
	import { getImageUrl } from '$lib/utils.js';
	import { project_tasks_store, show_NFT_button_store } from '$lib/stores/projectTasks.js';

	export let data;

	let status = {};
	let countdown = '';
	let selectedTask = null;
	let selectedTaskIndex = null;
	let isScreenWide = false;

	if (data.project.isActive) {
		status = { text: $t('Active'), color: '#1FD031', bg: '#031405b3' };
	} else if (data.project.isEnded) {
		status = { text: $t('Ended'), color: '#F71756', bg: '#140303b3' };
	}

	function updateCountdown() {
		const now = new Date();
		const endTime = new Date(data.project.deadline);
		const timeDifference = endTime - now;

		if (timeDifference > 0) {
			const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

			if (days > 0) {
				countdown = `${days}d ${hours}h`;
			} else if (hours > 0) {
				countdown = `${hours}h ${minutes}m`;
			} else {
				countdown = `${minutes}m ${seconds}s`;
			}
		} else {
			countdown = $t('Ended');
		}
	}

	function selectOneTask(select, index) {
		selectedTask = select;
		selectedTaskIndex = index + 1;
	}

	function closeSelectedTask() {
		selectedTask = null;
		selectedTaskIndex = null;
	}

	onMount(() => {
		project_tasks_store.set(data.project.quests);
		show_NFT_button_store.set(data.project.showNFTButton);

		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);

		const updateIsScreenWide = () => {
			isScreenWide = window.innerWidth > 1024;
			if (isScreenWide && !selectedTask && data.project.quests.length > 0) {
				selectOneTask(data.project.quests[0], 0);
			} else if (!isScreenWide) {
				closeSelectedTask();
			}
		};

		updateIsScreenWide();
		window.addEventListener('resize', updateIsScreenWide);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', updateIsScreenWide);
		};
	});
</script>

<svelte:head>
	<title>Project - {data.project.title}</title>
</svelte:head>

<div class="my-[30px] px-[10px] sm:px-[30px] flex flex-col items-start w-full gap-[30px]">
	<div class="flex gap-[10px] justify-start items-center">
		<img
			height="24px"
			width="24px"
			src={leftArrow}
			alt="left arrow icon"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<a
			href="/quests"
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold">{$t('Quests')}</a
		>
		<img
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="inline-block overflow-hidden text-lg not-italic font-normal pointer-events-none text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			{data.project.title}
		</p>
	</div>
	<div class="w-full relative">
		<img
			src={getImageUrl(data.project.collectionId, data.project.id, data.project.image)}
			alt=""
			class="w-full h-[240px] object-cover rounded-[14px]"
		/>
		<div
			class="p-[20px] w-full h-full absolute top-0 left-0 flex flex-col justify-between items-start bg-linear-gradient"
		>
			<div class="flex items-center gap-[12px]">
				<div
					class="pt-[3px] pb-[5px] rounded-[100px] {$locale === 'ar'
						? 'pl-[12px] pr-[25px]'
						: 'pr-[12px] pl-[25px]'}"
					style="color: {status.color}; background-color: {status.bg};"
				>
					<ul class="list-disc">
						<li class="text-[14px] font-semibold leading-[17px]">{status.text}</li>
					</ul>
				</div>

				{#if data.project.isFeatured}
					<div
						class="featured-badge pt-[3px] pb-[5px] rounded-[100px] text-[#8EC9ED] border border-[#8EC9ED] bg-[#13232eb3] {$locale ===
						'ar'
							? 'pl-[12px] pr-[25px]'
							: 'pr-[12px] pl-[25px]'}"
					>
						<ul class="list-disc">
							<li class="text-[14px] font-semibold leading-[17px]">{$t('Featured')}</li>
						</ul>
					</div>
				{/if}
			</div>

			<div class="flex flex-col items-start gap-[12px] px-[9px] w-full">
				{#if !data.project.isEnded}
					<div
						class="flex items-center gap-[4px] p-[2px] rounded-[100px] bg-[#4a71894d] {$locale ===
						'ar'
							? 'pl-[10px]'
							: 'pr-[10px]'}"
					>
						<img src={TimeCircle} alt="" class="w-[20px]" />
						<p class="text-[#8EC9ED] text-[14px] font-Gilroy-Medium">
							{$t('Ending in')}
							{countdown}
						</p>
					</div>
				{/if}
				<div class="flex flex-col items-start gap-[6px]">
					<p class={`text-[#E9E6EA] font-Gilroy-Bold text-[24px] leading-[29px]`}>
						{data.project.title}
					</p>
					<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium leading-[17px]">
						{data.project.subText}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="px-[10px] sm:px-[30px]">
	<div class="flex flex-col items-start w-full gap-[40px]">
		<div
			class="grid grid-col-1 lg:grid-cols-2 gap-[30px] p-[20px] w-full rounded-[14px] bg-[#200B26]"
		>
			<ProjectQuestsList quests={$project_tasks_store} {selectOneTask} />
			{#if selectedTask}
				<SelectedQuest
					{closeSelectedTask}
					selectedTask={data.project.quests[selectedTaskIndex - 1]}
					{selectedTaskIndex}
					status={true}
				/>
			{/if}
		</div>

		{#if data.rewards}
			<ProjectQuestRewards rewards={data.rewards} project={data.project} />
		{/if}
	</div>
</div>

{#if $show_NFT_button_store}
	<button
		on:click={() => show_NFT_button_store.set(false)}
		class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-[#0e0511e6] z-[51]"
	>
		<div
			class="flex flex-col items-center justify-center gap-[40px] md:gap-[57px] p-[16px] md:p-[20px] pt-[40px] md:pt-[57px] w-full max-w-[343px] md:max-w-[420px] rounded-[12px] md:rounded-[16px] border border-[#3D2644] bg-[#200B26]"
		>
			<div
				class="flex flex-col items-center justify-center gap-[24px] w-full max-w-[198px] md:max-w-[290px]"
			>
				<img src={BigCheck} alt="" class="w-[120px] md:w-[140px]" />
				<div class="flex flex-col items-center justify-center gap-[6px] md:gap-[10px]">
					<p class="text-[#FFF] text-[24] md:text-[28px] text-center font-Gilroy-SemiBold">
						{$t('congratulations')}
					</p>
					<a href="/achievements">
						<p class="text-[#A99FAC] text-[12px] md:text-[16px] text-center font-Gilroy-Medium">
							{$t('AllTaskCompleted')}
						</p>
					</a>
				</div>
			</div>

			<a
				href="/achievements/"
				class="flex items-center justify-center gap-[4px] py-[12px] w-full rounded-[4px] bg-[#FDEB56]"
			>
				<img src={SmallCheck} alt="" class="w-[16px]" />
				<p class="text-[#2A0D32] text-[16px] font-Gilroy-SemiBold">
					{$t('ClaimYourAchievementNFT')}
				</p>
			</a>
		</div>
	</button>
{/if}

<style>
	.bg-linear-gradient {
		border-radius: 14px;
		background: linear-gradient(
			180deg,
			rgba(32, 11, 38, 0.8) 0%,
			rgba(32, 11, 38, 0.85) 10%,
			rgba(32, 11, 38, 0.9) 26%,
			rgba(32, 11, 38, 0.95) 45%,
			#200b26 80.5%
		);
	}
</style>
