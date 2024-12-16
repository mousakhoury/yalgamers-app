<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import quizImage from '$lib/assets/quiz-image.svg';
	import correct from '$lib/assets/correct.svg';
	import incorrect from '$lib/assets/incorrect.svg';

	export let quizes;

	// console.log(quizes?.quiz.expand.questions);

	import star from '$lib/assets/review-star.svg';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';

	const loadedQuestions = quizes?.quiz.expand.questions.map((q) => {
		return {
			id: q.id,
			question: q.question_en,
			answer: q[`option_${q.answer.split('option_')[1]}`], // Gets the answer text based on the answer key
			options: [q.option_1, q.option_2, q.option_3].filter(Boolean), // Filters out any undefined or null options
			correct: null,
			selectedOption: null
		};
	});

	const questions = writable(loadedQuestions || [].map((q) => ({ ...q, selectedOption: null })));

	$: questionsLength = $questions.length;

	let currentTab = 0;

	function checkAnswer(questionIndex, option) {
		questions.update((qs) => {
			qs[questionIndex].selectedOption = option; // Set the selected option
			const isCorrect = qs[questionIndex].answer === option;
			qs[questionIndex].correct = isCorrect;
			return qs;
		});
	}

	$: enableNext = $questions[currentTab]?.correct;

	// Function to handle the "Next" button click
	function handleNext(e) {
		e.preventDefault();
		e.stopPropagation();
		if (currentTab < $questions.length - 1) {
			currentTab++;
		} else {
			// If it's the last question, you can redirect or take another action
			console.log('Quiz completed! Redirecting...');
			// window.location.href = '/your-next-page'; // Uncomment this line to redirect
		}
	}

	// Function to determine the button class based on the answer correctness
	function optionButtonClass(question, option) {
		if (question.selectedOption === option) {
			return question.correct ? 'option-button correct' : 'option-button incorrect';
		}
		return 'option-button';
	}
	let rating = 0;
	$: reviewVisible = false;

	export let visible = false;
	let loading = false;
	let resultResp = [];

	function submitForm() {
		loading = true;
		return async ({ result }) => {
			resultResp = result.data;
			loading = false;
			reviewVisible = true;
		};
	}

	function submitReview() {
		loading = true;
		return async ({ result }) => {
			loading = false;
			reviewVisible = false;
			visible = false;
			window.location.reload();
		};
	}

	function formVisible() {
		visible = false;
	}
</script>

{#if visible && !reviewVisible}
	<div class="fixed top-0 left-0 w-full h-full" style=" background: var(--Accent, #140718d9);">
		<form method="POST" action="?/quizes" use:enhance={submitForm}>
			<div
				class="bg-accent-2 w-[600px] aspect-[600/556] rounded-[16px] border-[1px] border-solid border-[#533E59] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[40px] scale-50 sm:scale-100"
			>
				{#each $questions as question, index}
					<div class="quiz-container">
						<div class={index === currentTab ? 'block' : 'hidden'}>
							<div class="flex items-center justify-between mb-[40px]">
								<div class="flex items-center gap-[15px]">
									<img src={quizImage} alt="" />
									<h6 class="text-[32px] text-[#fff] font-Gilroy-Bold">Quiz</h6>
								</div>
								<p class="text-[16px] text-[#A99FAC] font-Gilroy-Medium">
									{index + 1} of {questionsLength}
								</p>
							</div>
							<div class="flex flex-col items-start gap-[20px]">
								<div class="flex items-center gap-[12px]">
									<div
										class="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[20px] font-Gilroy-Bold text-[#3D2644]"
										style="background: #FDEB56;"
									>
										{index + 1}
									</div>
									<p class="text-[24px] text-[#D4CFD6] font-Gilroy-SemiBold">
										{question.question}
									</p>
								</div>
								<div class="flex flex-col items-start gap-[12px] w-full">
									{#each question.options as option}
										<button
											on:click={(e) => {
												e.preventDefault();
												checkAnswer(index, option);
											}}
											class={optionButtonClass(question, option)}
											disabled={question.selectedOption !== null}
										>
											{option}
											{#if question.selectedOption === option}
												{#if question.correct === true}
													<p class="flex items-center gap-[8px]">
														<img src={correct} alt="" />
														Correct
													</p>
												{:else if question.correct === false}
													<p class="flex items-center gap-[8px]">
														<img src={incorrect} alt="" />
														Incorrect
													</p>
												{/if}
											{/if}
										</button>
									{/each}
								</div>
							</div>

							<div class="flex gap-[20px] mt-[47px]">
								<button on:click={formVisible} class="button-no">Cancel</button>
								{#if currentTab < $questions.length - 1}
									<button on:click={handleNext} class="button-yes" disabled={!enableNext}>
										Next
									</button>
								{:else}
									<button type="submit" class="button-yes" disabled={!enableNext}> Next </button>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
			<input type="text" name="quiz" value={quizes.quiz.id} class="hidden" />
		</form>
	</div>
{/if}

{#if reviewVisible}
	<div class="fixed top-0 left-0 w-full h-full" style=" background: var(--Accent, #140718d9);">
		<div
			class="bg-accent-2 w-[600px] aspect-[800/528] rounded-[16px] border-[1px] border-solid border-[#533E59] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[40px] scale-50 sm:scale-100"
		>
			<!--<button-->
			<!--class="absolute flex items-start justify-start p-2 rounded-full cursor-pointer w-7 h-7 sm:w-10 sm:h-10 top-3 right-3 bg-white-20"-->
			<!--on:click={() => ( = false)}-->
			<!-->-->
			<!--<img alt="back icon" width="24px" height="24px" src={closeSvg} class="cursor-pointer" />-->
			<!--</button>-->
			<div class="flex flex-col items-start justify-start gap-5">
				<form
					method="post"
					action={`?/review`}
					class="flex flex-col w-full"
					use:enhance={submitReview}
				>
					<div class="main-rating">
						<h4 class="title">Rate This Course</h4>

						<div class="review">
							<div class="rates">
								<div class="single-rate">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="single-rate-label"
										><span>*</span>How was your experience with this course</label
									>
									<div class="rating" dir="rtl">
										<!-- Star rating inputs -->
										<input type="radio" id="star5" name="rating" value="5" />
										<label for="star5">
											<img src={star} alt="" />
											<p>{$t('Excellent')}</p>
										</label>

										<input type="radio" id="star4" name="rating" value="4" />
										<label for="star4">
											<img src={star} alt="" />
											<p>{$t('Very Good')}</p>
										</label>
										<input type="radio" id="star3" name="rating" value="3" />
										<label for="star3">
											<img src={star} alt="" />
											<p>{$t('Good')}</p>
										</label>
										<input type="radio" id="star2" name="rating" value="2" />
										<label for="star2">
											<img src={star} alt="" />
											<p>{$t('Average')}</p>
										</label>
										<input type="radio" id="star1" name="rating" value="1" required />
										<label for="star1">
											<img src={star} alt="" />
											<p>{$t('Worse')}</p>
										</label>
									</div>
								</div>
							</div>

							<div class="rates">
								<div class="single-rate">
									<!-- svelte-ignore a11y-label-has-associated-control -->
									<label class="single-rate-label"><span>*</span>{$t('Write your opinion')}</label>
									<textarea placeholder="Type here" name="review" id="review" cols="63" rows="1" />
								</div>
							</div>
						</div>

						<button type="submit">{$t('submit')}</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.button-no {
		display: flex;
		width: 250px;
		padding: 16px 32px 15px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--white-10, #3d2644);
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.button-yes {
		display: flex;
		width: 250px;
		padding: 16px 32px 15px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
		border-radius: 10px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.button-yes:hover {
		box-shadow: 0px 5px 14px 0px rgba(251, 134, 86, 0.25);
	}

	.button-yes:disabled {
		border-radius: 10px;
		opacity: 0.3;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		box-shadow: none;
	}

	.option-button {
		display: flex;
		padding: 15px 20px;
		align-items: center;
		justify-content: space-between;
		border-radius: 8px;
		border: 1px solid var(--white-10, #3d2644);
		color: var(--white-60, #a99fac);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 137.5% */
		width: 100%;
	}

	.correct {
		border: 1px solid var(--Positive, #1fd031);
		background: rgba(31, 208, 49, 0.1);
		color: var(--Positive, #1fd031);
	}

	.incorrect {
		border: 1px solid var(--Accent, #f71756);
		background: rgba(247, 23, 86, 0.1);
		color: var(--Accent, #f71756);
	}

	.main-rating {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
	}

	.review {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
	}
	.title {
		color: var(--White, #fff);
		font-family: Gilroy-Bold;
		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.rates {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
	}

	.single-rate {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
	}

	.single-rate-label {
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.single-rate-label span {
		color: var(--Accent, #f71756);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.rating {
		direction: rtl;
		display: flex;
		gap: 25px; /* Right to left for star ordering */
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

	.face-rating label div .selected-face {
		display: none;
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

	.face-rating-2 label div .selected-face {
		display: none;
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
		padding: 18px;
		color: #fff;
	}

	.main-rating button {
		display: flex;
		width: 100%;
		padding: 16px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		box-shadow: 0px 5px 14px 0px rgba(251, 134, 86, 0.25);
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
