<script>
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import Unchecked from '$lib/assets/login/unchecked.svg';
	import Checked from '$lib/assets/login/checked.svg';
	import { fade } from 'svelte/transition';
	import LoginInput from './LoginInput.svelte';
	import LoginButton from './LoginButton.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	export let welcomeSection;
	export let loginEmail;

	// Reactive variable to track the checkbox state
	let isChecked = false;

	// Variables to store input values
	let email = '';
	let password = '';
	let loading = false;

	// Function to validate email
	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
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

	// Disable login button if email or password is empty or email is invalid
	$: disableLoginButton = email === '' || password === '' || !validateEmail(email);

	function formSubmit() {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.data.ok) {
				localStorage.setItem('reload', true);
				goto(result.data.route);
			} else {
				errorToast(result.data.msg);
			}
		};
	}
</script>

<div
	class="flex flex-col items-start gap-[24px] lg:gap-0 lg:items-center w-full h-full lg:pt-[26px]"
>
	<div class="w-full max-w-[558px]">
		<button
			on:click={() => {
				loginEmail = false;
				welcomeSection = true;
			}}
			class="flex items-center gap-[6px] lg:gap-[10px]"
		>
			<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
			<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
		</button>
	</div>

	<div class="flex items-center justify-center w-full h-full">
		<form
			use:enhance={formSubmit}
			action="?/login"
			method="post"
			class="flex flex-col items-center gap-[32px] lg:gap-[48px] w-full max-w-[558px]"
		>
			<div class="flex flex-col items-start lg:items-center gap-[24px] lg:gap-[32px] w-full">
				<div class="flex flex-col items-start lg:items-center gap-[6px]">
					<h1
						class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
					>
						Login
					</h1>
					<p
						class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
					>
						Enter your details to login
					</p>
				</div>
				<div class="flex flex-col items-center gap-[16px] lg:gap-[24px] w-full">
					<LoginInput label="Email Address" name="email" type="email" bind:value={email} />
					<LoginInput
						label="Enter Password"
						name="password"
						type="password"
						bind:value={password}
					/>
					<div class="flex items-center justify-between w-full mt-[8px] lg:mt-0">
						<label for="remember" class="flex items-center gap-[15px] cursor-pointer">
							<input
								type="checkbox"
								name="remember"
								id="remember"
								hidden
								bind:checked={isChecked}
							/>
							<img src={isChecked ? Checked : Unchecked} alt="" class="w-[24px]" />
							<p
								class="text-[16px] font-Gilroy-Medium"
								style="color: {isChecked ? '#E9E6EA ' : '#948798'}"
							>
								Remember Me
							</p>
						</label>
						<a
							href="/login/forgot-password"
							class="text-[#FDEB56] hover:text-[#cabc45] text-[14px] lg:text-[16px] font-Gilroy-SemiBold"
						>
							Forgot Password?
						</a>
					</div>
				</div>
			</div>
			<LoginButton label="Login" disable={disableLoginButton} {loading} />
		</form>
	</div>
</div>
