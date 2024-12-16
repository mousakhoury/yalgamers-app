<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import courseImg from '$lib/assets/content.png';
	import Quiz from './Quiz.svelte';
	import CourseContentCard from '$components/Explore-Course/CourseContentCard.svelte';
	import { browser } from '$app/environment';
	import YouTubePlayer from 'youtube-player';
	import { onDestroy, onMount } from 'svelte';
	export let data;
	const course = {
		...data.course,
		...data._course
	};

	let videoPlayer;

	const seconds_to_timestamp = (t) => {
		if (t === undefined) return undefined;

		let hours = Math.floor(t / 60 / 60) + '';
		let mins = Math.floor(t / 60) + '';
		let seconds = (t % 60) + '';

		if (mins.length === 1) mins = '0' + mins;

		if (seconds.length === 1) seconds = '0' + seconds;

		if (hours.length === 1) hours = '0' + hours;

		if (hours != '00') return `${hours}:${mins}:${seconds}`;
		else return `${mins}:${seconds}`;
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
		await fetch(`/api/courses/${course.id}/watch`, {
			method: 'POST',
			body: progress
		});
	};

	let intervalRef = null;

	const bindIframe = () => {
		if (browser) {
			videoPlayer = YouTubePlayer('iframe');
			intervalRef = setInterval(async () => {
				if ((await videoPlayer.getPlayerState()) !== 1) return;
				const currentTime = await videoPlayer.getCurrentTime();
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
</script>

<!-- <div class="rounded-[10px] bg-accent-2 mt-7">
    <p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-lg font-normal not-italic font-Gilroy-SemiBold text-accent-red text-center py-[5px]">***Take a screenshot when you complete watching all the videos of this course to get rewards***</p>
</div> -->

<div
	class="flex flex-col items-center justify-center w-full p-3 mt-8 mb-10 md:p-5 rounded-2xl bg-accent-2"
>
	<div
		class="top h-fit min-[992px]:max-h-[500px] flex flex-col min-[992px]:flex-row w-full gap-5 xl:gap-10 lg:pt-5"
	>
		<div
			class="left w-full relative min-[992px]:w-[60%] h-[250px] sm:h-[300px] md:h-[400px] min-[992px]:h-[350px] lg:h-[400px] xl:h-[500px] flex justify-items-center items-center"
		>
			<iframe
				title={course.title}
				id="iframe"
				src={`${course.videoinfo.videoDetails.embed.iframeUrl}?enablejsapi=1&controls=0&rel=0&disablekb=1`}
				class="absolute inset-0 w-full h-full aspect-video"
				on:load={bindIframe}
			/>
		</div>
		<div class="flex w-full h-3 bg-red-900 video-progress rounded-md">
			<span class="rounded-full video-progress-thumb" style:margin-left={`${progress}%`} />
		</div>
		<div
			class="right w-full min-[992px]:w-[40%] md:p-2 box-content flex flex-col justify-around gap-4 min-[992px]:gap-2"
		>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="px-2 text-base text-white tag bg-secondary-background w-fit rounded-md"
			>
				{lesson}
			</p>
			<h3
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-2xl text-white md:text-3xl lg:text-4xl title font-Gilroy-Bold"
			>
				{title}
			</h3>
			<div
				class="flex items-center justify-center p-1 text-white duration w-fit bg-white-30 rounded-2xl"
			>
				<span class="rounded-full bg-accent-yellow"
					><svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M21.2498 12.0005C21.2498 17.1095 17.1088 21.2505 11.9998 21.2505C6.89076 21.2505 2.74976 17.1095 2.74976 12.0005C2.74976 6.89149 6.89076 2.75049 11.9998 2.75049C17.1088 2.75049 21.2498 6.89149 21.2498 12.0005Z"
							stroke="#2A0D32"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M15.4319 14.9427L11.6619 12.6937V7.84668"
							stroke="#2A0D32"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>
				<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="px-2">{duration}</p>
			</div>
			<div
				class="sub-contents bg-accent p-4 min-[992px]:min-h-[200px] flex flex-col justify-between"
			>
				<h4
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class=" text-xl md:text-2xl lg:text-3xl font-Gilroy-Bold text-[#FDEB56]"
				>
					{$t('completedCourse')}
				</h4>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-white font-Gilroy-Medium w-[95%] lg:w-[70%] text-base lg:text-[18px]"
				>
					{$t('startQuiz.content')} <span class="gradient">{$t('rewards')}.</span>
				</p>
				<div class="mt-2">
					<Button
						type="gradient"
						disabled={course.quiz_attended || Math.ceil(course?.progress) !== 100}
						on:click={() => {
							//if(course.proof_uploaded)
							quizVisible = true;
							//else
							//goto(`/tutorials/${course.id}/proof`);
						}}>{!course.quiz_attended ? `${$t('start')}` : 'Already Attended'}</Button
					>
				</div>
			</div>
		</div>
	</div>
	<div
		class="chaptersSection w-full bg-accent min-h-[200px] flex flex-col mt-10 p-3 md:p-5 rounded-xl"
	>
		<div class="flex flex-col items-center justify-between w-full mb-4 md:mt-2 md:flex-row">
			<h3
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-xl min-[992px]:text-2xl lg:text-3xl text-white font-Gilroy-Bold"
			>
				{$t('chaptersInCourse')}
			</h3>
			<ul class="flex text-[#FDEB56] list-disc gap-8">
				<li>{chapters.length} {$t('chapters')}</li>
				<li>{$t('totalMins', { min: duration })}</li>
			</ul>
		</div>
		<div class="flex chapters gap-5">
			{#each chapters as chapter, index}
				<button
					class="chapter w-[200px] cursor-pointer shrink-0"
					on:click={() => {
						if (isChapterDisabled(chapter.start_time)) return;
						videoPlayer.seekTo(chapter.start_time, true);
					}}
				>
					<img src={thumbnail} alt="" />
					<p
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-2xl text-white name font-Gilroy-Bold"
					>
						{chapter.title}
					</p>
					<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="stamp text-white-50 font-Gilroy-Medium">
						{seconds_to_timestamp(chapter.start_time)} .... {seconds_to_timestamp(
							chapters?.[index + 1]?.start_time
						) ?? duration}
					</p>
				</button>
			{/each}
		</div>
	</div>

	<div class="subCources w-full bg-accent min-h-[200px] flex flex-col mt-10 p-1 md:p-5 rounded-xl">
		<div class="flex flex-col items-center justify-between w-full mt-2 mb-4 md:mt-8 md:flex-row">
			<h3
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-xl min-[992px]:text-2xl lg:text-3xl text-white font-Gilroy-Bold"
			>
				{$t('chaptersInCourse')}
			</h3>
			<ul class="flex text-[#FDEB56] list-disc gap-8">
				<li>{chapters.length} {$t('chapters')}</li>
				<li>{$t('totalMins', { min: duration })}</li>
			</ul>
		</div>
		<div class="flex flex-col chapters gap-5">
			{#each chapters as chapter, index}
				<CourseContentCard
					clickHandler={() => videoPlayer.seekTo(chapter.start_time, true)}
					{thumbnail}
					title={chapter.title}
					timestamp={`${seconds_to_timestamp(chapter.start_time)} .... ${
						seconds_to_timestamp(chapters?.[index + 1]?.start_time) ?? duration
					}`}
					{duration}
				/>
			{/each}
		</div>
	</div>
</div>

{#if course?.expand?.quiz}
	<Quiz quizes={course.expand} bind:visible={quizVisible} />
{/if}

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	.chapters {
		overflow-x: scroll !important;
	}
	.video-progress {
		background-color: yellow;
		display: flex;
		align-items: center;
	}
	.video-progress-thumb {
		width: 15px;
		height: 15px;
		background-color: red;
	}
</style>
