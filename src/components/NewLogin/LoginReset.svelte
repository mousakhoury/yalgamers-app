<script>
	import { goto } from '$app/navigation';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import CheckCircle from '$lib/assets/login/check_circle.svg';
	import { toast } from '@zerodevx/svelte-toast';

	import LoginButton from './LoginButton.svelte';
	import LoginInput from './LoginInput.svelte';

	export let forgot;
	export let reset;
	export let email = '';

	let password = '';
	let confirmPassword = '';
	let isReset = false;
	let loading = false;

	$: isButtonDisabled = password === '' || confirmPassword === '' || password !== confirmPassword;

	async function resetPasswordHandler() {
		loading = true;
		let res = await fetch(`/api/password-reset`, {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				passwordConfirm: confirmPassword
			})
		});
		res = await res.json();
		if (res.ok) {
			successToast('Password reset success. please, login with new password');
			setTimeout(() => {
				goto('/login');
			}, 1000);
		} else {
			errorToast(res.msg);
		}
		loading = false;
	}

	function successToast(text) {
		toast.push(text, {
			pausable: true,
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(72,187,120,0.9)',
				'--toastBarBackground': '#2F855A'
			}
		});
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
	<button
		on:click={() => {
			forgot = true;
			reset = false;
		}}
		class="flex items-center gap-[6px] lg:gap-[10px]"
	>
		<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
		<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
	</button>

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
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-start lg:text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					Enter your email, we will send a 6 digit OTP.
				</p>
			</div>
			<div class="flex flex-col items-start lg:items-center gap-[12px] lg:gap-[24px] w-full">
				<LoginInput
					label="Enter a New Password"
					name="password"
					type="password"
					bind:value={password}
				/>
				<LoginInput
					label="Confirm New Password"
					name="confirm-password"
					type="password"
					bind:value={confirmPassword}
				/>
			</div>

			<div class="flex flex-col lg:flex-row gap-[12px] lg:gap-[24px] w-full mt-[8px] lg:mt-0">
				<button
					on:click={() => {
						forgot = true;
						reset = false;
					}}
					class="cancel-button">Cancel</button
				>
				<LoginButton
					{loading}
					on:click={resetPasswordHandler}
					label="Next"
					arrow={true}
					disable={isButtonDisabled}
				/>
			</div>
		</div>
	</div>
</div>

{#if isReset}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#140718e6] z-50 p-[16px]"
	>
		<div
			class="flex flex-col items-center gap-[20px] lg:gap-[32px] p-[42px] lg:p-[80px] rounded-[8px] lg:rounded-[16px] border border-[#1fd03126] bg-[#111915] w-full lg:max-w-[480px]"
		>
			<img src={CheckCircle} alt="" class="w-[100px] lg:w-[140px]" />
			<div
				class="flex flex-col items-center gap-[8px] lg:gap-[12px] max-w-[197px] lg:max-w-[299px]"
			>
				<p class="text-[#1FD031] text-[24px] text-center font-Gilroy-SemiBold">
					Password Reset Successful!
				</p>
				<p class="text-[#A99FAC] text-[12px] lg:text-[16px] text-center font-Gilroy-Medium">
					You have set a new password to your account.
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
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
		.cancel-button {
			font-size: 14px;
		}
	}
</style>
