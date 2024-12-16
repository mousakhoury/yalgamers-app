<script>
	import { goto } from '$app/navigation';
	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import TutorialVideo from '$lib/assets/tutorial-video.svg';
	import TutorialTime from '$lib/assets/tutorial-time.svg';
	import Yalgamers from '$lib/assets/tutorial-yalgamers.svg';

	export let course;

	$: courseImageUrl = getImageUrl('tutorials', course.id, course.card_image) + '?thumb=0x400';

	$: publishedDate = new Date(course.created);
	$: formattedDate =
		$locale === 'ar'
			? formatDateToArabic(publishedDate)
			: publishedDate.toLocaleDateString('en-GB', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
			  });

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
</script>

<a
	href={`/tutorials/${course.unique_title}`}
	class="w-full aspect-[512/338] duration-300 rounded-[9px] p-[1px] relative overflow-hidden cardBG group block"
>
	<div
		class="flex items-center gap-[10px] md:gap-[18px] w-full h-full bg-[#2B1731] p-[4px] rounded-[8px] overflow-hidden"
	>
		<img src={courseImageUrl} alt="" class="w-[49%] aspect-[246/327.086] rounded-[4px]" />
		<div
			class="flex-col items-start justify-between w-full h-full opacity-100 flex duration-300 py-[6px]"
		>
			<div class="flex flex-col items-start gap-[10px] md:gap-[16.187px] w-full">
				<div class="px-[6px] py-[2px] rounded-[100px] border-1 border-[#8EC9ED] bg-[#8EC9ED33]">
					<p class="text-[#8EC9ED] text-[10px] md:text-[12.14px] font-Gilroy-Medium">
						{$t('New')}!
					</p>
				</div>
				<div class="flex flex-col items-start gap-[8px] md:gap-[10.187px]">
					<p class="text-[#E9E6EA] text-[18px] md:text-[24.28px] font-Gilroy-Bold">
						{$locale === 'en' ? course.title_en : course.title}
					</p>
					<div class="flex items-center gap-[8px] md:gap-[18.21px] flex-wrap">
						<div class="flex items-center gap-[4px] md:gap-[8px]">
							<img src={TutorialVideo} alt="" class="w-[16px] md:w-[20.233px]" />
							<p class="text-[#FDEB56] text-[12px] md:text-[14.163px] font-Gilroy">
								8 {$t('chapters')}
							</p>
						</div>
						<div class="flex items-center gap-[4px] md:gap-[8px]">
							<img src={TutorialTime} alt="" class="w-[16px] md:w-[20.233px]" />
							<p class="text-[#BC5AD7] text-[12px] md:text-[14.163px] font-Gilroy">1h 35m</p>
						</div>
					</div>
				</div>
				<div class="flex items-center gap-[10.117px]">
					<img src={Yalgamers} alt="" class="w-[30.35px]" />
					<p class="text-[#BEB6C0] text-[12.14px] font-Gilroy">{$t('Yalgamers')}</p>
				</div>
			</div>
			<p class="text-[#FFFFFF4D] text-[12.14px] font-Gilroy">{$t('PublishedOn')} {formattedDate}</p>
		</div>
	</div>
</a>

<style>
	.cardBG::after {
		width: 110%;
		height: 110%;
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
