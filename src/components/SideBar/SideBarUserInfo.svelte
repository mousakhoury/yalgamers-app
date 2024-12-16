<script>
	import { t, locale } from '$lib/stores/i18n';
	import HeaderConnectWallet from '$components/HeaderConnectWallet.svelte';
	import HeaderMyAchievement from '$components/HeaderMyAchievement.svelte';
	import { user } from '$lib/stores/user';
	export let currentLevel;
	export let percentage;
	export let btnHandler;
	export let avatar;
	export let levels;
	export let name;
	export let xp;
</script>

<div
	class="flex flex-col items-start gap-[10px] bg-[#280E30] border border-[#3D2644] p-[10px] rounded-[6px] w-full"
>
	<HeaderConnectWallet username={name} {avatar} {btnHandler} />
	<div class="h-[1px] w-full bg-[#342139]" />
	<div class="w-full">
		<div class="flex justify-between items-center w-full">
			<div class="font-normal not-italic">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#D4CFD6] font-Gilroy-SemiBold text-[14px] leading-[17px]"
				>
					{$t('My Level')}
				</p>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#9E937F] text-[12px] font-Gilroy-Medium"
				>
					{$t('level', {
						levelNum: `${currentLevel + 1}`
					})}
					<span class="text-[#FDEB56]">
						{$t('levelName', {
							levelName: `${$t(`${$levels[currentLevel].title}`)}`
						})}
					</span>
				</p>
			</div>
			<div>
				<img src={$levels[currentLevel].img} alt="level img" class="w-[31.5px]" />
			</div>
		</div>
		<div class="h-[6px] w-[100%] relative bg-white-40 rounded-[100px] mt-[12px]">
			<div
				class={`h-[6px] relative bg-gradient-135 rounded-[100px]`}
				style="width: {percentage}%"
			/>
		</div>
		<div class="flex justify-between items-center mt-[10px]">
			<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[12px] leading-[15px]">
				<span class="font-Gilroy-SemiBold text-[#FDEB56]">{xp}XP</span><span
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#7E6E83] font-Gilroy-Medium">/1000XP</span
				>
			</p>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-[#948798] text-[12px] font-Gilroy-Medium leading-[15px]"
			>
				{$t('until', {
					levelNum: `${currentLevel + 2}`,
					xp: `${$levels[currentLevel].end - $user?.xp}`
				})}
			</p>
		</div>
	</div>

	<HeaderMyAchievement {btnHandler} />
</div>
