<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { env } from '$env/dynamic/public';
	import star from '$lib/assets/review-star.svg';
	import worse from '$lib/assets/worse.svg';
	import worseColor from '$lib/assets/worse-color.svg';
	import average from '$lib/assets/average.svg';
	import averageColor from '$lib/assets/average-color.svg';
	import good from '$lib/assets/good.svg';
	import goodColor from '$lib/assets/good-color.svg';
	import veryGood from '$lib/assets/very-good.svg';
	import veryGoodColor from '$lib/assets/very-good-color.svg';
	import excellent from '$lib/assets/excellent.svg';
	import excellentColor from '$lib/assets/excellent-color.svg';
	import NotLinked from '$lib/assets/twitter-not-linked.svg';
	import XpContainer from '$components/XpContainer.svelte';
	import TaskDoneButton from './TaskDoneButton.svelte';
	import TaskCompleted from './TaskCompleted.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import TaskButton from './TaskButton.svelte';
	import { goto } from '$app/navigation';
	export let selectedTask;
	export let main_tasks = false;
	export let closeTaskContainer;

	export let taskNumber;
	let courseId = '';
	let courseWatched = false;

	onMount(async () => {
		if (selectedTask) {
			let url = selectedTask.link_to_task;
			url = url.replace(/\/$/, '');
			const course_title = url.substring(url.lastIndexOf('/') + 1);
			let res = await fetch(
				`${env.PUBLIC_BASE_URL}/api/collections/tutorials/records?filter=(unique_title='${course_title}')`
			);
			res = await res.json();
			courseId = res.items[0].id;
		}
		await checkForCourseWatch();
	});

	async function checkForCourseWatch() {
		const userId = $page.data.profile.id;
		let res = await fetch(
			`${env.PUBLIC_BASE_URL}/api/collections/tutorial_watch_history/records?filter=(course='${courseId}' %26%26 user='${userId}')`
		);
		res = (await res.json()).items[0];
		if (res && res.duration > 99) {
			courseWatched = true;
		}
	}

	let isLinked = true;

	function linkTwitterHandler() {
		isLinked = false;
	}

	const createReview = async (formData) => {
		return fetch(`/api/courses/${courseId}/review`, {
			method: 'POST',
			body: formData
		});
	};
	const reviewHandler = async () => {
		const formData = new FormData(form);
		const res = await createReview(formData);
		if (!res.ok) return;

		closeTaskContainer();
	};

	let form = null;

	function _close() {
		window.open(selectedTask.link_to_task);
	}
</script>

{#if !selectedTask.isCompleted}
	<div
		class="flex justify-between items-center w-full mb-[40px] rate-task {courseWatched
			? ''
			: 'w-80 md:w-[38rem]'}"
	>
		<div class="flex flex-col gap-[8px]">
			{#if !main_tasks}
				<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Task')} {taskNumber}:</p>
			{/if}
			<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{$t('Rate this course')}</p>
		</div>
		<div class="flex justify-center items-center gap-[10px]">
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">{$t('Reward')}</p>
			<XpContainer xp={selectedTask.xp} />
		</div>
		<TaskButton completed={false} text={'Course'} click={_close} />
	</div>
	{#if courseWatched}
		<div class="flex flex-col items-center justify-center gap-[40px] relative">
			<form on:submit={(e) => e.preventDefault()} bind:this={form}>
				<div class="review">
					<div class="rates">
						<div class="single-rate">
							<label for="experience" class="single-rate-label">
								<span>*</span>{$t('How was your experience with this course?')}
							</label>
							<div class="rating">
								<!-- Star rating inputs -->

								<input type="radio" id="star5" name="stars" value="5" />
								<label for="star5">
									<img src={star} alt="" />
									<p>{$t('Excellent')}</p>
								</label>
								<input type="radio" id="star4" name="stars" value="4" />
								<label for="star4">
									<img src={star} alt="" />
									<p>{$t('Very Good')}</p>
								</label>
								<input type="radio" id="star3" name="stars" value="3" />
								<label for="star3">
									<img src={star} alt="" />

									<p>{$t('Good')}</p>
								</label>
								<input type="radio" id="star2" name="stars" value="2" />
								<label for="star2">
									<img src={star} alt="" />
									<p>{$t('Average')}</p>
								</label>
								<input type="radio" id="star1" name="stars" value="1" required />
								<label for="star1">
									<img src={star} alt="" />
									<p>{$t('Worse')}</p>
								</label>
							</div>
						</div>
					</div>

					<div class="rates">
						<div class="single-rate">
							<label for="quality" class="single-rate-label"
								><span>*</span>{$t('How do you like the video quality?')}</label
							>
							<div class="face-rating">
								<input type="radio" id="worse" name="video_quality" value="1" required />
								<label for="worse">
									<div>
										<img class="main-face" src={worse} alt="" />
										<img class="selected-face" src={worseColor} alt="" />
									</div>
								</label>
								<input type="radio" id="average" name="video_quality" value="2" />
								<label for="average">
									<div>
										<img class="main-face" src={average} alt="" />
										<img class="selected-face" src={averageColor} alt="" />
									</div>
								</label>
								<input type="radio" id="good" name="video_quality" value="3" />
								<label for="good">
									<div>
										<img class="main-face" src={good} alt="" />
										<img class="selected-face" src={goodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="very" name="video_quality" value="4" />
								<label for="very">
									<div>
										<img class="main-face" src={veryGood} alt="" />
										<img class="selected-face" src={veryGoodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="excellent" name="video_quality" value="5" />
								<label for="excellent">
									<div>
										<img class="main-face" src={excellent} alt="" />
										<img class="selected-face" src={excellentColor} alt="" />
									</div>
								</label>
							</div>
						</div>
					</div>
					<div class="rates">
						<div class="single-rate">
							<label for="helpful" class="single-rate-label"
								><span>*</span>{$t('Is the course helpful?')}</label
							>
							<div class="face-rating-2">
								<input type="radio" id="worse-2" name="helpfulness" value="1" required />
								<label for="worse-2">
									<div>
										<img class="main-face" src={worse} alt="" />
										<img class="selected-face" src={worseColor} alt="" />
									</div>
								</label>
								<input type="radio" id="average-2" name="helpfulness" value="2" />
								<label for="average-2">
									<div>
										<img class="main-face" src={average} alt="" />
										<img class="selected-face" src={averageColor} alt="" />
									</div>
								</label>
								<input type="radio" id="good-2" name="helpfulness" value="3" />
								<label for="good-2">
									<div>
										<img class="main-face" src={good} alt="" />
										<img class="selected-face" src={goodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="very-2" name="helpfulness" value="4" />
								<label for="very-2">
									<div>
										<img class="main-face" src={veryGood} alt="" />
										<img class="selected-face" src={veryGoodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="excellent-2" name="helpfulness" value="5" />
								<label for="excellent-2">
									<div>
										<img class="main-face" src={excellent} alt="" />
										<img class="selected-face" src={excellentColor} alt="" />
									</div>
								</label>
							</div>
						</div>
					</div>

					<div class="rates">
						<div class="single-rate">
							<label for="liked" class="single-rate-label"
								><span>*</span>{$t('How much do you liked the content?')}</label
							>
							<div class="face-rating">
								<input type="radio" id="worse-3" name="content" value="1" required />
								<label for="worse-3">
									<div>
										<img class="main-face" src={worse} alt="" />
										<img class="selected-face" src={worseColor} alt="" />
									</div>
								</label>
								<input type="radio" id="average-3" name="content" value="2" />
								<label for="average-3">
									<div>
										<img class="main-face" src={average} alt="" />
										<img class="selected-face" src={averageColor} alt="" />
									</div>
								</label>
								<input type="radio" id="good-3" name="content" value="3" />
								<label for="good-3">
									<div>
										<img class="main-face" src={good} alt="" />
										<img class="selected-face" src={goodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="very-3" name="content" value="4" />
								<label for="very-3">
									<div>
										<img class="main-face" src={veryGood} alt="" />
										<img class="selected-face" src={veryGoodColor} alt="" />
									</div>
								</label>
								<input type="radio" id="excellent-3" name="content" value="5" />
								<label for="excellent-3">
									<div>
										<img class="main-face" src={excellent} alt="" />
										<img class="selected-face" src={excellentColor} alt="" />
									</div>
								</label>
							</div>
						</div>
					</div>

					<div class="rates">
						<div class="single-rate">
							<label for="opinion" class="single-rate-label"
								><span>*</span>{$t('Write your opinion')}</label
							>
							<textarea placeholder="Type here" name="review" minlength="16" id="review" required />
						</div>
					</div>
				</div>

				<TaskDoneButton
					text={$t('Send to Approve')}
					click={reviewHandler}
					isDisabled={selectedTask.isCompleted}
				/>

				{#if !isLinked}
					<div
						class="absolute w-[101%] h-[101%] top-[-1px] left-[-1px] bg-[#200b26f7] flex flex-col items-center justify-center gap-[30px] pb-[105px]"
					>
						<div class="flex flex-col items-center gap-[24px]">
							<img src={NotLinked} alt="" />
							<div class="flex flex-col items-center gap-[8px]">
								<p
									class="text-[#E9E6EA] text-[20px] text-center max-w-[256px] font-Gilroy-SemiBold"
								>
									<span class="text-[#F71756]">{$t('Error!')}</span>
									{$t('You need to Complete the Course First..')}
								</p>
								<p
									class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium text-center max-w-[337px] leading-[19px]"
								>
									{$t('watch.not.completed')}
								</p>
							</div>
						</div>

						<button class="link-twitter" on:click={linkTwitterHandler}>
							<p>{$t('Complete')}</p>
						</button>
					</div>
				{/if}
			</form>
		</div>
	{/if}
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

	.review {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		margin-bottom: 40px;
	}

	.rates {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		width: 100%;
	}

	.single-rate {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		width: 100%;
	}

	.single-rate-label {
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.single-rate-label span {
		color: var(--Accent, #f71756);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.rating {
		display: flex;
		gap: 25px; /* Right to left for star ordering */
		flex-direction: row-reverse;
	}

	.rating > input {
		display: none; /* Hide the radio buttons */
	}

	.rating > input ~ label {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		color: var(--white-30, #68566e);
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: 68.22px;
	}
	.rating > input:checked ~ label,
	.rating > input:hover ~ label,
	.rating > label:hover ~ label {
		filter: invert(78%) sepia(67%) saturate(557%) hue-rotate(1deg) brightness(306%) contrast(108%); /* Active star color */
	}

	.face-rating {
		border-radius: 8px;
		border: 1px solid var(--white-10, #3d2644);
		display: flex;
	}

	.face-rating input {
		display: none;
	}

	.face-rating label {
		width: 144px;
		height: 60px;
		border-right: 1px solid #3d2644;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.face-rating label:last-child {
		border-right: 0;
	}

	.face-rating label div {
		width: 128px;
		height: 44px;
		flex-shrink: 0;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.face-rating label div .selected-face {
		display: none;
	}

	.face-rating label:hover div,
	.face-rating input[type='radio']:checked + label div {
		background: rgba(111, 191, 68, 0.1);
	}

	.face-rating label:hover div .selected-face,
	.face-rating input[type='radio']:checked + label div .selected-face {
		display: block;
	}

	.face-rating label:hover div .main-face,
	.face-rating input[type='radio']:checked + label div .main-face {
		display: none;
	}

	.face-rating-2 {
		border-radius: 8px;
		border: 1px solid var(--white-10, #3d2644);
		display: flex;
	}

	.face-rating-2 input {
		display: none;
	}

	.face-rating-2 label {
		width: 144px;
		height: 60px;
		border-right: 1px solid #3d2644;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.face-rating-2 label:last-child {
		border-right: 0;
	}

	.face-rating-2 label div {
		width: 128px;
		height: 44px;
		flex-shrink: 0;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.face-rating-2 label div .selected-face {
		display: none;
	}

	.face-rating-2 label:hover div,
	.face-rating-2 input[type='radio']:checked + label div {
		background: rgba(111, 191, 68, 0.1);
	}

	.face-rating-2 label:hover div .selected-face,
	.face-rating-2 input[type='radio']:checked + label div .selected-face {
		display: block;
	}

	.face-rating-2 label:hover div .main-face,
	.face-rating-2 input[type='radio']:checked + label div .main-face {
		display: none;
	}

	.single-rate textarea {
		border-radius: 8px;
		border: 1px solid var(--white-10, #3d2644);
		background: var(--Accent, #140718);
		padding: 14px;
		color: #fff;
		height: auto !important;
		width: 100%;
	}
</style>
