<script>
	import DropDown from '$lib/assets/header/arrow-down-01.svg';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let label = '';
	export let options = [];
	export let value = '';

	let isOpen = false;
	const dispatch = createEventDispatcher();

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(option) {
		value = option;
		isOpen = false;
		dispatch('change', { value });
	}

	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown-container')) {
			isOpen = false;
		}
	}

	// Close dropdown when clicking outside
	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="dropdown-container flex flex-col items-start gap-2 w-full relative">
	<div class="relative w-full">
		<button
			class="dropdown-trigger flex items-center justify-between p-[15px] rounded-md border border-[#ffffff33] w-full focus:outline-none focus:ring focus:ring-indigo-200"
			on:click={toggleDropdown}
		>
			{#if value}
				<span class="text-[18px] font-normal text-[#FFFFFFE5]">{value}</span>
			{:else}
				<span class="text-[18px] font-normal text-[#ffffff66]">{label}</span>
			{/if}
			<img src={DropDown} alt="" class="w-4 transform {isOpen ? 'rotate-180' : ''}" />
		</button>
		{#if isOpen}
			<div
				class="dropdown-menu flex flex-col items-start absolute top-full mt-1 w-full bg-[#29152F] border border-[#ffffff33] rounded-md shadow-lg z-10 max-h-[300px] overflow-auto"
			>
				{#each options as option}
					<button
						class="flex items-start px-[15px] py-[12px] w-full text-left hover:bg-indigo-100 cursor-pointer text-[18px] font-normal text-[#ffffff66]"
						on:click={() => selectOption(option)}
					>
						{option}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.dropdown-container {
		width: 100%;
	}
</style>
