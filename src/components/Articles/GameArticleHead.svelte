<script>
	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import starSvg from '$lib/assets/star-fill.svg';
	import SaveIcon from '$lib/assets/article/save-icon.svg';
	import SaveIconHover from '$lib/assets/article/save-icon-hover.svg';
	import SaveIconSaved from '$lib/assets/article/save-icon-saved.svg';
	import ShareIcon from '$lib/assets/article/share-icon.svg';
	import ShareIconHover from '$lib/assets/article/share-icon-hover.svg';
	import Author from '$lib/assets/article/author.svg';
	import PublishDate from '$lib/assets/article/publish-date.svg';
	import ReadTime from '$lib/assets/article/read-time.svg';
	import { page } from '$app/stores';

	export let data;
	export let starred;
	export let stargame;
	export let unstargame;
	let show_hover_share_icon = false;

	function formatDate(dateStr) {
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

		const date = new Date(dateStr);
		const day = date.getDate().toString().padStart(2, '0'); // Ensure day is 2 digits
		const month =
			$locale === 'ar'
				? monthsInArabic[date.getMonth()]
				: date.toLocaleString('en-GB', { month: 'short' });
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	}

	function share_link() {
		navigator.clipboard.writeText($page.url.href);
		show_hover_share_icon = true;
		setTimeout(() => {
			show_hover_share_icon = false;
		}, 1000);
	}
</script>

<div class="flex flex-col items-start gap-[16px] lg:gap-[32px] w-full">
	<img
		loading="lazy"
		src={getImageUrl('games', data.game.id, data.game.banner_image)}
		height="100%"
		class="w-full aspect-[343/220] lg:aspect-[907/300] rounded-[12px] object-cover"
		alt="banner"
	/>

	<div class="flex flex-col items-start gap-[16px] w-full">
		<div class="flex items-center gap-[10px]">
			{#each data.game.expand.genres_new as genre}
				<div class="px-[8px] py-[4px] rounded-[100px] bg-[#8ec9ed1a]">
					<a
						href="/games?Genres={genre.id}"
						class="text-[#8EC9ED] text-[14px] font-Gilroy-Medium leading-[17px]"
					>
						{$locale === 'en' ? genre.name_en : genre.name_ar}
					</a>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col items-start gap-[16px] lg:gap-[20px] w-full">
		<div class="flex flex-col items-start gap-[12px] lg:gap-[16px] w-full">
			<div class="flex flex-col items-start gap-[8px] w-full">
				<div class="flex items-center justify-between w-full">
					<div class="flex items-center gap-[12px]">
						<p class="text-white text-[20px] lg:text-[32px] font-Gilroy-Bold">
							{$locale === 'en' ? data.game.title_en : data.game.title}
						</p>
						<div class="flex items-center gap-[6px]">
							<img loading="lazy" src={starSvg} alt="star svg" class="w-[14px] lg:w-[16px]" />
							<div class="flex items-center gap-[5px]">
								<p class="text-[#FFFFFFCC] text-[12px] lg:text-[14px] font-Gilroy-SemiBold">
									{data.game.rating.toFixed(2)}
								</p>
								<p class="text-[#FFFFFF66] text-[12px] lg:text-[14px] font-Gilroy leading-[10px]">
									({data.game.reviews}
									{$t('Reviews')})
								</p>
							</div>
						</div>
					</div>

					<div class="hidden lg:flex items-center gap-[11px]">
						{#if starred}
							<button
								on:click={unstargame}
								class="flex items-center gap-[8px] py-[6px] rounded-[100px] bg-[#1fd03126] group {$locale ===
								'ar'
									? 'pr-[8px] pl-[10px]'
									: 'pl-[8px] pr-[10px]'}"
							>
								<img src={SaveIconSaved} alt="" class="w-[24px]" />

								<p class="text-[14px] font-Gilroy-Medium leading-[17px] text-[#1FD031]">
									{$t('saved')}
								</p>
							</button>
						{:else}
							<button
								on:click={stargame}
								class="flex items-center gap-[8px] py-[6px] rounded-[100px] bg-[#ffffff0d] hover:bg-[#fdeb561a] group {$locale ===
								'ar'
									? 'pr-[8px] pl-[10px]'
									: 'pl-[8px] pr-[10px]'}"
							>
								<img src={SaveIcon} alt="" class="w-[24px] block group-hover:hidden" />
								<img src={SaveIconHover} alt="" class="w-[24px] hidden group-hover:block" />

								<p
									class="text-[#FFFFFFB2] group-hover:text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px]"
								>
									{$t('save')}
								</p>
							</button>
						{/if}

						<button
							on:click={share_link}
							class="flex relative items-center gap-[8px] py-[6px] rounded-[100px] bg-[#ffffff0d] hover:bg-[#fdeb561a] group {$locale ===
							'ar'
								? 'pr-[8px] pl-[10px]'
								: 'pl-[8px] pr-[10px]'}"
						>
							<img src={ShareIcon} alt="" class="w-[24px] block group-hover:hidden" />
							<img src={ShareIconHover} alt="" class="w-[24px] hidden group-hover:block" />
							{#if show_hover_share_icon}
								<span class="rounded-full text-[#FDEB56] absolute -top-8 px-2">copied</span>
							{/if}
							<p
								class="text-[#FFFFFFB2] group-hover:text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px]"
							>
								{$t('share')}
							</p>
						</button>
					</div>
				</div>
				<div
					class="flex flex-col items-start gap-[12px] w-full {$locale === 'ar'
						? 'pl-[88px]'
						: 'pr-[88px]'}"
				>
					<p class="text-[12px] lg:text-[22px] font-Gilroy text-[#FFFFFF80]">
						{$locale === 'en' ? data.game.short_en : data.game.short}
					</p>
					<div class="lg:hidden flex items-center gap-[11px]">
						{#if starred}
							<button
								on:click={unstargame}
								class="flex items-center gap-[8px] py-[6px] rounded-[100px] bg-[#1fd03126] group {$locale ===
								'ar'
									? 'pr-[8px] pl-[10px]'
									: 'pl-[8px] pr-[10px]'}"
							>
								<img src={SaveIconSaved} alt="" class="w-[20px] lg:w-[24px]" />

								<p class="text-[12px] lg:text-[14px] font-Gilroy-Medium text-[#1FD031]">
									{$t('saved')}
								</p>
							</button>
						{:else}
							<button
								on:click={stargame}
								class="flex items-center gap-[8px] py-[6px] rounded-[100px] bg-[#ffffff0d] hover:bg-[#fdeb561a] group {$locale ===
								'ar'
									? 'pr-[8px] pl-[10px]'
									: 'pl-[8px] pr-[10px]'}"
							>
								<img src={SaveIcon} alt="" class="w-[20px] lg:w-[24px] block group-hover:hidden" />
								<img
									src={SaveIconHover}
									alt=""
									class="w-[20px] lg:w-[24px] hidden group-hover:block"
								/>

								<p
									class="text-[#FFFFFFB2] group-hover:text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-Medium"
								>
									{$t('save')}
								</p>
							</button>
						{/if}

						<button
							on:click={share_link}
							class="flex relative items-center gap-[8px] py-[6px] rounded-[100px] bg-[#ffffff0d] hover:bg-[#fdeb561a] group {$locale ===
							'ar'
								? 'pr-[8px] pl-[10px]'
								: 'pl-[8px] pr-[10px]'}"
						>
							<img src={ShareIcon} alt="" class="w-[20px] lg:w-[24px] block group-hover:hidden" />
							<img
								src={ShareIconHover}
								alt=""
								class="w-[20px] lg:w-[24px] hidden group-hover:block"
							/>
							{#if show_hover_share_icon}
								<span class="rounded-full text-[#FDEB56] absolute -top-8 px-2">copied</span>
							{/if}
							<p
								class="text-[#FFFFFFB2] group-hover:text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-Medium"
							>
								{$t('share')}
							</p>
						</button>
					</div>
				</div>
			</div>
			<hr class="w-full border-[#ffffff1a]" />
		</div>

		<div class="flex items-center gap-[14px] lg:gap-[20px] flex-wrap">
			<div class="flex items-center gap-[10px] lg:gap-[12px]">
				<img src={PublishDate} alt="" class="w-[32px] lg:w-[42px]" />
				<div class="flex flex-col items-start gap-[2px]">
					<p class="text-[#FFFFFF66] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('WrittenBy')}
					</p>
					<p class="text-[#FFFFFFE5] text-[14px] lg:text-[18px] font-Gilroy-SemiBold">
						{$t('Yalgamers')}
					</p>
				</div>
			</div>
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0" />

			<div class="flex items-center gap-[10px] lg:gap-[12px]">
				<img src={Author} alt="" class="w-[32px] lg:w-[42px]" />
				<div class="flex flex-col items-start gap-[2px]">
					<p class="text-[#FFFFFF66] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('PublishedOn')}
					</p>
					<p class="text-[#FFFFFFE5] text-[14px] lg:text-[18px] font-Gilroy-SemiBold">
						{formatDate(data.game.created)}
					</p>
				</div>
			</div>
			<hr class="w-[1px] h-[32px] bg-[#ffffff1a] border-0" />

			<div class="flex items-center gap-[10px] lg:gap-[12px]">
				<img src={ReadTime} alt="" class="w-[32px] lg:w-[42px]" />
				<div class="flex flex-col items-start gap-[2px]">
					<p class="text-[#FFFFFF66] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('ReadTime')}
					</p>
					<p class="text-[#FFFFFFE5] text-[14px] lg:text-[18px] font-Gilroy-SemiBold">
						05 {$t('Min')}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
