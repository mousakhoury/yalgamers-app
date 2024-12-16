<script>
	import { t, locale } from '$lib/stores/i18n';

	import joystickSvg from '$lib/assets/joystick.svg';
	import tickSvg from '$lib/assets/tick-yellow.svg';
	import underdevSvg from '$lib/assets/under-develop.svg';
	import betaSvg from '$lib/assets/beta.svg';
	import alphSvg from '$lib/assets/alpha.svg';
	import closeSvg from '$lib/assets/cancel-circle.svg';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { getImageUrl } from '$lib/utils';
	import Arrow from '$lib/assets/subItemsArrow.svg';

	export let filter;
	export let data;
	export let visible = false;
	export let genres = [];

	let isPlatform = false;
	let isNetworks = false;
	let isStatus = false;
	let isGenres = false;

	$: networks = [];
	$: platforms = [];
	$: filterValues = {
		radio: [
			{
				svg: joystickSvg,
				title: 'Free to Play',
				focused: false
			}
		],
		platform: [],
		network: [],
		status: [
			{
				svg: joystickSvg,
				title: 'Playable',
				focused: false
			},
			{
				svg: alphSvg,
				title: 'Alpha',
				focused: false
			},
			{
				svg: betaSvg,
				title: 'Beta',
				focused: false
			},
			{
				svg: underdevSvg,
				title: 'Under Develop',
				focused: false
			}
		],
		genre: []
	};

	onMount(async () => {
		const [platform_list, network_list] = await Promise.all([fetch_platforms(), fetch_networks()]);

		filterValues.platform = platform_list.map((p) => ({
			svg: getImageUrl(p.collectionId, p.id, p.icon),
			title: p.name,
			id: p.id,
			focused: false
		}));

		filterValues.network = network_list.map((n) => ({
			id: n.id,
			svg: getImageUrl(n.collectionId, n.id, n.img),
			title: n.network,
			focused: false
		}));

		networks = network_list;
		platforms = platform_list;
	});

	async function fetch_platforms() {
		const res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/platforms/records`);
		return (await res.json()).items;
	}

	async function fetch_networks() {
		const res = await fetch(`${env.PUBLIC_BASE_URL}/api/collections/networks/records`);
		return (await res.json()).items;
	}

	function clearAllFilters() {
		filter.Favorite = false;
		filter['Free to Play'] = false;
		// filterValues.radio.map((e,i)=> filter.radio[i].focused =false )
		filter.Platform = [];
		filter.Genres = [];
		filter.Network = [];
		filter.Status = [];
		visible = false;
	}

	function handleClick(field, title) {
		if (filter[`${field}`].includes(title)) {
			const index = filter[`${field}`].indexOf(title);
			filter[`${field}`].splice(index, 1);
		} else {
			filter[`${field}`].push(title);
		}
		filter = filter;
	}

	let isFilterEmpty =
		filter.Genres.length === 0 &&
		filter.Network.length === 0 &&
		filter.Platform.length === 0 &&
		filter.Status.length === 0 &&
		filter['Free to Play'] === false;

	console.log(filter);

	function getPlatformNameById(value) {
		let item = data.games.items.find((f) => f.platforms.includes(value));
		item = item.expand.platforms.find((f) => f.id == value);
		return item.name;
	}

	function getNetworkNameById(value) {
		let item = data.games.items.find((f) => f.network.includes(value));
		item = item.expand.network.find((f) => f.id == value);
		return item.network;
	}

	function get_genre_Name_ById(id) {
		let item = data.genres.genres.find((f) => f.id == id);
		return item.name_en;
	}
</script>

<button
	class="fixed top-0 bottom-0 left-0 right-0 z-[200] backdrop-blur-sm"
	class:hidden={!visible}
	on:click={() => (visible = false)}
/>

<div
	class="fixed top-0 bottom-0 right-0 z-[300] flex flex-col items-start justify-between backdrop-blur-sm w-[260px] md:w-[260px] bg-[#28152E] border-l border-[#3D2C42]"
	class:hidden={!visible}
>
	<div
		class="flex items-center justify-between w-full p-[20px] bg-[#201125] border-b border-[#36293B]"
	>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold"
		>
			Filtering Options
		</p>
		<button class="" on:click={() => (visible = false)}>
			<img src={closeSvg} alt="" class="w-[16px]" />
		</button>
	</div>
	<div
		class="flex flex-col items-start gap-[16px] w-full h-[100%] realtive z-50 overflow-y-auto px-[20px] py-[16px]"
		transition:fly|local={{ x: 10, duration: 300 }}
	>
		<div class="flex flex-col items-start gap-[16px] w-full">
			{#each filterValues.radio as item}
				<div class="flex justify-between items-center w-full">
					<div class="flex gap-[8px] justify-center items-center">
						<img src={item.svg} alt="joystick svg" class="w-[20px]" />
						<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[#D4CFD6] text-[14px] font-Gilroy">
							{item.title}
						</p>
					</div>
					<button
						class="slider"
						role="switch"
						aria-checked={filter[`${item.title}`]}
						on:click={() => {
							filter[`${item.title}`] = !filter[`${item.title}`];
						}}
					/>
				</div>
			{/each}
		</div>
		<hr />
		<div
			class="flex flex-col items-start gap-[16px] w-full duration-300 {isPlatform
				? 'h-auto'
				: 'h-[19px]'}"
		>
			<button
				on:click={() => {
					isPlatform = !isPlatform;
					isNetworks = false;
					isStatus = false;
					isGenres = false;
				}}
				class="flex items-center justify-between w-full"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#E9E6EA] text-[16px] font-Gilroy-medium"
				>
					Platform
				</p>
				<img src={Arrow} alt="" class:rotate-180={isPlatform} />
			</button>
			<div class="flex items-start gap-[8px] flex-wrap w-full {isPlatform ? 'block' : 'hidden'}">
				{#each filterValues.platform as item}
					<button
						class="flex items-center gap-[6px] p-[6px] pr-[10px] rounded-[4px] bg-[#FFFFFF08]"
						on:click={() => handleClick('Platform', item.id)}
						class:active-filter={filter['Platform'].includes(item.id)}
					>
						<img
							src={item.svg}
							alt="android svg"
							class="w-[16px] h-[16px] object-cover grayscale"
						/>
						<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[#D4CFD6] text-[12px] font-Gilroy">
							{item.title}
						</p>
					</button>
				{/each}
			</div>
		</div>
		<hr />

		<div
			class="flex flex-col items-start gap-[16px] w-full duration-300 {isNetworks
				? 'h-auto'
				: 'h-[19px]'}"
		>
			<button
				on:click={() => {
					isPlatform = false;
					isNetworks = !isNetworks;
					isStatus = false;
					isGenres = false;
				}}
				class="flex items-center justify-between w-full"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#E9E6EA] text-[16px] font-Gilroy-medium"
				>
					Networks
				</p>
				<img src={Arrow} alt="" class:rotate-180={isNetworks} />
			</button>
			<div class="flex items-start gap-[8px] flex-wrap w-full {isNetworks ? 'block' : 'hidden'}">
				{#each filterValues.network as item}
					<button
						class="flex items-center gap-[6px] p-[6px] pr-[10px] rounded-[4px] bg-[#FFFFFF08]"
						on:click={() => handleClick('Network', item.id)}
						class:active-filter={filter['Network'].includes(item.id)}
					>
						<img
							src={item.svg}
							alt="android svg"
							class="w-[16px] h-[16px] object-cover grayscale"
						/>
						<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[#D4CFD6] text-[12px] font-Gilroy">
							{item.title}
						</p>
					</button>
				{/each}
			</div>
		</div>
		<hr />

		<div
			class="flex flex-col items-start gap-[16px] w-full duration-300 {isStatus
				? 'h-auto'
				: 'h-[19px]'}"
		>
			<button
				on:click={() => {
					isPlatform = false;
					isNetworks = false;
					isStatus = !isStatus;
					isGenres = false;
				}}
				class="flex items-center justify-between w-full"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#E9E6EA] text-[16px] font-Gilroy-medium"
				>
					Status
				</p>
				<img src={Arrow} alt="" class:rotate-180={isStatus} />
			</button>
			<div class="flex items-start gap-[8px] flex-wrap w-full {isStatus ? 'block' : 'hidden'}">
				{#each filterValues.status as item}
					<button
						class="flex items-center gap-[6px] p-[6px] pr-[10px] rounded-[4px] bg-[#FFFFFF08]"
						on:click={() => handleClick('Status', item.title)}
						class:active-filter={filter['Status'].includes(item.title)}
					>
						<img
							src={item.svg}
							alt="android svg"
							class="w-[16px] h-[16px] object-cover grayscale"
						/>
						<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[#D4CFD6] text-[12px] font-Gilroy">
							{item.title}
						</p>
					</button>
				{/each}
			</div>
		</div>
		<hr />

		<div
			class="flex flex-col items-start gap-[16px] w-full duration-300 {isGenres
				? 'h-auto'
				: 'h-[19px]'}"
		>
			<button
				on:click={() => {
					isPlatform = false;
					isNetworks = false;
					isStatus = false;
					isGenres = !isGenres;
				}}
				class="flex items-center justify-between w-full"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#E9E6EA] text-[16px] font-Gilroy-medium"
				>
					Genres
				</p>
				<img src={Arrow} alt="" class:rotate-180={isGenres} />
			</button>
			<div class="flex items-start gap-[8px] flex-wrap w-full {isGenres ? 'block' : 'hidden'}">
				{#each genres as item}
					<button
						class="flex items-center gap-[6px] p-[6px] rounded-[4px] bg-[#FFFFFF08]"
						on:click={() => handleClick('Genres', item.id)}
						class:active-filter={filter['Genres'].includes(item.id)}
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-[#D4CFD6] text-start text-[12px] font-Gilroy"
						>
							{item.title}
						</p>
					</button>
				{/each}
			</div>
			<hr />
		</div>
	</div>

	<div
		class="flex flex-col items-start gap-[20px] w-full p-[20px] pb-[28px] border-b border-[#2E1E33] bg-[#25132A]"
	>
		<div class="flex flex-col items-start gap-[10px] w-full">
			<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">Filtered</p>
			{#if isFilterEmpty}
				<p class="text-[#FFFFFF4D] text-[12px] font-Gilroy">No item selected</p>
			{:else}
				<div class="flex items-start gap-[6px] flex-wrap">
					{#each filter.Platform as item}
						<div class="px-[8px] py-[4px] rounded-full bg-[#8EC9ED1A] border border-[#8EC9ED08]">
							<p class="text-[#8EC9ED] text-[12px] font-Gilroy">{getPlatformNameById(item)}</p>
						</div>
					{/each}
					{#each filter.Network as item}
						<div class="px-[8px] py-[4px] rounded-full bg-[#8EC9ED1A] border border-[#8EC9ED08]">
							<p class="text-[#8EC9ED] text-[12px] font-Gilroy">{getNetworkNameById(item)}</p>
						</div>
					{/each}
					{#each filter.Status as item}
						<div class="px-[8px] py-[4px] rounded-full bg-[#8EC9ED1A] border border-[#8EC9ED08]">
							<p class="text-[#8EC9ED] text-[12px] font-Gilroy">{item}</p>
						</div>
					{/each}
					{#each filter.Genres as item}
						<div class="px-[8px] py-[4px] rounded-full bg-[#8EC9ED1A] border border-[#8EC9ED08]">
							<p class="text-[#8EC9ED] text-[12px] font-Gilroy">{get_genre_Name_ById(item)}</p>
						</div>
					{/each}
					{#if filter['Free to Play']}
						<div class="px-[8px] py-[4px] rounded-full bg-[#8EC9ED1A] border border-[#8EC9ED08]">
							<p class="text-[#8EC9ED] text-[12px] font-Gilroy">Free to Play</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<button
			disabled={isFilterEmpty}
			on:click={clearAllFilters}
			class="flex items-center justify-center gap-[6px] w-full pt-[7px] pb-[8px] rounded-[3px] bg-[#FFFFFF0D] disabled:opacity-65"
		>
			<img src={closeSvg} alt="" class="w-[14px]" />
			<p class="text-[#FFFFFFB2] text-[12px] font-Gilroy">Clear Filter</p>
		</button>
	</div>
</div>

<style>
	.slider {
		width: 36px;
		height: 20px;
		position: relative;
		background: #311e37;
		border-radius: 16px;
		border: none;
	}
	.slider::before {
		content: '';
		position: absolute;
		width: 16px;
		height: 16px;
		background: #807483;
		top: 50%;
		transform: translateX(0px) translateY(-50%);
		border-radius: 9999px;
		left: 2px;
		z-index: 100;
		transition: transform 0.1s;
	}
	.slider[aria-checked='true'] {
		background-color: #fdeb56;
	}
	.slider[aria-checked='true']::before {
		transform: translateX(15px) translateY(-50%);
		transition: transform 0.1s;
		background: #311e37;
	}

	hr {
		width: 100%;
		border-color: #39273f;
	}

	.active-filter {
		background: #fdeb5626;
	}

	.active-filter p {
		color: #fdeb56;
	}

	.active-filter img {
		filter: invert(78%) sepia(66%) saturate(352%) hue-rotate(1deg) brightness(186%) contrast(108%);
	}
</style>
