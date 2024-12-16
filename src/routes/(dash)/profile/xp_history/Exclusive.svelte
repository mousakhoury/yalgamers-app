<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	export let REWARDS = [];
	export let GENERAL_REWARDS = [];
</script>

<div class="py-4 px-[24px] bg-[#28112E] flex justify-between">
	<div class="flex gap-5">
		<span class="text-[#68566E]">#</span>
		<span class="text-[#68566E]">{$t('Name')}</span>
	</div>
	<span class="text-[#68566E]">{$t('Rewards')}</span>
</div>
{#each REWARDS as reward, i}
	<div
		class="px-[24px] border-t-[1px] border-[#311C38] border-dashed text-[#BEB6C0] flex items-center justify-between py-3"
	>
		<div class="flex gap-5">
			<span>{i + 1}</span>
			<span>{reward.main}</span>
		</div>
		<span class="text-[#FDEB56]">{reward.xp} XP</span>
	</div>
{/each}
<div class="py-5 border-t-[1px] border-[#311C38] {$locale === 'ar' ? 'pr-[24px]' : 'pl-[24px]'}">
	<h2 class="font-thin text-lg">{$t('General Rewards')}</h2>
</div>
<div class="py-4 px-[24px] bg-[#28112E] flex justify-between">
	<div class="flex gap-5">
		<span class="text-[#68566E]">#</span>
		<span class="text-[#68566E]">{$t('Name')}</span>
	</div>
	<span class="text-[#68566E]">{$t('Rewards')}</span>
</div>
{#each GENERAL_REWARDS as reward, i}
	<div
		class="px-[24px] text-[#BEB6C0] border-t-[1px] border-[#311C38] border-dashed flex items-center justify-between py-3"
	>
		<div class="flex gap-5">
			<span>{i + 1}</span>
			<span>{reward.main}</span>
		</div>
		<span class="text-[#FDEB56]">{reward.xp} XP</span>
	</div>
{/each}
