<script>
	import LoginInput from '$components/NewLogin/LoginInput.svelte';
	import Checked from '$lib/assets/login/checked.svg';
	import Unchecked from '$lib/assets/login/unchecked.svg';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import LoginButton from '$components/NewLogin/LoginButton.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	export let forgot = true;
	export let otp = false;
	export let email = '';

	let isChecked = false;
	let loading = false;

	// Function to validate email
	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}

	// Disable button if email is empty or invalid, or if checkbox is not checked
	$: disableButton = email === '' || !validateEmail(email) || isChecked === false;

	async function sendResetPasswordOtp() {
		loading = true;

		let res = await fetch(`/api/password-reset/send-otp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email })
		});
		res = await res.json();
		if (res.ok) {
			forgot = false;
			otp = true;
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
</script>

<div
	class="flex flex-col items-start gap-[24px] lg:gap-0 pt-[20px] lg:pt-[50px] px-[16px] lg:px-[81px] w-full h-full"
>
	<a href="/login" class="flex items-center gap-[6px] lg:gap-[10px]">
		<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
		<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
	</a>

	<div class="flex justify-center items-start lg:items-center w-full lg:h-full">
		<div
			class="flex flex-col items-start lg:items-center gap-[24px] lg:gap-[32px] w-full max-w-[558px]"
		>
			<div class="flex flex-col items-start lg:items-center gap-[6px]">
				<h1
					class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
				>
					Forgot Password?
				</h1>
				<p
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					Enter your email, we will send a 6 digit OTP.
				</p>
			</div>
			<LoginInput label="Email Address" type="email" bind:value={email} />
			<div class="w-full mb-[8px] lg:mb-0">
				<label for="remember" class="flex items-center gap-[15px] cursor-pointer">
					<input type="checkbox" name="remember" id="remember" hidden bind:checked={isChecked} />
					<img src={isChecked ? Checked : Unchecked} alt="" class="w-[24px]" />
					<p class="text-[#948798] text-[16px] font-Gilroy-Medium">
						I accept all the <a href="#" class="text-[#FDEB56] underline">Terms and Conditions</a>
					</p>
				</label>
			</div>
			<LoginButton
				on:click={sendResetPasswordOtp}
				label="Continue"
				{loading}
				disable={disableButton}
			/>
		</div>
	</div>
</div>
