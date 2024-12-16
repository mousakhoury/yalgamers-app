<script>
	// @ts-nocheck

	import { onMount, onDestroy } from 'svelte';
	import Pin from '$lib/assets/Receiver-pin.svg';
	import Support from '$lib/assets/suppot-image.svg';
	import dateFormat from '$lib/dateFormat';
	import { getImageUrl } from '$lib/utils';

	export let message;

	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

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
</script>

<div class="receiver-container">
	<img class="chat-user-image" src={Support} alt="" />
	<div class="chat-message-container pl-[8.8px]">
		{#if type === 'text'}
			<div class="chat-message">
				<img class="receiver-pin" src={Pin} alt="" />
				{message.message}
			</div>
		{:else if type === 'image'}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<img class="chat-message-image" src={media} alt="" on:click={() => openModal(media)} />
		{:else if type === 'video'}
			<!-- svelte-ignore a11y-media-has-caption -->
			<video class="chat-message-image" controls>
				<source src={media} type="video/mp4" />
				Your browser does not support HTML video.
			</video>
		{/if}

		<div class="chat-date">{dateFormat(new Date(message.created.replace('T', ' ')))}</div>
	</div>
</div>

{#if showModal}
	<button class="fixed w-full h-full top-0 left-0 bg-[#00000095] z-[60]" on:click={closeModal} />
	<img
		class="fixed top-[50%] left-[50%] translate-x-[-50%] w-[75%] translate-y-[-50%] z-[61] {imageClass}"
		src={selectedImage}
		alt=""
	/>
{/if}
