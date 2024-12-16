<script>
	// @ts-nocheck

	import clock from '$lib/assets/clock.svg';
	import Bluewatch from '$lib/assets/blue_watch.svg';

	import { t, locale } from '$lib/stores/i18n';
	import emptyUser from '$lib/assets/profil-piture.svg';
	import reviewImage from '$lib/assets/review-image.png';
	import cam from '$lib/assets/cam.svg';
	import { invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import { browser } from '$app/environment';
	import YouTubePlayer from 'youtube-player';
	import { onDestroy, onMount } from 'svelte';
	import Review from '$components/UserRating/Review.svelte';
	import { getImageUrl } from '$lib/utils';
	import { page } from '$app/stores';
	import Rate from './Rate.svelte';

	export let data;
	let course = { ...data.course, ...data._course };

	$: if (data) course = { ...data.course, ...data._course };

	let rating = data.course.reviews === 0 ? 0 : data.course.stars / data.course.reviews;
	// console.log(data);

	let videoPlayer;

	const seconds_to_timestamp = (t) => {
		if (t === undefined) return undefined;

		let hours = Math.floor(t / 60 / 60) + '';
		let mins = Math.floor(t / 60) + '';
		let seconds = (t % 60) + '';

		if (mins.length === 1) mins = '0' + mins;

		if (seconds.length === 1) seconds = '0' + seconds;

		if (hours.length === 1) hours = '0' + hours;

		if (hours != '00') return `${hours}h ${mins}m ${seconds}`;
		else return `${mins}m ${seconds}s`;
	};

	let quizVisible = false;
	$: lesson = `${$t('lessons')}1`;
	let title = course.title;
	let description = course.videoinfo.videoDetails.description;

	let chapters = course.videoinfo.videoDetails.chapters;
	let thumbnail = course.videoinfo.videoDetails.thumbnails[4].url;

	let duration = seconds_to_timestamp(course.videoinfo.videoDetails.lengthSeconds);

	let content;
	let progress = course?.progress ?? 0;

	const updateCourseWatchHistory = async (progress) => {
		if (course.progress < progress) {
			course.progress = progress;
		}
		const res = await fetch(`/api/courses/${course.id}/watch`, {
			method: 'POST',
			body: progress
		});

		if (res.ok) {
			if (course.progress >= 99) {
				const task = course.quests.tasks.find((t) => t.type === 'COURSE - WATCH');
				if (task) {
					const data = new FormData();
					data.append('task', task.id);
					const res = await fetch('/api/courses/' + course.id + '/quests', {
						method: 'POST',
						body: data
					});

					if (res.ok) {
						invalidateAll();
					}
				}
			}
		}
	};

	let intervalRef = null;

	const bindIframe = () => {
		if (browser) {
			videoPlayer = YouTubePlayer('iframe');
			intervalRef = setInterval(async () => {
				const state = await videoPlayer.getPlayerState();
				if (state !== 1) return;
				const currentTime = await videoPlayer.getCurrentTime();
				console.log('current time', currentTime);
				progress = ((currentTime * 100) / course.videoinfo.videoDetails.lengthSeconds).toFixed(3);
				updateCourseWatchHistory(progress);
			}, 1000);
		}
	};

	const isChapterDisabled = (time) => {
		return time >= (Number(course.progress) * course.videoinfo.videoDetails.lengthSeconds) / 100;
	};

	onDestroy(() => {
		clearInterval(intervalRef);
	});

	let body = $locale === 'en' ? data.course.body_en : data.course.body;
	let expanded = false;

	// Assuming `originalBody` contains your HTML content.
	// This should be the complete content you want to toggle.
	let originalBody = body; // Replace `...` with your actual content string.

	// Function to toggle the content visibility.
	function toggleContent() {
		expanded = !expanded;
	}

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

	$: reviews = data?.course?.reviewsList;

	let selectedSegment = 'top';

	$: starsAverage = reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length;

	$: reviewsLength = reviews.length;
	let show_modal = false;

	function selectSegment(segment) {
		selectedSegment = segment;
	}

	$: sortedReviews =
		selectedSegment === 'top'
			? [...reviews].sort((a, b) => b?.likes - a?.likes)
			: [...reviews].sort((a, b) => new Date(b.created) - new Date(a.created));

	function gameOrGames(numberOfGames) {
		return numberOfGames === 1 ? $t('Result') : $t('Results');
	}

	// Function to add a leading zero if the number is a single digit
	function addLeadingZero(number) {
		return number < 10 ? `0${number}` : number;
	}

	let isButtonDisabled = true;
	let counter = 9;
	let my_review_exist = undefined;
	onMount(() => {
		my_review_exist = data.course.reviewsList.find((f) => f.user == $page.data.profile.id)
			? true
			: false;

		const interval = setInterval(() => {
			counter -= 1;
			if (counter === 0) {
				clearInterval(interval);
				isButtonDisabled = false;
			}
		}, 1000);
	});

	function showModal() {
		if (!my_review_exist) {
			show_modal = true;
		}
	}
</script>

<svelte:head>
	<title>Course - {course.title}</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-full rounded-2xl">
	<div class="course-new-quests">
		<div class="course-head">
			<div class="course-image">
				<iframe
					title={course.title}
					id="iframe"
					src={`${course.videoinfo.videoDetails.embed.iframeUrl}?enablejsapi=1&controls=0&rel=0&disablekb=1&origin=${window?.location?.origin}&widget_referrer=${window?.location?.href}`}
					on:load={bindIframe}
					anonymous
					crossorigin
					credentialless
				/>
				<div
					class="flex w-[95%] lg:w-[80%] h-[6px] bg-red-900 video-progress rounded-md absolute bottom-[10px] left-[50%] translate-x-[-50%]"
				>
					<div class="watched-progress" style:width={`${progress}%`} />
					<span class="rounded-full video-progress-thumb" />
				</div>
			</div>
			<div class="course-content">
				<div class="course-content-info w-full">
					<div class="course-content-info-text">
						<h4>{$locale === 'en' ? data.course.title_en : data.course.title}</h4>
						<p>{$locale === 'en' ? data.course.subtitle_en : data.course.subtitle}</p>
					</div>
					<div class="flex flex-col items-start gap-[30px] w-full">
						<div class="flex gap-[20px] flex-wrap">
							<Button type="course">
								<img slot="svg" src={cam} alt="video icon" />
								<div slot="content">
									{data.course.videoinfo.videoDetails.chapters.length}
									{$t('chapters')}
								</div>
							</Button>
							<Button type="course">
								<img slot="svg" src={clock} alt="clock icon" />
								<div slot="content" class="">
									{seconds_to_timestamp(data.course.videoinfo.videoDetails.lengthSeconds)}
								</div>
							</Button>
						</div>
						<div class="w-full border-t border-white-10" />

						<div class="flex gap-[16px] md:gap-[60px] flex-wrap">
							<div class="flex items-center gap-[12px] mb-[32px]">
								<img
									src={data.course.expand.user.avatar
										? getImageUrl(
												'users',
												data.course.expand.user.id,
												data.course.expand.user.avatar
										  )
										: emptyUser}
									alt=""
									class="w-[48px] h-[48px] rounded-[100px] object-cover"
								/>
								<div class="flex flex-col items-start gap-[4px]">
									<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">
										{$t('Tutorial Creator')}
									</p>
									<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">{$t('Yalgamers')}</p>
								</div>
							</div>

							<div class="course-review mt-[5px] flex-wrap">
								<div class="flex items-center gap-[6px]">
									<div class="text-[#FDEB56] text-[20px]">{starsAverage.toFixed(1)}</div>
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
												x2={starsAverage.toFixed(1) * 4}
												y2="8"
												gradientUnits="userSpaceOnUse"
											>
												<stop offset="0.713485" stop-color="#FDEB56" />
												<stop offset="0.732781" stop-color="#68566E" />
											</linearGradient>
										</defs>
									</svg>
								</div>
								<div class="text-[#A99FAC] text-[20px]">({reviewsLength} {$t('Reviews')})</div>
							</div>
						</div>
					</div>
				</div>

				<Button on:click={showModal} type="gradient" size="lg">
					{my_review_exist ? 'Review Submitted' : `${$t('writeReview')}`}
				</Button>
			</div>
		</div>

		<div
			class="p-[20px] bg-[#200B26] rounded-[10px] w-full h-full flex flex-col items-start gap-[13px]"
		>
			<div class="flex items-center justify-between w-full md:flex-row">
				<h3
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[20px] md:text-[32px] text-white font-Gilroy-SemiBold"
				>
					{$t('allchapters')}
				</h3>
			</div>

			<div class="w-full h-full overflow-y-auto yellow_scroll">
				{#each chapters as chapter, index}
					<button
						on:click={() => videoPlayer.seekTo(chapter.start_time, true)}
						class="flex gap-3 w-full text-white p-2 bg-transparent hover:bg-white-10 rounded cursor-pointer me-2"
					>
						<img src={thumbnail} alt="thumbnail" class="h-[70px] lg:h-24 rounded" />
						<div class="space-y-2">
							<h4 class="text-lg">{chapter.title}</h4>
							<div class="flex items-center rounded py-1 px-2 bg-white-10">
								<span class="text-[12px] lg:text-[16px]">{$t('lessons')} {index + 1}</span>
								<span class="mx-2">|</span>
								<span class="text-[#8EC9ED] flex items-center gap-1 text-[12px] lg:text-[16px]">
									<img src={Bluewatch} alt="time icon w-[14px] lg:w-[19px]" />
									{seconds_to_timestamp(chapters?.[index + 1]?.start_time) ?? duration}
								</span>
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div
		class="w-full p-[15px] min-[768px]:p-[30px] bg-accent-2 text-white rounded-[10px] mt-[30px] flex flex-col gap-5 description"
	>
		<div class="flex flex-col items-center justify-between w-full md:flex-row">
			<h3 dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[32px] text-white font-Gilroy-SemiBold">
				{$t('Description') ?? 'Description'}
			</h3>
		</div>
		<div class={expanded ? 'expanded' : 'not-expanded'}>
			{@html expanded ? originalBody : originalBody.split(' ').slice(0, 50).join(' ')}
			<button on:click={toggleContent} class="read-more-button">
				{expanded ? $t('SeeLess') : $t('SeeMore')}
			</button>
		</div>
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
					{$t('top')}
				</button>
				<button
					class="segment {selectedSegment === 'latest' ? 'selected' : ''}"
					on:click={() => selectSegment('latest')}
				>
					{$t('Latest')}
				</button>
			</div>
		</div>

		<div class="reviews">
			{#each sortedReviews as review}
				<Review
					id={review.id}
					name={review.expand.user.username}
					image={review.expand.user.avatar
						? getImageUrl('users', review.user, review.expand.user.avatar)
						: reviewImage}
					date={review.created}
					stars={review.stars}
					likes={review.likes.length}
					dislikes={review.dislikes.length}
					text={review.review}
					mylike={review.likes.includes(data.profile.id)}
					mydislike={review.dislikes.includes(data.profile.id)}
				/>
			{/each}
		</div>
	</div>
</div>

{#if show_modal}
	<Rate
		close={() => {
			my_review_exist = true;
			show_modal = false;
		}}
	/>
{/if}

<style>
	/* width */
	.yellow_scroll::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	.yellow_scroll::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	.yellow_scroll::-webkit-scrollbar-thumb {
		background: yellow;
		border-radius: 10px;
	}

	/* Handle on hover */
	.yellow_scroll::-webkit-scrollbar-thumb:hover {
		background: yellow;
	}

	.video-progress {
		background: #e9e6ea80;
		display: flex;
		align-items: center;
	}
	.video-progress-thumb {
		width: 14px;
		height: 14px;
		background-color: #837a30;
		border: 2.5px solid yellow;
		margin-left: -1px;
	}

	.watched-progress {
		background-color: yellow;
		height: 100%;
		border-radius: inherit;
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
		/* margin-bottom: 30px; */
	}

	.reviews-container {
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		gap: 30px;
		width: 100%;
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
		.title {
			color: var(--White, #fff);
			font-family: Gilroy-Bold;
			font-size: 18px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			/* margin-bottom: 30px; */
		}
	}
</style>
