<script>
	import { t, locale } from '$lib/stores/i18n';
	import CloseUnhover from '$lib/assets/close-ticket-unhover.svg';
	import CloseHover from '$lib/assets/close-ticket-hover.svg';
	import YesUnhover from '$lib/assets/yes-ticket-unhover.svg';
	import YesHover from '$lib/assets/yes-ticket-hover.svg';
	import Submitted from '$lib/assets/ticket-submitted.svg';
	import dateFormat from '$lib/dateFormat';
	import chat from '$lib/assets/ticket-chat-icon.svg';

	import '$lib/assets/css/your-ticket.css';
	// import { explore } from '$lib/assets/navicons';

	export let selectedTicket;
	export let closeCreateHandler;
	export let closeTicketsHandler;
	export let openCreateHandler;

	// function formatDate(dateString) {
	// 	const [day, month, year] = dateString.split('-');
	// 	const dateObject = new Date(`${year}-${month}-${day}`);
	// 	return new Intl.DateTimeFormat('en-GB', {
	// 		day: '2-digit',
	// 		month: 'long',
	// 		year: 'numeric'
	// 	}).format(dateObject);
	// }

	let isClosed = false;

	function closePageHandler() {
		isClosed = true;
	}

	let isSolved = false;

	function solvedButtonHandler() {
		isClosed = false;
		isSolved = true;
		setTimeout(() => {
			closeTicketsHandler();
		}, 3000);
	}

	function notSolvedHandler() {
		openCreateHandler();
	}

	function formatDate(dateString) {
		const dateObject = new Date(dateString);
		return dateObject.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

{#if isClosed}
	<div class="close-ticket-container">
		<div class="close-ticket-texts">
			<p class="close-ticket-title">{$t('close.ticket.header')}</p>
			<p class="close-ticket-body">
				{$t('close.ticket.body')}
			</p>
		</div>
		<div class="your-ticket-buttons">
			<button class="ticket-close-button" on:click={notSolvedHandler}>
				<img src={CloseUnhover} class="close-ticket-unhover w-[24px]" alt="" />
				<img src={CloseHover} class="close-ticket-hover w-[24px]" alt="" />
				<p>{$t('No, not Solved Yet')}</p>
			</button>
			<button class="ticket-yes-button" on:click={solvedButtonHandler}>
				<img src={YesUnhover} class="close-ticket-unhover" alt="" />
				<img src={YesHover} class="close-ticket-hover" alt="" />
				<p>{$t('Yes, Problem Solved')}</p>
			</button>
		</div>
	</div>
{:else if isSolved}
	<div class="yes-solved">
		<img src={Submitted} alt="" />
		<p>{$t('Your Ticket Marked as Solved!')}</p>
	</div>
{:else}
	<div class="your-ticket-container">
		<div class="flex items-center justify-between w-full">
			<h5>{$t('Your Ticket')}</h5>
			{#if selectedTicket.status === 'OPEN'}
				<a
					href={`/support-tickets/${selectedTicket.id}`}
					class="ticket-bar-button"
					on:click={closeTicketsHandler}
				>
					<img src={chat} alt="" />
					<span>{$t('Chat')}</span>
				</a>
			{:else}
				<a
					href={`/support-tickets/${selectedTicket.id}`}
					class="ticket-bar-button ticket-bar-button-closed"
					on:click={closeTicketsHandler}
				>
					<img src={chat} alt="" class="grayscale brightness-75" />
					<span class="!text-[#948798]">{$t('View Previews Chat')}</span>
				</a>
			{/if}
		</div>
		<div class="your-ticket">
			<div class="your-ticket-info">
				<div class="your-ticket-data">
					<!-- {#if selectedTicket.media}
						<img src={selectedTicket.media} alt="" />
					{/if} -->
					<div class="your-ticket-texts">
						<p class="your-ticket-subject">{selectedTicket.title}</p>
						<p class="your-ticket-description">{selectedTicket.description}</p>
					</div>
				</div>
				<p class="your-ticket-data">
					{$t('created on')}
					{formatDate(selectedTicket.created)}
				</p>
			</div>
			<div class="your-ticket-buttons">
				<!-- <button class="ticket-back-button" on:click={closeCreateHandler}>
					<p>Back</p>
				</button> -->
				<button
					class={`ticket-close-button ${
						selectedTicket.status === 'RESOLVED' && 'ticket-close-button-closed'
					}`}
					disabled={selectedTicket.status === 'RESOLVED'}
					on:click={closePageHandler}
				>
					{#if selectedTicket.status === 'RESOLVED'}
						<img src={YesUnhover} class="close-ticket-unhover" alt="" />
						<img src={YesUnhover} class="close-ticket-hover" alt="" />
						<p>{$t('Ticket Already Closed')}</p>
					{:else}
						<img src={CloseUnhover} class="close-ticket-unhover" alt="" />
						<img src={CloseHover} class="close-ticket-hover" alt="" />
						<p>{$t('Close Ticket')}</p>
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.ticket-bar-button {
		display: flex;
		padding: 6px 12px;
		align-items: center;
		gap: 12px;
		width: 98px;
	}

	.ticket-bar-button span {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.ticket-bar-button:hover {
		border-radius: 4px;
		background: #321d2a;
	}

	.ticket-bar-button-closed {
		width: 203px;
	}
</style>
