<script>
	import { t, locale } from '$lib/stores/i18n';
	import ticket_image from '$lib/assets/create-ticket-image.svg';
	import unhover from '$lib/assets/plus-unhover.svg';
	import hover from '$lib/assets/plus-hover.svg';
	import TicketBar from './TicketBar.svelte';

	export let tickets;

	export let openCreateHandler;
	export let handleTicketSelection;
	export let closeTicketsHandler;

	let popupOpen = false;

	// Function to sort tickets
	function sortTickets(tickets) {
		return tickets.sort((a, b) => {
			const dateA = new Date(a.created); // Replace 'createdDate' with your date property
			const dateB = new Date(b.created); // Replace 'createdDate' with your date property
			return dateB - dateA; // Sorts in ascending order of date
		});
	}

	// Computed property for sorted tickets
	$: sortedTickets = sortTickets(tickets);
</script>

<div class="main-container">
	<div class="create-main-container">
		<img src={ticket_image} alt="" />
		<div class="facing-issue">
			<div class="facing-issue-text">
				<h5>{$t('Facing issues on')} <span>{$locale == 'ar' ? 'يلغيمرز؟' : 'Yalgamers?'}</span></h5>
				<p>{$t('By creating a ticket you can let us know about the issue you are having.')}</p>
			</div>
			<button class="create-a-ticket" on:click={openCreateHandler}>
				<img class="unhover" src={unhover} alt="" />
				<img class="hover" src={hover} alt="" />
				<span>{$t('Create a New Ticket')}</span>
			</button>
		</div>
	</div>

	<div class="active-container">
		<div class="active-ticket">
			<h6>{$t('Your Active Tickets')}</h6>
			<p>
				{tickets.length === 0 ? '0' : tickets.length < 10 ? `0${tickets.length}` : tickets.length}
			</p>
		</div>
		<div class="tickets">
			{#each sortedTickets as ticket, index}
				{#if ticket.status === 'OPEN'}
					<TicketBar {ticket} {index} onSelect={handleTicketSelection} {closeTicketsHandler} />
				{/if}
			{/each}
			{#each sortedTickets as ticket, index}
				{#if ticket.status === 'RESOLVED'}
					<TicketBar {ticket} {index} onSelect={handleTicketSelection} {closeTicketsHandler} />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
	}

	.create-main-container {
		display: flex;
		padding: 16px 25px;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		background: #1c0921;
		display: flex;
		align-items: center;
		gap: 60px;
		flex-shrink: 0;
	}

	.facing-issue {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		flex-shrink: 0;
	}

	.facing-issue:lang(ar) {
		align-items: flex-end;
	}

	.facing-issue-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		width: 353px;
	}

	.facing-issue-text:lang(ar) {
		align-items: flex-end;
	}

	.facing-issue-text h5 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.facing-issue-text span {
		color: var(--Accent, #fdeb56);
	}

	.facing-issue-text p {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px;
		max-width: 314px;
	}

	.create-a-ticket {
		display: inline-flex;
		padding: 12px 24px;
		justify-content: center;
		align-items: center;
		gap: 12px;
		border-radius: 6px;
		background: linear-gradient(95deg, rgba(247, 23, 86, 0.15) 0%, rgba(253, 235, 86, 0.15) 100%);
	}

	.create-a-ticket span {
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.create-a-ticket .hover {
		display: none;
	}

	.create-a-ticket:hover {
		border-radius: 6px;
		background: linear-gradient(95deg, #f71756 0%, #fdeb56 100%);
		box-shadow: 0px 4px 30px 0px rgba(251, 150, 86, 0.25);
	}

	.create-a-ticket:hover span {
		background: var(--Button, linear-gradient(95deg, #2a0d32 0%, #2a0d32 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.create-a-ticket:hover .hover {
		display: block;
	}

	.create-a-ticket:hover .unhover {
		display: none;
	}

	.active-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		width: 100%;
	}

	.active-ticket {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0 8px;
	}

	.active-ticket h6 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.active-ticket p {
		color: var(--white-30, #68566e);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.tickets {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		width: 100%;
		overflow-y: scroll;
		height: 236px;
	}

	.tickets::-webkit-scrollbar {
		width: 0 !important;
	}

	@media (max-width: 800px) {
		.create-main-container {
			flex-direction: column;
			gap: 30px;
			width: 100%;
		}

		.facing-issue {
			align-items: center;
			text-align: center;
		}

		.facing-issue-text {
			align-items: center;
			width: 100%;
		}

		.facing-issue-text h5 {
			font-size: 18px;
		}
	}
</style>
