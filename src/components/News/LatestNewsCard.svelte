<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	export let newsItem;

	// Function to truncate the title if it exceeds 50 characters
	function truncateTitle(title) {
		if (title.length > 50) {
			return title.slice(0, 50) + '...';
		}
		return title;
	}
</script>

<a href={`/games/${newsItem.id}`}>
	<div class="flex flex-col items-start gap-[14.19px] p-[6px] w-full rounded-[8px] bg-[#200B26]">
		<div class="relative w-full">
			<img
				src={newsItem.image}
				alt=""
				class="w-full aspect-[277/155.813] rounded-[6px] object-cover"
			/>
		</div>
		<div class="flex flex-col items-start gap-[14px] p-[8px] w-full">
			<div class="flex flex-col items-start gap-[8px] w-full">
				<p class="text-white text-[20px] font-Gilroy-SemiBold leading-[25px]">
					{truncateTitle(newsItem.title)}
				</p>
			</div>
			<hr class="w-full border-[#ffffff1a]" />
			<div class="flex items-center gap-[4px]">
				<p class="text-[#FFFFFF66] text-[14px] font-Gilroy leading-[17px]">{$t('by')}:</p>
				<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy-Medium leading-[17px]">
					{$t(newsItem.auth)}
				</p>
			</div>
		</div>
	</div>
</a>
