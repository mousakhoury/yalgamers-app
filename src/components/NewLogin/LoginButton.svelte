<script>
	import { createEventDispatcher } from 'svelte'; // Import createEventDispatcher from svelte
	import ActiveArrow from '$lib/assets/login/button-arrow-active.svg';
	import UnActiveArrow from '$lib/assets/login/button-arrow-un-active.svg';

	export let label;
	export let arrow = false;
	export let disable = false;
	export let loading = false;

	const dispatch = createEventDispatcher(); // Create a dispatcher

	// Handle the click event
	function handleClick(event) {
		if (!disable) {
			dispatch('click', event); // Dispatch a custom 'click' event
		}
	}
</script>

<button disabled={disable} on:click={handleClick} type="submit">
	<p>
		{@html loading
			? `<div
		class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
		role="status">
		<span
		  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
		  >Loading...</span
		>
	  </div>`
			: label}
	</p>
	{#if arrow}
		<img src={ActiveArrow} alt="" class="w-[18px] lg:w-[24px] active" />
		<img src={UnActiveArrow} alt="" class="w-[18px] lg:w-[24px] disable" />
	{/if}
</button>

<style>
	button {
		display: flex;
		width: 100%;
		padding: 14px 21px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 8px;
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
	}

	button:hover {
		border-radius: 8px;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%),
			linear-gradient(95deg, #f71756 0%, #fdeb56 100%);
		box-shadow: 0px 4px 20px 0px rgba(255, 119, 51, 0.3);
	}

	button:disabled {
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);
		box-shadow: none;
	}

	button p {
		color: #381e12;
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	button:disabled p {
		color: rgba(255, 255, 255, 0.3);
	}

	button .disable {
		display: none;
	}

	button:disabled .disable {
		display: block;
	}

	button:disabled .active {
		display: none;
	}

	@media (max-width: 1024px) {
		button p {
			font-size: 14px;
		}
	}
</style>
