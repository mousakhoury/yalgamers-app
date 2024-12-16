<script>
	// @ts-nocheck

	import google from '$lib/assets/login/google.svg';
	import twitter from '$lib/assets/login/twitter.svg';
	import metaMast from '$lib/assets/login/metamask.svg';
	import ContinueArrow from '$lib/assets/login/continue-arrow.svg';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import { browser } from '$app/environment';
	import ContinueArrowHover from '$lib/assets/login/continue-arrow-hover.svg';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { account, handleConnectWallet } from '$lib/connect';
	import LoginInput from './LoginInput.svelte';
	import LoginButton from './LoginButton.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	export let welcomeSection;
	export let loginEmail;
	let password = '';
	let loading = false;

	// $: {
	// 	if ($account.isConnected) {
	// 		console.log('Navigate to personal-details');
	// 		goto('/personal-details');
	// 	}
	// }

	const ssoLogin = (providerName) => {
		const data = $page.data;
		const authProvider = data.authProviders.find((x) => x.name === providerName);
		const redirect = `${authProvider.authUrl}${data.redirectURL}`;
		const state = authProvider.state;
		const codeVerifier = authProvider.codeVerifier;

		if (browser) {
			document.cookie = `state=${state}`;
			document.cookie = `provider=${providerName}`;
			document.cookie = `codeVerifier=${codeVerifier}`;
		}

		window.location.href = redirect || '';
	};

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}

	async function walletLogin() {
		loading = true;
		const data = {
			password,
			wallet_name: $account.connector?.name,
			wallet_address: $account.address
		};

		let res = await fetch(`/api/wallet-login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		res = await res.json();
		if (res.ok) {
			localStorage.setItem('reload', true);
			goto(res.route);
		} else {
			errorToast(res.msg);
		}
		loading = false;
	}
</script>

<div class="flex flex-col items-center w-full h-full">
	<div class="flex items-start w-full max-w-[558px] lg:pt-[26px]">
		<a href="/" class="flex items-center gap-[10px]">
			<img src={BackArrow} alt="" class="w-[20px]" />
			<p class="text-[#FFFFFFB2] text-[16px] font-Gilroy-SemiBold">Back</p>
		</a>
	</div>
	<div class="flex items-center justify-center w-full h-full">
		<div
			class="flex flex-col items-start lg:items-center gap-[16px] lg:gap-[32px] w-full max-w-[558px]"
		>
			<div class="flex flex-col items-start lg:items-center gap-[6px]">
				<h1
					class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
				>
					Welcome back!
				</h1>
				<p
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					Login to continue with Yalgamers.
				</p>
			</div>
			{#if !$account.isConnected}
				<div class="flex flex-col items-start gap-[12px] lg:gap-[24px] w-full">
					<div class="flex flex-col lg:flex-row items-start gap-[12px] lg:gap-[24px] w-full">
						<button class="login-button" on:click={() => ssoLogin('google')}>
							<img src={google} alt="" />
							<p>Continue With Google</p>
						</button>
						<button class="login-button" on:click={() => ssoLogin('twitter')}>
							<img src={twitter} alt="" />
							<p>Continue With X</p>
						</button>
					</div>
					<button
						class="login-button"
						on:click={() => {
							if ($account.isConnected) {
								goto('/personal-details');
							} else {
								handleConnectWallet();
							}
						}}
					>
						<img src={metaMast} alt="" />
						<p>Continue With Wallet</p>
					</button>
				</div>
				<div class="flex items-center gap-[12px] w-full">
					<hr class="w-full border-[#ffffff1a]" />
					<p class="text-[#FFFFFF4D] text-[16px] font-Gilroy-Medium">OR</p>
					<hr class="w-full border-[#ffffff1a]" />
				</div>
				<button
					on:click={() => {
						loginEmail = true;
						welcomeSection = false;
					}}
					class="continue-button group"
				>
					<p>Continue With Email and Password</p>
					<img src={ContinueArrow} alt="" class="group-hover:hidden w-[18px] lg:w-[24px]" />
					<img
						src={ContinueArrowHover}
						alt=""
						class="hidden group-hover:block w-[18px] lg:w-[24px]"
					/>
				</button>
			{:else}
				<p
					class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
				>
					{$account.connector?.name} is connected. Please enter password to login.
				</p>

				<LoginInput label="Enter Password" name="password" type="password" bind:value={password} />
				<div class=" grid place-content-end w-full">
					<a
						href="/login/forgot-password"
						class="text-[#FDEB56] hover:text-[#cabc45] text-[14px] lg:text-[16px] font-Gilroy-SemiBold"
					>
						Forgot Password?
					</a>
				</div>
				<LoginButton on:click={walletLogin} label="Login" disable={password == ''} {loading} />
			{/if}
		</div>
	</div>
	<p class="text-[#7E6E83] text-[14px] lg:text-[16px] font-Gilroy-Medium">
		Don't Have an Account? <a href="/signup" class="sign-up-link">Sign Up</a>
	</p>
</div>

<style>
	.sign-up-link {
		background: linear-gradient(95deg, #f71756 74.72%, #fdeb56 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		font-family: Gilroy-SemiBold;
	}

	.login-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 12px;
		padding: 14px 20px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.15);
	}

	.login-button:hover {
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.1);
	}

	.login-button img {
		width: 28px;
	}

	.login-button p {
		color: rgba(255, 255, 255, 0.5);
		font-family: Gilroy-Medium;
		font-size: 18px;
	}

	.continue-button {
		display: flex;
		width: 558px;
		padding: 14px 21px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 8px;
		background: rgba(253, 235, 86, 0.1);
	}

	.continue-button:hover {
		background: #fdeb56;
	}

	.continue-button p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
	}

	.continue-button:hover p {
		color: #282509;
	}

	@media (max-width: 1024px) {
		.login-button {
			padding: 14px 21px;
			gap: 12px;
		}

		.login-button img {
			width: 24px;
		}

		.login-button p {
			font-size: 14px;
		}

		.continue-button {
			width: 100%;
		}

		.continue-button p {
			font-size: 14px;
		}
	}
</style>
