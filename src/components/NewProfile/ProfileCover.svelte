<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import LoadingPopup from './../NewLogin/LoadingPopup.svelte';
	import CoverPlaceholder from '$lib/assets/profile/cover-placeholder.svg';
	import CoverMenu from '$lib/assets/profile/cover-menu.svg';
	import UploadImage from '$lib/assets/profile/upload-image.svg';
	import SwitchImage from '$lib/assets/profile/switch-image.svg';
	import CloseButton from '$lib/assets/profile/close-button.svg';
	import ProfileCoverCroppieModal from './ProfileCoverCroppieModal.svelte';
	import { enhance } from '$app/forms';

	export let coverUrl;
	let showCropModal = false;
	let rawImage;
	let croppedImage;
	let showButtons = false;

	let showLoading = false; // State to show/hide the loading popup
	let progress = 0;

	// Function to handle image upload and trigger Croppie modal
	function handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				rawImage = e.target.result;
				showCropModal = true;
				showButtons = false;
			};
			reader.readAsDataURL(file);
		} else {
			console.error('No file selected.'); // Handle case when no file is selected
		}
	}

	async function getImageBlob(imageUrl) {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		return blob;
	}

	// Function to handle cropping result
	function handleCrop(cropped) {
		if (cropped) {
			croppedImage = cropped;
			clickOnHiddenUploadBtn();
		}
		showCropModal = false;
	}

	function startUploadSimulation() {
		showLoading = true;

		progress = 0;
		const interval = setInterval(() => {
			progress += 5;
			if (progress >= 100) {
				clearInterval(interval);
				showLoading = false; // Hide the loading popup when done
			}
		}, 100); // Adjust the interval speed as needed
	}

	function clickOnHiddenUploadBtn() {
		let btn = document.getElementById('uploadcover');
		if (btn) {
			btn.click();
		}
	}
</script>

<div class="relative w-full">
	{#if croppedImage}
		<img
			src={croppedImage}
			alt=""
			class="w-full h-[140px] md:h-[220px] rounded-[8px] md:rounded-[16px] object-cover border border-[#ffffff1a]"
		/>
	{:else if coverUrl}
		<img
			src={coverUrl}
			alt=""
			class="w-full h-[140px] md:h-[220px] rounded-[8px] md:rounded-[16px] object-cover border border-[#ffffff1a]"
		/>
	{:else}
		<img
			src={CoverPlaceholder}
			alt=""
			class="w-full h-[140px] md:h-[220px] rounded-[8px] md:rounded-[16px] object-cover border border-[#ffffff1a]"
		/>
	{/if}
	<button
		on:click={() => {
			showButtons = true;
		}}
		class=" absolute top-[8px] lg:top-[14px] {$locale === 'ar'
			? 'left-[8px] lg:left-[14px]'
			: 'right-[8px] lg:right-[14px]'}"
	>
		<img src={CoverMenu} alt="" class="w-[24px] lg:w-[40px]" />
	</button>
</div>

{#if showButtons}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511e6] z-[90] p-[16px]"
	>
		<div
			class="flex flex-col items-start gap-[10px] lg:gap-[14px] w-full max-w-[400px] p-[10px] lg:p-[14px] rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
		>
			<button
				on:click={() => {
					showButtons = false;
				}}
				class="absolute top-[-13px] lg:top-[-17px] {$locale === 'ar'
					? 'left-[-13px] lg:left-[-17px]'
					: 'right-[-13px] lg:right-[-17px]'}"
			>
				<img src={CloseButton} alt="" class="w-[24px] lg:w-[32px]" />
			</button>
			<label
				for="upload"
				class="flex items-center gap-[12px] lg:gap-[16px] w-full p-[6px] rounded-[6px] bg-[#ffffff08] hover:bg-[#ffffff14]"
			>
				<input
					type="file"
					name="upload"
					id="upload"
					accept="image/*"
					hidden
					on:change={handleImageUpload}
				/>
				<img src={UploadImage} alt="" class="w-[60px]" />
				<div class="flex flex-col items-start gap-[4px] w-full">
					<p class="text-[#FFFFFFCC] text-start text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
						{$t('Upload a New Cover Photo')}
					</p>
					<p class="text-[#FFFFFF80] text-start text-[12px] font-Gilroy max-w-[230px]">
						{$t('Upload a New Cover Photo text')}
					</p>
				</div>
			</label>
			<button
				on:click={clickOnHiddenUploadBtn}
				disabled={!coverUrl}
				class="flex items-center gap-[12px] lg:gap-[16px] w-full p-[6px] rounded-[6px] {coverUrl
					? 'bg-[#ffffff08] hover:bg-[#ffffff14]'
					: 'bg-[#ffffff08] opacity-30'}"
			>
				<img src={SwitchImage} alt="" class="w-[60px]" />
				<div class="flex flex-col items-start gap-[4px] w-full">
					<p class="text-[#FFFFFFCC] text-start text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
						{$t('Switch to Default Cover Photo')}
					</p>
					<p class="text-[#FFFFFF80] text-start text-[12px] font-Gilroy max-w-[230px]">
						{$t('Switch to Default Cover Photo text')}
					</p>
				</div>
			</button>
		</div>
	</div>
{/if}

<!-- Show the Croppie Modal when needed -->
{#if showCropModal}
	<ProfileCoverCroppieModal imageUrl={rawImage} onCrop={handleCrop} {startUploadSimulation} />
{/if}

{#if showLoading}
	<LoadingPopup {progress} />
{/if}

<form
	class="hideform"
	action="?/cover"
	method="post"
	enctype="multipart/form-data"
	use:enhance={async ({ formData }) => {
		if (croppedImage) {
			const blob = await getImageBlob(croppedImage);
			formData.append('cover', blob);
		} else {
			const blob = await getImageBlob(CoverPlaceholder);
			formData.append('cover', blob);
			croppedImage = CoverPlaceholder;
			showButtons = false;
		}
		return ({ update, result }) => {};
	}}
>
	<button type="submit" id="uploadcover">upload</button>
</form>

<style>
	.hideform {
		position: absolute;
		left: -9999px;
		opacity: 0;
	}
</style>
