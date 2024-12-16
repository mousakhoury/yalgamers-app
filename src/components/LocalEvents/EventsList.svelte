<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import EventCard from './EventCard.svelte';
	export let list = [];
	export let type;
</script>

<div class="flex flex-col items-start gap-[30px] w-full">
	<h2 class="text-[#fff] text-[42px] font-Gilroy-Bold capitalize">
		{#if type == $t('all')}
			{$locale === 'ar' ? 'كل البطولات' : 'All Tournaments'}
		{:else if type == $t('On-Going')}
			{$locale === 'ar' ? 'البطولات المتاحة' : 'On-Going Tournaments'}
		{:else if type == $t('upcoming')}
			{$locale === 'ar' ? 'البطولات القادمة' : 'Upcoming Tournaments'}
		{:else if type == $t('finished')}
			{$locale === 'ar' ? 'البطولات المنتهية' : 'Finished Tournaments'}
		{/if}
	</h2>
	<div
		class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[1650px]:grid-cols-4 gap-[30px] w-full"
	>
		{#each list as event}
			<EventCard tournament={event} />
		{/each}
	</div>
</div>
