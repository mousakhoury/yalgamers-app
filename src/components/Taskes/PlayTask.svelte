<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Info from '$lib/assets/info-task.svg';
	import Play from '$lib/assets/task-play.svg';
	import Upload from '$lib/assets/task-upload.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskButton from './TaskButton.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	export let selectedTask;
	export let taskNumber;
	export let main_tasks = false;
	export let closeTaskContainer;

	let isLinked = false;
	let game_id = '';

	onMount(async () => {
		if (selectedTask) {
			let url = selectedTask.link_to_task;
			url = url.replace(/\/$/, '');
			const game_title = url.substring(url.lastIndexOf('/') + 1);
			let res = await fetch(
				`${env.PUBLIC_BASE_URL}/api/collections/games/records?filter=(unique_title='${game_title}')`
			);
			res = await res.json();
			game_id = res.items[0].id;
		}
	});

	function linkSteamHandler() {
		window.open(selectedTask.link_to_task);
		isLinked = true;
	}

	let file = null;

	async function submitHandler() {
		if (main_tasks) {
			await submitHandler_main_quest();
			return;
		}

		const data = new FormData();
		data.set('quest', selectedTask.id);
		data.set('file', file);
		data.set('project', $page.params.projectid);

		const res = await fetch('/api/project_quest', {
			method: 'POST',
			body: data
		});
		if (res.ok) {
			closeTaskContainer();
		}
	}

	async function submitHandler_main_quest() {
		const data = new FormData();
		data.append('quest', JSON.stringify(selectedTask));
		data.append('file', file);

		const res = await fetch('/api/explore_quest', {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			closeTaskContainer();
		}
		return;
	}

	let uploadedImageSrc = ''; // This will hold the uploaded image source

	function handleImageUpload(event) {
		file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				uploadedImageSrc = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}
</script>

{#if !selectedTask.isCompleted}
	<div class="flex justify-between items-center gap-[30px] w-full mb-[24px] play-task">
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold max-w-[359px]">
				{$t('Play to a Certain level and Upload Screenshot')}
			</p>
		</div>
		<div class="flex justify-center items-center gap-[10px]">
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Reward')}</p>
			<XpContainer xp={selectedTask.xp} />
		</div>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-[40px] pt-[24px] relative border-t-[1px] border-solid border-[#3D2644]"
	>
		<div class="flex justify-center items-start gap-[30px]">
			<div class="flex flex-col items-start gap-[40px] w-[538px] lg:w-[720px]">
				<div class="flex flex-col items-start gap-[30px] w-full">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">
						{$t('To finish this task:')}
					</p>
					<div class="flex flex-col items-start gap-[40px] w-full">
						<div class="flex items-center justify-between w-full">
							<div class="flex items-center gap-[12px]">
								<img src={Play} alt="" />
								<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">
									{$t('Play the game first, and then upload screenshot')}
								</p>
							</div>
							<TaskButton
								completed={selectedTask.isCompleted}
								checked={isLinked}
								text={$t('Play Now')}
								click={linkSteamHandler}
							/>
						</div>

						<label
							for="upload"
							class="upload-label"
							style:background-image={uploadedImageSrc ? `url(${uploadedImageSrc})` : ''}
						>
							<input
								type="file"
								id="upload"
								name="file"
								accept="image/*"
								hidden
								on:change={handleImageUpload}
							/>
							{#if !uploadedImageSrc}
								<div
									class="w-full h-full rounded-[6px] bg-[#2B1628] flex justify-center items-center"
								>
									<div class="upload-button">
										<img src={Upload} alt="" />
										<p>{$t('Upload Screenshot')}</p>
									</div>
								</div>
							{/if}
						</label>
					</div>
				</div>
				<div class="flex items-center gap-[8px]">
					<img src={Info} alt="" />

					<p class="text-[#68566E] text-[12px] font-Gilroy-Medium max-w-[284px]">
						{$t('play.task.note')}
					</p>
				</div>
			</div>
		</div>

		<TaskDoneButton click={submitHandler} isDisabled={!isLinked || !uploadedImageSrc} />
	</div>
{:else}
	<TaskCompleted taskNB={taskNumber} xp={selectedTask.xp} />
{/if}

<style>
	.upload-label {
		width: 100%;
		height: 200px;
		border-radius: 12px;
		border: 1px dashed var(--Accent, #fdeb56);
		padding: 20px;
		margin: 1px 0;
		background-size: cover;
		background-position: center;
	}

	.upload-button {
		display: inline-flex;
		padding: 8px 16px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 6px;
		border: 1px solid var(--Accent, #fdeb56);
	}

	.upload-button p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
