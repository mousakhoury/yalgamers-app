<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Overall from '$components/UserRating/Overall.svelte';
	import Review from '$components/UserRating/Review.svelte';
	import ratingStar from '$lib/assets/rating-star.svg';
	import reviewImage from '$lib/assets/empty-user.png';
	import { getImageUrl } from '$lib/utils.js';

	export let data;

	// Reviews data
	$: reviews = data.reviews ?? [];
	$: starsAverage = (
		reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
	).toFixed(2);

	$: graphics = (reviews.reduce((acc, r) => acc + r.graphics, 0) / reviews.length).toFixed(2);
	$: gameplay = (reviews.reduce((acc, r) => acc + r.gameplay, 0) / reviews.length).toFixed(2);
	$: performance = (reviews.reduce((acc, r) => acc + r.performance, 0) / reviews.length).toFixed(2);
</script>

<div class="flex flex-col items-start gap-[24px] w-full">
	<div class="overall-rating">
		<div class="overall">
			<div class="total-rating">
				<img src={ratingStar} alt="star" class="w-[18px]" />
				<p>{starsAverage}</p>
			</div>
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0" />

			<Overall text={$t('Graphics and Design Quality')} rating={graphics * 2} />
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0" />
			<Overall text={$t('Gameplay')} rating={gameplay * 2} />
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0" />
			<Overall text={$t('Game Optimization')} rating={performance * 2} />
		</div>
	</div>

	<hr class="w-full border-[#ffffff1a]" />

	<div class="reviews-container w-full">
		<div class="reviews w-full">
			{#each data.reviews as review}
				<Review
					name={review.expand.user.username}
					image={review.expand.user.avatar
						? getImageUrl('users', review.user, review.expand.user.avatar)
						: reviewImage}
					date={Intl.DateTimeFormat('en-US').format(new Date(review.created))}
					games_rated={10}
					stars={review.stars}
					likes={review.likes ?? 0}
					dislikes={review.dislikes ?? 0}
					text={review.review}
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

	.overall {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.reviews {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
	}

	@media (max-width: 1200px) {
		.overall {
			flex-direction: column;
		}

		.reviews {
			grid-template-columns: 1fr;
		}
	}
</style>
