<script>
	export let image;
	export let title;
	export let subtitle;
	export let content;
	export let newClass = '';

	export let isActive = false;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<div class={`${newClass} lead`} on:click={handleClick}>
	<img src={image} alt="" />
	<div class="lead-content">
		<h6>{title}</h6>
		<p>{isActive ? content : subtitle}</p>
	</div>
</div>

<style>
	.lead {
		display: flex;
		padding: 8px 9px;
		align-items: center;
		gap: 16px;
		border-radius: 4px;
		cursor: pointer;
		flex: 1 0 0;
	}

	.lead img {
		width: 60px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		object-fit: contain;
	}

	.lead-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
	}

	.lead-content h6 {
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.lead-content p {
		color: var(--white-60, #a99fac);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.supreme {
		background: linear-gradient(90deg, #3f262b 0%, #3e183f 50%, #2e1f44 100%);
	}

	.supreme .lead-content h6 {
		background: linear-gradient(90deg, #ffbb01 0%, #f225d4 50%, #4f75ff 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.grand {
		background: #2d2543;
	}

	.grand .lead-content h6 {
		background: linear-gradient(180deg, #5cc6fa 35.42%, #1078e2 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.elite {
		background: #3e1f41;
	}

	.elite .lead-content h6 {
		background: linear-gradient(180deg, #f571e5 35.42%, #d01cb4 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.legendary {
		background: #3e2633;
	}

	.legendary .lead-content h6 {
		background: linear-gradient(180deg, #feba5a 35.42%, #ea8510 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.master {
		background: #35243e;
	}

	.master .lead-content h6 {
		background: linear-gradient(180deg, #a5abce 35.42%, #565f8c 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.verteran {
		background: #3a1f2e;
	}

	.verteran .lead-content h6 {
		background: linear-gradient(180deg, #d0772a 35.42%, #833614 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
