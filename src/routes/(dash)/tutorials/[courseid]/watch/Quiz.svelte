<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { page } from '$app/stores';

	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Rating from '$components/Rating.svelte';
	import { onDestroy } from 'svelte';

	export let quizes;
	export let visible = false;
	let resultResp = [];
	let loading = false;
	let reviewVisible = false;

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

	let refresh = false;
	let rating = 0;

	let quizDisabled = false;

	$: questions = quizes?.quiz.expand.questions;

	const handleOptionSelection = (e) => {
		const selected = e.target.value;
		const question_id = e.target.id.split('-')[0];
		const question = questions.find((q) => q.id === question_id);
		if (selected !== question?.answer)
			// Replace with hash
			quizDisabled = true;
	};

	onDestroy(() => {
		quizDisabled = false;
	});
</script>

{#if visible && !reviewVisible}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 z-[120] flex items-center justify-center w-full h-full backdrop-blur-md bg-blur"
	>
		<div class="bg-white-10 rounded-[16px] p-[30px] min-w-[400px] h-4/5 overflow-y-auto">
			<form
				action="?/quizes"
				class="flex flex-col items-start justify-between w-full h-full"
				method="post"
				use:enhance={submitForm}
			>
				<div class=" grid grid-cols-1 gap-[10px] overflow-y-auto w-full">
					<p
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-white-70 font-Gilroy-SemiBold text-[20px]"
					>
						{$t('attendQuiz')}
					</p>
					<input type="text" name="quiz" value={quizes.quiz.id} class="hidden" />
					{#each questions as question, index}
						<div class="flex flex-col items-start justify-center w-full gap-2">
							<div
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="pr-4 text-xl not-italic font-normal text-white font-Gilroy-Bold"
							>
								{index + 1}. {$locale === 'en' ? question.question_en : question.question}
							</div>
							<div>
								{#each ['option_1', 'option_2', 'option_3'] as option}
									<div>
										<input
											on:change={handleOptionSelection}
											type="radio"
											id={`${question.id}-${option}`}
											name={question.id}
											value={option}
											disabled={quizDisabled}
										/>
										<label for={`${question.id}-${option}`}>{question[option]}</label>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
				<div class="flex items-end justify-center w-full mt-10 gap-4">
					{#if resultResp.length === 0}
						<Button
							type="primary"
							on:click={() => {
								resultResp = [];
								visible = false;
							}}
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-white bg-white-20">{$t('cancel')}</Button
						>
						<Button type="gradient" size="md">{$t('submit')}</Button>
					{:else}
						<Button
							on:click={() => {
								visible = false;
							}}
							type="gradient"
							size="md">Close</Button
						>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}

{#if reviewVisible}
	<div
		class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-4 backdrop-blur-md"
	>
		<div
			class="bg-accent w-[min(450px,99%)] h-fit relative rounded-[20px] flex justify-center items-start flex-col p-5 md:p-7 m-auto"
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
					<div>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="  md:text-2xl lg:text-[28px] mt-5 font-Gilroy-Bold text-white"
						>
							{$t('yourRating')}
						</p>
						<Rating type="rate" bind:star={rating} />
					</div>
					<div>
						<input name="stars" value={rating} hidden />
					</div>
					<Button
						size="sm"
						type="gradient"
						class="mt-5 px-8 py-4 h-[40px] sm:h-[45px] lg:h-[50px] text-[16px] sm:text-lg"
						>{$t('submit')}</Button
					>
				</form>
			</div>
		</div>
	</div>
{/if}
