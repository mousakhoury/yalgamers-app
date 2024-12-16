<script>
	// @ts-nocheck

	import { onMount, onDestroy } from 'svelte';
	import DiscordTask from './DiscordTask.svelte';
	import RateTask from './RateTask.svelte';
	import SteamTask from './SteamTask.svelte';
	import TelegramTask from './TelegramTask.svelte';
	import TwitterTask from './TwitterTask.svelte';
	import WatchTask from './WatchTask.svelte';
	import WebsiteTask from './WebsiteTask.svelte';
	import PlayTask from './PlayTask.svelte';
	import { page } from '$app/stores';
	import TwitterRetweetTask from './TwitterRetweetTask.svelte';
	import YoutubeTask from './YoutubeTask.svelte';
	export let markAsDone;
	export let selectedTask;
	export let closeTaskContainer;
	export let taskNumber;
	export let main_tasks = false;

	// Function to add no-scroll class to body
	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	// Function to remove no-scroll class from body
	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

	// Add no-scroll on mount and remove on destroy
	onMount(addNoScroll);
	onDestroy(removeNoScroll);

	// Ensure no-scroll is removed when task container is closed
	function handleClose() {
		removeNoScroll();
		closeTaskContainer();
	}

	/*
	 *@params {string} [username]
	 */
	const submitHandler = async (username) => {
		if (main_tasks) {
			explore_quest_task_fn(username ?? null);
			return;
		}

		const data = new FormData();
		data.append('quest', selectedTask.id);
		data.append('project', $page.params.projectid);

		let obj = { project: $page.data.project.id, course_title: $page.data.project.title };

		if (username) {
			obj.username = username;
		}

		data.append('data', JSON.stringify(obj));

		const res = await fetch('/api/project_quest', {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			selectedTask.isCompleted = true;
			markAsDone();
		}
	};

	async function explore_quest_task_fn(username) {
		const data = new FormData();
		let obj = {};
		if (username) {
			obj.username = username;
			data.append('data', JSON.stringify(obj));
		}
		if (selectedTask.type == 'COURSE - REVIEW') {
			const courseId = selectedTask.link_to_task.substring(
				selectedTask.link_to_task.lastIndexOf('/') + 1
			);
			obj.course = courseId;
			data.append('data', JSON.stringify(obj));
		}
		data.append('quest', JSON.stringify(selectedTask));
		try {
			const res = await fetch('/api/explore_quest/', {
				method: 'POST',
				body: data
			});
			selectedTask.isCompleted = true;
			markAsDone();
		} catch (error) {
			console.log(error);
		}
	}
</script>

<button class="task-background" on:click={handleClose} />
<div
	class={`task-container ${
		selectedTask.type === 'COURSE - REVIEW' ? 'task-container-smaller' : ''
	}`}
>
	{#if selectedTask.type === 'TWITTER - FOLLOW'}
		<TwitterTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'TWITTER - RETWEET'}
		<TwitterRetweetTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'TELEGRAM - CHANNEL'}
		<TelegramTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'TELEGRAM - GROUP'}
		<TelegramTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'DISCORD - JOIN'}
		<DiscordTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'STEAM - LINK'}
		<SteamTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'YOUTUBE - SUBSCRIBE'}
		<YoutubeTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'WEBSITE - VISIT'}
		<WebsiteTask {main_tasks} {taskNumber} {selectedTask} {submitHandler} />
	{:else if selectedTask.type === 'GAME - REVIEW'}
		<PlayTask {main_tasks} {taskNumber} {selectedTask} closeTaskContainer={markAsDone} />
	{:else if selectedTask.type === 'COURSE - WATCH'}
		<WatchTask {taskNumber} {selectedTask} {closeTaskContainer} />
	{:else if selectedTask.type === 'COURSE - REVIEW'}
		<RateTask {taskNumber} {selectedTask} {closeTaskContainer} />
	{/if}
</div>

<style>
	.task-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #140718cc;
		z-index: 70;
	}
	.task-container {
		border-radius: 16px;
		border: 2px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		padding: 24px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.8);
		/* width: 100%; */
		/* max-width: 768px; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 71;
	}

	@media (max-width: 720px) {
		.task-container {
			padding: 14px;
			width: 100%;
		}
		.task-container-smaller {
			transform: translate(-50%, -50%) scale(0.4);
			width: unset;
		}
	}
</style>
