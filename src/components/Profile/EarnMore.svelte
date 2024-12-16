<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import MyReferrals from './MyReferrals.svelte';
	import copyIcon from '$lib/assets/profile/copy-icon.svg';
	import copiedIcon from '$lib/assets/profile/copied-icon.svg';
	import telegram from '$lib/assets/telegram-share-icon.svg';
	import whatsapp from '$lib/assets/whatsapp-share-icon.svg';
	import messenger from '$lib/assets/messenger-share-icon.svg';
	import gmail from '$lib/assets/gmail-share-icon.svg';
	import Arrow from '$lib/assets/profile/see-all-arrow.svg';

	import horizontal from '$lib/assets/link-horizontal-line.svg';
	import { page } from '$app/stores';

	import TotalReferrals from '$lib/assets/profile/total-referrals.svg';
	import LinkShared from '$lib/assets/profile/link-share.svg';
	import TotalXP from '$lib/assets/profile/total-xp.svg';
	import XPPerReferral from '$lib/assets/profile/xp-per-referrals.svg';
	import ProfileShowUsers from '$components/NewProfile/ProfileShowUsers.svelte';

	export let referral_code;
	export let referral_url;
	export let referrals = [];

	let showReferrals = false;

	$: shareIcons = [
		{
			image: telegram,
			like: ''
		},
		{
			image: whatsapp,
			like: ''
		},
		{
			image: messenger,
			like: ''
		},
		{
			image: gmail,
			like: ''
		}
	];

	// I assume you have a Svelte component, so we'll use Svelte's reactivity
	let currentIcon = copyIcon; // This will be reactive
	let currentText = 'Copy';

	function copyReferralCode() {
		const referralCode = referral_code;
		navigator.clipboard
			.writeText(referralCode)
			.then(() => {
				// Change the icon to 'copied'
				currentIcon = copiedIcon;
				currentText = 'Copied!';

				// Set a timeout to revert the icon back to 'copy' after 2 seconds
				setTimeout(() => {
					currentIcon = copyIcon;
					currentText = 'Copy';
				}, 2000);
			})
			.catch((err) => console.error('Error copying text: ', err));
	}

	// I assume you have a Svelte component, so we'll use Svelte's reactivity
	let currentIcon2 = copyIcon; // This will be reactive
	let currentText2 = 'Copy';

	function copyReferralCode2() {
		const referralCode = referral_url;
		navigator.clipboard
			.writeText(referralCode)
			.then(() => {
				// Change the icon to 'copied'
				currentIcon2 = copiedIcon;
				currentText2 = 'Copied!';

				// Set a timeout to revert the icon back to 'copy' after 2 seconds
				setTimeout(() => {
					currentIcon2 = copyIcon;
					currentText2 = 'Copy';
				}, 2000);
			})
			.catch((err) => console.error('Error copying text: ', err));
	}

	function truncateReferralUrl(url) {
		const maxLength = 30; // Set your desired maximum length
		if (url.length > maxLength) {
			return url.slice(0, maxLength) + '...';
		}
		return url;
	}

	$: shortenedReferralUrl = truncateReferralUrl(referral_url);
</script>

<div
	class="flex flex-col items-start gap-[12px] lg:gap-[14px] w-full pb-[12px] lg:pb-[14px] rounded-[8px] lg:rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
>
	<div
		class="flex items-center justify-between p-[12px] lg:p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-t-[8px] lg:rounded-t-[12px]"
	>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-[#FFFFFFE5] font-Gilroy-Medium text-[16px] lg:text-[18px]"
		>
			{$t('Referrals')}
		</p>

		<button
			on:click={() => {
				showReferrals = true;
			}}
			class="flex items-center gap-[4px] hover:opacity-80"
		>
			<p class="text-[#FDEB56] text-[14px] lg:text-[16px] font-Gilroy-Medium">
				{$t('See All Referrals')}
			</p>
			<img src={Arrow} alt="" class="w-[14px] {$locale === 'ar' ? 'rotate-180' : ''}" />
		</button>
	</div>
	<div class="flex flex-col items-start gap-[12px] lg:gap-[14px] px-[12px] lg:px-[14px] w-full">
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-[12px] lg:gap-[14px] w-full">
			<div
				class="flex items-center gap-[10px] lg:gap-[14px] p-[5px] lg:p-[10px] rounded-[6px] bg-[#1F2628]"
			>
				<img src={TotalReferrals} alt="" class="w-[40px] lg:w-[48px]" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#1FD031] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('My Total Referrals')}
					</p>
					<p class="text-[#FFFFFFCC] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
						{referrals.length}
					</p>
				</div>
			</div>
			<!-- <div
				class="flex items-center gap-[10px] lg:gap-[14px] p-[5px] lg:p-[10px] rounded-[6px] bg-[#36212B]"
			>
				<img src={LinkShared} alt="" class="w-[40px] lg:w-[48px]" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#FDEB56] text-[11px] lg:text-[14px] font-Gilroy-Medium">Link Shared</p>
					<p class="text-[#FFFFFFCC] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">00</p>
				</div>
			</div> -->
			<div
				class="flex items-center gap-[10px] lg:gap-[14px] p-[5px] lg:p-[10px] rounded-[6px] bg-[#302744]"
			>
				<img src={TotalXP} alt="" class="w-[40px] lg:w-[48px]" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#8EC9ED] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('Total Earned XP')}
					</p>
					<p class="text-[#FFFFFFCC] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">
						{referrals.length * 50} XP
					</p>
				</div>
			</div>
			<div
				class="flex items-center gap-[10px] lg:gap-[14px] p-[5px] lg:p-[10px] rounded-[6px] bg-[#371740]"
			>
				<img src={XPPerReferral} alt="" class="w-[40px] lg:w-[48px]" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#BC5AD7] text-[11px] lg:text-[14px] font-Gilroy-Medium">
						{$t('XP Per Referral')}
					</p>
					<p class="text-[#FFFFFFCC] text-[16px] lg:text-[18px] font-Gilroy-SemiBold">50 XP</p>
				</div>
			</div>
		</div>
		<hr class="w-full border-[#36233C]" />

		<div class="flex flex-col items-start gap-[8px] lg:gap-[12px] w-full">
			<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">
				{$t('Sharing Information')}
			</p>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-[12px] lg:gap-[50px] w-full">
				<div
					class="flex items-center justify-between pb-[6px] lg:pb-[8px] border-b border-[#ffffff26] w-full"
				>
					<div class="flex flex-col items-start gap-[4px]">
						<p class="text-[#8EC9ED] text-[11px] lg:text-[12px] font-Gilroy">
							{$t('My Referral Code')}
						</p>
						<p class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium">
							{referral_code}
						</p>
					</div>
					<button
						on:click={copyReferralCode}
						class="flex items-center gap-[8px] opacity-70 hover:opacity-100 group"
					>
						<p
							class="text-[16px] font-Gilroy-Medium {currentText === 'Copy'
								? 'text-[#C6C1C7] hidden group-hover:block'
								: 'text-[#1FD031] block'}"
						>
							{currentText}
						</p>
						<img src={currentIcon} alt="" />
					</button>
				</div>
				<div
					class="flex items-center justify-between pb-[6px] lg:pb-[8px] border-b border-[#ffffff26] w-full"
				>
					<div class="flex flex-col items-start gap-[4px]">
						<p class="text-[#8EC9ED] text-[11px] lg:text-[12px] font-Gilroy">
							{$t('My Referral Link')}
						</p>
						<p class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium">
							{shortenedReferralUrl}
						</p>
					</div>
					<button
						on:click={copyReferralCode2}
						class="flex items-center gap-[8px] opacity-70 hover:opacity-100 group"
					>
						<p
							class="text-[16px] font-Gilroy-Medium {currentText2 === 'Copy'
								? 'text-[#C6C1C7] hidden group-hover:block'
								: 'text-[#1FD031] block'}"
						>
							{currentText2}
						</p>
						<img src={currentIcon2} alt="" />
					</button>
				</div>
			</div>
		</div>

		<!-- <div class="flex flex-col items-start gap-[6px] lg:gap-[8px]">
			<p class="text-[#FFFFFF80] text-[12px] font-Gilroy">{$t('Or share with')}...</p>
			<div class="flex items-center gap-[4px]">
				{#each shareIcons as icon}
					<button>
						<img src={icon.image} alt="" class="w-[28px] lg:w-[36px]" />
					</button>
				{/each}
			</div>
		</div> -->
	</div>
</div>

{#if showReferrals}
	<ProfileShowUsers
		label={$t('My Referrals')}
		type="referrals"
		bind:boolean={showReferrals}
		items={referrals}
	/>
{/if}
