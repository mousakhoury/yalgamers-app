<script>
	import { t, locale } from '$lib/stores/i18n';
	import chat from '$lib/assets/ticket-chat-icon.svg';
	import screenshot from '$lib/assets/Rectangle-40099.png';
	import date from '$lib/assets/ticket-date.svg';
	import dateFormat from '$lib/dateFormat';

	export let ticket;
	export let onSelect;
	export let closeTicketsHandler;

	// console.log(ticket);

	function formatDate(dateString) {
		const dateObject = new Date(dateString);
		return dateObject.toLocaleDateString($locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<div class="ticket-bar">
	<div class="ticket-bar-info">
		{#if ticket?.media}
			<img class="screenshot" src={ticket?.media} alt="Ticket Screenshot" />
		{/if}
		<button class="bar-texts" on:click={() => onSelect(ticket)}>
			<h6>{ticket.title}</h6>
			<div class="date">
				<p>{$t('created on')} {formatDate(ticket.created)}</p>
				{#if ticket?.updates ?? 0 !== 0}
					<span>
						<img src={date} alt="" />
						<p>{ticket?.updates} New {ticket?.updates === 1 ? 'Update' : 'Updates'}</p>
					</span>
				{/if}
			</div>
		</button>
	</div>
	{#if ticket.status === 'OPEN'}
		<a
			href={`/support-tickets/${ticket.id}`}
			class="ticket-bar-button"
			on:click={closeTicketsHandler}
		>
			<img src={chat} alt="" />
			<span>{$t('Chat')}</span>
		</a>
	{:else}
		<a
			href={`/support-tickets/${ticket.id}`}
			class="ticket-bar-button ticket-bar-button-closed"
			on:click={closeTicketsHandler}
		>
			<img src={chat} alt="" class="grayscale brightness-75" />
			<span class="!text-[#948798]">{$t('View Previews Chat')}</span>
		</a>
	{/if}
</div>

<style>
	.ticket-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		width: 100%;
		border-radius: 6px;
		border: 1px solid #27152c;
		background: #1c0921;
	}

	.ticket-bar:hover {
		border: 1px solid #432d49;
		background: #230d29;
	}

	.ticket-bar-info {
		display: flex;
		width: 485px;
		gap: 20px;
		align-items: center;
		flex-shrink: 0;
	}

	.screenshot {
		width: 60px;
		height: 60px;
		border-radius: 4px;
	}

	.bar-texts {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		flex-shrink: 0;

		cursor: pointer;
	}

	.bar-texts h6 {
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.date {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.date p {
		color: var(--white-40, #7e6e83);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.date span {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.date span p {
		color: var(--Positive, #1fd031);
	}

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

	.ticket-bar-button-closed:lang(ar) {
		width: 214px;
	}

	@media (max-width: 800px) {
		.ticket-bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 16px;
		}
		.ticket-bar-info {
			width: fit-content;
			gap: 12px;
			align-items: flex-start;
		}
		.ticket-bar-button {
			width: 100%;
			justify-content: center;
			border-radius: 4px;
			background: #321d2a;
		}
		.date {
			align-items: flex-start;
			gap: 7px;
			flex-direction: column;
		}

		.bar-texts h6 {
			width: 222px;
			font-size: 16px;
		}

		.date p {
			font-size: 14px;
		}
	}
</style>
