<script>
	import { t, locale } from '$lib/stores/i18n';
	import NewTag from '../../lib/assets/new-tag.svg';
	import RedIcon from '../../lib/assets/red-dot.svg';

	// @ts-nocheck
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	export let available;
	export let path;
	export let onClickCloseHandler;
	let show = false;
	let image;
	let coming_soon;
	let current;
	let mouseEnter = false;

	export let direction;
	afterUpdate(() => {
		current = $page.url.pathname == path;
		if (available) image.classList.remove('yellow');
	});

	function enterAnim() {
		mouseEnter = true;
		if (!available) {
			show = true;
			image.classList.add('yellow');
		}
		if (!current) {
			image.classList.add('yellow');
		}
	}
	function exitAnim() {
		mouseEnter = false;
		show = false;
		image.classList.remove('yellow');
	}

	export let isnew = false;
</script>

<div class="relative w-full md:w-auto">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<a href={`${available ? path : '#'}`} class=" w-full cursor-pointer h-full">
		<div
			on:click={() => {
				if (available) {
					setTimeout(onClickCloseHandler, 500);
				}
			}}
			class={` cursor-pointer flex flex-col ${
				direction == 'column' ? 'w-full' : 'w-[90px]'
			} relative ${
				direction == 'column' ? 'h-[70px] mx-4' : 'h-[90px]'
			}  justify-center  items-center text-white-60 
			
			${available && !current ? (direction == 'column' ? ' ' : 'absolute hover:animate-bottom ') : ''}
			} ${current ? 'text-gradient-135' : 'hover:text-accent-yellow '}`}
			on:mouseenter={enterAnim}
			on:mouseleave={exitAnim}
		>
			{#if show && direction != 'column'}
				<div
					class={`bg-secondary-background pointer-events-none relative top-[8px] text-white text-xs font-normal not-italic font-Gilroy-SemiBold rounded p-1 ${
						show ? 'static' : 'relative'
					} top-4`}
					bind:this={coming_soon}
					in:fly={{ y: 30, duration: 700 }}
				>
					{$t('comingSoon')}
				</div>
			{/if}
			<div
				class={`w-full h-full flex ${
					direction == 'column'
						? 'flex-row mx-6  hover:translate-x-3 ease-in duration-100'
						: 'flex-col'
				} justify-center  relative py-4 items-center `}
			>
				<span class="cursor-pointer" bind:this={image}>
					<slot name="icon" />
				</span>
				<div
					class="pt-1 font-medium {direction == 'column'
						? 'text-[20px] flex items-center pl-2'
						: 'text-sm text-center'} {$locale == 'ar'
						? 'text-xs'
						: ''} cursor-pointer w-full not-italic font-Gilroy"
					class:gradient={current}
				>
					<slot name="title" />
					{#if show && direction == 'column'}
						<div
							class={`w-30% h-full bg-secondary-background pointer-events-none relative ml-2 text-white text-xs font-normal not-italic font-Gilroy-SemiBold rounded  align-middle justify-center ${
								show ? 'static' : 'relative'
							} `}
							bind:this={coming_soon}
							in:fly={{ x: -30, duration: 700 }}
						>
							{$t('comingSoon')}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</a>
	{#if isnew}
		<img class="absolute top-1 md:top-3 md:left-1" src={NewTag} alt="new" />
	{/if}
	{#if isnew && $page.data.pending_quests}
		<img
			class="absolute top-5 left-28 md:left-auto md:right-7 md:top-3 h-2.5 w-2.5 md:h-3 md:w-3"
			src={RedIcon}
			alt="new"
		/>
	{/if}
</div>

<style lang="postcss">
	@keyframes animateMargin {
		0% {
			margin-bottom: 0;
		}
		100% {
			margin-bottom: 12px; /* Adjust the value as per your requirement */
		}
	}

	:global(.yellow) {
		filter: invert(78%) sepia(67%) saturate(557%) hue-rotate(1deg) brightness(306%) contrast(108%);
	}
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
</style>
