<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import CloseUnhover from '$lib/assets/close-ticket-unhover.svg';
	import CloseHover from '$lib/assets/close-ticket-hover.svg';
	import screenshot from '$lib/assets/Rectangle-40099.png';
	import YesUnhover from '$lib/assets/yes-ticket-unhover.svg';
	import YesHover from '$lib/assets/yes-ticket-hover.svg';
	import Submitted from '$lib/assets/ticket-submitted.svg';

	import '$lib/assets/css/your-ticket.css';
	import dateFormat from '$lib/dateFormat';
	import { goto } from '$app/navigation';

	export let ticket;

	export let isClosed;
	export let isSolved;
	export let isOpen;
	export let closeCloseTicketHandler;

	async function isSolvedCloseTicketHandler() {
		const res = await fetch(`/api/support_tickets/${ticket.id}`, {
			method: 'PATCH'
		});
		if (!res.ok) return;
		isClosed = false;
		isSolved = true;
		const data = await res.json();
		ticket = data;

		setTimeout(() => {
			goto('/');
		}, 1000);
	}
</script>

{#if isOpen}
	<button class="ticket-background" on:click={closeCloseTicketHandler} />
	<div class="ticket-card-con">
		{#if isClosed}
			<div class="close-ticket-container">
				<div class="close-ticket-texts">
					<p class="close-ticket-title">{$t('close.ticket.header')}</p>
					<p class="close-ticket-body">
						{$t('close.ticket.body')}
					</p>
				</div>
				<button class="your-ticket-buttons" on:click={closeCloseTicketHandler}>
					<button class="ticket-close-button">
						<img src={CloseUnhover} class="close-ticket-unhover w-[24px]" alt="" />
						<img src={CloseHover} class="close-ticket-hover w-[24px]" alt="" />
						<p>{$t('No, not Solved Yet')}</p>
					</button>
					<button class="ticket-yes-button" on:click={isSolvedCloseTicketHandler}>
						<img src={YesUnhover} class="close-ticket-unhover" alt="" />
						<img src={YesHover} class="close-ticket-hover" alt="" />
						<p>{$t('Yes, Problem Solved')}</p>
					</button>
				</button>
			</div>
		{:else if isSolved}
			<div class="yes-solved">
				<img src={Submitted} alt="" />
				<p>{$t('Your Ticket Marked as Solved!')}</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	.ticket-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #000000a3;
		z-index: 51;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ticket-card-con {
		border-radius: 16px;
		border: 2px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		padding: 10px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 52;
	}

	@media (max-width: 800px) {
		.ticket-card-con {
			min-width: 343px;
		}
	}
</style>
