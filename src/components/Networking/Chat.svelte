<script>
	import { t, locale } from '$lib/stores/i18n';
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import ChatHead from '$components/Networking/ChatHead.svelte';
	import SelectImage from '$lib/assets/select-image-chat.svg';
	import Send from '$lib/assets/send-button-icon.svg';
	import Emojis from '$lib/assets/networking/emojies-button.svg';
	import { enhance } from '$app/forms';
	import ChatBody from './ChatBody.svelte';
	import ChatInfo from './ChatInfo.svelte';
	import { page } from '$app/stores';
	import { selectedChatMembers } from '$lib/stores/selectedchat';

	export let chat;
	let text = '';
	export let loadingData = false;
	let msgSending = false;
	let myuserid = $page.data.profile.id;
	let showEmojiPicker = false;
	export let chatInfo = false;
	let isInputActive = false; // Track if the input is active on mobile

	let chatContainer;
	let messageInput;
	let EmojiPicker;

	onMount(async () => {
		fetchMembers();
		if (typeof window !== 'undefined') {
			EmojiPicker = await import('emoji-picker-element');
		}

		document.addEventListener('click', handleClickOutside);
		handleInputFocus();
	});

	async function fetchMembers() {
		let res = await fetch(`/api/selected-chat-members?id=${chat.id}`);
		res = await res.json();
		selectedChatMembers.set(res.list);
	}

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});

	function isMobileDevice() {
		return window.innerWidth <= 768; // Considered mobile if width <= 768px
	}

	function handleInputFocus() {
		if (!isMobileDevice()) {
			focusInput(); // On desktop, keep input focused
		}
	}

	function focusInput() {
		if (messageInput) {
			messageInput.focus();
			isInputActive = true; // Mark input as active
		}
	}

	function addEmoji(event) {
		const emoji = event.detail.unicode;
		text += emoji;
		showEmojiPicker = false;
	}

	function handleClickOutside(event) {
		if (showEmojiPicker && !event.target.closest('.emoji-picker, .emoji-button')) {
			showEmojiPicker = false;
		}
	}

	function handleFocus() {
		if (isMobileDevice()) {
			isInputActive = true; // On mobile, mark input as active on focus
		}
	}

	function handleBlur() {
		if (isMobileDevice()) {
			isInputActive = false; // On mobile, mark input as inactive on blur
		} else {
			focusInput(); // Refocus input on desktop
		}
	}

	afterUpdate(() => {
		handleInputFocus(); // Ensure input is focused after updates
		scrollToBottom();
	});

	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
</script>

{#if chatInfo}
	<ChatInfo {chat} bind:chatInfo />
{:else}
	<div class="flex flex-col items-start justify-between text-white w-full h-full">
		<ChatHead title={chat.name} members={chat.members} bind:chatInfo />

		{#if loadingData}
			<div class="flex items-center justify-center w-full h-full">
				<p>loading...</p>
			</div>
		{:else}
			<ChatBody {myuserid} {chatContainer} />
		{/if}

		<form
			method="post"
			action="?/send_msg"
			class="w-full bg-[#200B26]"
			use:enhance={({ formData }) => {
				formData.append('chat', chat.id);
				msgSending = true;
				return ({ update }) => {
					msgSending = false;
					update();
				};
			}}
		>
			<div
				class="flex items-center gap-[8px] lg:gap-[16px] p-[12px] lg:p-[16px] border-t border-[#2b1731] w-full relative"
			>
				{#if !(isMobileDevice() && isInputActive)}
					<label for="file-upload" class="file-upload w-full max-w-[42px] lg:max-w-[45px]">
						<img src={SelectImage} alt="" class="w-full max-w-[42px] lg:max-w-[45px]" />
						<input type="file" id="file-upload" accept="image/*,video/*" name="file" hidden />
					</label>

					<button
						type="button"
						on:click={() => (showEmojiPicker = !showEmojiPicker)}
						class="emoji-button w-full max-w-[42px] lg:max-w-[45px]"
					>
						<img src={Emojis} alt="" class="w-full max-w-[42px] lg:max-w-[45px]" />
					</button>
				{/if}

				{#if showEmojiPicker}
					<emoji-picker
						on:emoji-click={addEmoji}
						class="emoji-picker absolute bottom-[67px] lg:bottom-[80px] left-[50%] lg:left-[69px] translate-x-[-50%] lg:translate-x-0 w-full lg:w-auto"
					/>
				{/if}

				<div class="chat-input-container h-[42px] lg:h-[45px] !items-center !justify-between">
					<input
						type="text"
						name="msg"
						id="text"
						placeholder={$locale == 'ar' ? 'اكتب هنا...' : 'Type here...'}
						bind:this={messageInput}
						bind:value={text}
						class="text-[16px] font-Gilroy-Medium !w-[88%]"
						on:focus={handleFocus}
						on:blur={handleBlur}
					/>

					{#if isMobileDevice() && isInputActive}
						<button disabled={msgSending} class="send-button justify-center py-[4px]" type="submit">
							{#if msgSending}
								<p>{$locale == 'ar' ? 'يتم الأرسال...' : 'sending...'}</p>
							{:else}
								<p>{$locale == 'ar' ? 'إرسال' : 'Send'}</p>
							{/if}
							<img src={Send} alt="" class="w-[20px] p-[2px]" />
						</button>
					{/if}

					{#if !isMobileDevice()}
						<button disabled={msgSending} class="send-button justify-center py-[4px]" type="submit">
							{#if msgSending}
								<p>{$locale == 'ar' ? 'يتم الأرسال...' : 'sending...'}</p>
							{:else}
								<p>{$locale == 'ar' ? 'إرسال' : 'Send'}</p>
							{/if}
							<img src={Send} alt="" class="w-[20px] p-[2px]" />
						</button>
					{/if}
				</div>
			</div>
		</form>
	</div>
{/if}

<style>
	/* Add any custom styles here */
</style>
