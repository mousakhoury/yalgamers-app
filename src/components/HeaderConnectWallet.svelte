<script>
	import TransactionHistory from './TransactionHistory.svelte';
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';
	import MetaMask from '$lib/assets/metamask_1.svg';
	import Disconnect from '$lib/assets/disconnect-wallet1.svg';
	import DisconnectDesktop from '$lib/assets/disconnect-wallet.svg';
	import ArrowDown from '$lib/assets/Arrow - Down.svg';
	import Wallet from '$lib/assets/Wallet.svg';
	import WalletGold from '$lib/assets/header/Wallet-gold.svg';
	import Copy from '$lib/assets/header/copy.svg';
	import Solona from '$lib/assets/solona.svg';
	import Ronin from '$lib/assets/ronin.svg';
	import PlusSign from '$lib/assets/plus-sign.svg';
	import MyWallet from '$lib/assets/header/my-wallet.svg';
	import Reconnect from '$lib/assets/header/reconnect.svg';

	import SendImage from '$lib/assets/header/send.svg';
	import SendHover from '$lib/assets/header/send-hover.svg';
	import DepositImage from '$lib/assets/header/deposit.svg';
	import DepositHover from '$lib/assets/header/deposit-hover.svg';

	import LinkArrow from '$lib/assets/duble-right.svg';
	import LinkArrowYellow from '$lib/assets/duble-right-yellow2.svg';

	// Web3 Imports
	import {
		account,
		chainId,
		checkAddressInDB,
		getBalances,
		handleConnectWallet,
		handleDisConnectWallet,
		saveAddress,
		showPopup,
		wagmiConfig
	} from '$lib/connect';
	import { shortenAddress } from '$lib/utils.js';
	import { user } from '$lib/stores/user';
	import { WalletMultiButton, WalletConnectButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import Deposit from './Deposit.svelte';
	import Send from './SendCoin.svelte';
	import SendCoin from './SendCoin.svelte';

	export let btnHandler;
	export let username;
	export let avatar;
	export let open = false;
	let tooltip = false;
	let tooltip_msg = 'copy';
	let openDeposit = false;
	let openSend = false;
	let openHistory = false;

	let openWallets = false;
	let hasSetBalances = false;
	let pol = '0';
	let usdt = '0';

	$: if ($user && $user.custodial_wallet && !hasSetBalances) {
		getBalances($user.custodial_wallet).then((res) => {
			({ pol, usdt } = res);
			hasSetBalances = true;
		});
	}
	let onClose = () => {
		open = false;
		handleDisConnectWallet();
	};
	async function disconnectWrongWallet() {
		if ($walletStore.publicKey) {
			let connectedAddress = $walletStore.publicKey.toBase58().toLowerCase();
			const pathname = window.location.pathname;
			if (pathname === '/login' || pathname === '/personal-details') {
				return;
			}
			const req = await fetch('/api/web3/get-accounts');
			const res = await req.json();
			const { solana_address: savedAddress } = res;
			if (!savedAddress || savedAddress === '') {
				const userHasWallet = await checkAddressInDB(connectedAddress);
				if (userHasWallet) {
					await saveAddress('solana_address', connectedAddress);
				} else {
					showPopup(
						`The wallet ${shortenAddress(
							connectedAddress
						)} is already connected with a different account.`
					);
					$walletStore.disconnect();
				}
			} else {
				if (connectedAddress !== savedAddress) {
					showPopup(
						`The account is already connected to this wallet ${shortenAddress(savedAddress)}`
					);
					await $walletStore.disconnect();
				}
			}
		}
	}

	$: $walletStore.publicKey && disconnectWrongWallet();

	function closePopup() {
		onClose();
	}

	function copy_user_name(e) {
		e.stopPropagation();
		e.preventDefault();
		navigator.clipboard.writeText(`@${$user.username}`);
		tooltip_msg = 'copied';
	}

	function count_connected_wallets() {
		let n = 0;
		if ($user.metamask_address != '') {
			n += 1;
		}
		if ($user.ronin_address != '') {
			n += 1;
		}
		if ($user.solana_address != '') {
			n += 1;
		}
		return n;
	}
</script>

<div class={`flex flex-col items-start w-full ${$account.address ? 'gap-[8px]' : 'gap-[16px]'}  `}>
	<button on:click={btnHandler} class="w-full p-[6px] hover:bg-[#ffffff14] rounded-[6px] group">
		<a href="/profile" class="flex items-center justify-between w-full">
			<div class="flex items-center gap-[12px]">
				<img
					src={avatar}
					alt=""
					class="w-[42px] lg:w-[56px] h-[42px] lg:h-[56px] rounded-[4px] border border-[#ffffff1a] object-cover"
				/>
				<div class="flex flex-col items-start gap-[4px]">
					<p
						class="text-[#E9E6EA] text-[14px] lg:text-[20px] font-Gilroy-SemiBold leading-[17px] lg:leading-[25px]"
					>
						{$user.name}
					</p>
					<button
						on:click={copy_user_name}
						on:mouseenter={() => (tooltip = true)}
						on:mouseleave={() => {
							tooltip = false;
							tooltip_msg = 'copy';
						}}
						class="text-[#FFFFFF80] relative text-[12px] lg:text-[16px] font-Gilroy leading-[14px] lg:leading-[19px] hover:underline"
					>
						@{$user.username}
						{#if tooltip}
							<span class="absolute rounded-full px-2 bg-primary-background-10">{tooltip_msg}</span>
						{/if}
					</button>
				</div>
			</div>

			<div class="flex items-center gap-[4px]">
				<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium hidden group-hover:block">
					{$t('ViewProfile')}
				</p>
				<img
					src={LinkArrow}
					alt=""
					class="w-[14px] lg:w-[20px] group-hover:hidden {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
				<img
					src={LinkArrowYellow}
					alt=""
					class="w-[14px] lg:w-[20px] hidden group-hover:block {$locale === 'ar'
						? 'rotate-180'
						: ''}"
				/>
			</div>
		</a>
	</button>

	<!-- Testing Element -->
	<div class="w-full">
		<div
			class="flex flex-col items-start w-full px-[8px] lg:px-[10px] rounded-[4px] border border-[#ffffff0d] bg-[#ffffff0d] {openWallets
				? 'pb-[10px] gap-[10px]'
				: 'hover:bg-[#FFFFFF14]'}"
		>
			<button
				on:click={() => {
					openWallets = !openWallets;
				}}
				class="flex items-center justify-between w-full py-[10px] {openWallets
					? 'border-b border-[#FFFFFF0D]'
					: ''} "
			>
				<div class="flex items-center gap-[4px]">
					<div class="flex items-center gap-[10px]">
						<img src={Wallet} alt="" />
						<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium">{$t('MyWallets')}</p>
					</div>
					<p class="text-[#FFFFFF4D] text-[14px] font-Gilroy">
						({count_connected_wallets()}
						{$t('Connected')})
					</p>
				</div>
				<img src={ArrowDown} alt="" class={openWallets ? ' rotate-180' : ''} />
			</button>

			<div
				class="flex flex-col items-start gap-[16px] w-full duration-100 {openWallets
					? `${$locale === 'ar' ? 'h-[345px]' : 'h-[345px]'} visible opacity-100`
					: 'h-0 invisible opacity-0'}"
			>
				<div class="flex flex-col items-start gap-[10px] w-full">
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center gap-[10px]">
							<img src={MyWallet} alt="" class="w-[32px] lg:w-[40px]" />
							<div class="flex flex-col items-start gap-[4px] w-full">
								<div class="flex items-start justify-between w-full">
									<p class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-Medium">
										My Wallet
									</p>
									<button on:click={() => (openHistory = true)} class="lg:hidden">
										<img src={Reconnect} alt="" class="hover:bg-[#FFFFFF14]" />
									</button>
								</div>
								<div class="flex items-center gap-[6px]">
									<div class="flex items-center gap-[4px]">
										<img src={WalletGold} alt="" class="w-[14px]" />
										<p
											class="text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-Medium shrink-0"
										>
											Wallet Address:
										</p>
									</div>
									<p class="text-[#FFFFFFB2] text-[12px] lg:text-[14px] font-Gilroy">
										{#if $user && $user.custodial_wallet}
											{shortenAddress($user.custodial_wallet)}
										{/if}
									</p>
									<button
										on:click={() => {
											window.navigator.clipboard.writeText($user.custodial_wallet);
										}}
									>
										<img src={Copy} alt="" class="w-[16px]" />
									</button>
								</div>
							</div>
						</div>
						<button on:click={() => (openHistory = true)} class="hidden lg:block">
							<img src={Reconnect} alt="" class="hover:bg-[#FFFFFF14]" />
						</button>
					</div>
					<div class="flex items-center gap-[13px] w-full">
						<div
							class="flex flex-col items-start gap-[4px] w-full h-[46px] lg:h-[60px] rounded-[2px] bg-[#FFFFFF08] px-[8px] py-[6px] lg:p-[10px]"
						>
							<p class="text-[#FFFFFFCC] text-[11px] lg:text-[12px] font-Gilroy">USDT Balance:</p>
							<p class="text-[#FFFFFFB2] text-[14px] lg:text-[18px] font-Gilroy-SemiBold">{usdt}</p>
						</div>
						<div
							class="flex flex-col items-start gap-[4px] w-full h-[46px] lg:h-[60px] rounded-[2px] bg-[#FFFFFF08] px-[8px] py-[6px] lg:p-[10px]"
						>
							<p class="text-[#FFFFFFCC] text-[11px] lg:text-[12px] font-Gilroy">POL Balance:</p>
							<p class="text-[#FFFFFFB2] text-[14px] lg:text-[18px] font-Gilroy-SemiBold">{pol}</p>
						</div>
					</div>
					<hr class="w-full border-[#FFFFFF0D]" />
					<div class="flex items-center gap-[10px] w-full">
						<button
							on:click={() => (openSend = true)}
							class="flex items-center justify-center gap-[8px] w-full h-[40px] rounded-[4px] bg-[#8EC9ED26] hover:bg-[#8EC9ED] p-[10px] group"
						>
							<img src={SendImage} alt="" class="group-hover:hidden" />
							<img src={SendHover} alt="" class="hidden group-hover:block" />

							<p class="text-[#8EC9ED] group-hover:text-[#1F2D35] text-[14px] font-Gilroy-SemiBold">
								Send
							</p>
						</button>
						<button
							on:click={() => (openDeposit = true)}
							class="flex items-center justify-center gap-[8px] w-full h-[40px] rounded-[4px] bg-[#BC5AD726] hover:bg-[#BC5AD7] p-[10px] group"
						>
							<img src={DepositImage} alt="" class="group-hover:hidden" />
							<img src={DepositHover} alt="" class="hidden group-hover:block" />
							<p class="text-[#BC5AD7] group-hover:text-[#33183A] text-[14px] font-Gilroy-SemiBold">
								Deposit
							</p>
						</button>
					</div>
				</div>

				<hr class="w-full border-[#FFFFFF1A]" />

				<div class="flex flex-col items-start gap-[10px] w-full">
					<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium">Connect to other Wallets</p>
					<!-- <div
						class="flex items-center justify-between px-[10px] py-[6px] rounded-[3px] bg-[#FFFFFF08] hover:bg-[#FFFFFF14] w-full h-[50px]"
					>
						<div class="flex items-center gap-[10px]">
							<img src={Solona} alt="" />
							<WalletMultiButton />
						</div>
					</div> -->
					<div
						class="flex items-center justify-between px-[10px] py-[6px] rounded-[3px] bg-[#FFFFFF08] hover:bg-[#FFFFFF14] w-full h-[50px]"
					>
						<div class="flex items-center gap-[10px]">
							<img src={Ronin} alt="" />
							<div class="flex flex-col items-start gap-[2px]">
								<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium">{$t('Ronin')}</p>
								{#if $user.ronin_address == ''}
									<p class="text-[#FFFFFF66] text-[14px] font-Gilroy">{$t('NotConnected')}</p>
								{:else}
									<p class="text-[#FFFFFF66] text-[14px] font-Gilroy">
										{shortenAddress($user.ronin_address)}
									</p>
								{/if}
							</div>
						</div>

						{#if $account.connector?.name != 'Ronin Wallet'}
							<button
								on:click={() => {
									handleConnectWallet();
								}}
								class="flex items-center gap-[6px] px-[6px]"
							>
								<img src={PlusSign} alt="" />
								<p class="text-[#FDEB56] text-[14px] font-Gilroy">{$t('Connect')}</p>
							</button>
						{:else}
							<button
								on:click={() => {
									handleDisConnectWallet();
								}}
								class="flex items-center gap-[6px] px-[6px]"
							>
								<img src={Disconnect} alt="" class="w-[16px]" />
								<p class="text-[#F71756] text-[14px] font-Gilroy">{$t('Disconnect')}</p>
							</button>
						{/if}
					</div>
					<div
						class="flex items-center justify-between px-[10px] py-[6px] rounded-[3px] bg-[#FFFFFF08] hover:bg-[#FFFFFF14] w-full h-[50px]"
					>
						<div class="flex items-center gap-[10px]">
							<img src={MetaMask} alt="" />
							<div class="flex flex-col items-start gap-[2px]">
								<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium">{$t('Metamask')}</p>
								{#if $user.metamask_address == ''}
									<p class="text-[#FFFFFF66] text-[14px] font-Gilroy">{$t('NotConnected')}</p>
								{:else}
									<p class="text-[#FFFFFF66] text-[14px] font-Gilroy">
										{shortenAddress($user.metamask_address)}
									</p>
								{/if}
							</div>
						</div>

						{#if !$account.isConnected || $account.connector?.name == 'Ronin Wallet'}
							<button
								on:click={() => {
									handleConnectWallet();
								}}
								class="flex items-center gap-[6px] px-[6px]"
							>
								<img src={PlusSign} alt="" />
								<p class="text-[#FDEB56] text-[14px] font-Gilroy">{$t('Connect')}</p>
							</button>
						{:else}
							<button
								on:click={() => {
									handleDisConnectWallet();
								}}
								class="flex items-center gap-[6px] px-[6px]"
							>
								<img src={Disconnect} alt="" class="w-[16px]" />
								<p class="text-[#F71756] text-[14px] font-Gilroy">{$t('Disconnect')}</p>
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- {:else}
		<script>
			window.alert('MetaMask is not installed. Please install MetaMask to continue.');
		</script>
		{#if $walletState.account}
			<div class="flex items-start gap-[4px] flex-wrap">
				<p class="text-[#D4CFD6] text-[12px] lg:text-[14px] font-Gilroy-SemiBold">
					Wallet Address:
				</p>
				<p class="text-[#A99FAC] text-[12px] lg:text-[14px] font-Gilroy-Medium">
					{shortenAddress($account.address)}
				</p>
			</div>
		{:else}
			<button
				on:click={connectWalletHandler}
				class="w-full pt-[10px] pb-[9px] flex items-center justify-center gap-[10px] rounded-[4px] bg-[#342031]"
			>
				<img src={MetaMask} alt="" class="w-[17px]" />
				<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">Connect Wallet</p>
			</button>
			<w3m-button />	
		{/if}
	{/if} -->
</div>

{#if openDeposit}
	<Deposit bind:openDeposit />
{/if}

{#if openSend}
	<SendCoin bind:openSend />
{/if}

{#if openHistory}
	<TransactionHistory bind:openHistory />
{/if}

<style lang="postcss">
	.loading {
		font-size: 16px;
		color: red;
	}

	w3m-button {
		--button-background-color: #342031;
		--button-text-color: #fdeb56;
		--button-padding: 10px;
	}

	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #290c3deb;
		color: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
		z-index: 10;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 5;
	}

	.popup-button {
		background: white;
		color: #290c3deb;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.3s;
	}
</style>
