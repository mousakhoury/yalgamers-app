<script>
	import '$lib/assets/css/support-chat.css';

	import { onMount, onDestroy } from 'svelte';
	import Pin from '$lib/assets/Receiver-pin.svg';
	import Support from '$lib/assets/suppot-image.svg';
	import dateFormat from '$lib/dateFormat';
	import { getImageUrl } from '$lib/utils';
	import { goto } from '$app/navigation';

	export let message;
	export let showUserImage = false;

	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

	let userLogo = getImageUrl('users', message.data.id, message.data.avatar);

	$: type = !message.media ? 'text' : message.message.split('/')[0];

	let showModal = false; // A reactive variable to control the visibility of the modal
	let selectedImage = ''; // A reactive variable to hold the src of the clicked image

	// Function to open the modal with the selected image
	function openModal(imageSrc) {
		showModal = true;
		selectedImage = imageSrc;
		addNoScroll();
	}

	// Function to close the modal
	function closeModal() {
		showModal = false;
		removeNoScroll();
	}

	// onMount(addNoScroll);
	// onDestroy(removeNoScroll);

	$: media = getImageUrl('support_ticket_chats', message.id, message.media);

	let imageClass = ''; // Holds the class name based on image width

	// When selectedImage changes, create an Image object to check dimensions
	$: if (selectedImage) {
		const img = new Image();
		img.onload = () => {
			// Check if the image width is greater than 1500
			imageClass = img.width > 1500 ? 'large-image' : '';
		};
		img.src = selectedImage;
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
</script>

<div class="receiver-container {showUserImage ? 'mt-[16px]' : 'mt-[8px]'}">
	<a href={`/${message.data.username}`}>
		<img
			class="chat-user-image cursor-pointer {showUserImage ? 'opacity-100' : 'opacity-0'}"
			src={userLogo}
			alt=""
		/>
	</a>
	<div class="chat-message-container pl-[8.8px]">
		{#if type === 'text'}
			<div class="chat-message">
				{#if showUserImage}
					<img class="receiver-pin" src={Pin} alt="" />
				{/if}
				<div class="flex flex-col items-start gap-[8px] w-full">
					{#if showUserImage}
						<p
							class="text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px] w-full border-b border-[#FFFFFF0D] pb-[8px]"
						>
							{message.data.username}
						</p>
					{/if}

					<div class="flex flex-col items-start w-full gap-[4px]">
						<p
							class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium leading-[17px] lg:leading-[22px]"
						>
							{message.msg}
						</p>
						<p
							class="text-[#FFFFFF4D] text-[11px] lg:text-[12px] font-Gilroy leading-[13px] lg:leading-[14px]"
						>
							<!-- {dateFormat(new Date(message.created.replace('T', ' ')))} -->

							{formatDate(message.created)}
						</p>
					</div>
				</div>
			</div>
		{:else if type === 'image'}
			<img class="chat-message-image" src={media} alt="" on:click={() => openModal(media)} />
		{:else if type === 'video'}
			<video class="chat-message-image" controls>
				<source src={media} type="video/mp4" />
				Your browser does not support HTML video.
			</video>
		{/if}
	</div>
</div>

{#if showModal}
	<div class="fixed w-full h-full top-0 left-0 bg-[#00000052] z-50" on:click={closeModal} />
	<img
		class="fixed top-[50%] left-[50%] translate-x-[-50%] w-[75%] translate-y-[-50%] z-[51] {imageClass}"
		src={selectedImage}
		alt=""
	/>
{/if}
