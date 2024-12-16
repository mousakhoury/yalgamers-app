<script>
	import { t, locale } from '$lib/stores/i18n';

	// @ts-nocheck

	export let type = 'primary';
	export let size = 'md'; // md, sm , lg
	export let disabled = false;
	export let formaction;

	export let newClass = '';

	const sizes = {
		md: 'py-[0.40rem] px-6 hover:shadow-primary',
		lg: 'py-2 w-full',
		sm: 'px-6 pt-[9px] pb-[7px]'
	};
	const bg = {
		gradient: 'bg-gradient-135 text-dark hover:shadow-primary',
		transparent: 'text-white-90 bg-accent hover:bg-gradient-135',
		secondary: 'bg-secondary-background text-white'
	};
</script>

{#if type == 'transparent'}
	<div class={`bg-gradient-135 p-[1px]  rounded-lg cursor-pointer ${$$props.class}`}>
		<button
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			on:click
			{disabled}
			class={` ${sizes[size]} ${bg[type]} rounded-lg flex   justify-center font-Gilroy-SemiBold not-italic items-center text-base sm:text-lg font-normal `}
		>
			<slot />
		</button>
	</div>
{:else if type == 'seeall'}
	<button
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		{disabled}
		on:click
		class="relative px-3 py-2 text-base font-normal font-Gilroy-SemiBold rounded-md sm:px-6"
	>
		<div
			class="bg-gradient-135 opacity-[0.20000000298023224] absolute w-full h-full top-0 left-0 rounded-md -z-10"
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="relative z-20 text-white pointer-events-none gradient"
		>
			<slot />
		</p>
	</button>
{:else if type == 'course'}
	<button
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		{disabled}
		class="w-fit h-[35px] rounded-full bg-white-30 flex justify-center items-center gap-[15px]"
	>
		<div
			class="w-[30px] h-[30px] bg-accent-yellow rounded-full m-[3px] flex justify-center items-center"
		>
			<slot name="svg" />
		</div>
		<div
			class={`w-fit ${
				$locale == 'ar' ? 'pl-6' : 'pr-6'
			} flex justify-center items-center text-white font-Gilroy-Medium text-[18px] font-normal not-italic`}
		>
			<slot name="content" />
		</div>
	</button>
{:else if type == 'course-reward'}
	<div class="rounded-full gradientBorder">
		<div
			class=" h-[42px] w-fit rounded-full p-[3px] bg-[#200B26] flex justify-center items-center gap-[24px]"
		>
			<div
				class="w-[35px] h-[35px] flex justify-center items-center bg-white-30 border border-solid border-accent-yellow rounded-full"
			>
				<slot name="svg" />
			</div>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class={`text-accent-yellow font-Gilroy-Semibold text-[18px] font-normal not-italic ${
					$locale == 'ar' ? 'pl-10' : 'pr-10'
				}`}
			>
				<slot name="content" />
			</p>
		</div>
	</div>
{:else}
	<button
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		{formaction}
		{disabled}
		on:click
		class={` ${sizes[size]} ${bg[type]} ${newClass} rounded-md flex  justify-center font-Gilroy-SemiBold not-italic items-center text-lg font-normal ${$$props.class}`}
	>
		<slot />
	</button>
{/if}

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	:global(.gradientBorder) {
		position: relative;
		z-index: 3;
		background: #200b26;
	}
	:global(.gradientBorder:hover) {
	}
	:global(.gradientBorder::before) {
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		top: -1px;
		left: -1px;
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: inherit;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.button-new-bg button {
		background-color: #200b26;
	}
</style>
