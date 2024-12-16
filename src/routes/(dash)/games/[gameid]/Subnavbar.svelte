<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	export let selectedTab;

	const navItems = [
		// { path: 'news', title: 'News' },
		{ path: 'user-review', title: 'User Review' }
	];
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
</script>

<div class="flex justify-center items-center">
	<div
		class="flex items-center gap-[6px] p-[4px] lg:p-[6px] rounded-[6px] lg:rounded-[10px] border border-[#3D2644] bg-[#200B26]"
	>
		<button
			on:click={() => (selectedTab = 'overview')}
			class="p-[8px] pb-[4px] pt-[4px] lg:p-[10px] lg:pb-[9px] lg:pt-[10px] rounded-[4px] lg:rounded-[6px]"
			class:active={selectedTab === 'overview'}
		>
			<p class="text-[#A99FAC] text-[12px] lg:text-[16px] font-Gilroy-Medium">
				{$t('Overview')}
			</p>
		</button>
		<button
			on:click={() => (selectedTab = 'userReview')}
			class="p-[8px] pb-[4px] pt-[4px] lg:p-[10px] lg:pb-[9px] lg:pt-[10px] rounded-[4px] lg:rounded-[6px]"
			class:active={selectedTab === 'userReview'}
		>
			<p class="text-[#A99FAC] text-[12px] lg:text-[16px] font-Gilroy-Medium">
				{$t('User Review')}
			</p>
		</button>
	</div>
</div>

<style lang="postcss">
	.active {
		background: rgba(255, 255, 255, 0.2);
	}

	.active p {
		color: #e9e6ea !important;
	}
</style>
