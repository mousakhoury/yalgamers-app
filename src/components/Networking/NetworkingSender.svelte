<script>
	import '$lib/assets/css/support-chat.css';
	import Pin from '$lib/assets/sender-pin.svg';
	import dateFormat from '$lib/dateFormat';
	import { getImageUrl } from '$lib/utils';
	import { page } from '$app/stores';

	export let message;
	export let showUserImage = false;

	let userLogo = getImageUrl('users', $page.data.profile.id, $page.data.profile.avatar);

	$: type = !message.media ? 'text' : message.message.split('/')[0];

	let showModal = false; // A reactive variable to control the visibility of the modal
	let selectedImage = ''; // A reactive variable to hold the src of the clicked image

	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

	function openModal(imageSrc) {
		showModal = true;
		selectedImage = imageSrc;
		addNoScroll();
	}

	function closeModal() {
		showModal = false;
		removeNoScroll();
	}

	$: media = getImageUrl('support_ticket_chats', message.id, message.media);

	let imageClass = '';

	$: if (selectedImage) {
		const img = new Image();
		img.onload = () => {
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

<div
	class="flex flex-row-reverse items-start gap-[8px] w-full {showUserImage
		? 'mt-[16px]'
		: 'mt-[8px]'}"
>
	<img
		class="chat-user-image w-[32px] {showUserImage ? 'opacity-100' : 'opacity-0'}"
		src={userLogo}
		alt=""
	/>
	<div class="pr-[8.8px] items-end">
		{#if type === 'text'}
			<div class="p-[8px] lg:p-[12px] w-full max-w-[430px] relative rounded-[8px] bg-[#3d2644]">
				{#if showUserImage}
					<img class="sender-pin" src={Pin} alt="" />
				{/if}

				<div class="flex flex-col items-end w-full gap-[4px]">
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
		class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[51] {imageClass}"
		src={selectedImage}
		alt=""
	/>
{/if}

<style>
	.no-image {
		padding-left: 40px; /* Adjust as needed for smaller gap */
	}
	.large-image {
		width: 75%;
	}
</style>
