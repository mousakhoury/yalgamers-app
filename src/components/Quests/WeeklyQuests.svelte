<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import { onMount } from 'svelte';
	import ArrowLeft from '$lib/assets/week-quest-arrow-left.svg';
	import ArrowRight from '$lib/assets/week-quest-arrow-right.svg';
	import ArrowRightDisabled from '$lib/assets/week-quest-arrow-right-disabled.svg';
	import Completed from '$lib/assets/main-quest-done.svg';
	import Pending from '$lib/assets/main-quest-pending.svg';
	import NotCompleted from '$lib/assets/main-quest-notcompleted.svg';
	import Today from '$lib/assets/main-quest-today.svg';
	import NoQuest from '$lib/assets/main-quest-noquest.svg';
	import Future from '$lib/assets/main-quest-future.svg';
	import TodayArrow from '$lib/assets/main-quest-today-arrow.svg';
	import Quest from './Quest.svelte';
	import RedIcon from '../../lib/assets/red-dot.svg';

	export let selectOneTask;
	export let selectOneTaskDay;

	let selectedTask;

	let today = new Date();
	today.setHours(0, 0, 0, 0);

	export let tasks;

	let isScreenWide = false;

	onMount(() => {
		const updateIsScreenWide = () => {
			isScreenWide = window.innerWidth > 1024;
		};

		updateIsScreenWide();
		window.addEventListener('resize', updateIsScreenWide);

		return () => {
			window.removeEventListener('resize', updateIsScreenWide);
		};
	});

	function parseDateFromString(str) {
		if (typeof str !== 'string') {
			throw new Error('parseDateFromString expects a string argument');
		}
		const [day, month, year] = String(str).split('-').map(Number);
		return new Date(year, month - 1, day);
	}

	tasks = tasks.map((task) => {
		if (typeof task.date !== 'string') {
			console.error('Invalid date format', task);
			throw new Error('Task date is not a string: ' + JSON.stringify(task));
		}
		return {
			...task,
			date: parseDateFromString(task.date)
		};
	});

	function getMonday(date) {
		const result = new Date(date);
		const day = result.getDay();
		const diff = day >= 1 ? day - 1 : 6;
		result.setDate(result.getDate() - diff);
		return result;
	}

	function calculateTaskStatus(tasks) {
		const completed = tasks.filter((task) => task.isCompleted).length;
		const pending = tasks.filter((task) => task.isPending).length;

		if (tasks.length === completed) {
			return 'allCompleted';
		} else if (pending === 1 && completed === tasks.length - 1) {
			return 'onePending';
		} else {
			return 'notCompleted';
		}
	}

	function buildWeekStructure(monday) {
		let week = [];
		for (let i = 0; i < 7; i++) {
			let day = new Date(monday);
			day.setDate(monday.getDate() + i);
			const dayTasks = tasks.filter((task) => {
				const taskDate = new Date(task.date);
				return (
					taskDate.getDate() === day.getDate() &&
					taskDate.getMonth() === day.getMonth() &&
					taskDate.getFullYear() === day.getFullYear()
				);
			});
			week.push({
				date: day,
				dayLabel: `${$t('Day')} ${i + 1}`,
				tasks: dayTasks,
				status: calculateTaskStatus(dayTasks),
				isFuture: day > today // Determine if the day is in the future
			});
		}
		return week;
	}

	let weeksMap = new Map();

	for (const task of tasks) {
		const monday = getMonday(task.date);
		const mondayString = monday.toISOString().split('T')[0];

		if (!weeksMap.has(mondayString)) {
			weeksMap.set(mondayString, buildWeekStructure(monday));
		}

		const dayIndex = task.date.getDay() === 0 ? 6 : task.date.getDay() - 1;
		weeksMap.get(mondayString)[dayIndex].tasks.push(task);
	}

	let weeksArray = Array.from(weeksMap.values())[0]; // Assuming we're initially showing the current or a specific week

	let currentWeekStart = getMonday(today); // Start with the current week
	$: pending_prev_week_tasks = tasks.filter(
		(f) => f.date < currentWeekStart && !f.isPending && !f.isCompleted
	);
	function isSameDay(d1, d2) {
		return (
			d1.getDate() === d2.getDate() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getFullYear() === d2.getFullYear()
		);
	}

	function updateWeekArray() {
		weeksArray = buildWeekStructure(currentWeekStart);
		const startOfWeek = new Date(currentWeekStart);
		const endOfWeek = new Date(currentWeekStart);
		endOfWeek.setDate(endOfWeek.getDate() + 6);
	}

	function formatWeekLabel(startOfWeek) {
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(endOfWeek.getDate() + 6);
		const isThisWeek = startOfWeek <= today && endOfWeek >= today;

		// Use Arabic locale if the current locale is Arabic
		const localeSetting = $locale === 'ar' ? 'ar' : 'default';

		const startFormat = `${startOfWeek.toLocaleString(localeSetting, {
			month: 'long'
		})} ${startOfWeek.getDate()}`;

		const endFormat = `${endOfWeek.toLocaleString(localeSetting, {
			month: 'long'
		})} ${endOfWeek.getDate()}`;

		const year = startOfWeek.getFullYear();

		// Conditional formatting for Arabic
		if ($locale === 'ar') {
			return (
				`من ${startOfWeek.getDate()} ${startOfWeek.toLocaleString('ar', {
					month: 'long'
				})} إلى ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('ar', { month: 'long' })}` +
				(isThisWeek ? ` (${$t('This Week')})` : '')
			);
		}

		return `${startFormat} to ${endFormat} ` + (isThisWeek ? ` (${$t('This Week')})` : '');
	}

	function formatDate(date) {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	}

	function updateWeekLabel() {
		const weekLabel = document.getElementById('week-label');
		weekLabel.textContent = formatWeekLabel(currentWeekStart);
	}

	let selectedDayIndex = new Date().getDay() - 1;

	function updateSelectedTask() {
		selectedTask = weeksArray[selectedDayIndex]?.tasks[0];
		if (isScreenWide) {
			selectOneTask(selectedTask, 1);
		}
		selectOneTaskDay(weeksArray[selectedDayIndex]?.dayLabel);
	}

	function goToPrevWeek() {
		let newStart = new Date(currentWeekStart);
		newStart.setDate(newStart.getDate() - 7);
		while (newStart >= tasks[0].date && !hasTasksInWeek(newStart)) {
			newStart.setDate(newStart.getDate() - 7);
		}
		if (newStart >= tasks[0].date) {
			currentWeekStart = newStart;
			updateWeekArray();
			updateWeekLabel();
			updateSelectedTask();
		}
	}

	function goToNextWeek() {
		let newStart = new Date(currentWeekStart);
		newStart.setDate(newStart.getDate() + 7);
		while (newStart <= tasks[tasks.length - 1].date && !hasTasksInWeek(newStart)) {
			newStart.setDate(newStart.getDate() + 7);
		}
		// if (newStart <= tasks[tasks.length - 1].date) {
		currentWeekStart = newStart;
		updateWeekArray();
		updateWeekLabel();
		updateSelectedTask();
		// }
	}

	function hasTasksInWeek(monday) {
		const startOfWeek = new Date(monday);
		const endOfWeek = new Date(monday);
		endOfWeek.setDate(endOfWeek.getDate() + 6); // Move to Sunday of the same week
		endOfWeek.setHours(23, 59, 59, 999); // Set to the very end of the day

		return tasks.some((task) => {
			const taskDate = task.date;
			return taskDate >= startOfWeek && taskDate <= endOfWeek;
		});
	}

	let isNextWeekDisabled = false;

	function getEndOfWeek(date) {
		const endOfWeek = new Date(date);
		endOfWeek.setDate(endOfWeek.getDate() + 6); // Adjust to the end of the week
		endOfWeek.setHours(23, 59, 59, 999); // Set to the very end of the day
		return endOfWeek;
	}

	$: isNextWeekDisabled = getEndOfWeek(currentWeekStart) < today;

	onMount(() => {
		updateWeekArray();
		updateWeekLabel();
		updateSelectedTask();
		if (isScreenWide) {
			selectOneTask(weeksArray[selectedDayIndex]?.tasks[0], 1);
		}
		selectedDayIndex = weeksArray.findIndex((day) => isSameDay(day.date, today));
	});

	function handleDayTabClick(index) {
		selectedDayIndex = index;
		updateSelectedTask();
	}

	function goToCurrentWeek() {
		const mondayOfCurrentWeek = getMonday(new Date());
		if (!isSameDay(mondayOfCurrentWeek, currentWeekStart)) {
			currentWeekStart = mondayOfCurrentWeek;
			updateWeekArray();
			updateWeekLabel();
			updateSelectedTask();
			selectedDayIndex = weeksArray.findIndex((day) => isSameDay(day.date, today));
		}
	}

	let isNotCurrentWeek = false;

	$: isNotCurrentWeek = !isSameDay(getMonday(new Date()), currentWeekStart);

	function selectTask(task, index) {
		selectedTask = task;
		selectOneTask(selectedTask, index);
	}
</script>

<div class="flex flex-col items-center gap-[20px] w-full">
	<div class="flex items-center justify-center gap-[30px] w-full relative">
		<div class="relative">
			<button on:click={goToPrevWeek}
				><img
					src={ArrowLeft}
					alt=""
					class="w-[28px] {$locale === 'ar' ? 'rotate-180' : ''}"
				/></button
			>
			{#if pending_prev_week_tasks.length > 0}
				<img class="absolute -top-1 -right-1 h-2.5 w-2.5" src={RedIcon} alt="red_dot" />
			{/if}
		</div>
		<div class="flex flex-col justify-center items-center gap-[8px]">
			<h1 class="text-white text-[24px] font-Gilroy-SemiBold leading-[29px]">
				{$t('Tasks of the Week')}
			</h1>
			<p id="week-label" class="text-[#948798] text-[14px] font-Gilroy-Medium leading-[17px]" />
		</div>
		<button disabled={!isNotCurrentWeek} on:click={goToNextWeek}>
			{#if isNotCurrentWeek}
				<img src={ArrowRight} alt="" class="w-[28px] {$locale === 'ar' ? 'rotate-180' : ''}" />
			{:else}
				<img
					src={ArrowRightDisabled}
					alt=""
					class="w-[28px] {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
			{/if}
		</button>
		{#if isNotCurrentWeek}
			<button
				on:click={goToCurrentWeek}
				class="flex items-center gap-[2px] lg:gap-[8px] p-[2px] lg:p-[4px] rounded-[100px]
			bg-[#fdeb560d] absolute top-[50px] lg:top-[14px] {$locale === 'ar'
					? 'pr-[8px] lg:pr-[10px] left-0'
					: 'pl-[8px] lg:pl-[10px] right-0'}"
			>
				<p class="text-[#FDEB56] text-[8px] lg:text-[14px] font-Gilroy-Medium">{$t('Today')}</p>
				<img
					src={TodayArrow}
					alt=""
					class="w-[14px] lg:w-[22px] {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
			</button>
		{/if}
	</div>

	<div class="flex items-center justify-center rounded-[8px] p-[8px] bg-[#2A0D32] w-full">
		{#each weeksArray as { date, isFuture, status, tasks }, index}
			{#if tasks.length === 0 && !isFuture}
				<img src={NoQuest} alt="" class="w-[24px]" />
			{:else if status === 'allCompleted' && !isFuture}
				<img src={Completed} alt="" class="w-[24px]" />
			{:else if status === 'onePending' && !isFuture}
				<img src={Pending} alt="" class="w-[24px]" />
			{:else if status === 'notCompleted' && !isFuture && date.toDateString() !== today.toDateString()}
				<img src={NotCompleted} alt="" class="w-[24px]" />
			{:else if date.toDateString() === today.toDateString()}
				<img src={Today} alt="" class="w-[24px]" />
			{:else if isFuture}
				<img src={Future} alt="" class="w-[24px]" />
			{/if}
			<hr class="w-full h-[2px] bg-[#68566E] last:hidden" />
		{/each}
	</div>

	<div
		class="flex flex-col justify-start items-start gap-[20px] p-0 lg:p-[16px] rounded-[8px] bg-[#24102A] border border-solid border-[#3a283f] w-full"
	>
		<div
			class="hidden lg:flex items-start justify-between gap-[3px] p-[8px] rounded-[100px] bg-[#200B26] border border-solid border-[#2C1632] w-full"
		>
			{#each weeksArray as { date, dayLabel, isFuture }, index}
				<button
					on:click={isFuture ? null : () => handleDayTabClick(index)}
					class="flex justify-center items-center gap-[3px] py-[8px] px-[15px] rounded-[100px] day-button"
					class:active={selectedDayIndex === index}
					class:isPast={date < today && !isFuture}
					class:isFuture
					disabled={isFuture}
				>
					<p>
						{dayLabel}
					</p>
					<span>{date.toDateString() === today.toDateString() ? ` (${$t('Today')})` : ''}</span>
				</button>
			{/each}
		</div>
		<div
			class="flex lg:hidden items-start gap-[3px] rounded-t-[8px] bg-[#200B26] border border-solid border-[#2C1632] w-full overflow-x-scroll daysContainer"
		>
			{#each weeksArray as { date, dayLabel, isFuture }, index}
				<button
					on:click={isFuture ? null : () => handleDayTabClick(index)}
					class="flex justify-center items-center gap-[3px] py-[12px] px-[10px] day-button relative h-[48px]"
					class:active={selectedDayIndex === index}
					class:isPast={date < today && !isFuture}
					class:isFuture
					disabled={isFuture}
				>
					<p>
						{dayLabel}
					</p>
					<span>{date.toDateString() === today.toDateString() ? ` (${$t('Today')})` : ''}</span>
				</button>
			{/each}
		</div>
		<div class="tasks-view">
			{#if selectedDayIndex !== null && weeksArray.length > selectedDayIndex}
				{#if weeksArray[selectedDayIndex]?.tasks.length > 0}
					<div class="flex flex-col items-start gap-[16px]">
						{#each weeksArray[selectedDayIndex].tasks as task, index}
							<Quest {task} {index} on:click={() => selectTask(task, index + 1)} {selectedTask} />
						{/each}
					</div>
				{:else}
					<p class="text-white">{$t('No tasks for this day')}.</p>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style>
	.day-button.active {
		background: #3d2644;
	}

	.day-button:hover {
		background: #3d2644;
	}

	.day-button p {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.day-button.active p {
		background: linear-gradient(97deg, #f71756 0%, #fdeb56 45.91%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.day-button.isFuture:hover {
		background: transparent;
	}

	.day-button.isFuture p {
		opacity: 55%;
	}

	.day-button span {
		color: var(--white-40, #7e6e83) !important;
		font-family: Gilroy-Medium;
		font-size: 16px;
	}

	.tasks-view {
		width: 100%;
	}

	@media (max-width: 1024px) {
		.day-button.active {
			background: transparent;
		}

		.day-button.active::after {
			content: ' ';
			width: 100%;
			height: 2px;
			position: absolute;
			left: 0;
			bottom: 0;
			background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		}

		.day-button:hover {
			background: transparent;
		}

		.day-button p {
			font-size: 12px;
			width: 33px;
		}

		.daysContainer::-webkit-scrollbar {
			height: 1px !important;
		}

		.tasks-view {
			padding: 0 12px;
		}
	}
</style>
