<script>
	import { t, locale } from '$lib/stores/i18n';

	import MainQuest from '$components/QuestPage/MainQuest.svelte';

	export let data;
</script>

<div class="my-[30px] px-[10px] sm:px-[30px]">
	<div class="flex gap-[10px] justify-between items-center">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-[#FFF] text-[24px] lg:text-[42px] font-Gilroy-Bold"
		>
			{$t('Quests')}
		</p>
	</div>
</div>

<MainQuest {data} />
