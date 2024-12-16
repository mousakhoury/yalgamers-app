<script>
	import { t, locale } from '$lib/stores/i18n';
	import HeaderSearch from '$lib/assets/Header-Search.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SearchClose from '$lib/assets/search-close.svg';

	let list = $page.data.global_search;
	let query = '';
	let userList = [];

	// Computed property to filter data based on query
	$: filteredData = [];

	function search(value) {
		if (value == '') {
			filteredData = list;
		} else if (value.startsWith('@')) {
			filteredData = userList.filter((f) =>
				f.title_en.toLowerCase().includes(value.toLocaleLowerCase().replace('@', ''))
			);
		} else {
			filteredData = list.filter(
				(item) =>
					item.title_ar.toLowerCase().includes(value.toLowerCase()) ||
					item.title_en.toLowerCase().includes(value.toLowerCase())
			);
		}
	}

	onMount(() => {
		fetchUsers();
	});

	async function fetchUsers() {
		const res = await fetch(`/api/fetch-users`);
		userList = (await res.json()).list;
	}
</script>

<div class="relative w-full max-w-[400px]">
	<label
		for="search"
		class="flex items-center gap-[12px] w-full h-[42px] rounded-[100px] border border-[#2B202F] bg-[#140718] relative"
	>
		<button
			class="absolute top-[50%] translate-y-[-50%] z-10 {$locale === 'ar'
				? 'left-[10px]'
				: 'right-[10px]'}"
			on:click={() => (query = '')}
			hidden={!query}
		>
			<img src={SearchClose} alt="" />
		</button>
		<div
			class="py-[11px] bg-[#1F1223] {$locale == 'ar'
				? 'pr-[12px] pl-[10px] rounded-r-[100px]'
				: 'pl-[12px] pr-[10px] rounded-l-[100px]'}"
		>
			<img src={HeaderSearch} alt="" class="w-[20px]" />
		</div>
		<input
			id="search"
			type="text"
			placeholder="{$t(`search`)}..."
			on:input={(e) => search(e.target.value)}
			bind:value={query}
			class="w-full bg-transparent text-[#e5e5e5] text-[16px] search"
		/>
	</label>

	{#if query}
		<div class="absolute left-0 top-[110%] w-full z-40 max-h-[500px] rounded-[10px] overflow-auto">
			{#if filteredData.length > 0}
				{#each filteredData as item}
					<div
						class="flex flex-col items-start p-[13px] rounded-[10px] border border-[#3D2644] bg-[#140718] hover:bg-[#260d2e] w-full"
					>
						<a
							href={item.link}
							on:click={() => (query = '')}
							class="flex items-center justify-between gap-[20px] w-full"
						>
							<div class="flex items-center justify-start gap-[20px]">
								{#if item.image}
									<img src={item.image} alt={item.title} class="w-[50px]" />
								{/if}
								<p class="text-[#e5e5e5]">{$locale === 'en' ? item.title_en : item.title_ar}</p>
							</div>
							<p class="text-[#e5e5e5] text-[12px]">{item.type}</p>
						</a>
					</div>
				{/each}
			{:else}
				<div
					class="flex flex-col items-start p-[13px] rounded-[10px] border border-[#3D2644] bg-[#140718] w-full"
				>
					<p class="text-[#e5e5e5]">No search results</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search {
		border: 0 !important;
		outline: 0 !important;
		box-shadow: none !important;
	}
</style>
