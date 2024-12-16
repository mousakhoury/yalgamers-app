<script>
	import { t, locale } from '$lib/stores/i18n';

	export let index;
	export let item;
	export let refresh;
	export let result;
	let selected = -1;
	import correctSvg from '$lib/assets/tick-active.svg';
	import wrongSvg from '$lib/assets/close.svg?raw';
	$: if (refresh) {
		selected = -1;
	}
</script>

<div class="flex flex-col items-start justify-center w-full gap-2">
	<div
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="text-xl not-italic font-normal text-white font-Gilroy-Bold"
	>
		{index + 1}. {item.question}
	</div>

	<div class="flex flex-col items-start justify-center w-full gap-1">
		{#each item.expand.options as option, optIndex}
			<div
				class="flex w-full text-lg not-italic font-normal text-white-70 gap-2 font-Gilroy-Medium"
			>
				<input id={option.id} type="radio" name={item.id} class="hidden" value={option.value} />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<label
					on:click={() => {
						if (typeof result?.success == 'undefined') selected = optIndex;
					}}
					class="w-full status-div hover:text-white gap-2 cursor-pointer flex justify-start items-center py-2 pl-[7px] rounded-[6px] hover:bg-white-20"
					class:border-accent-red={result?.success == false && selected == optIndex}
					class:border-positive={result?.success == true && selected == optIndex}
					class:border-accent-yellow={typeof result?.success === 'undefined' &&
						selected == optIndex}
					class:border={selected == optIndex}
					class:border-dashed={selected == optIndex}
					for={option.id}
				>
					{#if typeof result?.success != 'undefined' && optIndex == selected}
						{#if result.success}
							<!-- svelte-ignore a11y-missing-attribute -->
							<img height="24px" width="24px" src={correctSvg} />
						{:else}
							{@html wrongSvg}
						{/if}
					{/if}
					{String.fromCharCode(65 + optIndex)}. {option.value}
				</label>
				<br />
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	:global(.status-div) {
		--color_fill: #f71756;
	}
</style>
