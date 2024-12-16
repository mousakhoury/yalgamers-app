<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import addPhoto from '$lib/assets/upload.svg';
	import Button from '$components/Button.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import rightArrowSvg from '$lib/assets/small-right-arrow.svg';
	import editSvg from '$lib/assets/edit.svg?raw';
	import leftArrowSvg from '$lib/assets/arrow-left.svg';
	import facebook from '$lib/assets/facebook-auth.svg';
	import twitter from '$lib/assets/twitter-auth.svg';
	import insta from '$lib/assets/insta-auth.svg';
	import discord from '$lib/assets/discord-auth.svg';
	import unknown from '$lib/assets/unknown.png';
	import { user } from '$lib/stores/user';
	import { getImageUrl } from '$lib/utils';
	import Bio from '../../../components/Profile/Bio.svelte';
	import UserDetails from '../../../components/Profile/UserDetails.svelte';
	import ProfileLevels from '$components/ProfileLevels.svelte';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import LinkSocial from '$components/LinkSocial/LinkSocial.svelte';
	import EarnMore from '$components/Profile/EarnMore.svelte';
	import ProfileCover from '$components/NewProfile/ProfileCover.svelte';
	import ProfileUploadImage from '$components/NewProfile/ProfileUploadImage.svelte';
	import ProfileFollowers from '$components/NewProfile/ProfileFollowers.svelte';
	import Edit from '$lib/assets/profile/edit.svg';
	import EditHover from '$lib/assets/profile/edit-hover.svg';
	import ProfileBio from '$components/NewProfile/ProfileBio.svelte';
	import { onMount } from 'svelte';

	export let data;
	// $user = data.profile || null
	let confirmCover = false;
	let imageUpload;
	let avatarUpload;
	let confirmAvatar = false;
	let uploadedImage;
	let uploadedAvatar;
	let showEditDetails = false;
	let showEditBio = false;

	function handleImageUpload(e) {
		const image = e.target?.files?.[0];
		if (!image) return;
		// URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
		confirmCover = true;
		uploadedImage = URL.createObjectURL(image);
	}

	function handleAvatarUpload(e) {
		const image = e.target?.files?.[0];
		if (!image) return;
		// URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
		confirmAvatar = true;
		uploadedAvatar = URL.createObjectURL(image);
	}
	let entered = false;
	const images = {
		facebook: facebook,
		discord: discord,
		twitter: twitter,
		instagram: insta
	};
	function submitForm() {
		return ({ result }) => {
			if (result.data.success) {
				confirmCover = false;
				entered = false;
				$user = result.data.user;
				toast.push(result.data?.message);
			}
		};
	}
	function submitAvatarForm() {
		return ({ result }) => {
			if (result.data.success) {
				confirmAvatar = false;
				$user = result.data.user;
				toast.push(result.data?.message);
			}
		};
	}
	let coverUrl;
	$: if ($user.cover) {
		coverUrl = getImageUrl('users', $user.id, $user.cover);
	}
	let avatarUrl = unknown;
	$: if ($user.avatar) {
		avatarUrl = getImageUrl('users', $user.id, $user.avatar);
	}

	let isMobile = false;

	onMount(() => {
		// Set the isMobile variable based on the initial screen width
		isMobile = window.matchMedia('(max-width: 768px)').matches;

		// Add an event listener to update isMobile if the screen size changes
		const handleResize = () => {
			isMobile = window.matchMedia('(max-width: 768px)').matches;
		};

		window.addEventListener('resize', handleResize);

		// Clean up the event listener when the component is destroyed
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="">
	<div class="px-[16px] md:px-[30px] flex items-center justify-start mt-5 gap-3">
		<a
			role="button"
			href="/"
			class="flex items-center justify-center text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold"
		>
			<img
				class="mr-3 {$locale === 'ar' ? 'rotate-180' : ''}"
				alt=""
				src={leftArrowSvg}
				width="24px"
				height="24px"
			/>
			<p>{$t('Explore')}</p>
		</a>
		<img width="16px" height="16px" src={rightArrowSvg} alt="" />
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-lg not-italic font-normal text-white-40 font-Gilroy-SemiBold"
		>
			{$t('profile')}
		</p>
	</div>
	<!-- cover photo -->
	<div class="p-[16px] md:pt-[24px] md:px-[30px] pb-0 relative">
		<ProfileCover {coverUrl} />
		<div
			class="flex justify-center lg:justify-start w-full max-w-[1280px] absolute bottom-[-40px] md:bottom-[-60px] left-0 px-[40px] lg:px-[67px] lg:mx-[80px]"
		>
			<ProfileUploadImage {avatarUrl} />
		</div>
	</div>

	<div
		class="flex flex-col items-start gap-[20px] w-full max-w-[1280px] px-[16px] md:px-[40px] lg:px-[67px] mx-auto mt-[52px] md:mt-[80px]"
	>
		<div class="flex flex-col items-start gap-[16px] lg:gap-[40px] w-full">
			<div class="flex flex-col items-start gap-[20px] w-full">
				<div
					class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-[16px] lg:gap-[24px] w-full"
				>
					<div class="flex flex-col items-center md:items-start gap-[4px]">
						<p
							class="text-[#FFFFFFE5] text-[18px] md:text-[24px] font-Gilroy-SemiBold leading-[22px] md:leading-[29px]"
						>
							{$user.name}
						</p>
						<p
							class="text-[#7E6E83] text-[12px] md:text-[16px] font-Gilroy-Medium leading-[15px] md:leading-[19px]"
						>
							@{$user.username}
						</p>
					</div>

					{#if isMobile}
						<hr class="w-full border-[#FFFFFF1A]" />
						<ProfileBio bind:showEditBio />
						<hr class="w-full border-[#FFFFFF1A]" />
					{/if}

					<ProfileFollowers />
				</div>
				{#if !isMobile}
					<ProfileBio bind:showEditBio />
				{/if}
			</div>
			<hr class="w-full border-[#ffffff1a]" />
			<div class="flex flex-col lg:flex-row items-start gap-[24px] w-full">
				<div
					class="flex flex-col items-start gap-[12px] lg:gap-[14px] w-full pb-[12px] lg:pb-[19px] rounded-[8px] lg:rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
				>
					<div
						class="flex items-center justify-between p-[12px] lg:p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-[8px] lg:rounded-t-[12px]"
					>
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-[#FFFFFFE5] font-Gilroy-Medium text-[16px] lg:text-[18px]"
						>
							{$t('Personal Details')}
						</p>
						<button
							on:click={() => (showEditDetails = true)}
							class="flex items-center gap-[4px] hover:opacity-80"
						>
							<p class="text-[#FDEB56] text-[14px] lg:text-[16px] font-Gilroy-Medium">
								{$t('Edit Details')}
							</p>
							<img src={EditHover} alt="" class="w-[14px]" />
						</button>
					</div>
					<div
						class="flex flex-col items-start gap-[12px] lg:gap-[26px] w-full px-[12px] lg:px-[14px]"
					>
						<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[20px] w-full">
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('profile.name')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									{$user.name}
								</p>
							</div>
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('profile.username')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									@{$user.username}
								</p>
							</div>
						</div>
						<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[20px] w-full">
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('profile.email')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									{$user.email}
								</p>
							</div>
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('Mobile Number')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									{$user.phone}
								</p>
							</div>
						</div>
						<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[20px] w-full">
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('profile.country')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									{$user.country}
								</p>
							</div>
							<div
								class="flex flex-col items-start gap-[4px] w-full pb-[6px] lg:pb-[8px] border-b border-[#ffffff26]"
							>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
								>
									{$t('profile.city')}
								</p>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
								>
									{$user.city}
								</p>
							</div>
						</div>
						<div
							class="flex flex-col items-sta pb-[6px]rlg:t gap-[4px] w-full pb-[8px] border-b border-[#ffffff26]"
						>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
							>
								{$t('Metamask Address')}
							</p>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
							>
								{$user.metamask_address}
							</p>
						</div>
						<div
							class="flex flex-col items-sta pb-[6px]rlg:t gap-[4px] w-full pb-[8px] border-b border-[#ffffff26]"
						>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
							>
								{$t('Solana Address')}
							</p>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
							>
								{$user.solana_address}
							</p>
						</div>
						<div
							class="flex flex-col items-sta pb-[6px]rlg:t gap-[4px] w-full pb-[8px] border-b border-[#ffffff26]"
						>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFF66] text-[11px] lg:text-[12px] font-Gilroy"
							>
								{$t('Ronin Address')}
							</p>
							<p
								dir={$locale == 'ar' ? 'rtl' : 'ltr'}
								class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium"
							>
								{$user.ronin_address}
							</p>
						</div>
					</div>
				</div>
				<ProfileLevels />
			</div>
		</div>

		<LinkSocial {data} />
		<EarnMore
			referral_code={data.profile.referral_code}
			referral_url={data.profile.referral_url}
			referrals={data.profile.referrals}
		/>
	</div>
</div>
{#if showEditBio}
	<Bio bind:visible={showEditBio} />
{/if}
{#if showEditDetails}
	<UserDetails bind:visible={showEditDetails} />
{/if}

<style lang="postcss">
	:global(.edit-button) {
		--color_fill: #2a0d32;
	}
	:global(:root) {
		--toastBackground: #290c3deb;
		--toastColor: #299299;
		--toastBarWidth: 0%;
	}

	/* .friends {
		padding: 30px;
		border-radius: 16px;
		background: var(--Accent-2, #200b26);
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin-top: 30px;
	} */
</style>
