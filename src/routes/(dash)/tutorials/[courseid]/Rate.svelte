<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { env } from '$env/dynamic/public';
	// import star from '$lib/assets/review-star.svg';
	import star from '$lib/assets/review-star2.svg';
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
	import TaskDoneButton from '$components/Taskes/TaskDoneButton.svelte';
	import TaskCompleted from '$components/Taskes/TaskCompleted.svelte';
	import TaskButton from '$components/Taskes/TaskButton.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let close;

	let isLinked = true;
	let course_id = '';

	onMount(async () => {
		try {
			const course = await fetch(
				`${env.PUBLIC_BASE_URL}/api/collections/tutorials/records?filter=unique_title='${$page.params.courseid}'`
			);
			course_id = (await course.json()).items[0].id;
		} catch (error) {}
	});

	function linkTwitterHandler() {
		isLinked = false;
	}

	const createReview = async (data) => {
		return fetch(`/api/courses/${course_id}/review`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
	};

	const reviewHandler = async (e) => {
		const formData = new FormData(e.target);

		const obj = {
			stars: formData.get('stars'),
			video_quality: formData.get('video_quality'),
			helpfulness: formData.get('helpfulness'),
			content: formData.get('content'),
			review: formData.get('review')
		};
		const res = await createReview(obj);
		if (!res.ok) return;
		close();
	};

	let form = null;
</script>

<button class="task-background" on:click={close}>
	<button class="task-container" on:click|stopPropagation>
		<div class="flex flex-col items-start justify-center gap-[40px] relative w-full">
			<p class="text-white text-[24px] font-semibold">Rate this course</p>

			<form class="w-full" on:submit|preventDefault={(e) => reviewHandler(e)}>
				<div class="review">
					<div class="rates">
						<div class="single-rate">
							<label for="stars" class="single-rate-label">
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
							<label for="worse" class="single-rate-label"
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
							<label for="worse-2" class="single-rate-label"
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
							<label for="worse-3" class="single-rate-label"
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
							<label for="review" class="single-rate-label"
								><span>*</span>{$t('Write your opinion')}</label
							>
							<textarea
								placeholder={$t('typeHere')}
								name="review"
								minlength="16"
								id="review"
								required
							/>
						</div>
					</div>
				</div>

				<TaskDoneButton text={$t('submit')} />

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
	</button>
</button>

<style>
	.task-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 300vh;
		background-color: #140718cc;
		z-index: 60;
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
		width: 100%;
		max-width: 768px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 50;
	}

	@media (max-width: 720px) {
		.task-container {
			padding: 14px;
			width: 100%;
			transform: translate(-50%, -50%) scale(0.7);
		}
	}
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
		width: 100%;
		justify-content: space-between;
	}

	.rating img {
		width: 40px;
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
		width: 100%;
	}

	.face-rating input {
		display: none;
	}

	.face-rating label {
		width: 100%;
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
		width: 100%;
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
		width: 100%;
	}

	.face-rating-2 input {
		display: none;
	}

	.face-rating-2 label {
		width: 100%;
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
		width: 100%;
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
		height: 60px !important;
		width: 100%;
	}
</style>
