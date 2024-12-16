<script>
	// @ts-nocheck
	import ChatFirstReceive from './ChatFirstReceive.svelte';
	import { t, locale } from '$lib/stores/i18n';
	import ChatReceiver from './ChatReceiver.svelte';
	import Support from '$lib/assets/suppot-image.svg';
	import SelectImage from '$lib/assets/select-image-chat.svg';
	import Send from '$lib/assets/send-button-icon.svg';
	import CloseUnhover from '$lib/assets/close-ticket-unhover.svg';
	import CloseHover from '$lib/assets/close-ticket-hover.svg';
	import { browser } from '$app/environment';
	import { onDestroy, onMount, tick } from 'svelte';
	import ChatSender from './ChatSender.svelte';
	import { user } from '$lib/stores/user';
	import { invalidateAll } from '$app/navigation';
	import ChatFIrstMessage from './ChatFIrstMessage.svelte';

	export let ticket;
	export let openCloseTicketHandler;

	let messages = [];
	let chatUpdateLock = false;
	let messageInput;
	let selectedMedia = null;

	// Function to focus on the input
	function focusOnInput() {
		if (messageInput) {
			messageInput.focus();
		}
	}

	function handleGlobalClick(event) {
		const isClickInsideIgnoredElement = event.target.closest(
			'.main-header, button, a, create-ticket-mini, .file-upload, input, textarea, .ticket-card-container'
		);
		if (event.target === messageInput || isClickInsideIgnoredElement) {
			return;
		}
		event.preventDefault();
		focusOnInput();
	}

	function handleWindowFocus() {
		focusOnInput();
	}

	const updateMessages = async () => {
		const oldCount = messages.length;
		chatUpdateLock = true;
		const res = await fetch(`/api/support_tickets/${ticket.id}/chat`);
		messages = await res.json();
		if (oldCount !== messages.length) scrollToBottom();
		if (ticket.manager === '') {
			setTimeout(invalidateAll, 200);
		}
		chatUpdateLock = false;
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		const data = new FormData(e.target);
		if (selectedMedia) {
			data.append('media', selectedMedia);
		}
		const res = await fetch(`/api/support_tickets/${ticket.id}/chat`, {
			method: 'POST',
			body: data
		});

		if (!res.ok) return;

		e.target.reset();
		selectedMedia = null; // Reset selected media after sending
		updateMessages();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			selectedMedia = file;
		} else {
			selectedMedia = null;
		}
	};

	let updateMessagesInterval = null;
	onMount(() => {
		if (!browser) return;
		focusOnInput();
		window.addEventListener('focus', handleWindowFocus);
		window.addEventListener('click', handleGlobalClick);
		if (!browser) return;
		updateMessages();

		updateMessagesInterval = setInterval(() => {
			if (chatUpdateLock) return;
			updateMessages();
		}, 3000);
	});

	onDestroy(() => {
		if (!browser) return;
		clearInterval(updateMessagesInterval);
		focusOnInput();
		window.removeEventListener('focus', handleWindowFocus);
		window.removeEventListener('click', handleGlobalClick);
	});
</script>

<div class={`chat-box-container ${ticket.status === 'RESOLVED' && '!h-[642px]'}`}>
	<div
		class={`flex items-center justify-between w-full ${
			$locale == 'ar' ? 'pl-[20px]' : 'pr-[20px]'
		} `}
	>
		<div class="chat-box-head">
			<img src={Support} alt="" />
			<div class="chat-support-info">
				<h5>{$locale == 'ar' ? 'وكيل دعم العملاء' : 'Customer Support Agent'}</h5>
				<p>{$locale == 'ar' ? 'يالغيمرز' : 'Yalgamers'}</p>
			</div>
		</div>
		{#if ticket.status === 'RESOLVED'}
			<p class="text-[#1FD031] text-[18px] font-Gilroy-SemiBold">
				{$locale == 'ar' ? 'التذكرة مغلقة بالفعل' : 'Ticket Already Closed'}
			</p>
		{:else}
			<div class="your-ticket-buttons !w-[157px]">
				<button class="ticket-close-button" on:click={openCloseTicketHandler}>
					<img src={CloseUnhover} class="close-ticket-unhover" alt="" />
					<img src={CloseHover} class="close-ticket-hover" alt="" />
					<p>{$locale == 'ar' ? 'إغلاق التذكرة' : 'Close Ticket'}</p>
				</button>
			</div>
		{/if}
	</div>

	<div class="chat-box-body">
		{#each messages as message}
			{#if message.user === $user.id}
				<ChatSender {message} />
			{:else}
				<ChatReceiver {message} />
			{/if}
		{/each}
		<ChatFirstReceive {ticket} />
		<ChatFIrstMessage {ticket} />
	</div>

	{#if ticket.status === 'RESOLVED'}
		<div class="bg-[#f717561a] w-full p-[10px] rounded-b-[12px]">
			<p class="text-[#F71756] text-[16px] text-center font-Gilroy-SemiBold">
				{$locale == 'ar'
					? 'لا يمكنك الدردشة بعد الآن هذه التذكرة مغلقة'
					: 'You can’t chat anymore on this closed ticket.'}
			</p>
		</div>
	{:else}
		<form on:submit={sendMessage}>
			<div class="chat-box-footer">
				<label for="file-upload" class="file-upload w-full max-w-[47px] h-[47px]">
					{#if selectedMedia}
						{#if selectedMedia.type.startsWith('image/')}
							<img
								src={URL.createObjectURL(selectedMedia)}
								alt="Selected Media"
								class="w-[47px] h-[47px]"
							/>
						{:else if selectedMedia.type.startsWith('video/')}
							<video src={URL.createObjectURL(selectedMedia)} controls />
						{/if}
					{:else}
						<img src={SelectImage} alt="" class="w-full max-w-[47px] h-[47px] object-contain" />
					{/if}
					<input
						type="file"
						id="file-upload"
						accept="image/*,video/*"
						name="media"
						hidden
						on:change={handleFileChange}
					/>
				</label>

				<div class="chat-input-container">
					<input
						type="text"
						name="message"
						id="text"
						placeholder={$locale == 'ar' ? 'اكتب هنا...' : 'Type here...'}
						bind:this={messageInput}
					/>

					<button class="send-button" type="submit">
						<p>{$locale == 'ar' ? 'إرسال' : 'Send'}</p>
						<img src={Send} alt="" />
					</button>
				</div>
			</div>
		</form>
	{/if}
</div>
