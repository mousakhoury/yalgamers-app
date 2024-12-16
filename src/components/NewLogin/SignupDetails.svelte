<script>
	import { t, locale } from '$lib/stores/i18n';
	import LoginInput from '$components/NewLogin/LoginInput.svelte';
	import Checked from '$lib/assets/login/checked.svg';
	import Unchecked from '$lib/assets/login/unchecked.svg';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import LoginButton from '$components/NewLogin/LoginButton.svelte';
	import { account, handleConnectWallet } from '$lib/connect';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	export let main = true;
	let name = '';
	let referral_code = '';
	let username = '';
	export let email = '';
	let password = '';
	let confirmPassword = '';
	let formSubmit;
	let action = '?/save_user_details';
	let loading = false;

	let isChecked = false;

	onMount(() => {
		if (!$account.isConnected && !$page.data.profile) {
			goto('/signup');
		}

		if ($page.data.profile) {
			name = $page.data.profile.name;
			username = $page.data.profile.username;
			email = $page.data.profile.email;
		} else {
			action = '?/signup';
		}
	});

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
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

	// Function to check if all required conditions are met
	$: canProceed = () => {
		if ($page.data.profile && $page.data.profile.password_added) {
			return name.trim() !== '' && username.trim() !== '' && email.trim() !== '' && isChecked;
		} else {
			return (
				name.trim() !== '' &&
				username.trim() !== '' &&
				email.trim() !== '' &&
				password.trim() !== '' &&
				confirmPassword.trim() !== '' &&
				isChecked &&
				password === confirmPassword
			);
		}
	};

	async function logout(e) {
		e.stopPropagation();
		e.preventDefault();
		if ($page.data.profile) {
			await fetch(`/logout`, {
				method: 'POST'
			});
		}
		goto('/signup');
	}
</script>

<form
	method="post"
	{action}
	class="flex flex-col items-start px-[16px] lg:px-[81px] py-[40px] lg:py-[63px] w-full"
	use:enhance={({ formData }) => {
		loading = true;
		if (action.includes('signup')) {
			formData.append($account.connector?.name ?? '', $account.address ?? '');
		}
		return ({ result }) => {
			if (result.data.ok) {
				if (action.includes('signup')) {
					main = false;
				} else {
					goto('/personal-details/upload-image');
				}
			} else {
				errorToast(result.data.msg);
			}
			loading = false;
		};
	}}
>
	<div class="flex justify-center items-center w-full h-full">
		<div
			class="flex flex-col items-start lg:items-center gap-[24px] lg:gap-[32px] py-[20px] w-full max-w-[558px]"
		>
			<div class="flex items-start w-full max-w-[558px] lg:pt-[26px]">
				<button on:click={(e) => logout(e)} class="flex items-center gap-[10px]">
					<img src={BackArrow} alt="" class="w-[20px] {$locale === 'ar' ? ' rotate-180' : ''}" />
					<p class="text-[#FFFFFFB2] text-[16px] font-Gilroy-SemiBold">Back</p>
				</button>
			</div>
			<div class="flex flex-col items-start lg:items-center gap-[6px]">
				<h1
					class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
				>
					Welcome!
				</h1>
				<p
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					Enter your details to continue.
				</p>
			</div>
			<div class="flex flex-col items-start gap-[12px] lg:gap-[24px] w-full">
				<LoginInput label="Your Name" type="name" name="name" bind:value={name} />
				<LoginInput label="Username" type="username" name="username" bind:value={username} />
				<LoginInput
					disabled={$page.data.profile?.email}
					label="Email Address"
					type="email"
					name="email"
					bind:value={email}
				/>
				<LoginInput
					label="Referral Code"
					required={false}
					type="text"
					name="referral_code"
					bind:value={referral_code}
				/>

				{#if !$page.data.profile?.password_added}
					<LoginInput
						label="Enter Password"
						type="password"
						name="password"
						bind:value={password}
					/>
					<LoginInput
						label="Confirm Password"
						type="password"
						name="passwordConfirm"
						bind:value={confirmPassword}
					/>
				{/if}
			</div>
			<div class="w-full py-[8px] lg:py-0">
				<label for="remember" class="flex items-center gap-[15px] cursor-pointer">
					<input type="checkbox" name="remember" id="remember" hidden bind:checked={isChecked} />
					<img src={isChecked ? Checked : Unchecked} alt="" class="w-[24px]" />
					<p class="text-[#948798] text-[14px] lg:text-[16px] font-Gilroy-Medium">
						I accept all the <a href="#" class="text-[#FDEB56] underline">Terms and Conditions</a>
					</p>
				</label>
			</div>
			<LoginButton label="Next" arrow={true} disable={!canProceed()} {loading} />
		</div>
	</div>
</form>
