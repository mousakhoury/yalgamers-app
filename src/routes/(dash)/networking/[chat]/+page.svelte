<script>
	// @ts-nocheck

	import '$lib/assets/css/support-chat.css';

	import { t, locale } from '$lib/stores/i18n';
	import NetworkingReceiver from '$components/Networking/NetworkingReceiver.svelte';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import PocketBase from 'pocketbase';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import ChatHead from '$components/Networking/ChatHead.svelte';
	import NetworkingSender from '$components/Networking/NetworkingSender.svelte';
	import SelectImage from '$lib/assets/select-image-chat.svg';
	import Send from '$lib/assets/send-button-icon.svg';

	export let data;
	let msgList = [];
	let text = '';
	let loadingData = true;
	let msgSending = false;
	let pb;
	let myuserid = $page.data.profile.id;

	// References to elements
	let chatContainer;
	let messageInput;

	onMount(async () => {
		await fetchmsgs();
		loadingData = false;

		pb = new PocketBase(env.PUBLIC_BASE_URL);
		pb.authStore?.loadFromCookie(document.cookie || '');

		pb.collection('messages').subscribe('*', (e) => {
			switch (e.action) {
				case 'create':
					if (e.record.chat == $page.params.chat) {
						msgList = [...msgList, e.record];
					}
					break;
				default:
					break;
			}
		});

		// Scroll to the bottom and focus the input after messages are fetched
		scrollToBottom();
		focusInput();
	});

	// Scroll to the bottom and focus the input after each update
	afterUpdate(() => {
		scrollToBottom();
		focusInput();
	});

	onDestroy(() => {
		if (pb) {
			pb.collection('messages').unsubscribe('*');
		}
	});

	async function fetchmsgs() {
		let res = await fetch(`/api/get-msgs?id=${$page.params.chat}`);
		res = await res.json();
		msgList = res.msgs;
	}

	async function send() {
		msgSending = true;
		let res = await fetch(`/api/send-msg`, {
			method: 'POST',
			body: JSON.stringify({
				chat: $page.params.chat,
				msg: text
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		res = await res.json();
		if (!res.ok) {
			alert('server error');
		} else {
			text = '';
		}
		msgSending = false;
	}

	// Function to scroll to the bottom of the chat container
	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	// Function to focus the input element
	function focusInput() {
		if (messageInput) {
			messageInput.focus();
		}
	}
</script>

<div class="flex flex-col items-start justify-between text-white w-full h-full">
	<ChatHead {data} />

	{#if loadingData}
		<div class="flex items-center justify-center w-full h-full">
			<h1>loading</h1>
		</div>
	{:else}
		<div
			class="flex flex-col gap-[16px] px-[20px] overflow-y-scroll w-full h-full"
			bind:this={chatContainer}
		>
			{#each msgList as msg}
				{#if msg.user == myuserid}
					<NetworkingSender message={msg} />
				{:else}
					<NetworkingReceiver message={msg} />
				{/if}
			{/each}
		</div>
	{/if}

	<form on:submit|preventDefault={send} class="w-full">
		<div class="chat-box-footer w-full">
			<label for="file-upload" class="file-upload">
				<img src={SelectImage} alt="" />
				<input type="file" id="file-upload" accept="image/*,video/*" name="media" hidden />
			</label>

			<div class="chat-input-container">
				<input
					type="text"
					name="message"
					id="text"
					placeholder={$locale == 'ar' ? 'اكتب هنا...' : 'Type here...'}
					bind:value={text}
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							send();
						}
					}}
					bind:this={messageInput}
				/>

				<button disabled={msgSending} class="send-button" type="submit">
					{#if msgSending}
						<p>{$locale == 'ar' ? 'يتم الأرسال...' : 'sending...'}</p>
					{:else}
						<p>{$locale == 'ar' ? 'إرسال' : 'Send'}</p>
					{/if}
					<img src={Send} alt="" />
				</button>
			</div>
		</div>
	</form>
</div>
