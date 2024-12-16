<script>
	import { t, locale, locales } from '$lib/stores/i18n';
	import { onDestroy, onMount } from 'svelte';
	import flag1 from '$lib/assets/flag1.svg';
	import flag2 from '$lib/assets/flag2.svg';
	import ENFlag from '$lib/assets/en-flag.svg';
	import ARFlag from '$lib/assets/ar-flag.svg';
	import { browser } from '$app/environment';

	let state = false;

	let unsubscribe = locale.subscribe((value) => {
		if (browser) {
			localStorage.setItem('preferred_language', value);
			document.documentElement.setAttribute('lang', value);
		}
	});

	onDestroy(unsubscribe);

	function clickEvent(event) {
		if (!event.target.closest('.langSelect')) {
			state = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', clickEvent);
		return () => {
			document.removeEventListener('click', clickEvent);
		};
	});
</script>

<div class="flex items-center gap-[4px] p-[2px] rounded-full border border-[#ffffff0f]">
	{#if $locale === 'ar'}
		<button
			on:click={() => {
				locale.set('en');
				state = false;
				window.location.reload();
			}}
			class="flex items-center gap-[6px] p-[3px] {$locale === 'en'
				? 'pr-[10px]'
				: 'pl-[10px]'} rounded-full {$locale === 'en' ? 'bg-[#fdeb5626]' : ''}"
		>
			<img src={ENFlag} alt="" class="w-[20px]" />
			<p class="text-[#BEB6C0] text-[12px] font-Gilroy-Medium">EN</p>
		</button>
	{:else}
		<button
			on:click={() => {
				locale.set('ar');
				state = false;
				window.location.reload();
			}}
			class="flex items-center gap-[6px] p-[3px] {$locale === 'en'
				? 'pr-[10px]'
				: 'pl-[10px]'}  rounded-full {$locale === 'ar' ? 'bg-[#fdeb5626]' : ''}"
		>
			<img src={ARFlag} alt="" class="w-[20px]" />
			<p class="text-[#BEB6C0] text-[12px] font-Gilroy-Medium">AR</p>
		</button>
	{/if}
</div>
