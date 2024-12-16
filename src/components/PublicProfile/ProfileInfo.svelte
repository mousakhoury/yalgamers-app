<script>
	// @ts-nocheck

	import { t, locale, locales } from '$lib/stores/i18n';

	import MiniImage from '$lib/assets/public-profile/mini-profile.png';
	import LevelIcon from '$lib/assets/public-profile/level-icon.svg';
	import Badge from '$lib/assets/public-profile/badge.svg';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import { getImageUrl } from '$lib/utils';

	export let xp;
	export let user;
	export let followers;

	let currentLevel = findLevel(xp);
	// let percentage;

	let percentage =
		((xp - (currentLevel ? $levels[currentLevel - 1].end : 0)) /
			($levels[currentLevel].end - $levels[currentLevel].start)) *
		100;
</script>

<div class="flex flex-col md:flex-row items-center gap-[20px] md:gap-[30px] w-full">
	<div class="flex flex-col items-start gap-[24px] md:gap-[41px] w-full">
		{#if user.bio}
			<div class="flex flex-col items-start gap-[6px]">
				<p
					class="text-[#FFFFFFCC] text-[14px] md:text-[16px] font-Gilroy-SemiBold leading-[17px] md:leading-[20px]"
				>
					{$t('Bio')}-
				</p>
				<p
					class="text-[#FFFFFF66] text-[12px] md:text-[14px] font-Gilroy-Medium leading-[15px] md:leading-[17px]"
				>
					{user.bio}
				</p>
			</div>
		{/if}
		<div class="flex items-center gap-[12px]">
			{#if followers.length > 0}
				<div class="flex items-center">
					{#each followers.filter((f) => f.avatar != '').slice(0, 3) as follower}
						<img
							src={getImageUrl('users', follower.id, follower.avatar)}
							alt=""
							class="w-[24px] md:w-[32px] h-[24px] md:h-[32px] object-cover rounded-full box-shadow"
						/>
					{/each}
				</div>
			{/if}
			<p
				class="text-[#8EC9ED] text-[12px] md:text-[14px] font-Gilroy-Medium leading-[15px] md:leading-[17px]"
			>
				{followers.length}
				{$t('Followers')}
			</p>
		</div>
	</div>
	<hr class="w-full md:w-[1px] h-[1px] md:h-[130px] bg-[#ffffff1a] border-0" />
	<div class="flex flex-col items-start gap-[16px] w-full">
		<div class="flex items-center gap-[24px] md:gap-[40px] w-full">
			<div class="flex flex-col items-start gap-[12px] w-full">
				<p
					class="text-[#FFFFFFCC] text-[16px] md:text-[20px] font-Gilroy-SemiBold leading-[20px] md:leading-[25px]"
				>
					{$t('level', {
						levelNum: `${currentLevel + 1}`
					})}
					{$t('levelName', {
						levelName: `${$t(`${$levels[currentLevel].title}`)}`
					})}
				</p>
				<div class="flex flex-col items-start gap-[8px] w-full">
					<div class="w-full h-[6px] md:h-[8px] rounded-[100px] bg-[#7E6E83]">
						<span
							class="block h-[6px] md:h-[8px] rounded-[100px] bg-gradient"
							style="width: {percentage}%;"
						/>
					</div>
					<div class="flex items-center justify-between w-full">
						<p
							class="text-[#FDEB56] text-[12px] md:text-[14px] font-Gilroy-SemiBold leading-[15px] md:leading-[17px]"
						>
							{xp}XP<span class="text-[#7E6E83] font-Gilroy-Medium"
								>/{$levels[currentLevel].end}XP</span
							>
						</p>
						<p
							class="text-[#948798] text-[12px] md:text-[14px] font-Gilroy-SemiBold leading-[15px] md:leading-[17px]"
						>
							{$t('until', {
								levelNum: `${currentLevel + 2}`,
								xp: `${$levels[currentLevel].end - xp}`
							})}
						</p>
					</div>
				</div>
			</div>
			<img src={$levels[currentLevel].img} alt="" class="w-[78.857px] md:w-[92px]" />
		</div>
		{#if currentLevel > 0}
			<div class="flex flex-col items-start gap-[10px] w-full">
				<div class="flex items-center justify-between w-full">
					<p
						class="text-[#FFFFFFCC] text-[14px] md:text-[16px] font-Gilroy-SemiBold leading-[17px] md:leading-[20px]"
					>
						{$t('Profile-Level Earned Badges')}
					</p>
					<p
						class="text-[#FFFFFF66] text-[12px] md:text-[14px] font-Gilroy leading-[15px] md:leading-[17px]"
					>
						{currentLevel}
					</p>
				</div>
				<div class="flex items-center flex-wrap gap-[10px] md:gap-[12px] w-full">
					{#each { length: currentLevel } as _, i}
						<img src={$levels[i].img} alt="" class="w-[30px] md:w-[34px]" />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.box-shadow {
		box-shadow: 0 0 0 4px #280e30;
	}

	.bg-gradient {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	@media (max-width: 768px) {
		.box-shadow {
			box-shadow: 0 0 0 3px #280e30;
		}
	}
</style>
