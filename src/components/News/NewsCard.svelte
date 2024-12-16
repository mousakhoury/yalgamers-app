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

	import TutorialVideo from '$lib/assets/tutorial-video.svg';
	import TutorialTime from '$lib/assets/tutorial-time.svg';
	import Yalgamers from '$lib/assets/tutorial-yalgamers.svg';

	export let newsItem;

	function formatDate(dateInput) {
		// Create a new Date object from the input
		const date = new Date(dateInput);

		// Define options for formatting the date
		const options = { day: 'numeric', month: 'long', year: 'numeric' };

		// Format the date in Arabic locale
		const formattedDateArabic = new Intl.DateTimeFormat('ar', options).format(date);

		// Replace Arabic numerals with corresponding English numerals
		const formattedDate = formattedDateArabic.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

		return formattedDate;
	}
</script>

<a
	dir="ltr"
	href={`/news/${newsItem.id}`}
	class="w-full aspect-[444/386] duration-300 rounded-[9px] p-[1px] relative overflow-hidden cardBG group block"
>
	<div
		class="flex items-center gap-[18px] w-full h-full bg-[#200B26] p-[4px] rounded-[8px] overflow-hidden"
	>
		<div class="relative w-full">
			<img
				src={getImageUrl(newsItem.collectionId, newsItem.id, newsItem.image)}
				alt=""
				class="w-full aspect-[434/376] rounded-[4px] object-cover"
			/>
			<div
				class="flex flex-col justify-between absolute w-full h-full top-0 pt-[8px] pb-[11px] z-20 {$locale ===
				'ar'
					? 'right-0 items-end'
					: 'left-0 items-start'}"
			>
				<div class="flex flex-col gap-[8px] {$locale === 'ar' ? ' items-end' : ' items-start'}">
					<div
						class="flex items-center gap-[6px] w-max h-[28px] py-[6px] px-[10px] border border-[#ffffff33] bg-[#792341] {$locale ===
						'ar'
							? 'rounded-l-[100px] border-r-0'
							: 'rounded-r-[100px] border-l-0'}"
					>
						<img src={calendar} alt="" class="w-[16px]" />
						<p
							class="text-[#FFFFFFE5] text-[14px] font-Gilroy-Medium"
							dir={$locale === 'ar' ? 'rtl' : 'ltr'}
						>
							{formatDate(newsItem.created)}
						</p>
					</div>
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
				class="flex flex-col items-start justify-end gap-[4px] absolute bottom-0 left-0 w-full aspect-[678/140] gradient-bg px-[12px] py-[16px]"
			>
				<p class="text-white text-[20px] font-Gilroy-SemiBold">
					{$locale === 'ar' ? newsItem.title : newsItem.title_en}
				</p>
				<p class="text-[#FFFFFF66] text-[12px] font-Gilroy-Medium">
					{$locale === 'ar' ? newsItem.subtitle_ar : newsItem.subtitle_en}
				</p>
			</div>
		</div>
	</div>
</a>

<style>
	.gradient-bg {
		background: linear-gradient(180deg, rgba(34, 12, 40, 0) 0%, rgba(34, 12, 40, 0.95) 64%);
	}
	.cardBG::after {
		width: calc(100% + 2px);
		height: calc(100% + 2px);
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
