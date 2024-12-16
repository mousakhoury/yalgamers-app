<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

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
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let action;
	export let gameInfo;
	export let onSucces;

	const handle = ({ formData, cancel }) => {
		const review = formData.get('review');
		if (!review) {
			cancel();
		}
		return async () => {
			await invalidateAll();
			onSucces();
		};
	};
</script>

<form method="POST" use:enhance={handle} {action} class="w-full">
	<div class="main-rating">
		<h4 class="title">{$t('Rate')} {$locale === 'en' ? gameInfo.title_en : gameInfo.title}</h4>

		<div class="review">
			<div class="rates">
				<div class="single-rate">
					<label for="experience" class="single-rate-label"
						><span>*</span>{$t('How was your experience with')}
						{$locale === 'en' ? gameInfo.title_en : gameInfo.title}{$locale == 'ar'
							? '؟'
							: '?'}</label
					>
					<div class="rating">
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
					<label for="graphics" class="single-rate-label"
						><span>*</span>{$t('How do you like the graphics and design quality?')}</label
					>
					<div class="face-rating">
						<input type="radio" id="worse" name="graphics" value="1" required />
						<label for="worse">
							<div>
								<img class="main-face" src={worse} alt="" />
								<img class="selected-face" src={worseColor} alt="" />
							</div>
						</label>
						<input type="radio" id="average" name="graphics" value="2" />
						<label for="average">
							<div>
								<img class="main-face" src={average} alt="" />
								<img class="selected-face" src={averageColor} alt="" />
							</div>
						</label>
						<input type="radio" id="good" name="graphics" value="3" />
						<label for="good">
							<div>
								<img class="main-face" src={good} alt="" />
								<img class="selected-face" src={goodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="very" name="graphics" value="4" />
						<label for="very">
							<div>
								<img class="main-face" src={veryGood} alt="" />
								<img class="selected-face" src={veryGoodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="excellent" name="graphics" value="5" />
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
					<label for="gameplay" class="single-rate-label"
						><span>*</span>{$t('Is the gameplay enjoyable?')}</label
					>
					<div class="face-rating-2">
						<input type="radio" id="worse-2" name="gameplay" value="1" required />
						<label for="worse-2">
							<div>
								<img class="main-face" src={worse} alt="" />
								<img class="selected-face" src={worseColor} alt="" />
							</div>
						</label>
						<input type="radio" id="average-2" name="gameplay" value="2" />
						<label for="average-2">
							<div>
								<img class="main-face" src={average} alt="" />
								<img class="selected-face" src={averageColor} alt="" />
							</div>
						</label>
						<input type="radio" id="good-2" name="gameplay" value="3" />
						<label for="good-2">
							<div>
								<img class="main-face" src={good} alt="" />
								<img class="selected-face" src={goodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="very-2" name="gameplay" value="4" />
						<label for="very-2">
							<div>
								<img class="main-face" src={veryGood} alt="" />
								<img class="selected-face" src={veryGoodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="excellent-2" name="gameplay" value="5" />
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
					<label for="optimization" class="single-rate-label"
						><span>*</span>{$t("How do you find the game's optimization?")}</label
					>
					<div class="face-rating">
						<input type="radio" id="worse-3" name="optimization" value="1" required />
						<label for="worse-3">
							<div>
								<img class="main-face" src={worse} alt="" />
								<img class="selected-face" src={worseColor} alt="" />
							</div>
						</label>
						<input type="radio" id="average-3" name="optimization" value="2" />
						<label for="average-3">
							<div>
								<img class="main-face" src={average} alt="" />
								<img class="selected-face" src={averageColor} alt="" />
							</div>
						</label>
						<input type="radio" id="good-3" name="optimization" value="3" />
						<label for="good-3">
							<div>
								<img class="main-face" src={good} alt="" />
								<img class="selected-face" src={goodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="very-3" name="optimization" value="4" />
						<label for="very-3">
							<div>
								<img class="main-face" src={veryGood} alt="" />
								<img class="selected-face" src={veryGoodColor} alt="" />
							</div>
						</label>
						<input type="radio" id="excellent-3" name="optimization" value="5" />
						<label for="excellent-3">
							<div>
								<img class="main-face" src={excellent} alt="" />
								<img class="selected-face" src={excellentColor} alt="" />
							</div>
						</label>
					</div>
				</div>
			</div>

			<div class="rates w-full">
				<div class="single-rate w-full">
					<label for="opinion" class="single-rate-label"
						><span>*</span>{$t('Write your opinion')}</label
					>
					<textarea
						placeholder="Type here"
						name="review"
						minlength="16"
						id="review"
						cols="78"
						rows="1"
						class="w-full"
					/>
				</div>
			</div>
		</div>

		<button type="submit">{$t('submit')}</button>
	</div>
</form>

<style>
	.main-rating {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 40px;
		width: 100%;
	}

	.review {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 30px;
		width: 100%;
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
		display: flex;
		gap: 25px; /* Right to left for star ordering */
		flex-direction: row-reverse;
		justify-content: space-between;
		width: 100%;
	}

	/* .rating:lang(ar) {
		direction: rtl;
	} */

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
