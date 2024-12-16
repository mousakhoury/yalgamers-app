<script>
	import { t, locale } from '$lib/stores/i18n';
	import plus from '$lib/assets/counter-plus.svg';
	import Decrement from '$lib/assets/counter-minus.svg';
	import Upload from '$lib/assets/upload-screenshot.svg';
	import UploadGreen from '$lib/assets/upload-green.svg';
	import Info from '$lib/assets/create-ticket-info.svg';
	import Submitted from '$lib/assets/ticket-submitted.svg';
	import GoChat from '$lib/assets/submitted-go-chat.svg';
	// import Select from 'svelte-select@4.4.4';

	import '$lib/assets/css/create-ticket.css';

	export let closeCreateHandler;
	export let closeTicketsHandler;

	// Function to add a class to the parent element if the input is not empty
	function handleInput(event) {
		const input = event.target;
		const label = input.previousElementSibling;

		if (input.value.trim() !== '') {
			label.classList.add('active');
		} else {
			label.classList.remove('active');
		}
	}

	let fileInput;

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
	let uploadProgress = 0;
	let imageUrl;
	let strokeDashoffset = 400; // The total length of the square's perimeter

	function handleFileChange(event) {
		const file = event.target.files[0];
		selectedFile = file;
		if (file) {
			selectedFile = file;
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

	let isReview = false;
	let subject = '';
	let description = '';
	let fromDate = '';

	$: isFormFilled = subject.trim() !== '' && description.trim() !== '' && selectedOption !== '';

	function proceed() {
		// This function will be called when the "Proceed" button is clicked.
		isReview = true;
	}

	function back() {
		// This function will be called when the "Back" button is clicked in the review view.
		isReview = false;
	}

	let isSubmitted = false;

	let ticket_id = null;

	let options = [
		$t('Explore'),
		$t('courses'),
		$t('games'),
		$t('tournaments'),
		$t('havefun'),
		$t('leaderboard')
	]; // Your options array
	let selectedOption = ''; // The currently selected option
	let showDropdown = false; // A boolean to track if the dropdown should be shown

	// Function to handle option selection
	function selectOption(option) {
		selectedOption = option;
		showDropdown = false;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const data = new FormData();
		data.append('title', subject);
		data.append('description', description);
		data.append('category', selectedOption);
		data.append('file', selectedFile);

		const res = await fetch('/api/support_tickets', {
			method: 'POST',
			body: data
		});
		const ticket = await res.json();
		ticket_id = ticket.id;
		isSubmitted = true;
	}
</script>

{#if isSubmitted}
	<div class="submitted-container">
		<img src={Submitted} alt="" />
		<div class="submitted-info">
			<p>{$t('Your Ticket Submitted Successfully!')}</p>
			<div class="submitted-button">
				<button class="submitted-close" on:click={closeTicketsHandler}>{$t('Close')}</button>
				<a
					href={`/support-tickets/${ticket_id}`}
					class="submitted-go-chat"
					on:click={closeTicketsHandler}
				>
					<img src={GoChat} alt="" class="!w-[20px]" />
					{$t('Go to Chat Page')}
				</a>
			</div>
		</div>
	</div>
{:else}
	<form on:submit={handleSubmit} class="create-ticket">
		<h5 class="title">{isReview ? `${$t('Review Details')}` : `${$t('Create a New Ticket')}`}</h5>

		<div class="create-container">
			{#if isReview}
				<div class="review-container">
					<div class="review-item">
						<p class="review-title">{$t('Subject')}</p>
						<p class="review-subject">{subject}</p>
					</div>
					<div class="review-item">
						<p class="review-title">{$t('Description')}</p>
						<p class="review-description">{description}</p>
					</div>

					{#if imageUrl}
						<div class="review-item-image">
							<p class="review-title">{$t('Screenshot / Video')}</p>
							<img src={imageUrl} class="review-image" alt="" />
						</div>
					{/if}
				</div>
			{:else}
				<div class="inputs">
					<div class="input-container">
						<label for="subject">{$t('Subject')}<span>*</span></label>
						<input
							type="text"
							name="title"
							id="subject"
							bind:value={subject}
							on:input={handleInput}
							required
						/>
					</div>
					<div class="input-container">
						<label for="description">{$t('Description')}<span>*</span></label>
						<textarea
							name="description"
							id="description"
							bind:value={description}
							on:input={handleInput}
							required
						/>
					</div>
					<div class="dropdown">
						<div class="selected-option" on:click={() => (showDropdown = !showDropdown)}>
							{selectedOption || `${$t('Select Section')}`}
							{#if !selectedOption}
								<span>*</span>
							{/if}
							<div class={`arrow ${showDropdown ? 'down' : 'up'}`} />
						</div>
						{#if showDropdown}
							<ul class="dropdown-list">
								{#each options as option}
									<li class="dropdown-list-item" on:click={() => selectOption(option)}>
										{option}
									</li>
								{/each}
							</ul>
						{/if}
					</div>
					<!-- <div class="date-container">
						<div class="input-container">
							<label class="date-label" for="from">From When<span>*</span></label>
							<input
								type="date"
								name="from"
								id="from"
								bind:value={fromDate}
								on:input={handleInput}
								required
							/>
						</div>
						<div class="counter-container">
							<div class="couter-label">How Many Times<span>*</span></div>
							<div class="number-con">
								<div class="counter-buttons" on:click={decrement}>
									<img src={Decrement} alt="" />
								</div>
								<input
									type="number"
									id="counter"
									class="counter-value"
									bind:value={count}
									readonly
								/>
								<div class="counter-buttons" on:click={increment}><img src={plus} alt="" /></div>
							</div>
						</div>
					</div> -->
				</div>
				<div class="upload-container">
					<div class="upload-text">
						<h6>{$t('Do you have any screenshot or video?')}</h6>
						<p>
							{$t(
								'If you have any screenshot proof of the issue you are having, then please upload it.'
							)}
							<!-- </p> -->
						</p>
					</div>
					<div class="uploads">
						<input
							type="file"
							bind:this={fileInput}
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
									{$t('Upload Screenshot')}</span
								>
							{/if}
						</label>
					</div>
				</div>
			{/if}

			<div class="create-info">
				<img src={Info} alt="" />
				<p>{$t('By submitting your issue, you can chat directly with our agents.')}</p>
			</div>

			{#if isReview}
				<div class="buttons">
					<button class="no-button" on:click={back}>{$t('Back')}</button>
					<button class="yes-button" type="submit">{$t('Submit')}</button>
				</div>
			{:else}
				<div class="buttons">
					<button class="no-button" on:click={closeCreateHandler}>{$t('Cancel')}</button>
					<button class="yes-button" on:click={proceed} disabled={!isFormFilled}
						>{$t('Proceed')}</button
					>
				</div>
			{/if}
		</div>
	</form>
{/if}

<style>
	.dropdown {
		position: relative;
		width: 100%;
	}
	.dropdown-list {
		position: absolute;
		width: 100%;
		z-index: 1000;
		padding: 5px 0;
		margin: 0;
		list-style-type: none;
		height: 176px;
		overflow-y: scroll;
		border-radius: 6px;
		border: 1px solid var(--white-30, #68566e);
		background: var(--Accent-2, #200b26);
	}
	.dropdown-list::-webkit-scrollbar-thumb {
		background-color: #533e59;
	}

	.dropdown-list::-webkit-scrollbar {
		width: 6px;
	}
	.dropdown-list-item {
		padding: 10px;
		cursor: pointer;
		transition: background-color 0.2s;
		color: var(--white-50, #948798);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
	.dropdown-list-item:hover {
		background-color: #3f134c;
	}
	.selected-option {
		padding: 15px;
		border-radius: 6px;
		border: 1px solid var(--white-10, #3d2644);

		background: var(--Accent-2, #200b26);
		cursor: pointer;
		color: var(--white-50, #948798);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		position: relative;
	}

	.arrow {
		border: solid rgba(255, 255, 255, 0.904);
		border-width: 0 3px 3px 0;
		display: inline-block;
		padding: 3px;
		position: absolute;
		top: 48%;
		right: 20px;
	}

	.arrow:lang(ar) {
		right: unset;
		left: 20px;
	}

	.up {
		transform: rotate(-135deg);
		-webkit-transform: rotate(-135deg);
	}

	.down {
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
	}

	.selected-option span {
		font-family: Gilroy-Medium;
		font-size: 16px;
		color: var(--Accent, #f71756);
	}
</style>
