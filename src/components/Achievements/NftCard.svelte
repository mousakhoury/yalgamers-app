<script>
	import { t, locale } from '$lib/stores/i18n';
	import NFTLink from '$lib/assets/nft-link1.svg';
	import ClaimNow from '$lib/assets/badges-claim-now.svg';
	import { onMount } from 'svelte';
	import { account, reconnectWallet } from '$lib/connect';
	export let item;
	export let call;
	
	// $: $account.address != undefined && reconnectWallet();
	
	// onMount(async () => {
	// 	await reconnectWallet()
	// })

</script>

{#if item.isClaimed}
	<div class="p-[4px] overflow-hidden nft-card">
		<div class="fancy-border rounded-[10px] p-[1px]">
			<div class="p-[6px] aspect-square rounded-[10px] new-border bg-[#220C29] relative">
				<img
					src={item.icon}
					alt=""
					class="w-full aspect-square rounded-[9px] object-cover claimed-nft-image"
				/>
				<div class="p-[12px] flex items-start justify-between w-full absolute top-0 left-0">
					<div class="px-[6px] py-[2px] rounded-[100px] bg-[#1FD031]">
						<p class="text-[#2A0D32] text-[14px] font-Gilroy-Medium leading-[17px]">
							{$t('Claimed')}
						</p>
					</div>
					<a href="#" class="hidden nft-link">
						<img src={NFTLink} alt="" class="w-[30px]" />
					</a>
				</div>
				<div
					class="flex flex-col items-start justify-end p-[16.18px] w-full aspect-[263.96/140.233] bg-gradient rounded-b-[10px]"
				>
					<p class="text-[#E9E6EA] text-[14px] font-Gilroy-Bold">{item.name}</p>
				</div>
			</div>
		</div>
	</div>
{/if}

{#if item.claimable}
	<div class="p-[4px] overflow-hidden nft-card">
		<div class="fancy-border rounded-[10px] p-[1px]">
			<div class="p-[6px] aspect-square rounded-[10px] new-border bg-[#220C29] relative">
				<div
					class="flex justify-start gap-[3px] w-full aspect-square overflow-hidden nft-image-container"
				>
					<img
						src={item.icon}
						alt=""
						class="w-full aspect-square rounded-[6px] object-cover grayscale nft-image-gray"
					/>
					<img
						src={item.icon}
						alt=""
						class="w-full aspect-square rounded-[6px] object-cover nft-image-normal"
					/>
				</div>
				<div class="p-[12px] flex items-start justify-between w-full absolute top-0 left-0">
					<div class="px-[6px] py-[2px] rounded-[100px] bg-[#332F11]">
						<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px]">
							{$t('Claimable')}
						</p>
					</div>
				</div>
				<div
					class="flex flex-col items-start justify-end gap-[17.2px] p-[6.91px] w-full aspect-[263.96/140.233] bg-gradient-Claimable rounded-b-[10px]"
				>
					<p class="text-[#E9E6EA] text-[14px] font-Gilroy-Bold px-[3.4px]">{item.name}</p>
					<button
						on:click={() => call(item)}
						class="flex justify-center items-center gap-[4px] py-[8px] rounded-[4px] w-full bg-[#FDEB56] cursor-pointer z-10"
					>
						{#if !item.loading}
							<img src={ClaimNow} alt="" class="w-[16px]" />
							<p class="text-[#2A0D32] text-[14px] font-Gilroy-SemiBold text-center">
								{$t('Claim Now')}
							</p>
						{:else}
							...
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.new-border::after {
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

	.nft-card:hover .new-border::after {
		background: linear-gradient(180deg, #543e37 0%, rgba(255, 255, 255, 0) 100%);
	}

	.bg-gradient {
		background: linear-gradient(0deg, rgba(34, 12, 41, 0.9) 40.5%, rgba(34, 12, 41, 0) 100%);
		position: absolute;
		left: 0;
		bottom: -60px;
		opacity: 0;
		transition: 0.3s;
	}

	.nft-card:hover .bg-gradient {
		bottom: 0px;
		opacity: 1;
	}

	.nft-card:hover .nft-link {
		display: block;
	}

	.fancy-border {
		--offset: 3px;
		overflow: hidden;
		position: relative;
	}

	/* Conic gradient */
	.nft-card:hover .fancy-border::before {
		content: '';
		background: conic-gradient(transparent 270deg, #f1e052, transparent);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		aspect-ratio: 1;
		width: 100%;
		animation: rotate 3s linear infinite;
	}

	/* Overlay */
	.nft-card:hover .fancy-border::after {
		content: '';
		background: inherit;
		border-radius: inherit;
		position: absolute;
		inset: var(--offset);
		height: calc(100% - 2 * var(--offset));
		width: calc(100% - 2 * var(--offset));
	}

	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) scale(1.4) rotate(0turn);
		}

		to {
			transform: translate(-50%, -50%) scale(1.4) rotate(1turn);
		}
	}

	.claimed-nft-image {
		transform: scale(1);
		transition: 0.3s;
	}

	.nft-card:hover .claimed-nft-image {
		transform: scale(1.04);
	}

	.bg-gradient-Claimable {
		background: linear-gradient(0deg, rgba(34, 12, 41, 0.9) 40.5%, rgba(34, 12, 41, 0) 100%);
		position: absolute;
		left: 0;
		bottom: 0px;
		opacity: 1;
		transition: 0.3s;
	}

	.nft-image-container .nft-image-gray {
		transform: translateX(0%) scale(1);
		transition: 0.1s;
	}

	.nft-image-container .nft-image-normal {
		transform: translateX(0%) scale(0.5);
		transition: 0.1s;
	}

	.nft-card:hover .nft-image-gray {
		transform: translateX(-101%) scale(0.5);
	}

	.nft-card:hover .nft-image-normal {
		transform: translateX(-101%) scale(1);
	}

	.nft-card:hover .nft-image-gray:lang(ar) {
		transform: translateX(101%) scale(0.5);
	}

	.nft-card:hover .nft-image-normal:lang(ar) {
		transform: translateX(101%) scale(1);
	}
</style>
