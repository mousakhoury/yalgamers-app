<script>
	import { t, locale } from '$lib/stores/i18n';
	import Arrow from '$lib/assets/profile/see-all-arrow.svg';
	import CloseButton from '$lib/assets/profile/close-button.svg';

	import { user } from '$lib/stores/user';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import Button from './Button.svelte';
	import { browser } from '$app/environment';
	const currentLevel = $levels.findIndex((x) => x.start <= $user.xp && $user.xp <= x.end);
	let showLevels = false;
	const percentage =
		(($user?.xp - (currentLevel ? $levels[currentLevel - 1].end : 0)) /
			($levels[currentLevel].end - $levels[currentLevel].start)) *
		100;
	$: if (showLevels) {
		if (browser) document.body.style.overflow = 'hidden';
	} else {
		if (browser) document.body.style.overflow = 'scroll';
	}
</script>

<div
	class="flex flex-col items-start gap-[12px] lg:gap-[14px] w-full pb-[12px] lg:pb-[19px] rounded-[8px] lg:rounded-[12px] border border-[#321F37] bg-[#200B26] overflow-hidden"
>
	<div
		class="flex items-start justify-between p-[12px] lg:p-[14px] border border-[#2F1C35] bg-[#24102A] w-full"
	>
		<p class="text-[#FFFFFFE5] text-[16px] lg:text-[18px] font-Gilroy-Medium">
			{$t('Profile Level')}
		</p>
		<button
			on:click={() => (showLevels = true)}
			class="flex items-center gap-[4px] hover:opacity-80"
		>
			<p class="text-[#FDEB56] text-[14px] lg:text-[16px] font-Gilroy-Medium">
				{$t('See All Levels')}
			</p>
			<img src={Arrow} alt="" class="w-[14px] {$locale === 'ar' ? 'rotate-180' : ''}" />
		</button>
	</div>
	<div class="flex flex-col items-start gap-[12px] lg:gap-[14px] px-[12px] lg:px-[14px] w-full">
		<div
			class="flex flex-col items-start gap-[18px] lg:gap-[24px] w-full p-[10px] lg:p-[12px] rounded-[8px] bg-[#2B1731]"
		>
			<div class="flex items-center justify-between w-full">
				<div class="flex flex-col items-start gap-[6px] lg:gap-[6px]">
					<p class="text-[#FFFFFF66] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('Current Level')}
					</p>
					<p class="text-[#8EC9ED] text-[16px] lg:text-[24px] font-Gilroy-SemiBold">
						{$t('level', {
							levelNum: `${currentLevel + 1}`
						})}
						{$t('levelName', {
							levelName: `${$t(`${$levels[currentLevel].title}`)}`
						})}
					</p>
				</div>
				<img
					src={$levels[currentLevel].img}
					alt=""
					class="w-[40px] lg:w-[70px] h-[40px] lg:h-[70px]"
				/>
			</div>
			<div class="flex flex-col items-start gap-[10px] w-full">
				<div class="h-[6px] w-full bg-[#7E6E83] rounded-[100px]">
					<div class={`h-full bg-gradient-135 rounded-[100px]`} style="width: {percentage}%" />
				</div>
				<div class="flex items-center justify-between w-full">
					<p
						class="text-[#FDEB56] text-[12px] md:text-[14px] font-Gilroy-SemiBold leading-[15px] md:leading-[17px]"
					>
						{$user?.xp}XP<span class="text-[#7E6E83] font-Gilroy-Medium"
							>/{$levels[currentLevel].end}XP</span
						>
					</p>
					<p
						class="text-[#948798] text-[12px] md:text-[14px] font-Gilroy-SemiBold leading-[15px] md:leading-[17px]"
					>
						{$t('until', {
							levelNum: `${currentLevel + 2}`,
							xp: `${$levels[currentLevel].end - $user?.xp}`
						})}
					</p>
				</div>
			</div>
		</div>

		<div
			class="flex items-center justify-between w-full p-[10px] lg:p-[12px] rounded-[8px] bg-[#2B1731]"
		>
			<div class="flex flex-col items-start gap-[4px] lg:gap-[10px]">
				<p class="text-[#FFFFFF66] text-[11px] lg:text-[14px] font-Gilroy-Medium">
					{$t('Next Level')}
				</p>
				<div class="flex flex-col items-start gap-[6px]">
					<p class="text-[#FFFFFFE5] text-[16px] lg:text-[18px] font-Gilroy-Medium">
						{$t('level', {
							levelNum: `${currentLevel + 2}`
						})}
						{$t('levelName', {
							levelName: `${$t(`${$levels[currentLevel + 1].title}`)}`
						})}
					</p>
					<p class="text-[#FFFFFF99] text-[12px] lg:text-[16px] font-Gilroy-Medium">
						XP: ({$levels[currentLevel + 1].start}-{$levels[currentLevel + 1].end})
					</p>
				</div>
			</div>

			<img
				src={$levels[currentLevel + 1].img}
				alt=""
				class="w-[40px] lg:w-[50px] h-[40px] lg:h-[50px]"
			/>
		</div>
	</div>
</div>

{#if showLevels}
	<div
		class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-blur backdrop-blur-md z-[90] p-[16px]"
	>
		<div
			class="flex flex-col items-start w-full max-w-[400px] pb-[12px] rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
		>
			<button
				on:click={() => (showLevels = false)}
				class="absolute top-[-13px] right-[-13px] lg:top-[-17px] lg:right-[-17px]"
			>
				<img src={CloseButton} alt="" class="w-[24px] lg:w-[32px]" />
			</button>
			<div class="p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-t-[12px]">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-white-70 font-Gilroy-SemiBold text-[20px]"
				>
					{$t('Profile Levels')}
				</p>
			</div>

			<div class="flex flex-col gap-[8px] max-h-[356px] px-[8px] overflow-y-auto w-full">
				{#each $levels as item, index}
					<div class="flex items-center gap-[12px] p-[6px] border-b border-[#ffffff14] w-full">
						<img src={item.img} class="w-[50px] h-[48px]" alt="" />
						<div class="not-italic font-normal">
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-lg font-Gilroy-SemiBold text-white-90"
							>
								{$t(`${item.title}`)}
								{@html currentLevel == index
									? `<span class='text-white-50 font-Gilroy-Medium'>(${$t('your level')})</span>`
									: ''}
							</p>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-sm font-Gilroy-Medium text-white-50"
							>
								XP: ({item.start}-{item.end})
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
