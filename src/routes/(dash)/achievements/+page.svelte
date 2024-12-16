<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import badgeIcon from '$lib/assets/badge.svg';
	import NFTImage from '$lib/assets/nft-image2.png';
	import BigCheck from '$lib/assets/main-quest/big-check.svg';
	import Failed from '$lib/assets/failed.svg';
	import ClaimNow from '$lib/assets/badges-claim-now.svg';

	// Web3 Imports
	import { onMount } from 'svelte';
	import AddReview from '$components/UserRating/AddReview.svelte';
	import { getImageUrl } from '$lib/utils';
	import { invalidateAll } from '$app/navigation';
	import NftCard from '$components/Achievements/NftCard.svelte';
	import { claim as _claim, claimNFTBySig } from '$lib/connect';
	import { account, reconnectWallet } from '$lib/connect/web3Modal.js';

	export let data;

	let badges = [
		{
			name: 'OG Badge',
			earnDate: '11 March, 2024',
			icon: badgeIcon,
			claimable: true,
			type: 'default',
			isClaimed: false,
			loading: false
		}
	];

	function get_nft_image_url(nft) {
		const blockchain_network = nft.expand.blockchain_network;
		const name = blockchain_network.name.toLowerCase();

		if (name.includes('immutable')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.immutable_nft_img
			);
		}

		if (name.includes('ronin')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.ronin_nft_img
			);
		}

		if (name.includes('avalanche')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.avalanch_nft_img
			);
		}

		if (name.includes('polygon')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.polygon_nft_img
			);
		}

		if (name.includes('solana')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.solana_nft_img
			);
		}

		if (name.includes('sepolia')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.sepolia_nft_img
			);
		}

		if (name.includes('bnc')) {
			return getImageUrl(
				nft.expand.project.collectionId,
				nft.expand.project.id,
				nft.expand.project.bnc_nft_img
			);
		}

		return '';
	}

	onMount(() => {
		let list = [];
		data.my_nfts.forEach((nft) => {
			list.push({
				id: nft.id,
				loading: false,
				name: nft.expand.project.title,
				isClaimed: nft.claimed,
				earnDate: formatDate(new Date(nft.updated)),
				icon: get_nft_image_url(nft),
				claimable: nft.claimed ? false : true,
				type: 'project',
				pid: nft.expand.project.pid,
				blockchain_network:
					nft.blockchain_network != ''
						? nft.expand.blockchain_network.code
						: nft.expand.project.expand.blockchain_network.code
			});
		});

		list = list.sort((a, b) => b.isClaimed - a.isClaimed);

		nfts = [...nfts, ...list];
		const isExist = data.claimed_badges.find((f) => f.name == 'OG Badge');
		if (isExist) {
			badges[0].isClaimed = true;
			badges[0].claimable = false;
		}
	});

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

	let nfts = [];
	let showModal = false;
	let result = {
		success: true,
		title: '',
		desc: ''
	};

	const claim = async (badge) => {
		/*
		#TODO
		 return await claimNFTBySig(8888, 13473);
		 */
		if (badge.loading) return;
		let res;
		if (badge.type == 'default') {
			let index = badges.findIndex((f) => f.name == badge.name);
			badges[index].loading = true;
			res = await default_claim();
			badges[index].loading = false;
		} else if (badge.type == 'project') {
			let index = nfts.findIndex((f) => f.name == badge.name);
			nfts[index].loading = true;
			res = await project_claim(badge);
			nfts[index].loading = false;
		}

		if (res.ok) {
			invalidateAll();
			result.success = true;
			result.title = 'Claimed Successfully';
			result.desc = 'Congratulations, you have successfully claimed your NFT.';

			if (badge.type == 'default') {
				let copy = badges;
				copy[0].claimable = false;
				copy[0].isClaimed = true;
				badges = copy;
			} else if (badge.type == 'project') {
				let copy = nfts;
				const project_badge_index = copy.findIndex((f) => f.pid == badge.pid);
				copy[project_badge_index].isClaimed = true;
				copy[project_badge_index].claimable = false;
				nfts = copy;
			}
		} else if (res.ok == false) {
			result.success = false;
			result.title = 'Claimed Failed';
			result.desc = res.msg;
		}
		showModal = true;
	};

	const default_claim = async () => {
		if ($account.isConnected) {
			// return await claimNFTBySig(8888)
			const resposne = await _claim();
			if (resposne) {
				let res = await fetch(`/api/action/save_claimed_og`);
				res = await res.json();
				return res;
			}
		} else {
			console.error('User not connected');
			return false;
		}
	};

	// project nft code
	const project_claim = async (badge) => {
		const response = await claimNFTBySig(badge.pid, badge.blockchain_network, badge.id);
		if (response) {
			let res = await fetch(`/api/action/claim_project_nft`, {
				pid: badge.pid,
				id: badge.id,
				chainId: badge.blockchain_network
			});
			res = await res.json();
			return res;
		} else {
			return response;
		}
	};
</script>

<div class="my-[30px] px-[10px] sm:px-[30px]">
	<div class="flex gap-[10px] justify-start items-center">
		<a
			href="/"
			class="flex text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold gap-[10px]"
		>
			<img
				height="24px"
				width="24px"
				src={leftArrow}
				alt="left arrow icon"
				style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
			/>

			{$t('Explore')}
		</a>
		<img
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="inline-block overflow-hidden text-lg not-italic font-normal pointer-events-none text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			{$t('MyAchievements')}
		</p>
	</div>
</div>

<div class="px-[10px] sm:px-[30px] flex flex-col items-start gap-[48px]">
	<div class="flex flex-col items-start gap-[14px] w-full">
		<p class="text-[#FFFFFF99] text-[18px] font-Gilroy-Medium">{$t('Badges')}</p>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center gap-[23px] w-full"
		>
			{#each badges as badge}
				<div class={badge.isClaimed ? '' : ' duration-300 hover:translate-y-[-5px]'}>
					<div
						class={`flex flex-col justify-center items-center gap-[16px] p-[6px] rounded-[10px] relative w-full max-w-[257px] bg-[#200B26] hover:bg-[#29132F] newBorder `}
					>
						<img
							src={badge.icon}
							alt=""
							class={`${
								badge.isClaimed ? '' : 'grayscale'
							} w-full max-w-[245px] aspect-[245/180] object-cover`}
						/>
						<div class="flex flex-col items-center gap-[6px] w-full">
							<p class="text-[#E9E6EA] text-[20px] font-Gilroy-SemiBold">
								{badge.name}
							</p>
							{#if badge.isClaimed && !badge.claimable}
								<p class="text-[#68566E] text-[14px] font-Gilroy-Medium text-center mb-[16px]">
									{$t('Earned on')}
									{badge.earnDate}
								</p>
							{:else if badge.claimable}
								<button
									class="flex justify-center items-center gap-[4px] py-[8px] rounded-[4px] w-full bg-[#FDEB56]"
									on:click={() => claim(badge)}
								>
									{#if !badge.loading}
										<img src={ClaimNow} alt="" class="w-[16px]" />
										<p class="text-[#2A0D32] text-[14px] font-Gilroy-SemiBold text-center">
											{$t('Claim Now')}
										</p>
									{:else}
										...
									{/if}
								</button>
							{:else}
								<p class="text-[#68566E] text-[14px] font-Gilroy-Medium text-center">
									{$t('Complete to claim')}
								</p>
							{/if}
						</div>

						{#if badge.isClaimed}
							<div
								class="absolute top-[10px] right-[10px] px-[6px] pt-[3px] pb-[1px] rounded-[100px] bg-[#1FD031]"
							>
								<p class="text-[#2A0D32] text-[14px] font-Gilroy-Medium">{$t('Claimed')}</p>
							</div>
						{:else if badge.claimable}
							<div
								class="absolute top-[10px] right-[10px] px-[6px] pt-[3px] pb-[1px] rounded-[100px] bg-[#fdeb561a]"
							>
								<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">{$t('Claimable')}</p>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col items-start gap-[14px] w-full">
		<p class="text-[#FFFFFF99] text-[18px] font-Gilroy-Medium">{$t('Project Task NFT')}</p>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-center gap-[23px] w-full"
		>
			{#each nfts as item}
				<NftCard {item} call={claim} />
			{/each}
		</div>
	</div>
</div>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (showModal = false)}
		class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-[#0e0511e6] z-[51]"
	>
		<div
			class="flex flex-col items-center justify-center gap-[40px] md:gap-[57px] p-[16px] md:p-[20px] pt-[40px] md:pt-[57px] w-full max-w-[343px] md:max-w-[420px] rounded-[12px] md:rounded-[16px] border border-[#3D2644] bg-[#200B26]"
		>
			<div
				class="flex flex-col items-center justify-center gap-[24px] w-full max-w-[198px] md:max-w-[290px]"
			>
				{#if result.success}
					<img src={BigCheck} alt="" class="w-[120px] md:w-[140px]" />
				{:else}
					<img src={Failed} alt="" class="w-[120px] md:w-[140px]" />
				{/if}
				<div class="flex flex-col items-center justify-center gap-[6px] md:gap-[10px]">
					<p class="text-[#FFF] text-[24] md:text-[28px] text-center font-Gilroy-SemiBold">
						{result.title}
					</p>
					<p class="text-[#A99FAC] text-[12px] md:text-[16px] text-center font-Gilroy-Medium">
						{result.desc}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.linear-bg {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), #200b26;
	}

	.grid-auto-fit {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	.newBorder::before {
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 11px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, #656565 0%, rgba(255, 255, 255, 0) 100%);
	}

	.newBorder:hover::before {
		width: calc(100% + 2px);
		height: calc(100% + 2px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 11px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, #412c2d 0%, rgba(255, 255, 255, 0) 100%);
	}
</style>
