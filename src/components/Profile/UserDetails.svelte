<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Button from '$components/Button.svelte';
	import twitterSvg from '$lib/assets/twitter-auth.svg';
	import facebookSvg from '$lib/assets/facebook-auth.svg';
	import instaSvg from '$lib/assets/insta-auth.svg';
	import discordSvg from '$lib/assets/discord-auth.svg';
	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import intlTelInput from 'intl-tel-input';
	import 'intl-tel-input/build/css/intlTelInput.css';
	import LoginInput from '$components/NewLogin/LoginInput.svelte';
	import { enhance } from '$app/forms';

	export let visible = false;

	let loading = false;

	function waitForElm(selector) {
		return new Promise((resolve) => {
			if (document.querySelector(selector)) {
				return resolve(document.querySelector(selector));
			}

			const observer = new MutationObserver((mutations) => {
				if (document.querySelector(selector)) {
					observer.disconnect();
					resolve(document.querySelector(selector));
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}
	// var phoneInput;
	// const start = async () => {
	// 	const phoneInputField = await waitForElm('#phone');
	// 	phoneInput = intlTelInput(phoneInputField, {
	// 		utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
	// 		separateDialCode: true,
	// 		selectedDialcode: '',
	// 		nationalMode: false,
	// 		formatOnDisplay: true
	// 	});
	// };
	onMount(() => {
		// if (browser) {
		// 	start();
		// }
	});
</script>

<div
	class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full backdrop-blur-md bg-blur z-[90] p-[16px]"
>
	<div
		class=" w-full max-w-[480px] rounded-[12px] border border-[#321F37] bg-[#200B26] overflow-hidden"
	>
		<form
			action="?/details"
			method="post"
			use:enhance={({ formData }) => {
				loading = true;
				return ({ update, result }) => {
					loading = false;
				};
			}}
			class="flex flex-col items-start gap-[12px] w-full"
		>
			<div
				class="flex items-center justify-between p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-t-[12px]"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#FFFFFFE5] font-Gilroy-Medium text-[18px]"
				>
					{$t('Personal Details')}
				</p>
			</div>
			<div class="flex flex-col items-start gap-[24px] p-[12px] w-full h-[362px] overflow-y-auto">
				<LoginInput label={$t('profile.name')} name="name" type="text" bind:value={$user.name} />
				<LoginInput
					label={$t('profile.username')}
					name="username"
					type="username"
					bind:value={$user.username}
				/>
				<LoginInput
					label={$t('profile.email')}
					name="email"
					type="email"
					bind:value={$user.email}
				/>
				<LoginInput
					required={false}
					label={$t('Mobile Number')}
					name="phone"
					type="text"
					bind:value={$user.phone}
				/>
				<LoginInput
					required={false}
					label={$t('profile.country')}
					name="country"
					type="text"
					bind:value={$user.country}
				/>
				<LoginInput
					required={false}
					label={$t('profile.city')}
					name="city"
					type="text"
					bind:value={$user.city}
				/>
				<LoginInput
					disabled={true}
					label={$t('Metamask Address')}
					name="metamask"
					type="text"
					bind:value={$user.metamask_address}
				/>
				<LoginInput
					disabled={true}
					label={$t('Solana Address')}
					name="ronin"
					type="text"
					bind:value={$user.ronin_address}
				/>
				<LoginInput
					disabled={true}
					label={$t('Ronin Address')}
					name="solana"
					type="text"
					bind:value={$user.solana_address}
				/>

				<!-- <div class="bg-inputbg flex flex-col p-[10px] rounded-[10px]">
					<label
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-sm text-white-30 font-Gilroy-Medium">{$t('profile.phone')}</label
					>
					<input
						name="phone"
						id="phone"
						type="phone"
						value={$user.phone ?? ''}
						on:input={(e) => {
							if (!phoneInput.isValidNumber()) {
								e.target.style.color = 'red';
								e.target.style.transition = '0.2s ease';
							} else {
								e.target.style.color = 'white';
							}
						}}
						class="text-base outline-none bg-inputbg placeholder:font-Gilroy-Medium placeholder:text-white-50 text-white-90 font-Gilroy-SemiBold lg:text-lg"
						placeholder={$t('profile.placeholder.phone')}
					/>
				</div> -->

				<!-- <p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-white-70 font-Gilroy-SemiBold text-[20px] mt-4"
				>
					{$t('profile.socialMedia')}
				</p>
				<div class="bg-inputbg flex gap-[10px] p-[10px] rounded-[10px]">
					<img src={facebookSvg} width="40px" height="40px" />
					<div class="flex flex-col w-full">
						<label
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-sm text-white-30 font-Gilroy-Medium"
							>{$t('profile.socialLink', { platform: 'Facebook' })}</label
						>
						<input
							name="facebook"
							type="link"
							value={$user.facebook ?? ''}
							class="text-base outline-none bg-inputbg placeholder:font-Gilroy-Medium placeholder:text-white-50 text-white-90 font-Gilroy-SemiBold lg:text-lg"
							placeholder={$t('socialLink.placeholder', { platform: 'Facebook' })}
						/>
					</div>
				</div>
				<div class="bg-inputbg flex gap-[10px] p-[10px] rounded-[10px]">
					<img src={instaSvg} width="40px" height="40px" />
					<div class="flex flex-col w-full">
						<label
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-sm text-white-30 font-Gilroy-Medium"
							>{$t('profile.socialLink', { platform: 'Instagram' })}</label
						>
						<input
							name="instagram"
							type="link"
							value={$user.instagram ?? ''}
							class="text-base outline-none bg-inputbg placeholder:font-Gilroy-Medium placeholder:text-white-50 text-white-90 font-Gilroy-SemiBold lg:text-lg"
							placeholder={$t('socialLink.placeholder', { platform: 'Instagram' })}
						/>
					</div>
				</div>
				<div class="bg-inputbg flex gap-[10px] p-[10px] rounded-[10px]">
					<img src={twitterSvg} width="40px" height="40px" />
					<div class="flex flex-col w-full">
						<label
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-sm text-white-30 font-Gilroy-Medium"
							>{$t('profile.socialLink', { platform: 'Twitter' })}</label
						>
						<input
							name="twitter"
							type="link"
							value={$user.twitter ?? ''}
							class="text-base outline-none bg-inputbg placeholder:font-Gilroy-Medium placeholder:text-white-50 text-white-90 font-Gilroy-SemiBold lg:text-lg"
							placeholder={$t('socialLink.placeholder', { platform: 'Twitter' })}
						/>
					</div>
				</div>
				<div class="bg-inputbg flex gap-[10px] p-[10px] rounded-[10px]">
					<img src={discordSvg} width="40px" height="40px" />
					<div class="flex flex-col w-full">
						<label
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-sm text-white-30 font-Gilroy-Medium"
							>{$t('profile.socialLink', { platform: 'Discord' })}</label
						>
						<input
							name="discord"
							type="link"
							value={$user.discord ?? ''}
							class="text-base outline-none bg-inputbg placeholder:font-Gilroy-Medium placeholder:text-white-50 text-white-90 font-Gilroy-SemiBold lg:text-lg"
							placeholder={$t('socialLink.placeholder', { platform: 'Discord' })}
						/>
					</div>
				</div> -->
			</div>
			<div
				class="flex justify-end items-center gap-4 w-full p-[12px] bg-[#2D1932] border-t border-[#39273F]"
			>
				<Button
					type="primary"
					on:click={() => {
						visible = false;
					}}
					class="bg-white-20 text-[#FFFFFFCC] text-[16px] font-Gilroy-SemiBold w-full"
					>{$t('cancel')}</Button
				>
				<Button type="gradient" size="md" class="text-[16px] font-Gilroy-SemiBold w-full">
					{#if loading}
						{@html `<div
					class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status">
					<span
					  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					  >Loading...</span
					>
				  </div>`}
					{:else}
						{$t('save')}
					{/if}
				</Button>
			</div>
		</form>
	</div>
</div>

<style>
	:global(.iti__country-list) {
		background: #280e30;
		color: white;
		border-radius: 10px;
		max-height: 300px;
	}
	:global(.iti__flag) {
		display: none;
	}
	:global(.iti__selected-dial-code) {
		background: transparent;
		color: white;
		max-height: 300px;
		font-size: 1.125rem;
		font-family: Gilroy-SemiBold;
	}
	:global(.iti__selected-flag) {
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>
