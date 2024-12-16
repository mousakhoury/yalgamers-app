<script>
	import Checked from '$lib/assets/task-checked.svg';

	export let text;

	export let completed;

	export let checked = false;

	export let click;
</script>

{#if completed}
	<img src={Checked} alt="" />
{:else if checked}
	<img src={Checked} alt="" />
{:else}
	<button on:click={click} class="task-button"><p>{text}</p></button>
{/if}

<style>
	.task-button {
		display: flex;
		padding: 8px 16px;
		justify-content: space-between;
		align-items: center;
		border-radius: 6px;
		background: linear-gradient(95deg, rgba(247, 23, 86, 0.2) 0%, rgba(253, 235, 86, 0.2) 100%);
	}

	.task-button p {
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
