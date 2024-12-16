<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Search from '$lib/assets/Header-Search.svg';
	import { getImageUrl } from '$lib/utils';
	import SearchClose from '$lib/assets/search-close.svg';

	export let type;
	export let placeholder;
	export let data = [];

	let query = '';

	// Computed property to filter data based on query
	$: filteredData = data.filter(
		(item) =>
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.title_en.toLowerCase().includes(query.toLowerCase())
	);
</script>

<div class="relative w-full lg:max-w-[330px]">
	<label
		class="flex items-center justify-start gap-[15px] lg:gap-[20px] p-[12px] lg:p-[13px] rounded-[10px] border border-[#3D2644] bg-[#140718] w-full relative"
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
		<img src={Search} alt="" class="w-[15px] lg:w-[24px] cursor-pointer" />
		<input
			id="search"
			type="text"
			{placeholder}
			bind:value={query}
			class="w-full bg-transparent text-[#e5e5e5] text-[14px] lg:text-[16px] search"
		/>
	</label>
	{#if query}
		<div class="absolute left-0 top-full w-full z-40 max-h-[500px] rounded-[10px]">
			{#if filteredData.length > 0}
				{#each filteredData as item}
					<div
						class="flex flex-col items-start p-[13px] rounded-[10px] border border-[#3D2644] bg-[#140718] w-full"
					>
						<a
							href="/{type}/{type === 'tournaments' || type === 'news'
								? item.id
								: item.unique_title}"
							class="flex items-center justify-start gap-[20px]"
						>
							{#if type === 'tutorials'}
								<img
									src={getImageUrl('tutorials', item.id, item.main_image)}
									alt={item.title}
									class="w-[50px]"
								/>
							{:else if type == 'news'}
								<img src={item.image} alt={item.title} class="w-[50px]" />
							{:else}
								<img
									src={getImageUrl(type, item.id, item.image)}
									alt={item.title}
									class="w-[50px]"
								/>
							{/if}
							<p class="text-[#e5e5e5]">{$locale === 'en' ? item.title_en : item.title}</p>
						</a>
					</div>
				{/each}
			{:else}
				<div
					class="flex flex-col items-start p-[13px] rounded-[10px] border border-[#3D2644] bg-[#140718] hover:bg-[#260d2e] w-full"
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
