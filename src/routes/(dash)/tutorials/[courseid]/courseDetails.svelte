<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import bigXp from '$lib/assets/big-xp.svg';

	import emptyUser from '$lib/assets/empty-user.png';
	import reviewImage from '$lib/assets/review-image.png';
	import cam from '$lib/assets/cam.svg';
	import clock from '$lib/assets/clock.svg';
	import people from '$lib/assets/people.svg';
	import arrowDown from '$lib/assets/arrow-down.svg';
	import { env } from '$env/dynamic/public';
	import CourseContentCard from '$components/Explore-Course/CourseContentCard.svelte';
	import { getImageUrl } from '$lib/utils';
	import Review from '$components/UserRating/Review.svelte';
	import Button from '$components/Button.svelte';

	export let data;
	let expandedContent = false;
	const seconds_to_timestamp = (t) => {
		if (t === undefined) return undefined;

		let hours = Math.floor(t / 60 / 60) + '';
		let mins = Math.floor(t / 60) + '';
		let seconds = (t % 60) + '';

		if (mins.length === 1) mins = '0' + mins;

		if (seconds.length === 1) seconds = '0' + seconds;

		if (hours.length === 1) hours = '0' + hours;

		if (hours != '00') return `${hours}h ${mins}m`;
		else return `${mins}m ${seconds}s`;
	};

	let chapters = data.videoinfo.videoDetails.chapters;
	let thumbnail = data.videoinfo.videoDetails.thumbnails[4].url;

	let duration = seconds_to_timestamp(data.videoinfo.videoDetails.lengthSeconds);

	let rating = data.reviews === 0 ? 0 : data.stars / data.reviews;

	let body = $locale === 'en' ? data.body_en : data.body;
	let expanded = false;

	// Assuming `originalBody` contains your HTML content.
	// This should be the complete content you want to toggle.
	let originalBody = body; // Replace `...` with your actual content string.

	// Function to toggle the content visibility.
	function toggleContent() {
		expanded = !expanded;
	}

	let selectedSegment = 'top';

	$: reviewsLength = reviews.length;

	$: reviews = data?.reviewsList;

	function selectSegment(segment) {
		selectedSegment = segment;
	}

	$: sortedReviews =
		selectedSegment === 'top'
			? [...reviews].sort((a, b) => b.likes - a.likes)
			: [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));

	function gameOrGames(numberOfGames) {
		return numberOfGames === 1 ? 'Result' : 'Results';
	}

	// Function to add a leading zero if the number is a single digit
	function addLeadingZero(number) {
		return number < 10 ? `0${number}` : number;
	}
</script>

<div class="course-head">
	<div class="course-image">
		<img
			src={`${env.PUBLIC_BASE_URL}/api/files/tutorials/${data.id}/${data.banner_image}`}
			alt=""
		/>
	</div>
	<div class="course-content">
		<div class="course-content-info">
			<div class="course-content-info-text">
				<h4>{$locale === 'en' ? data.title_en : data.title}</h4>
				<p>{$locale === 'en' ? data.subtitle_en : data.subtitle}</p>
				<div class="course-review mt-[5px] flex-wrap">
					<div class="flex items-center gap-[6px]">
						<div class="text-[#FDEB56] text-[20px]">{rating.toFixed(1)}</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 16 15"
							fill="none"
						>
							<path
								d="M7.52447 0.463526C7.67415 0.0028708 8.32585 0.00286996 8.47553 0.463525L9.90837 4.87336C9.97531 5.07937 10.1673 5.21885 10.3839 5.21885H15.0207C15.505 5.21885 15.7064 5.83865 15.3146 6.12336L11.5633 8.84878C11.3881 8.9761 11.3148 9.20179 11.3817 9.4078L12.8145 13.8176C12.9642 14.2783 12.437 14.6613 12.0451 14.3766L8.29389 11.6512C8.11865 11.5239 7.88135 11.5239 7.70611 11.6512L3.95488 14.3766C3.56303 14.6613 3.03578 14.2783 3.18546 13.8176L4.6183 9.4078C4.68524 9.20179 4.61191 8.9761 4.43667 8.84878L0.685441 6.12336C0.293584 5.83866 0.494972 5.21885 0.979333 5.21885H5.6161C5.83272 5.21885 6.02469 5.07937 6.09163 4.87336L7.52447 0.463526Z"
								fill="url(#paint0_linear_1596_15424)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_1596_15424"
									x1="0"
									y1="8"
									x2={rating.toFixed(1) * 4}
									y2="8"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.713485" stop-color="#FDEB56" />
									<stop offset="0.732781" stop-color="#68566E" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div class="text-[#A99FAC] text-[20px]">(0 Reviews)</div>
					<div class="flex gap-[10px]">
						<img height="20px" width="20px" src={people} alt="people icon" />
						<div
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-[20px] not-italic font-normal font-Gilroy-Medium text-[#1FD031]"
						>
							{data.reviews}
							{$t('people')}
						</div>
					</div>
				</div>
			</div>

			<div class="flex gap-[20px] flex-wrap">
				<!-- svelte-ignore missing-declaration -->
				<Button type="course">
					<img slot="svg" src={cam} alt="video icon" />
					<div slot="content">{data.videoinfo.videoDetails.chapters.length} {$t('chapters')}</div>
				</Button>
				<!-- svelte-ignore missing-declaration -->

				<Button type="course">
					<img slot="svg" src={clock} alt="clock icon" />
					<div slot="content" class="">
						{seconds_to_timestamp(data.videoinfo.videoDetails.lengthSeconds)}
					</div>
				</Button>
			</div>

			<div class="flex gap-[16px] md:gap-[60px] flex-wrap">
				<div class="flex flex-col gap-[16px] items-start">
					<div class="text-[#948798] text-[20px] font-Gilroy-SemiBold">{$t('rewards')}</div>
					<span class="xp-container">
						<img src={bigXp} alt="" />
						<p>{data.xp}</p>
					</span>
				</div>

				<div class="flex flex-col gap-[16px] items-start">
					<div class="text-[#948798] text-[20px] font-Gilroy-SemiBold">Course Creator</div>
					<div class="flex gap-[20px] items-center">
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img
							src={data.expand.user.avatar
								? getImageUrl('users', data.expand.user.id, data.expand.user.avatar)
								: emptyUser}
							height="40px"
							width="40px"
							class="rounded-full"
							alt="content creator image"
						/>

						<div class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">
							{data.expand.user.username}
						</div>
					</div>
				</div>
			</div>
		</div>

		<button class="start-quiz-button"> Start Quiz </button>
	</div>
</div>

<div
	class="w-full p-[15px] min-[768px]:p-[30px] bg-accent-2 text-white rounded-[10px] mt-16 min-[768px]:mt-20 flex flex-col gap-5 description"
>
	<div class={expanded ? 'expanded' : 'not-expanded'}>
		{@html expanded ? originalBody : originalBody.split(' ').slice(0, 50).join(' ')}
		<button on:click={toggleContent} class="read-more-button">
			{expanded ? 'See less' : 'See more...'}
		</button>
	</div>
</div>

<div class="w-full p-[30px] bg-accent-2 rounded-[10px] mt-20 flex flex-col gap-10">
	<div class="flex flex-col items-center justify-between w-full mt-2 mb-4 md:mt-8 md:flex-row">
		<h3
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-xl min-[768px]:text-[30px] lg:text-[42px] text-white font-Gilroy-Bold"
		>
			{$t('content')}
		</h3>
		<ul class="flex text-[#FDEB56] list-disc gap-8">
			<li>{chapters.length} {$t('videos')}</li>
			<li>{$t('totalMins', { min: duration })}</li>
		</ul>
	</div>

	<div class="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden items-start gap-[30px]">
		{#each chapters as chapter, index}
			{#if index < 8}
				<!-- svelte-ignore missing-declaration -->
				<CourseContentCard
					clickHandler={() => videoPlayer.seekTo(chapter.start_time, true)}
					{thumbnail}
					title={chapter.title}
					timestamp={`${seconds_to_timestamp(chapter.start_time)}`}
					{duration}
					lesson={index + 1}
					playBtn={false}
				/>
			{:else if expandedContent}
				<!-- svelte-ignore missing-declaration -->
				<CourseContentCard
					clickHandler={() => videoPlayer.seekTo(chapter.start_time, true)}
					{thumbnail}
					title={chapter.title}
					timestamp={`${seconds_to_timestamp(chapter.start_time)} ${
						seconds_to_timestamp(chapters?.[index + 1]?.start_time) ?? duration
					}`}
					{duration}
					lesson={index + 1}
					playBtn={false}
				/>
			{/if}
		{/each}
	</div>

	<button
		class="flex gap-[10px] justify-center items-center"
		on:click={() => (expandedContent = !expandedContent)}
	>
		<img
			alt="arrow down icon"
			width="20px"
			height="20px"
			class:rotate-180={expandedContent}
			src={arrowDown}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-base not-italic font-normal pointer-events-none text-white-70 font-Gilroy-Medium"
		>
			{expandedContent ? `${$t('minimize')}` : `${$t('seeAll')}`}
		</p>
	</button>
</div>

<div class="reviews-container">
	<div class="reviews-title-container">
		<div class="reviews-title">
			<h4 class="title">{$t('Reviews by')}</h4>
			<p>{addLeadingZero(reviewsLength)} {gameOrGames(reviewsLength)}</p>
		</div>
		<div class="segmented-control">
			<button
				class="segment {selectedSegment === 'top' ? 'selected' : ''}"
				on:click={() => selectSegment('top')}
			>
				Top
			</button>
			<button
				class="segment {selectedSegment === 'latest' ? 'selected' : ''}"
				on:click={() => selectSegment('latest')}
			>
				Latest
			</button>
		</div>
	</div>

	<div class="reviews">
		{#each sortedReviews as review}
			<Review
				name={review.expand.user.username}
				image={review.expand.user.avatar
					? getImageUrl('users', review.user, review.expand.user.avatar)
					: reviewImage}
				date={review.created}
				stars={review.stars}
				likes={review?.likes}
				dislikes={review?.dislikes}
				text={review.review}
			/>
		{/each}
	</div>
</div>

<style>
	.xp-container {
		display: flex;
		padding: 2px 12px 2px 2px;
		align-items: center;
		gap: 17px;
		border-radius: 500px;
		border: 0.5px solid #ffffff1a;
		background: #280e30;
	}

	.xp-container:lang(ar) {
		padding: 2px 2px 2px 12px;
	}

	.xp-container p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.not-expanded :global(p) {
		display: inline;
	}

	.read-more-button {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 30px;
	}

	.title {
		color: var(--White, #fff);
		font-family: Gilroy-Bold;
		font-size: 42px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.reviews-container {
		margin-top: 60px;
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
		gap: 30px;
	}

	@media (max-width: 1200px) {
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
