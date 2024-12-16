<script>
	import { onMount, afterUpdate } from 'svelte';
	import NetworkingReceiver from '$components/Networking/NetworkingReceiver.svelte';
	import NetworkingSender from '$components/Networking/NetworkingSender.svelte';
	import { chatStore } from '$lib/stores/selectedchat';

	export let myuserid;

	let groupedMessages = {};
	let chatContainer;

	onMount(() => {
		groupMessages();
		scrollToBottom();
	});

	afterUpdate(() => {
		groupMessages();
		maintainScrollPosition();
	});

	function formatDateKey(date) {
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
	}

	function groupMessages() {
		const now = new Date();
		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - 1);

		groupedMessages = $chatStore
			.slice() // Create a shallow copy to avoid mutating the original array
			.sort((a, b) => new Date(a.date) - new Date(b.date)) // Change sorting order (oldest first)
			.reduce((groups, msg) => {
				const date = new Date(msg.created);
				const isToday = date.toDateString() === now.toDateString();
				const isYesterday = date.toDateString() === yesterday.toDateString();

				let key = formatDateKey(date);
				if (isToday) key = 'Today';
				else if (isYesterday) key = 'Yesterday';

				if (!groups[key]) groups[key] = [];
				groups[key].push(msg);

				return groups;
			}, {});
	}

	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	function maintainScrollPosition() {
		// Check if the user is at the bottom
		const atBottom =
			chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
		if (atBottom) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
</script>

<div bind:this={chatContainer} class="chat-container p-[20px] pb-0 bg-[#200B26] networking-chat">
	{#each Object.entries(groupedMessages).reverse() as [dateLabel, messages]}
		<div class="mb-[16px]">
			<div class="flex justify-center w-full">
				<p class="text-[#FFFFFF4D] text-[12px] font-Gilroy leading-[14px]">{dateLabel}</p>
			</div>
			{#each messages as msg, index}
				{#if msg.user == myuserid}
					<NetworkingSender
						message={msg}
						showUserImage={index === 0 || messages[index - 1].user != msg.user}
					/>
				{:else}
					<NetworkingReceiver
						message={msg}
						showUserImage={index === 0 || messages[index - 1].user != msg.user}
					/>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.chat-container {
		display: flex;
		flex-direction: column-reverse; /* Start from the bottom */
		overflow-y: auto; /* Enable scrolling */
		width: 100%;
		height: 100%; /* Set the height as needed */
	}
</style>
