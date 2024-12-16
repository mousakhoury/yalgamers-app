<script>
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';
	import Pin from '$lib/assets/sender-pin.svg';
	import Support from '$lib/assets/suppot-image.svg';
	import dateFormat from '$lib/dateFormat';
	import { getImageUrl } from '$lib/utils';

	export let ticket;

	let userLogo = getImageUrl('users', ticket.expand.user.id, ticket.expand.user?.avatar);

	$: media = getImageUrl('support_tickets', ticket.id, ticket.file);

	// $: type = !message.media ? 'text' : message.message.split('/')[0];

	// $: media = getImageUrl('support_ticket_chats', message.id, message.media);

	function formatDate(dateString) {
		const options = { day: '2-digit', month: 'long', year: 'numeric' };
		const date = new Date(dateString);
		return `${$t('created on')} ${new Intl.DateTimeFormat(
			$locale === 'ar' ? 'ar' : 'en-US',
			options
		).format(date)}`;
	}
</script>

<div class="sender-container mt-[20px]">
	<img class="chat-user-image" src={userLogo} alt="" />
	<div class="chat-message-container pr-[8.8px] items-end">
		<!-- {#if type === 'text'} -->
		<div class="chat-message">
			<img class="sender-pin" src={Pin} alt="" />
			<p class="text-[#FDEB56] text-[16px] font-Gilroy-Medium mb-[10px]">{$t('FirstMessage')}</p>
			<div class="w-full p-[10px] bg-[#311d36] rounded-[3px] flex items-start gap-[20px]">
				{#if ticket.file}
					<img src={media} alt="" class="w-[60px] h-[60px] object-fit" />
				{/if}
				<div class="w-full flex flex-col items-start gap-[8px]">
					<p class="text-[#D4CFD6] text-[18px] font-Gilroy-Medium">
						{ticket.title}
					</p>
					<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">{formatDate(ticket.created)}</p>
				</div>
			</div>
		</div>
		<div class="chat-message">
			<p class="text-[#E9E6EA] text-[16px] font-Gilroy-Medium">
				{ticket.description}
			</p>
		</div>

		<div class="chat-date">{dateFormat(new Date(ticket.created.replace('T', ' ')))}</div>
		<!-- {/if} -->
	</div>
</div>

<!-- {#if showModal}
	<div class="fixed w-full h-full top-0 left-0 bg-[#00000052] z-50" on:click={closeModal} />
	<img
		class="fixed top-[50%] left-[50%] translateX-[-50%] translateY-[-50%] z-[51]"
		src={selectedImage}
		alt=""
	/>
{/if} -->
