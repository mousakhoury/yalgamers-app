<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import addPhoto from '$lib/assets/add-photo.svg';
	import Button from '$components/Button.svelte';
	import closeIcon from '$lib/assets/close.svg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { page, updated } from '$app/stores';
	let imageUpload;
	let uploadedImage;
	let dragAndDropCont;
	let dragEnter = false;

	export let data;
	function handleImageUpload(e) {
		const image = e.target?.files?.[0];
		if (!image) return;
		// URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
		uploadedImage = URL.createObjectURL(image);
	}
	function dragEnterHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		dragEnter = true;
	}
	function dragLeaveHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		dragEnter = false;
	}
	function dropHandler(e) {
		e.preventDefault();
		e.stopPropagation();
		dragEnter = false;
		const image = e.dataTransfer?.files?.[0];
		uploadedImage = URL.createObjectURL(image);
	}

	const handleSucces = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				goto($page.url.pathname.replace('/proof', '/watch'));
			}
		};
	};
	onMount(() => {
		if (browser) {
			dragAndDropCont.addEventListener('dragenter', dragEnterHandler, false);
			dragAndDropCont.addEventListener('dragover', dragEnterHandler, false);
			dragAndDropCont.addEventListener('dragleave', dragLeaveHandler, false);
			dragAndDropCont.addEventListener('drop', dropHandler, false);

			return () => {
				dragAndDropCont.removeEventListener('dragenter', dragEnterHandler);
				dragAndDropCont.removeEventListener('dragenter', dragEnterHandler);
				dragAndDropCont.removeEventListener('dragleave', dragLeaveHandler);
			};
		}
	});
</script>

<form method="POST" enctype="multipart/form-data" use:enhance={handleSucces}>
	<div class="rounded-2xl p-5 w-full bg-accent-2 mt-5 h-[400px]" class:bg-white-30={dragEnter}>
		<div
			class="border-dashed h-full relative overflow-hidden border-accent-yellow py-16 rounded-xl border flex justify-center items-center flex-col gap-[30px]"
			bind:this={dragAndDropCont}
		>
			<input
				type="file"
				hidden
				name="proof"
				accept="image/*"
				on:change={handleImageUpload}
				class="hidden"
				bind:this={imageUpload}
				required
			/>
			{#if uploadedImage}
				<button
					class="absolute z-20 flex items-center justify-center w-10 h-10 rounded-full top-3 right-3 padding-3 bg-white-40"
					on:click={() => (uploadedImage = null)}
					><img class="" src={closeIcon} height="24px" width="24px" alt="close icon" /></button
				>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="object-contain w-full h-full pointer-events-none"
					src={uploadedImage}
					alt="add photo"
				/>
			{:else}
				<div class="flex flex-col items-center justify-center">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={addPhoto} alt="photo image" width="60px" height="60px" />
					<p
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-2xl not-italic font-normal text-accent-yellow font-Gilroy-SemiBold"
					>
						{$t('dragorDrop')}
					</p>
				</div>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-lg not-italic font-normal font-Gilroy-SemiBold text-white-40"
				>
					or
				</p>
				<Button
					type="transparent"
					on:click={() => {
						imageUpload.click();
					}}
				>
					{$t('uploadPhoto')}</Button
				>
			{/if}
		</div>
	</div>
	<div class="flex items-center justify-center mt-10">
		<Button type="gradient">{$t('submit')}</Button>
	</div>
</form>
