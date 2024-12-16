<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onMount } from 'svelte';
	import Metamask from '$lib/assets/metamask_1.svg';
	import ArrowRight from '$lib/assets/Arrow - Right.svg';
	import UploadGreen from '$lib/assets/upload-green.svg';
	import Upload from '$lib/assets/upload-screenshot.svg';
	import dummyLeader from '$lib/assets/tournament-leader-dummy.png';
	import addPlayer from '$lib/assets/tournament-add.svg';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';

	export let tournament;
	export let showTermsHandler;
	export let selectedPosition;
	export let imageUrl;
	export let fileInput;
	export let uploadProgress;
	export let name;
	export let selectedPlayers;

	let showReviews = false;

	const showReviewsHandler = () => {
		showReviews = true;
	};

	const closeReviewsHandler = () => {
		showReviews = false;
	};

	$: isNextActive = name.trim() !== '' && imageUrl;

	function handleInput(event) {
		const input = event.target;
		const label = input.previousElementSibling;

		if (input.value.trim() !== '') {
			label.classList.add('active');
		} else {
			label.classList.remove('active');
		}
	}

	onMount(() => {
		// Assume there's only one input for simplicity; adjust as needed
		const input = document.querySelector('input[name="name"]'); // Adjust the selector as needed
		if (input && input.value.trim() !== '') {
			const label = input.previousElementSibling;
			label.classList.add('active');
		}
	});

	let count = 0; // Initialize the count

	// Increment and decrement functions
	function increment() {
		count += 1;
	}

	function decrement() {
		if (count > 0) {
			count -= 1;
		}
	}

	let selectedFile;
	let isUploading = false;

	let strokeDashoffset = 400; // The total length of the square's perimeter

	function handleFileChange(event) {
		const file = event.target.files[0];
		selectedFile = file;
		if (file) {
			selectedFile = file;
			fileInput = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				imageUrl = e.target.result;
				// Start the upload process
				startUpload();
			};
			reader.readAsDataURL(file);
		}
	}

	function startUpload() {
		isUploading = true;
		uploadProgress = 0;

		const interval = setInterval(() => {
			uploadProgress += 5; // Increment progress
			strokeDashoffset = 400 - 400 * (uploadProgress / 100); // Update stroke dash offset based on progress
			if (uploadProgress >= 100) {
				clearInterval(interval);
				uploadProgress = 100;
				isUploading = false;
				// Here you would typically send the file to the server
			}
		}, 100);
	}
</script>

{#if showReviews}
	<div class="flex flex-col items-start gap-[48px]">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<h5 class="text-[#fff] text-[20px] font-Gilroy-SemiBold">Review All Details</h5>
			<div class="flex flex-col items-start gap-[24px] w-full">
				<div class="flex flex-col items-start gap-[8px] w-full">
					<p class="text-[#7E6E83] text-[16px] font-Gilroy-Medium">Team Name</p>
					<p class="text-[#E9E6EA] text-[18px] font-Gilroy-Medium">{name}</p>
				</div>
				<div class="flex flex-col items-start gap-[8px] w-full">
					<p class="text-[#7E6E83] text-[16px] font-Gilroy-Medium">Team Logo</p>
					<img src={imageUrl} alt="" class="w-[60px] h-[60px] rounded-[4px] object-cover" />
				</div>
				<div class="flex flex-col items-start gap-[8px] w-full">
					<p class="text-[#7E6E83] text-[16px] font-Gilroy-Medium">Team Members</p>
					<div class="flex items-start gap-[16px]">
						<div
							class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#3D2644] rounded-[100px]"
						>
							{#if $page.data.profile.avatar && $page.data.profile.avatar != ''}
								<img
									src={`${env.PUBLIC_BASE_URL}/api/files/_pb_users_auth_/${$page.data.profile.id}/${$page.data.profile.avatar}`}
									alt=""
									class="w-[24px] h-[24px] object-cover rounded-[50%]"
								/>
							{:else}
								<img
									src={dummyLeader}
									alt=""
									class="w-[24px] h-[24px] object-cover rounded-[50%]"
								/>
							{/if}
							<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">You (Leader)</p>
						</div>
						{#each selectedPlayers as player, index}
							{#if player.player_name}
								<div
									class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#3D2644] rounded-[100px]"
								>
									{#if player.player_image}
										<img
											src={player.player_image}
											alt=""
											class="w-[24px] h-[24px] object-cover rounded-[50%]"
										/>
									{:else}
										<img
											src={dummyLeader}
											alt=""
											class="w-[24px] h-[24px] object-cover rounded-[50%]"
										/>
									{/if}
									<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">
										P{index + 2}: {player.player_name.length > 6
											? `${player.player_name.substring(0, 6)}...`
											: player.player_name}
									</p>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="flex items-center gap-[24px] w-full">
			<button class="back-button" on:click={closeReviewsHandler}>
				<p>Back</p>
			</button>
			<button class="confirm-button" on:click={showTermsHandler}>
				<p>Confirm</p>
			</button>
		</div>
	</div>
{:else}
	<div class="flex flex-col items-start gap-[48px]">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<h5 class="text-[#fff] text-[20px] font-Gilroy-SemiBold">
				Register for “{$locale === 'en' ? tournament.title_en : tournament.title}”
			</h5>
			<div class="flex flex-col items-start gap-[32px] w-full">
				<div class="flex flex-col items-start gap-[20px] w-full">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">Team Details</p>
					<div class="input-container">
						<label for="name">Team Name<span>*</span></label>
						<input
							type="name"
							name="name"
							id="name"
							on:input={handleInput}
							bind:value={name}
							required
						/>
					</div>
					<div class="uploads">
						<input
							type="file"
							id="file-upload"
							accept="image/*,video/*"
							on:change={handleFileChange}
							hidden
						/>
						<label for="file-upload" class="upload-label">
							{#if imageUrl}
								<div class="uploading-image">
									<div class="image-container">
										<img src={imageUrl} alt="Preview" class="image-preview" />
										<svg class="progress-square" width="60" height="60">
											<rect
												class="progress-square__rect"
												stroke="#1FD031"
												stroke-width="1"
												fill="transparent"
												width="59"
												height="58"
												x="1"
												y="1"
												rx="4"
												ry="4"
												stroke-dasharray="330"
												stroke-dashoffset={strokeDashoffset}
											/>
										</svg>
										<div class="progress-text">
											<img src={UploadGreen} alt="" />
											{uploadProgress}%
										</div>
									</div>

									{#if isUploading}
										<div class="uploading-text">{$t('Uploading...')}</div>
									{:else}
										<div class="uploaded-text">{$t('Uploaded!')}</div>
									{/if}
								</div>
							{:else}
								<span class="upload-button">
									<img src={Upload} alt="" />
									Upload Team Logo</span
								>
							{/if}
						</label>
					</div>
				</div>
				<div class="flex flex-col items-start gap-[20px] w-full">
					<p class="text-[#A99FAC] text-[16px] font-Gilroy-SemiBold">Team Details</p>
					<div class="flex items-start gap-[16px]">
						<div
							class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#3D2644] rounded-[100px]"
						>
							{#if $page.data.profile.avatar && $page.data.profile.avatar != ''}
								<img
									src={`${env.PUBLIC_BASE_URL}/api/files/_pb_users_auth_/${$page.data.profile.id}/${$page.data.profile.avatar}`}
									alt=""
									class="w-[24px] h-[24px] object-cover rounded-[50%]"
								/>
							{:else}
								<img
									src={dummyLeader}
									alt=""
									class="w-[24px] h-[24px] object-cover rounded-[50%]"
								/>
							{/if}
							<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">You (Leader)</p>
						</div>
						{#each selectedPlayers as player, index}
							{#if player.isPending}
								<div class="relative add-player">
									<div
										class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#36212B] rounded-[100px]"
									>
										<img
											src={addPlayer}
											alt=""
											class="w-[24px] h-[24px] object-cover rounded-[50%]"
										/>
										<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">Pending...</p>
									</div>
								</div>
							{:else if player.isSelected}
								<div
									class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#3D2644] rounded-[100px]"
								>
									<img
										src={player.player_image}
										alt=""
										class="w-[24px] h-[24px] object-cover rounded-[50%]"
									/>
									<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">
										P{index + 2}: {player.player_name.length > 6
											? `${player.player_name.substring(0, 6)}...`
											: player.player_name}
									</p>
								</div>
							{:else}
								<button
									class="relative add-player cursor-pointer"
									on:click={() => (selectedPosition = player.position)}
								>
									<div
										class="flex items-center justify-center gap-[6px] p-[3px] pr-[12px] bg-[#36212B] rounded-[100px]"
									>
										<img
											src={addPlayer}
											alt=""
											class="w-[24px] h-[24px] object-cover rounded-[50%]"
										/>
										<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">
											Add {player.position}
										</p>
									</div>
								</button>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
		<button on:click={showReviewsHandler} disabled={!isNextActive} class="register-button">
			<p>Next</p>
			<img src={ArrowRight} class="mt-1" alt="" />
		</button>
	</div>
{/if}

<style>
	.register-button {
		display: flex;
		width: 552px;
		padding: 11px 18px 11px 22px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	.register-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.register-button:disabled {
		display: flex;
		width: 552px;
		padding: 11px 18px 11px 22px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--white-10, #3d2644);
	}

	.register-button:disabled p {
		color: var(--white-50, #948798);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}
	.add-player::before {
		content: '';
		width: calc(100% + 3px);
		height: calc(100% + 3px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		border: 1px dashed var(--Accent, #fdeb56);
		border-radius: 100px;
	}
	.input-container {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
		width: 100% !important;
		padding: 15px !important;
		border-radius: 6px !important;
		border: 1px solid var(--white-10, #3d2644) !important;
		background: var(--Accent-2, #200b26) !important;
		font-size: 16px !important;
		font-style: normal !important;
		font-weight: 400 !important;
		color: var(--white-80, #d4cfd6) !important;
	}

	.input-container:focus-within label,
	.input-container label.active {
		font-size: 12px;
		color: #beb6c0;
		transform: translateY(-150%) scale(0.85);
		background: var(--Accent-2, #200b26);
		padding: 0 8px !important;
	}

	.input-container label {
		position: absolute;
		color: var(--white-50, #948798);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		top: 15px;
		left: 1px;
		padding: 0 15px;
		border-radius: 3px;
		background: var(--Accent-2, #200b26);
		transition: transform 0.2s ease, font-size 0.2s ease, color 0.2s ease;
	}

	.input-container label:lang(ar) {
		left: unset;
		right: 1px;
	}

	.input-container label.active {
		font-size: 12px;
		color: #beb6c0;
		transform: translateY(-150%) scale(0.85);
		background: var(--Accent-2, #200b26);
		padding: 0 8px !important;
	}

	.input-container label span {
		color: var(--Accent, #f71756);
	}

	.input-container input {
		width: 100% !important;
		padding: 0 !important;
		border-radius: 6px !important;
		border: 0 !important;
		background: var(--Accent-2, #200b26) !important;
		font-size: 16px !important;
		font-style: normal !important;
		font-weight: 400 !important;
		color: var(--white-80, #d4cfd6) !important;
	}

	.input-container:focus-within {
		outline: 0;
		border: 1px solid var(--Accent, #fdeb56) !important;
		background: var(--Accent-2, #200b26);
		/* box-shadow: 0px 0px 0px 4px rgba(253, 235, 86, 0.15); */
	}

	/* Override background color for autofilled inputs */
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s; /* This is to prevent the color from flashing */
		-webkit-text-fill-color: var(--white-80, #d4cfd6) !important;
		border: none !important; /* Remove borders */
		outline: none !important; /* Remove outlines */
		-webkit-box-shadow: 0 0 0px 1000px var(--Accent-2, #200b26) inset !important;
		box-shadow: 0 0 0px 1000px var(--Accent-2, #200b26) inset !important;
	}

	input:-moz-autofill,
	input:-moz-autofill:hover,
	input:-moz-autofill:focus,
	input:-moz-autofill:active {
		border: none !important;
		outline: none !important;
	}

	input:focus {
		outline: none !important; /* Remove outlines on focus for all browsers */
		border: none !important; /* Remove borders on focus for all browsers */
	}

	.uploads {
		position: relative;
		margin-top: 0;
	}

	.uploads label {
		position: static;
	}

	.upload-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		position: static;
	}

	.uploading-image {
		width: 78px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image-container {
		position: relative;
		width: 60px;
		height: 60px;
		margin-bottom: 10px;
	}

	.image-preview {
		width: 60px;
		height: 60px;

		object-fit: cover;
		border-radius: 4px;
		border: 1px solid var(--white-10, #3d2644);
	}

	.progress-square {
		position: absolute;
		top: 0;
		left: 0;
	}

	.progress-square__rect {
		transition: stroke-dashoffset 0.35s;
	}

	.progress-text {
		position: absolute;
		text-align: center;
		bottom: 2px;
		left: 2px;
		color: white;
		font-size: 14px;
		width: 95%;
		height: 94%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 6px;
		background: rgba(7, 28, 9, 0.8);
		border-radius: 4px;
		color: var(--Positive, #1fd031);
		font-family: Gilroy-Medium;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.uploading-text {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.uploaded-text {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.upload-button {
		display: flex;
		padding: 8px 12px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		border: 1px solid var(--white-30, #68566e);
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.back-button {
		display: flex;
		width: 264px;
		padding: 11px 18px 11px 22px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--white-10, #3d2644);
	}

	.back-button p {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.confirm-button {
		display: flex;
		width: 264px;
		padding: 11px 18px 11px 22px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	.confirm-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
