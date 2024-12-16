<script>
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';
	import Pin from '$lib/assets/Receiver-pin.svg';
	import Support from '$lib/assets/suppot-image.svg';
	import dateFormat from '$lib/dateFormat';

	export let ticket;

	function formatDate(dateString) {
		const options = { day: '2-digit', month: 'long', year: 'numeric' };
		const date = new Date(dateString);
		return `Created on ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
	}
</script>

<div class="receiver-container">
	<img class="chat-user-image" src={Support} alt="" />
	<div class="chat-message-container pl-[8.8px]">
		<div class="chat-message">
			<img class="receiver-pin" src={Pin} alt="" />
			{$t('FirstReceive')}
		</div>

		<div class="chat-date">{dateFormat(new Date(ticket.created.replace('T', ' ')))}</div>
	</div>
</div>
