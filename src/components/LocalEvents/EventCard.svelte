<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import calendar from '$lib/assets/calendar.svg';
	import calendarDownload from '$lib/assets/calendar-download-02.svg';
	import dollarCircle from '$lib/assets/dollar-circle.svg';
	import Squad from '$lib/assets/3 User.svg';
	import Location from '$lib/assets/location-06.svg';
	import Warehouse from '$lib/assets/warehouse.svg';
	import calendarYellow from '$lib/assets/calendar-download-yellow.svg';
	import TournamentCompleted from '$lib/assets/tournamets-completed.svg';
	import TournamentUpcoming from '$lib/assets/tournaments-upcoming.svg';

	import TutorialVideo from '$lib/assets/tutorial-video.svg';
	import TutorialTime from '$lib/assets/tutorial-time.svg';
	import Yalgamers from '$lib/assets/tutorial-yalgamers.svg';

	export let tournament;

	$: courseImageUrl =
		getImageUrl(tournament.collectionId, tournament.id, tournament.image) + '?thumb=0x400';

	$: formattedDate =
		$locale === 'ar'
			? formatDateToArabic(new Date(tournament.registration_starting_date))
			: formatDateToEnglish(new Date(tournament.registration_starting_date));

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

	function formatDateToEnglish(date) {
		const shortMonthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];

		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();

		return `${day} ${shortMonthNames[monthIndex]}, ${year}`;
	}
</script>

<a
	href={`/local-events/${tournament.id}`}
	class="w-full aspect-[444/276] duration-300 rounded-[9px] p-[1px] relative overflow-hidden cardBG group block"
>
	<div
		class="flex items-center gap-[12px] lg:gap-[18px] w-full h-full bg-[#200B26] group-hover:bg-[#2B1731] p-[4px] rounded-[8px] overflow-hidden"
	>
		<div class="relative w-[94%] aspect-[200/265.924]">
			<img src={courseImageUrl} alt="" class="w-full aspect-[200/265.924] rounded-[4px]" />
			<div
				class="flex flex-col items-start justify-between absolute w-full h-full top-0 left-0 pt-[8px] pb-[11px]"
			>
				<div class="flex flex-col items-start gap-[5.766px] lg:gap-[8px]">
					<div
						class="flex items-center gap-[4.324px] lg:gap-[6px] h-[20.1px] lg:h-[28px] py-[4.324px] lg:py-[6px] px-[10.09px] lg:px-[10px] border border-[#ffffff33] bg-[#792341] {$locale ===
						'ar'
							? 'rounded-l-[100px] border-r-0'
							: 'rounded-r-[100px] border-l-0'}"
					>
						<img src={calendar} alt="" class="w-[11.532px] lg:w-[16px]" />
						<p class="text-[#FFFFFFE5] text-[10.09px] lg:text-[14px] font-Gilroy-Medium">
							{formattedDate}
						</p>
					</div>
					{#if tournament.status === 'ongoing'}
						<div
							class="flex items-center gap-[5.292px] lg:gap-[6px] h-[24.6px] lg:h-[28px] py-[5.292px] lg:py-[6px] px-[8.82px] lg:px-[10px] border border-[#FDEB56] bg-[#211E0A] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={calendarYellow} alt="" class="w-[14.113px] lg:w-[16px]" />
							<p class="text-[#FDEB56] text-[12.349px] lg:text-[14px] font-Gilroy-Medium">
								{$t('ongoing')}
							</p>
						</div>
					{:else if tournament.status === 'finished'}
						<div
							class="flex items-center gap-[5.292px] lg:gap-[6px] h-[24.6px] lg:h-[28px] py-[5.292px] lg:py-[6px] px-[8.82px] lg:px-[10px] border border-[#F71756] bg-[#1E030A] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={TournamentCompleted} alt="" class="w-[14.113px] lg:w-[16px]" />
							<p class="text-[#F71756] text-[12.349px] lg:text-[14px] font-Gilroy-Medium">
								{$t('Completed')}
							</p>
						</div>
					{:else if tournament.status === 'upcoming' || tournament.status === 'comingsoon'}
						<div
							class="flex items-center gap-[5.292px] lg:gap-[6px] h-[24.6px] lg:h-[28px] py-[5.292px] lg:py-[6px] px-[8.82px] lg:px-[10px] border border-[#1FD031] bg-[#031705] {$locale ===
							'ar'
								? 'rounded-l-[100px] border-r-0'
								: 'rounded-r-[100px] border-l-0'}"
						>
							<img src={TournamentUpcoming} alt="" class="w-[14.113px] lg:w-[16px]" />
							<p class="text-[#1FD031] text-[12.349px] lg:text-[14px] font-Gilroy-Medium">
								{$t('upcoming')}
							</p>
						</div>
					{/if}
				</div>
				<div
					class="flex items-center gap-[6px] w-[40.2px] lg:w-[56px] h-[19.5px] lg:h-[26px] py-[5.766px] lg:py-[8px] px-[7.207px] lg:px-[10px] border border-[#8EC9ED] bg-[#1C272D] {$locale ===
					'ar'
						? 'rounded-l-[100px] border-r-0'
						: 'rounded-r-[100px] border-l-0'}"
				>
					<p class="text-[#8EC9ED] text-[10.09px] lg:text-[14px] font-Gilroy-Medium">
						{$t('New')}!
					</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col items-start gap-[12.15px] lg:gap-[16px] w-full">
			<p class="text-[#E9E6EA] text-[17.297px] lg:text-[24px] font-Gilroy-Bold">
				{$locale === 'en' ? tournament.title_en : tournament.title}
			</p>
			<div class="flex flex-col items-start gap-[5.38px] lg:gap-[7.67px] w-full">
				<div class="flex flex-col items-start gap-[2.88px] lg:gap-[4px]">
					<p
						class="color-text text-[8.649px] lg:text-[12px] font-Gilroy leading-[10px] lg:leading-[14.4px]"
					>
						{$t('prizeMoney')}
					</p>
					<div class="flex items-center gap-[4.32px] lg:gap-[6px]">
						<p
							class="text-[#FFFFFFB2] text-[11.532px] lg:text-[16px] font-Gilroy-Medium leading-[14px] lg:leading-[19.2px]"
						>
							{tournament.prizemoney}
							{$t('usd')}
						</p>
						<img src={dollarCircle} alt="" class="w-[12.973px] lg:w-[18px]" />
					</div>
				</div>
				<hr class="w-full border-[#FFFFFF0D]" />
				<div class="flex flex-col items-start gap-[2.88px] lg:gap-[4px]">
					<p
						class="text-[#8EC9ED] text-[8.649px] lg:text-[12px] font-Gilroy leading-[10px] lg:leading-[14.4px]"
					>
						{$t('game mode')}
					</p>
					<div class="flex items-center gap-[4.32px] lg:gap-[6px]">
						<p
							class="text-[#FFFFFFB2] text-[11.532px] lg:text-[16px] font-Gilroy-Medium leading-[14px] lg:leading-[19.2px]"
						>
							{$t(tournament.mode)}
						</p>
						<img src={Squad} alt="" class="w-[12.973px] lg:w-[18px]" />
					</div>
				</div>
				<hr class="w-full border-[#FFFFFF0D]" />
				<div class="flex flex-col items-start gap-[2.88px] lg:gap-[4px]">
					<p
						class="text-[#BC5AD7] text-[8.649px] lg:text-[12px] font-Gilroy leading-[10px] lg:leading-[14.4px]"
					>
						{$t('Location')}
					</p>
					<div class="flex items-center gap-[4.32px] lg:gap-[6px]">
						<p
							class="text-[#FFFFFFB2] text-[11.532px] lg:text-[16px] font-Gilroy-Medium leading-[14px] lg:leading-[19.2px]"
						>
							{tournament.location}
						</p>
						<img src={Location} alt="" class="w-[12.973px] lg:w-[18px]" />
					</div>
				</div>
				<hr class="w-full border-[#FFFFFF0D]" />
				<div class="flex flex-col items-start gap-[2.88px] lg:gap-[4px]">
					<p
						class="text-[#FDEB56] text-[8.649px] lg:text-[12px] font-Gilroy leading-[10px] lg:leading-[14.4px]"
					>
						{$t('GameCenter')}
					</p>
					<div class="flex items-center gap-[4.32px] lg:gap-[6px]">
						<p
							class="text-[#FFFFFFB2] text-[11.532px] lg:text-[16px] font-Gilroy-Medium leading-[14px] lg:leading-[19.2px]"
						>
							{tournament.expand.game_center.name}
						</p>
						<img src={Warehouse} alt="" class="w-[12.973px] lg:w-[18px]" />
					</div>
				</div>
			</div>
		</div>
	</div>
</a>

<style>
	.color-text {
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.cardBG::after {
		width: 446px;
		height: 278px;
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
</style>
