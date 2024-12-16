<script>
	import { t, locale } from '$lib/stores/i18n';

	export let filterableItems = [];
	export let type = 'general';
	import filterUp from '$lib/assets/uparrow.svg';
	import filter from '$lib/assets/filter.svg';
	import closeIcon from '$lib/assets/close.svg';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	let expanded = false;
	export let filteredItem = '';
	import { browser } from '$app/environment';

	function clickEvent(event) {
		if (!event.target.closest('.dropdown')) {
			expanded = false;
		}
	}
	onMount(() => {
		document.addEventListener('click', clickEvent);
		return () => {
			document.removeEventListener('click', clickEvent);
		};
	});
	function changeFilter(item) {
		filteredItem = item;
		expanded = false;
	}
</script>

{#if type == 'general'}
	<div class="relative dropdown w-fit sm:w-[175px]">
		<button
			class="p-[10px] md:p-[13px] flex justify-between gap-2 relative bg-accent rounded-[10px] cursor-pointer border-solid border"
			class:border-accent-yellow={filteredItem}
			on:click={() => {
				expanded = !expanded;
			}}
		>
			<img alt="filter icon" height="24px" width="24px" src={filter} />
			<div class="w-fit flex justify-center items-center gap-5">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-white-30 font-Gilroy-Medium {$locale == 'ar'
						? 'text-xs'
						: 'text-base'} pointer-events-none font-normal not-italic"
				>
					{$t('filter')}
				</p>
				<img
					src={filterUp}
					width="16px"
					height="16px"
					alt="arrow down"
					class:rotate-180={expanded}
				/>
			</div>
		</button>
		{#if expanded}
			<ul
				transition:slide|local
				class="absolute cursor-pointer text-white-50 font-Gilroy text-base rounded-[10px] w-full bg-accent px-[15px] z-50 py-[15px] mt-[10px] flex justify-start flex-col"
			>
				{#each filterableItems as item}
					<li
						class="hover:text-accent-yellow"
						class:text-accent-yellow={filteredItem == item}
						on:click={() => changeFilter(item)}
					>
						{$t(`${item}`)}<!--{item}-->
					</li>
				{/each}
			</ul>
		{/if}
		{#if filteredItem}
			<button
				on:click={() => {
					expanded = false;
					filteredItem = '';
				}}
				class="-bottom-12 right-0 absolute cursor-pointer flex text-white-80 font-Gilroy-Medium text-base font-normal not-italic py-[11px] justify-between items-center"
				>Clear Filter <img src={closeIcon} height="20px" width="20px" alt="close icon" />
			</button>
		{/if}
	</div>
{:else}
	<div class="relative dropdown w-[140px]">
		<button
			class=" flex h-[50px] items-center w-full justify-center gap-2 relative bg-accent rounded-[10px] cursor-pointer"
			on:click={() => {
				expanded = !expanded;
			}}
		>
			<div class="flex justify-center items-center gap-5">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-white-30 font-Gilroy-Medium text-base pointer-events-none font-normal not-italic"
				>
					{$t(`${filteredItem}`)}
				</p>
				<img
					src={filterUp}
					width="16px"
					height="16px"
					alt="arrow down"
					class:rotate-180={expanded}
				/>
			</div>
		</button>
		{#if expanded}
			<ul
				transition:slide|local
				class="absolute cursor-pointer text-white-50 font-Gilroy text-base rounded-[10px] w-full bg-accent px-[15px] z-50 py-[15px] mt-[10px] flex justify-start flex-col"
			>
				{#each filterableItems as item}
					<li
						class="hover:text-accent-yellow"
						class:text-accent-yellow={filteredItem == item}
						on:click={() => changeFilter(item)}
					>
						{$t(`${item}`)}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}
<!-- {/if} -->
