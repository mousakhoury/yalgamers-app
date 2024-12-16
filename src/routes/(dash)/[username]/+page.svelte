<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import ProfileImage from '$lib/assets/public-profile/profile-image.png';
	import CoverImage from '$lib/assets/public-profile/cover-image.png';
	import Instagram from '$lib/assets/public-profile/instagram.svg';
	import Telegram from '$lib/assets/public-profile/telegram.svg';
	import Facebook from '$lib/assets/public-profile/facebook.svg';
	import Discord from '$lib/assets/public-profile/discord.svg';
	import Twitter from '$lib/assets/public-profile/twitter.svg';
	import Twitch from '$lib/assets/public-profile/twitch.svg';
	import Follow from '$lib/assets/public-profile/follow.svg';
	import Chat from '$lib/assets/public-profile/chat.svg';
	import NFTImage from '$lib/assets/nft-image2.png';
	import ProfileInfo from '$components/PublicProfile/ProfileInfo.svelte';
	import NftCard from '$components/Achievements/NftCard.svelte';
	import { getImageUrl } from '$lib/utils';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import { invalidate, invalidateAll } from '$app/navigation';

	export let data;
	const currentLevel = $levels.findIndex((x) => x.start <= data.xps && data.xps <= x.end);
	const percentage =
		((data.xps - (currentLevel ? $levels[currentLevel - 1].end : 0)) /
			($levels[currentLevel].end - $levels[currentLevel].start)) *
		100;

	$: socialMedia = [];
	if (data.profile.telegram) {
		socialMedia.push({
			name: 'Telegram',
			icon: Telegram,
			link: data.profile.telegram
		});
	}
	if (data.profile.twitter) {
		socialMedia.push({
			name: 'Twitter',
			icon: Twitter,
			link: data.profile.twitter
		});
	}
	if (data.profile.facebook) {
		socialMedia.push({
			name: 'Facebook',
			icon: Facebook,
			link: data.profile.facebook
		});
	}
	if (data.profile.instagram) {
		socialMedia.push({
			name: 'Instagram',
			icon: Instagram,
			link: data.profile.instagram
		});
	}
	if (data.profile.discord) {
		socialMedia.push({
			name: 'Discord',
			icon: Discord,
			link: data.profile.discord
		});
	}
	if (data.profile.twitch) {
		socialMedia.push({
			name: 'Twitch',
			icon: Twitch,
			link: data.profile.twitch
		});
	}

	let nfts = [];
	let loading = false;
	$: followers = data.followers;

	function formatDate(date) {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${day} ${month}, ${year}`;
	}

	let unfollow = false;

	onMount(() => {
		if (data.followers && data.followers.find((f) => f.id == data.profile.id)) {
			unfollow = true;
		}

		let list = [];
		data.my_nfts.forEach((nft) => {
			list.push({
				loading: false,
				name: nft.expand.project.title,
				isClaimed: nft.claimed,
				earnDate: formatDate(new Date(nft.updated)),
				icon:
					nft.expand.project.nft_img == ''
						? ''
						: getImageUrl(
								nft.expand.project.collectionId,
								nft.expand.project.id,
								nft.expand.project.nft_img
						  ),
				claimable: nft.claimed ? false : true,
				type: 'project',
				pid: nft.expand.project.pid
			});
		});

		nfts = list.sort((a, b) => b.isClaimed - a.isClaimed);
	});

	let user = data.user;
</script>

<div class="p-[16px] md:pt-[24px] md:px-[30px] pb-0 relative">
	{#if user.cover}
		<img
			src={getImageUrl('users', user.id, user.cover)}
			alt=""
			class="w-full h-[140px] md:h-[220px] rounded-[8px] md:rounded-[16px] object-cover border border-[#ffffff1a]"
		/>
	{:else}
		<img
			src={CoverImage}
			alt=""
			class="w-full h-[140px] md:h-[220px] rounded-[8px] md:rounded-[16px] object-cover border border-[#ffffff1a]"
		/>
	{/if}
	<div
		class="flex justify-center lg:justify-start w-full max-w-[1280px] absolute bottom-[-40px] md:bottom-[-60px] left-[50%] translate-x-[-50%] px-[40px] lg:px-[67px]"
	>
		{#if user.avatar}
			<img
				src={getImageUrl('users', user.id, user.avatar)}
				alt=""
				class="w-[80px] md:w-[120px] h-[80px] md:h-[120px] object-cover rounded-full box-shadow"
			/>
		{:else}
			<img
				src={ProfileImage}
				alt=""
				class="w-[80px] md:w-[120px] h-[80px] md:h-[120px] object-cover rounded-full box-shadow"
			/>
		{/if}
	</div>
</div>

<div
	class="flex flex-col items-start gap-[20px] w-full max-w-[1280px] px-[16px] md:px-[40px] lg:px-[67px] mx-auto mt-[52px] md:mt-[80px]"
>
	<div class="flex flex-col items-start gap-[24px] w-full">
		<div
			class="flex flex-col md:flex-row items-center justify-center md:justify-between gap-[24px] w-full"
		>
			<div class="flex flex-col items-center md:items-start gap-[4px]">
				<p
					class="text-[#FFFFFFE5] text-[18px] md:text-[24px] font-Gilroy-SemiBold leading-[22px] md:leading-[29px]"
				>
					{user.name}
				</p>
				<p
					class="text-[#7E6E83] text-[12px] md:text-[16px] font-Gilroy-Medium leading-[15px] md:leading-[19px]"
				>
					@{user.username}
				</p>
			</div>
			{#if user.id != data.profile.id}
				<div class="flex items-center gap-[18px]">
					<button
						class="flex items-center gap-[6px] py-[10px] pl-[12px] pr-[18px] rounded-[4px] border border-[#8ec9ed1a] bg-[#8ec9ed26] relative"
					>
						<img src={Chat} alt="" class="w-[20px]" />
						<p class="text-[#8EC9ED] text-[16px] font-Gilroy-SemiBold leading-[20px]">
							{$locale === 'ar' ? 'أرسل رسالة' : 'Message'}
						</p>
						<div
							class="p-[2px] rounded-[100px] bg-[#24102A] absolute top-[-13px] lg:top-[-9px] {$locale ===
							'ar'
								? 'right-[-24px] lg:right-[-27px]'
								: 'left-[-37px] lg:left-[-61px]'}"
						>
							<div class="rounded-[100px] bg-[#792341] py-[4px] px-[5px]">
								<p
									class="text-[#E9E6EA] text-[8px] lg:text-[10px] font-Gilroy leading-[10px] lg:leading-[12px]"
								>
									{$t('Coming Soon')}
								</p>
							</div>
						</div>
					</button>
					{#if unfollow}
						<form
							action="?/unfollow"
							method="post"
							use:enhance={() => {
								loading = true;
								return ({ result }) => {
									if (result.data.ok) {
										followers = followers.filter((f) => f.id != data.profile.id);
									}
									unfollow = false;
									loading = false;
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button
								class="flex items-center gap-[6px] py-[10px] pl-[12px] pr-[18px] rounded-[4px] bg-[#FDEB56]"
							>
								<p class="text-[#131105] text-[16px] font-Gilroy-SemiBold leading-[20px]">
									{$t('Unfollow')}
									{loading ? '...' : ''}
								</p>
							</button>
						</form>
					{:else}
						<form
							action="?/follow"
							method="post"
							use:enhance={() => {
								loading = true;
								return ({ result }) => {
									if (result.data.ok) {
										followers = [
											...followers,
											{ id: data.profile.id, avatar: data.profile.avatar }
										];
									}
									unfollow = true;
									loading = false;
								};
							}}
						>
							<input type="hidden" name="id" value={user.id} />
							<button
								class="flex items-center gap-[6px] py-[10px] pl-[12px] pr-[18px] rounded-[4px] bg-[#FDEB56]"
							>
								<img src={Follow} alt="" class="w-[20px]" />
								<p class="text-[#131105] text-[16px] font-Gilroy-SemiBold leading-[20px]">
									{$t('Follow')}
									{loading ? '...' : ''}
								</p>
							</button>
						</form>
					{/if}
				</div>
			{/if}
		</div>
		<hr class="w-full border-[#ffffff1a]" />

		<ProfileInfo {user} {followers} xp={data.xps} />

		<hr class="w-full border-[#ffffff1a]" />
	</div>

	<div class="flex flex-col items-start gap-[24px] w-full">
		{#if socialMedia.length !== 0}
			<div
				class="flex flex-col items-start gap-[10px] md:gap-[12px] w-full pb-[20px] border-b border-[#ffffff1a]"
			>
				<p
					class="text-[#FFFFFFCC] text-[14px] md:text-[16px] font-Gilroy-SemiBold leading-[17px] md:leading-[20px]"
				>
					{$t('SocialMedia')}
				</p>
				<div class="flex items-center gap-[4px] md:gap-[8px]">
					{#each socialMedia as item}
						<a href={item.link}>
							<img src={item.icon} alt={item.name} class="w-[30px] md:w-[36px]" />
						</a>
					{/each}
				</div>
			</div>
		{/if}
		<div class="flex flex-col items-start gap-[12px] md:gap-[16px] w-full">
			<p
				class="text-[#FFFFFFCC] text-[20px] md:text-[24px] font-Gilroy-SemiBold leading-[25px] md:leading-[29px]"
			>
				{$t('Projects NFT’s Achieved')}
			</p>
			<div
				class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] md:gap-[24px] w-full"
			>
				{#each nfts as item}
					<NftCard {item} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.box-shadow {
		box-shadow: 0 0 0 12px #280e30;
	}

	@media (max-width: 768px) {
		.box-shadow {
			box-shadow: 0 0 0 6px #280e30;
		}
	}
</style>
