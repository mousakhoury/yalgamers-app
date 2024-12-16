<script>
	import { t, locale } from '$lib/stores/i18n';

	import Overall from '$components/UserRating/Overall.svelte';
	import Review from '$components/UserRating/Review.svelte';
	import ratingStar from '$lib/assets/rating-star.svg';
	import reviewImage from '$lib/assets/empty-user.png';
	import { getImageUrl } from '$lib/utils.js';

	export let data;

	let selectedSegment = 'top'; // This will hold the current selected segment

	// Function to format the date
	function formatDate(dateString) {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const dateParts = dateString.split('-'); // Assuming the format is 'dd-mm-yyyy'
		const day = parseInt(dateParts[0], 10); // Convert day to number to remove any leading zeros
		const monthIndex = parseInt(dateParts[1], 10) - 1; // Convert string to number and adjust for zero-based index
		const year = dateParts[2];
		return `${day} ${months[monthIndex]}, ${year}`;
	}

	// Reviews data
	$: reviews = data.reviews ?? [];
	$: starsAverage = (
		reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
	).toFixed(2);

	$: reviewsLength = reviews.length;

	// Function to select a segment
	function selectSegment(segment) {
		selectedSegment = segment;
	}

	// Sorted reviews based on the selected segment
	$: sortedReviews =
		selectedSegment === 'top'
			? [...reviews].sort((a, b) => b.likes - a.likes)
			: [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

	function addLeadingZero(number) {
		return number < 10 ? `0${number}` : number;
	}

	function gameOrGames(numberOfGames) {
		return numberOfGames === 1 ? 'Result' : 'Results';
	}

	$: graphics = (reviews.reduce((acc, r) => acc + r.graphics, 0) / reviews.length).toFixed(2);
	$: gameplay = (reviews.reduce((acc, r) => acc + r.gameplay, 0) / reviews.length).toFixed(2);
	$: performance = (reviews.reduce((acc, r) => acc + r.performance, 0) / reviews.length).toFixed(2);
</script>

<div class="flex flex-col items-start gap-[24px] w-full">
	<div class="overall-rating">
		<div class="overall">
			<div class="total-rating w-full lg:w-fit">
				<img src={ratingStar} alt="star" class="w-[18px]" />
				<p>{starsAverage}</p>
			</div>
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0 hidden lg:inline-block" />

			<Overall text={$t('Graphics and Design Quality')} rating={graphics * 2} />
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0 hidden lg:inline-block" />
			<Overall text={$t('Gameplay')} rating={gameplay * 2} />
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0 hidden lg:inline-block" />
			<Overall text={$t('Game Optimization')} rating={performance * 2} />
		</div>
	</div>

	<hr class="w-full border-[#ffffff1a]" />

	<div class="reviews-container w-full">
		<div class="reviews w-full">
			{#each data.reviews as review}
				<Review
					id={review.id}
					name={review.expand.user.name}
					image={review.expand.user.avatar
						? getImageUrl('users', review.user, review.expand.user.avatar)
						: reviewImage}
					date={Intl.DateTimeFormat('en-US').format(new Date(review.created))}
					games_rated={10}
					stars={review.stars}
					likes={review.likes.length ?? 0}
					dislikes={review.dislikes.length ?? 0}
					text={review.review}
					mylike={review.likes.includes(data.profile.id)}
					mydislike={review.dislikes.includes(data.profile.id)}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	.overall-rating {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.title {
		color: var(--White, #fff);
		font-family: Gilroy-Bold;
		font-size: 42px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		/* margin-bottom: 30px; */
	}

	.overall {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		gap: 18px;
	}

	.total-rating {
		display: flex;
		padding: 8px 12px;
		align-items: center;
		justify-content: center;
		gap: 10px;
		border-radius: 6px;
		background: #3d2434;
		width: 100%;
		max-width: 78px;
	}

	.total-rating p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
	}

	.reviews-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.reviews-title-container {
		display: flex;
		justify-content: space-between;
	}

	.reviews-title {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.reviews-title p {
		color: var(--white-30, #68566e);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.segmented-control {
		display: flex;
		width: 300px;
		height: 52px;
		flex-shrink: 0;
		border-radius: 8px;
		border: 1px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		align-items: center;
		padding: 6px;
	}

	.segment {
		width: 144px;
		height: 40px;
		flex-shrink: 0;
		color: var(--white-70, #beb6c0);
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: var(--Accent-2, #200b26);
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.segment.selected {
		border-radius: 4px;
		background: var(--white-10, #3d2644);
	}

	.reviews {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	@media (max-width: 1200px) {
		.overall {
			flex-direction: column;
		}

		.reviews-title-container {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		.reviews {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 720px) {
		.reviews-title {
			align-items: flex-start;
			flex-direction: column;
		}

		.title {
			font-size: 30px;
		}
	}
</style>
