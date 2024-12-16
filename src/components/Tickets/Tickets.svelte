<script>
	import MainTicketCard from './MainTicketCard.svelte';
	import screenshot from '$lib/assets/Rectangle-40099.png';
	import CreateTicket from './CreateTicket.svelte';
	import YourTicket from './YourTicket.svelte';
	import { onMount, onDestroy, tick } from 'svelte';

	export let closeTicketsHandler;
	export let isCreate;

	// console.log(isCreate);

	let tickets = [];

	onMount(async () => {
		const res = await fetch('/api/support_tickets');
		const data = await res.json();

		tickets = data;
	});

	let mainCard = true;
	let createCard = false;
	let yourTicket = false;

	if (isCreate) {
		mainCard = false;
		createCard = true;
		yourTicket = false;
	}

	function openCreateHandler() {
		createCard = true;
		mainCard = false;
		yourTicket = false;
	}

	function closeCreateHandler() {
		createCard = false;
		mainCard = true;
		yourTicket = false;
	}

	let selectedTicket = null;

	function handleTicketSelection(ticket) {
		selectedTicket = ticket;
		// console.log(selectedTicket);
		mainCard = false;
		createCard = false;
		yourTicket = true;
	}

	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	// Function to remove no-scroll class from body
	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

	// Add no-scroll on mount and remove on destroy
	onMount(addNoScroll);
	onDestroy(removeNoScroll);

	// Ensure no-scroll is removed when task container is closed
	function handleClose() {
		removeNoScroll();
		closeTicketsHandler();
	}
</script>

<div class="ticket-background" on:click={handleClose} />
<div class="ticket-card-container">
	{#if mainCard}
		<MainTicketCard {openCreateHandler} {tickets} {handleTicketSelection} {closeTicketsHandler} />
	{:else if createCard}
		<CreateTicket {closeCreateHandler} {closeTicketsHandler} />
	{:else if yourTicket && selectedTicket}
		<YourTicket {selectedTicket} {closeCreateHandler} {closeTicketsHandler} {openCreateHandler} />
	{/if}
</div>

<style>
	.ticket-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #000000a3;
		z-index: 300;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ticket-card-container {
		border-radius: 16px;
		border: 2px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		padding: 10px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 301;
	}

	@media (max-width: 800px) {
		.ticket-card-container {
			min-width: 343px;
		}
	}
</style>
