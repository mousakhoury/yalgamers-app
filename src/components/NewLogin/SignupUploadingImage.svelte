<script>
	import ProfilePlaceholder from '$lib/assets/signupdetails/defaultuploadimg.png';
	import SkipArrow from '$lib/assets/login/skip-arrow.svg';
	import UploadIcon from '$lib/assets/login/upload-icon.svg';
	import Info from '$lib/assets/login/info.svg';
	import CroppieModal from './CroppieModal.svelte';
	import LoadingPopup from './LoadingPopup.svelte';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import Done from '$lib/assets/login/done.svg';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let showCropModal = false;
	let rawImage;
	export let croppedImage;

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
			};
			reader.readAsDataURL(file);
		} else {
			console.error('No file selected.'); // Handle case when no file is selected
		}
	}

	// Function to handle cropping result
	function handleCrop(cropped) {
		if (cropped) {
			croppedImage = cropped;
		}
		showCropModal = false;
	}

	async function getImageBlob(imageUrl) {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		return blob;
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

	function submitProfile() {
		goto('/upload-cover');
	}
</script>

<div class="flex flex-col items-start px-[16px] lg:px-[81px] py -[20px] lg:py-[70px] w-full h-full">
	<div class="flex justify-center items-center w-full h-full">
		<div class="flex flex-col items-center gap-[32px] lg:gap-[48px] w-full max-w-[558px]">
			<div class="flex flex-col items-start lg:items-center gap-[6px]">
				<h1
					class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
				>
					Upload a Profile Picture!
				</h1>
				<p
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					Upload a profile picture or you can skip it now.
				</p>
			</div>
			<!-- Display the cropped image or the placeholder if no image is cropped -->
			<img
				src={croppedImage || ProfilePlaceholder}
				alt="Profile Preview"
				class="w-[100px] lg:w-[140px] h-[100px] lg:h-[140px] rounded-full"
			/>

			{#if croppedImage}
				<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[16px] w-full">
					<button on:click={() => (croppedImage = null)} type="button" class="skip-button">
						<img src={BackArrow} alt="Skip" class="w-[20px]" />
						<p>back</p>
					</button>

					<form
						action="?/save_avatar"
						class="w-full"
						method="post"
						use:enhance={async ({ formData }) => {
							const blob = await getImageBlob(croppedImage);
							formData.append('avatar', blob, 'default-image.png');
							return ({ result }) => {
								if (result.data.ok) {
									goto('/personal-details/upload-cover');
								}
							};
						}}
					>
						<button type="submit" class="done-button">
							<img src={Done} alt="Upload" class="w-[20px]" />
							<p>Done</p>
						</button>
					</form>
				</div>
			{:else}
				<div class="flex flex-col items-center gap-[20px] w-full">
					<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[16px] w-full">
						<form
							class="w-full"
							action="?/save_avatar"
							method="post"
							use:enhance={async ({ formData }) => {
								if (!$page.data.profile?.avatar) {
									const blob = await getImageBlob(ProfilePlaceholder);
									formData.append('avatar', blob, 'default-image.png');
								}
								return ({ result }) => {
									if (result.data.ok) {
										goto('/personal-details/upload-cover');
									}
								};
							}}
						>
							<button type="submit" class="skip-button">
								<p>Skip</p>
								<img src={SkipArrow} alt="Skip" class="w-[20px]" />
							</button>
						</form>

						<label for="upload" class="upload-button">
							<input
								type="file"
								name="upload"
								id="upload"
								accept="image/*"
								hidden
								on:change={handleImageUpload}
							/>
							<img src={UploadIcon} alt="Upload" class="w-[20px]" />
							<p>Upload Profile Picture</p>
						</label>
					</div>
					<div class="flex items-center gap-[6px]">
						<img src={Info} alt="Info" class="w-[18px]" />
						<p class="text-[#FFFFFF4D] text-[12px] font-Gilroy-Medium">
							If you skip now, a default profile picture will be uploaded.
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Show the Croppie Modal when needed -->
{#if showCropModal}
	<CroppieModal imageUrl={rawImage} onCrop={handleCrop} {startUploadSimulation} />
{/if}

{#if showLoading}
	<LoadingPopup {progress} />
{/if}

<style>
	.skip-button {
		display: flex;
		width: 100%;
		padding: 13px 20px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
	}

	.skip-button:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.skip-button p {
		color: rgba(255, 255, 255, 0.8);
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.upload-button {
		display: inline-flex;
		width: 100%;
		padding: 13px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: var(--Accent, #fdeb56);
		cursor: pointer;
	}

	.upload-button:hover {
		background: #c0b342;
	}

	.upload-button p {
		color: #27240c;
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.done-button {
		display: inline-flex;
		width: 100%;
		padding: 13px 20px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		background: var(--Positive, #1fd031);
	}

	.done-button:hover {
		background: #19a627;
	}

	.done-button p {
		color: #062209;
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}
</style>
