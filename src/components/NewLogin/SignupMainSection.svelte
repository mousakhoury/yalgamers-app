<script>
	import google from '$lib/assets/login/google.svg';
	import twitter from '$lib/assets/login/twitter.svg';
	import metaMast from '$lib/assets/login/metamask.svg';
	import BackArrow from '$lib/assets/login/back-arrow.svg';
	import { goto } from '$app/navigation';
	import { account, handleConnectWallet } from '$lib/connect';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	$: {
		if ($account.isConnected) {
			goto('/personal-details');
		}
	}
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
</script>

<div
	class="flex items-center justify-center px-[16px] lg:px-[41px] py-[20px] lg:py-[24px] w-full h-full"
>
	<div class="flex flex-col items-center justify-between w-full h-full">
		<div class="flex flex-col items-start lg:items-center gap-[24px] lg:gap-0 w-full lg:h-full">
			<div class="flex items-start w-full max-w-[558px] lg:pt-[26px]">
				<a href="/" class="flex items-center gap-[6px] lg:gap-[10px]">
					<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
					<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
				</a>
			</div>
			<div class="flex items-center justify-center w-full lg:h-full">
				<div class="flex flex-col items-center gap-[16px] lg:gap-[32px] w-full max-w-[558px]">
					<div class="flex flex-col items-start lg:items-center gap-[6px]">
						<h1
							class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
						>
							Register Today, Gain Insights!
						</h1>
						<p
							class="text-[#A99FAC] text-[14px] lg:text-[18px] text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
						>
							Dive Deep into Web3 Technologies with us!
						</p>
					</div>
					<div class="flex flex-col items-start gap-[12px] lg:gap-[24px] w-full">
						<div class="flex flex-col lg:flex-row items-start gap-[12px] lg:gap-[24px] w-full">
							<button on:click={() => ssoLogin('google')} class="login-button">
								<img src={google} alt="" />
								<p>Continue With Google</p>
							</button>
							<button on:click={() => ssoLogin('twitter')} class="login-button">
								<img src={twitter} alt="" />
								<p>Continue With X</p>
							</button>
						</div>
						<button
							class="login-button"
							on:click={() => {
								if ($account.isConnected) {
									goto('/signup/personal-details');
								} else {
									handleConnectWallet();
								}
							}}
						>
							<img src={metaMast} alt="" />
							<p>Continue With Wallet</p>
						</button>
					</div>
				</div>
			</div>
		</div>
		<p class="text-[#7E6E83] text-[14px] lg:text-[16px] font-Gilroy-Medium">
			Already Have an Account? <a href="/login" class="sign-up-link">Sign In</a>
		</p>
	</div>
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
