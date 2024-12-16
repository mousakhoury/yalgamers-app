<script>
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import { onMount } from 'svelte';
	import LoginButton from './LoginButton.svelte';
	import CheckCircle from '$lib/assets/login/check_circle.svg';
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	export let back;
	export let proceed;
	export let email = '';
	export let isvalid = false;
	export let password_reset = false;

	let otp = ['', '', '', '', '', ''];
	let isButtonDisabled = true;
	let errorMessage = '';
	let hasError = [false, false, false, false, false, false];
	let loading = false;

	const correctOtp = '123456'; // Hard-coded correct OTP

	// Function to format the email
	function formatEmail(email) {
		if (email) {
			const [localPart, domain] = email.split('@');
			return `${localPart.slice(0, 3)}.....${domain.slice(-7)}`;
		}
	}

	let formattedEmail = formatEmail(email);

	function handleInput(event, index) {
		const { value } = event.target;

		if (/^\d$/.test(value)) {
			otp[index] = value;
			hasError[index] = false; // Reset error state on input
			if (index < otp.length - 1) {
				document.getElementById(`otp-${index + 1}`).focus();
			}
		} else {
			otp[index] = ''; // Clear the input if it's not a number
		}
		checkButtonState();
	}

	function handleKeyDown(event, index) {
		if (event.key === 'Backspace' && !otp[index] && index > 0) {
			document.getElementById(`otp-${index - 1}`).focus();
		}
	}

	function handlePaste(event) {
		const pasteData = event.clipboardData.getData('text');
		if (/^\d{6}$/.test(pasteData)) {
			otp = pasteData.split('');
			otp.forEach((digit, i) => {
				document.getElementById(`otp-${i}`).value = digit;
				hasError[i] = false; // Reset error state on paste
			});
			document.getElementById(`otp-5`).focus();
			event.preventDefault();
			checkButtonState();
		}
	}

	function checkButtonState() {
		isButtonDisabled = otp.some((digit) => digit === '');
	}

	async function validatenewUserOtp() {
		const res = await fetch(`/api/verify-otp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code: otp.join('') })
		});
		return await res.json();
	}

	async function validate_reset_password_otp() {
		loading = true;
		let res = await fetch(`/api/password-reset/verify-otp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ code: otp.join(''), email })
		});
		res = await res.json();
		if (res.ok) {
			proceed();
		} else {
			errorToast(res.msg);
		}
		loading = false;
	}

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}

	async function validateOtp() {
		let res;

		if (password_reset) {
			res = await validate_reset_password_otp();
			return;
		}
		res = await validatenewUserOtp();

		if (!res.ok) {
			errorMessage = 'Wrong OTP!';
			otp.forEach((digit, index) => {
				hasError[index] = true;
			});
		} else {
			errorMessage = '';
			// Proceed with the next step, e.g., submitting the form or moving to the next screen
			goto('/personal-details/upload-image');
		}
	}

	onMount(() => {
		checkButtonState(); // Initialize button state
	});
</script>

<div
	class="flex flex-col items-start gap-[24px] lg:gap-0 pt-[20px] lg:pt-[50px] px-[16px] lg:px-[81px] w-full h-full"
>
	<button on:click={back()} class="flex items-center gap-[6px] lg:gap-[10px]">
		<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
		<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
	</button>

	<div class="flex justify-center items-start lg:items-center w-full lg:h-full">
		<div class="flex flex-col items-start lg:items-center gap-[60px] w-full max-w-[558px]">
			<div class="flex flex-col items-start lg:items-center gap-[24px] lg:gap-[48px] w-full">
				<div class="flex flex-col items-start lg:items-center gap-[6px]">
					<h1
						class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
					>
						Enter OTP
					</h1>
					<p
						class="text-[#A99FAC] text-[14px] lg:text-[18px] text-start lg:text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
					>
						Enter the 6 digit OTP we just sent to <span class="text-[#FDEB56]"
							>{formattedEmail}</span
						>
					</p>
				</div>

				<div class="flex flex-col items-center gap-[12px]">
					<div class="flex justify-center gap-[12px] lg:gap-[22.8px]">
						{#each otp as digit, index}
							<input
								id={'otp-' + index}
								type="text"
								maxlength="1"
								class="otp-input {hasError[index] ? 'error' : ''}"
								bind:value={otp[index]}
								on:input={(event) => handleInput(event, index)}
								on:keydown={(event) => handleKeyDown(event, index)}
								on:paste={handlePaste}
							/>
						{/each}
					</div>

					{#if errorMessage}
						<p class="error-message global-error">{errorMessage}</p>
					{/if}
				</div>

				<div class="flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] w-full mt-[8px] lg:mt-0">
					<button on:click={back()} class="cancel-button">Cancel</button>
					<LoginButton
						{loading}
						label="Next"
						arrow={true}
						disable={isButtonDisabled}
						on:click={validateOtp}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

{#if isvalid}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#140718e6] z-50"
	>
		<div
			class="flex flex-col items-center gap-[16px] p-[49px] rounded-[16px] border border-[#1fd03126] bg-[#111915]"
		>
			<img src={CheckCircle} alt="" class="w-[60px]" />
			<p class="text-[#1FD031] text-[22px] text-center font-Gilroy-Medium">Email Verified!</p>
		</div>
	</div>
{/if}

<style>
	.otp-input {
		width: 74px;
		padding: 25px 0px;
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-SemiBold;
		font-size: 28px;
		text-align: center;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		background: transparent;
	}

	.otp-input:focus {
		outline: none;
		border-color: #fdeb56;
	}

	.otp-input.error {
		border-color: #f71756;
	}

	.error-message {
		color: var(--Accent, #f71756);
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 28px; /* 155.556% */
	}

	.cancel-button {
		display: flex;
		width: 100%;
		padding: 14px 21px;
		justify-content: center;
		align-items: center;
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.08);
	}

	.cancel-button:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	@media (max-width: 1024px) {
		.otp-input {
			width: 47px;
			padding: 16px 0px;
			font-size: 20px;
		}

		.cancel-button {
			font-size: 14px;
		}
	}
</style>
