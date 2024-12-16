<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import calendar from '$lib/assets/calendar.svg';
	import calendarYellow from '$lib/assets/calendar-download-yellow.svg';
	import TournamentCompleted from '$lib/assets/tournamets-completed.svg';
	import TournamentUpcoming from '$lib/assets/tournaments-upcoming.svg';

	import dollarCircle from '$lib/assets/dollar-circle.svg';
	import Squad from '$lib/assets/3 User.svg';
	import Location from '$lib/assets/location-06.svg';
	import Warehouse from '$lib/assets/warehouse.svg';

	import TutorialVideo from '$lib/assets/tutorial-video.svg';
	import TutorialTime from '$lib/assets/tutorial-time.svg';
	import Yalgamers from '$lib/assets/tutorial-yalgamers.svg';

	export let tournament;

	$: courseImageUrl = getImageUrl('tournaments', tournament.id, tournament.image) + '?thumb=0x400';
	let date = new Date(tournament.start);

	// Format the deadline date based on locale
	$: processedDeadline = $locale === 'ar' ? formatDateToArabic(date) : formatDateToEnglish(date);

	// Function to format the date to Arabic with English numbers
	function formatDateToArabic(date) {
		const day = date.getDate();
		const year = date.getFullYear();
		const monthsInArabic = [
			'يناير',
			'فبراير',
			'مارس',
			'أبريل',
			'مايو',
			'يونيو',
			'يوليو',
			'أغسطس',
			'سبتمبر',
			'أكتوبر',
			'نوفمبر',
			'ديسمبر'
		];
		const month = monthsInArabic[date.getMonth()];

		return `${day} ${month} ${year}`;
	}

	// Function to format the date to English
	function formatDateToEnglish(date) {
		return `${date.getDate()} ${date.toLocaleString('en-GB', {
			month: 'short'
		})}, ${date.getFullYear()}`;
	}
</script>

<div
	class="w-full aspect-[260/344] duration-300 rounded-[9px] p-[1px] relative overflow-hidden cardBG group lg:hover:scale-105 block"
>
	<div
		class="flex items-center gap-[18px] w-full h-full bg-[#200B26] p-[4px] rounded-[8px] overflow-hidden"
	>
		<div class="relative overflow-hidden rounded-[4px]">
			<img
				src={courseImageUrl}
				alt=""
				class="w-full aspect-[250/333.337] rounded-[4px] object-cover"
			/>
			<div
				class="flex flex-col items-start justify-between absolute w-full h-full top-0 left-0 pt-[8px] pb-[11px] z-20"
			>
				<div class="flex flex-col items-start gap-[8px]">
					<div
						class="flex items-center gap-[6px] h-[28px] py-[6px] px-[10px] border border-[#ffffff33] bg-[#792341] {$locale ===
						'ar'
							? 'rounded-l-[100px] border-r-0'
							: 'rounded-r-[100px] border-l-0'}"
					>
						<img src={calendar} alt="" class="w-[16px]" />
						<p class="text-[#FFFFFFE5] text-[14px] font-Gilroy-Medium">
							{processedDeadline}
						</p>
					</div>

					{#if tournament.status === 'ongoing'}
						<div
							class="flex items-center gap-[6px] h-[28px] py-[6px] px-[10px] border border-[#FDEB56] bg-[#211E0A] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={calendarYellow} alt="" class="w-[16px]" />
							<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">{$t('ongoing')}</p>
						</div>
					{:else if tournament.status === 'finished'}
						<div
							class="flex items-center gap-[6px] h-[28px] py-[6px] px-[10px] border border-[#F71756] bg-[#1E030A] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={TournamentCompleted} alt="" class="w-[16px]" />
							<p class="text-[#F71756] text-[14px] font-Gilroy-Medium">{$t('Completed')}</p>
						</div>
					{:else if tournament.status === 'upcoming' || tournament.status === 'comingsoon'}
						<div
							class="flex items-center gap-[6px] h-[28px] py-[6px] px-[10px] border border-[#1FD031] bg-[#031705] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={TournamentUpcoming} alt="" class="w-[16px]" />
							<p class="text-[#1FD031] text-[14px] font-Gilroy-Medium">{$t('upcoming')}</p>
						</div>
					{/if}

					<div
						class="flex items-center gap-[6px] w-[56px] h-[26px] py-[8px] px-[10px] border border-[#8EC9ED] bg-[#1C272D] {$locale ===
						'ar'
							? 'rounded-l-[100px] border-r-0'
							: 'rounded-r-[100px] border-l-0'}"
					>
						<p class="text-[#8EC9ED] text-[14px] font-Gilroy-Medium">{$t('New')}!</p>
					</div>
				</div>
			</div>
			<div
				class="absolute w-full aspect-[260/357] lg:aspect-[260/240] lg:group-hover:aspect-[260/357] duration-300 bottom-0 left-0 gradient-bg z-10"
			/>
			<div
				class="flex flex-col items-start justify-end gap-[12.462px] absolute w-full aspect-[245.077/230] p-[12px] pb-[60px] duration-300 bottom-0 lg:bottom-[-105px] lg:group-hover:bottom-0 left-0 z-30"
			>
				<p class="text-[#E9E6EA] text-[20.769px] font-Gilroy-SemiBold">
					{$locale === 'en' ? tournament.title_en : tournament.title}
				</p>
				<div class="flex flex-col items-start gap-[8px] lg:opacity-0 lg:group-hover:opacity-100">
					<div class="flex flex-col items-start gap-[4px]">
						<p class="color-text text-[12.462px] font-Gilroy">{$t('prizeMoney')}</p>
						<div class="flex items-center gap-[6px]">
							<p class="text-[#FFFFFFB2] text-[16.615px] font-Gilroy-Medium">
								{tournament.price}
								{$t('usd')}
							</p>
							<img src={dollarCircle} alt="" class="w-[18.692px]" />
						</div>
					</div>
					<hr class="w-full border-[#FFFFFF0D]" />
					<div class="flex flex-col items-start gap-[4px]">
						<p class="text-[#8EC9ED] text-[12.462px] font-Gilroy">{$t('game mode')}</p>
						<div class="flex items-center gap-[6px]">
							<p class="text-[#FFFFFFB2] text-[16.615px] font-Gilroy-Medium">
								{$t(tournament.mode)}
							</p>
							<img src={Squad} alt="" class="w-[18.692px]" />
						</div>
					</div>
				</div>
			</div>
			<div class=" absolute bottom-0 left-0 p-[12px] w-full z-40">
				<a
					href={`/tournaments/${tournament.id}`}
					class="flex items-center justify-center gap-[4px] w-full h-[36px] gradient-color-bg"
				>
					<p class="text-[#23130D] text-[14px] font-Gilroy-Medium">{$t('enrollNow')}</p>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.color-text {
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.gradient-bg {
		background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
	}

	.group:hover .gradient-bg {
		background: #2b1731e5;
	}

	.gradient-color-bg {
		border-radius: 4px;
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
	}

	.cardBG::after {
		width: 262px;
		height: 346px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 9px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.cardBG:hover::after {
		display: none;
	}

	.cardBG:hover {
		box-shadow: 0px 0px 25px 4px rgba(253, 235, 86, 0.15);
	}

	.cardBG:hover::before {
		width: 50%;
		height: 300%;
		top: 50%;
		left: 50%;
		transform: 0;
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 0x;
		transition: 0.1s ease-in;
		background: linear-gradient(90deg, transparent, #fdeb56, transparent);
		animation: rotate 4s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@media (max-width: 1024px) {
		.gradient-bg {
			background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
		}
	}
</style>
