<script>
	import { t, locale, locales } from '$lib/stores/i18n';
	import achievement from '$lib/assets/header-achievement-image.svg';
	import Button from '$lib/assets/my-achievement-button.svg';
	import LinkArrow from '$lib/assets/duble-right-yellow.svg';

	export let btnHandler;

	let isClaimed = true;
</script>

<button on:click={btnHandler} class="w-full">
	<a href="/achievements" class="w-full">
		<div
			class="w-full rounded-[6px] bg-[#382038] hover:bg-[#533C3C] p-[5px] pr-[10px] flex items-center justify-between border border-[#472F3A] hover:border-[#5C443D]"
		>
			<div class="flex items-center gap-[12px]">
				<img src={achievement} alt="" class="w-[65px] lg:w-[60px]" />
				<div class="flex flex-col items-start gap-[6px]">
					<p
						class="text-[#E3DFB7] text-[14px] lg:text-[18px] font-Gilroy-SemiBold leading-[17px] lg:leading-[22px]"
					>
						{$t('MyAchievements')}
					</p>
					{#if isClaimed}
						<div class="flex items-start gap-[4px] flex-col lg:flex-row">
							<p
								class="text-[#9E937F] text-[10px] lg:text-[14px] font-Gilroy-Medium leading-[12px] lg:leading-[17px]"
							>
								{$t('CurrentBadge')}:
							</p>
							<p class="text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-SemiBold">
								Original Gangstar
							</p>
						</div>
					{:else}
						<p
							class="text-[#9E937F] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[15px] lg:leading-[17px]"
						>
							Not claimed
						</p>
					{/if}
				</div>
			</div>

			<img src={LinkArrow} alt="" class="w-[18px] {$locale === 'ar' ? 'rotate-180' : ''}" />
		</div>
	</a>
</button>
