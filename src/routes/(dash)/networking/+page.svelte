<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { page } from '$app/stores';
	import Chat from '$components/Networking/Chat.svelte';
	import ChatImage from '$lib/assets/networking/chat-image.jpeg';
	import { onDestroy, onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import PocketBase from 'pocketbase';
	import { chatStore, selectedChatMembers, selectedChatStore } from '$lib/stores/selectedchat.js';
	import SearchButton from '$lib/assets/networking/search-button.svg';
	import BackButton from '$lib/assets/networking/Arrow - Left.svg';
	import BackArrow from '$lib/assets/networking/Arrow - Left.svg';
	import { toast } from '@zerodevx/svelte-toast';
	import { getImageUrl } from '$lib/utils';

	let chatInfo = false;

	export let data;
	$: chats = data.chats;
	let pb;
	let loadingData = false;

	let openSearch = false;
	let searchTerm = '';

	let supportTicketFloating;

	function checkMobileView() {
		return window.innerWidth <= 768; // Assuming 768px as the breakpoint for mobile view
	}

	onMount(async () => {
		await online();
		supportTicketFloating = document.querySelector('.support-ticket-floating');
		if (supportTicketFloating) {
			supportTicketFloating.style.display = 'none';
		}

		// Set selectedChatStore to null if in mobile view
		if (checkMobileView()) {
			selectedChatStore.set(null);
		} else {
			get_selected_chat(); // Set selected chat from localStorage
		}

		pb = new PocketBase(env.PUBLIC_BASE_URL);
		pb.authStore?.loadFromCookie(document.cookie || '');

		pb.collection('messages').subscribe('*', (e) => {
			switch (e.action) {
				case 'create':
					if (e.record.chat == $selectedChatStore?.id) {
						chatStore.update((u) => [...u, e.record]);
						mark_all_unread(e.record.chat);
					} else {
						const chat_index = chats.findIndex((f) => f.id == e.record.chat);
						if (chat_index != -1) {
							let copy = chats;
							copy[chat_index].unread_msgs += 1;
							chats = copy;
						}
					}
					break;
				default:
					break;
			}
		});
	});

	async function online() {
		for (let index = 0; index < data.chats.length; index++) {
			const chat = data.chats[index];
			await fetch(`/api/online?id=${chat.id}`);
		}
	}

	async function offline() {
		for (let index = 0; index < data.chats.length; index++) {
			const chat = data.chats[index];
			await fetch(`/api/offline?id=${chat.id}`);
		}
	}

	onDestroy(async () => {
		if (pb) {
			pb.collection('messages').unsubscribe('*');
			await offline();
		}
		if (supportTicketFloating) {
			supportTicketFloating.style.display = 'flex';
		}
	});

	async function get_selected_chat() {
		const id = localStorage.getItem('selectedChatId');
		if (id) {
			let item = data.chats.find((f) => f.id == id);
			if (item.unread_msgs > 0) {
				item.unread_msgs = 0;
				mark_all_unread(item);
			}
			await fetchmsgs();
			selectedChatStore.set(item);
		}
	}

	async function mark_all_unread(chatid) {
		const memberid = chats.find((f) => f.id == chatid).member_id;
		let res = await fetch(`/api/mark-msgs-read?id=${memberid}`);
		res = await res.json();
		if (res.ok) {
			const chat_index = chats.findIndex((f) => f.id == chatid);
			if (chat_index != -1) {
				let copy = chats;
				copy[chat_index].unread_msgs = 0;
				chats = copy;
			}
		}
	}

	async function fetchmsgs() {
		loadingData = true;
		let res = await fetch(`/api/get-msgs?id=${$selectedChatStore?.id}`);
		res = await res.json();
		chatStore.set(res.msgs);
		loadingData = false;
	}

	async function set_chat(chat) {
		selectedChatMembers.set([]);
		localStorage.setItem('selectedChatId', chat.id);
		selectedChatStore.set(chat);
		await fetchmsgs();
		loadingData = false;
		chatInfo = false;
		mark_all_unread(chat.id);
		fetchMembers(chat.id);
	}

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const now = new Date();
		const secondsAgo = Math.floor((now - date) / 1000);
		const minutesAgo = Math.floor(secondsAgo / 60);
		const hoursAgo = Math.floor(minutesAgo / 60);

		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - 1);

		const isToday = date.toDateString() === now.toDateString();
		const isYesterday = date.toDateString() === yesterday.toDateString();

		if (isToday) {
			if (secondsAgo < 60) {
				return `${secondsAgo} secs ago`;
			} else if (minutesAgo < 60) {
				return `${minutesAgo} mins ago`;
			} else if (hoursAgo < 24) {
				return `${hoursAgo} hours ago`;
			}
		}

		return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
	}

	async function fetchMembers(chatid) {
		let res = await fetch(`/api/selected-chat-members?id=${chatid}`);
		res = await res.json();
		selectedChatMembers.set(res.list);
	}

	// Filtered chats based on the search term
	$: filteredChats = chats.filter((chat) =>
		chat.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}
</script>

<div
	class="hidden lg:flex items-start gap-[15px] mx-auto mt-[33px] px-[10px] sm:px-[30px] w-full h-[73vh]"
>
	<div
		class="flex flex-col items-start rounded-[12px] border border-[#ffffff14] bg-[#24102A] w-full max-w-[444px] overflow-hidden h-full"
	>
		{#if openSearch}
			<div class="flex items-center gap-[16px] p-[16px] w-full border-b border-[#ffffff0d]">
				<button on:click={() => (openSearch = false)}>
					<img src={BackButton} alt="" class="w-[20px]" />
				</button>

				<label
					for="search"
					class="flex items-center gap-[10px] w-full h-[40px] rounded-[6px] border border-[#FDEB56] bg-[#ffffff0a]"
				>
					<div class="p-[5px] border border-[#ffffff0d] bg-[#ffffff0d]">
						<img src={SearchButton} alt="" class="w-[25px]" />
					</div>
					<input
						type="text"
						class="bg-transparent !border-0 !outline-none text-[#e3e3e3]"
						bind:value={searchTerm}
					/>
				</label>
			</div>
		{:else}
			<div class="flex items-center justify-between w-full p-[16px] border-b border-[#ffffff0d]">
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#FFFFFFCC] text-[18px] font-Gilroy-Medium leading-[22px]">
						{$t('Projects Chat Rooms')}
					</p>
					<p class="text-[#FFFFFF4D] text-[12px] font-Gilroy leading-[14px]">
						{filteredChats.length.toString().padStart(2, '0')}
						{$t('Rooms')}
					</p>
				</div>

				<button on:click={() => (openSearch = true)}>
					<img src={SearchButton} alt="" class="w-[32px]" />
				</button>
			</div>
		{/if}

		<div class="flex flex-col items-start w-full h-full overflow-y-scroll networking-chat">
			{#each filteredChats as chat}
				<button
					on:click={() => set_chat(chat)}
					class="flex items-center justify-between p-[16px] w-full border-b border-[#ffffff0f] hover:bg-[#fdeb560d] {chat.id ==
					$selectedChatStore?.id
						? ' bg-[#fdeb560d] border-l-[3px] border-l-[#FDEB56]'
						: 'bg-[#200b26]'}"
				>
					<div class="flex items-center justify-center gap-[12px]">
						{#if chat.chat_icon}
							<img
								src={getImageUrl(chat.collectionId, chat.id, chat.chat_icon)}
								alt=""
								class="w-[52px] h-[52px] object-cover border border-[#ffffff0d] rounded-full"
							/>
						{:else}
							<img
								src={ChatImage}
								alt=""
								class="w-[52px] h-[52px] object-cover border border-[#ffffff0d] rounded-full"
							/>
						{/if}
						<div class="flex flex-col items-start gap-[4px]">
							<p class="text-[#FFFFFFE5] text-[18px] font-Gilroy-SemiBold leading-[22px]">
								{chat.name}
								{#if chat.online_members && chat.online_members.length > 0}
									<span class="bg-[#1FD03126] text-[#1FD031] w-fit px-2 rounded-full">
										{chat.online_members.length}
										online
									</span>
								{:else}
									<span class="bg-[#FFFFFF0D] text-[#FFFFFF80] w-fit px-2 rounded-full">
										0 online
									</span>
								{/if}
							</p>
							<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Regular leading-[17px]">
								{formatDate(chat.updated)}
							</p>
						</div>
					</div>
					{#if chat.unread_msgs > 0}
						<div class="px-[6px] py-[2px ] rounded-full bg-[#F71756]">
							<p class="text-white text-[13px] font-Gilroy-Medium leading-[16px]">
								{chat.unread_msgs > 99 ? '99+' : chat.unread_msgs.toString().padStart(2, '0')}
							</p>
						</div>
					{/if}
				</button>
			{/each}
			{#each data.locked_chats as chat}
				<button
					on:click={() => errorToast('please complete project quests and claim nft')}
					class="flex items-center justify-between p-[12px] w-full border-b border-[#ffffff0f] hover:bg-[#fdeb560d] bg-[#200b26]"
				>
					<div class="flex items-center justify-center gap-[12px]">
						{#if chat.chat_icon}
							<img
								src={getImageUrl(chat.collectionId, chat.id, chat.chat_icon)}
								alt=""
								class="w-[46px] h-[46px] object-cover border border-[#ffffff0d] rounded-full blur-sm"
							/>
						{:else}
							<img
								src={ChatImage}
								alt=""
								class="w-[46px] h-[46px] object-cover border border-[#ffffff0d] rounded-full blur-sm"
							/>
						{/if}
						<div class="flex flex-col items-start gap-[4px]">
							<p class="text-[#FFFFFF66] text-[16px] font-Gilroy-SemiBold leading-[20px]">
								{chat.name}
							</p>
							<p class="text-[#FFFFFF66] text-[12px] font-Gilroy-Regular leading-[14px]">
								{formatDate(chat.updated)}
							</p>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
	<div class="rounded-[12px] border border-[#ffffff0d] bg-[#24102A] w-full h-full overflow-hidden">
		{#if $selectedChatStore}
			<Chat chat={$selectedChatStore} {loadingData} bind:chatInfo />
		{:else}
			<div class="flex items-center justify-center w-full h-full">
				<p class="text-white text-4xl text-center">{$t('no chat selected')}</p>
			</div>
		{/if}
	</div>
</div>

<div class="flex lg:hidden items-start gap-[15px] mx-auto mt-[16px] px-[16px] w-full h-[81vh]">
	{#if $selectedChatStore}
		<div class="flex flex-col items-start gap-[16px] w-full h-full">
			<button on:click={() => ($selectedChatStore = null)} class="flex items-center gap-[6px]">
				<img src={BackArrow} alt="" class="w-[18px]" />
				<p
					class="text-[#D4CFD6] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
				>
					Back
				</p>
			</button>
			<div
				class="rounded-[12px] border border-[#ffffff0d] bg-[#24102A] w-full h-full overflow-hidden"
			>
				<Chat chat={$selectedChatStore} {loadingData} bind:chatInfo />
			</div>
		</div>
	{:else}
		<div
			class="flex flex-col items-start rounded-[12px] border border-[#ffffff14] bg-[#24102A] w-full max-w-[444px] overflow-hidden h-full"
		>
			{#if openSearch}
				<div class="flex items-center gap-[16px] p-[12px] w-full border-b border-[#ffffff0d]">
					<button on:click={() => (openSearch = false)}>
						<img src={BackButton} alt="" class="w-[20px]" />
					</button>

					<label
						for="search"
						class="flex items-center gap-[10px] w-full h-[35px] rounded-[6px] border border-[#FDEB56] bg-[#ffffff0a]"
					>
						<div class="p-[5px] border border-[#ffffff0d] bg-[#ffffff0d]">
							<img src={SearchButton} alt="" class="w-[25px]" />
						</div>
						<input
							type="text"
							class="bg-transparent !border-0 !outline-none text-[#e3e3e3]"
							bind:value={searchTerm}
						/>
					</label>
				</div>
			{:else}
				<div class="flex items-center justify-between w-full p-[12px] border-b border-[#ffffff0d]">
					<div class="flex flex-col items-start gap-[4px]">
						<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium leading-[19px]">
							{$t('Projects Chat Rooms')}
						</p>
						<p class="text-[#FFFFFF4D] text-[10px] font-Gilroy leading-[12px]">
							{filteredChats.length.toString().padStart(2, '0')}
							{$t('Rooms')}
						</p>
					</div>

					<button on:click={() => (openSearch = true)}>
						<img src={SearchButton} alt="" class="w-[28px]" />
					</button>
				</div>
			{/if}

			<div class="flex flex-col items-start w-full h-full overflow-y-scroll networking-chat">
				{#each filteredChats as chat}
					<button
						on:click={() => set_chat(chat)}
						class="flex items-center justify-between p-[12px] w-full border-b border-[#ffffff0f] hover:bg-[#fdeb560d] bg-[#200b26]"
					>
						<div class="flex items-center justify-center gap-[12px]">
							<img
								src={ChatImage}
								alt=""
								class="w-[46px] h-[46px] object-cover border border-[#ffffff0d] rounded-full"
							/>
							<div class="flex flex-col items-start gap-[4px]">
								<p class="text-[#FFFFFFE5] text-[16px] font-Gilroy-SemiBold leading-[20px]">
									{chat.name}
								</p>
								<p class="text-[#FFFFFF66] text-[12px] font-Gilroy-Regular leading-[14px]">
									{formatDate(chat.updated)}
								</p>
							</div>
						</div>
						{#if chat.unread_msgs > 0}
							<div class="px-[6px] py-[2px] rounded-full bg-[#F71756]">
								<p class="text-white text-[12px] font-Gilroy-Medium leading-[15px]">
									{chat.unread_msgs > 99 ? '99+' : chat.unread_msgs.toString().padStart(2, '0')}
								</p>
							</div>
						{/if}
					</button>
				{/each}
				{#each data.locked_chats as chat}
					<button
						on:click={() => errorToast('please complete project quests and claim nft')}
						class="flex items-center justify-between p-[12px] w-full border-b border-[#ffffff0f] hover:bg-[#fdeb560d] bg-[#200b26]"
					>
						<div class="flex items-center justify-center gap-[12px]">
							<img
								src={ChatImage}
								alt=""
								class="w-[46px] h-[46px] object-cover border border-[#ffffff0d] rounded-full"
							/>
							<div class="flex flex-col items-start gap-[4px]">
								<p class="text-[#FFFFFFE5] text-[16px] font-Gilroy-SemiBold leading-[20px]">
									{chat.name}
								</p>
								<p class="text-[#FFFFFF66] text-[12px] font-Gilroy-Regular leading-[14px]">
									{formatDate(chat.updated)}
								</p>
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
