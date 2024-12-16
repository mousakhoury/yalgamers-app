<script>
	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';

	export let title;
	export let href = '/news';

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="flex items-center justify-between mx-3 sm:px-5">
	<h1
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="font-Gilroy-Bold text-[28px] sm:text-[42px] text-white"
	>
		{title}
	</h1>
	{#if title == 'Latest News'}
		<div />
	{:else}
		<a class={`w-10px ${innerWidth < 640 ? 'see-all' : ''} explor-link `} {href}
			><Button type="seeall">{$t('seeAll')}</Button></a
		>
	{/if}
</div>

<style>
	:global(.see-all) {
		background: #280e30 !important;
	}
</style>
