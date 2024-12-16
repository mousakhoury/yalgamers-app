import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi';

import { disconnect, getAccount, getChainId, reconnect, watchAccount, watchChainId } from '@wagmi/core';
import { readable, writable } from 'svelte/store';

import {
	avalanche,
	avalancheFuji,
	polygon,
	mainnet,
	polygonAmoy,
	ronin,
	saigon,
	immutableZkEvm,
	immutableZkEvmTestnet,
	sepolia,
	bsc,
	bscTestnet,
} from 'viem/chains';
import { shortenAddress } from '$lib/utils';
import { http } from '@wagmi/core'

export const CUSTOM_WALLET = 'wc:custom_wallet';
export const projectId = 'f2a9708064c7b290ad8a10d570667a75';

let storedCustomWallet;
if (typeof window !== 'undefined') {
	storedCustomWallet = localStorage.getItem(CUSTOM_WALLET);
}

const customWallets = storedCustomWallet ? [JSON.parse(storedCustomWallet)] : undefined;

const metadata = {
	name: 'YL Gamers',
	description: 'YL Gamers APP',
	url: 'https://ylgamer.com',
	icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [
	mainnet,
	sepolia,
	bsc,
	bscTestnet,
	polygon,
	polygonAmoy,
	avalanche,
	avalancheFuji,
	ronin,
	saigon,
	immutableZkEvm,
	immutableZkEvmTestnet
];

export const wagmiConfig = defaultWagmiConfig({
	// @ts-ignore
	chains,
	projectId,
	metadata,
	enableCoinbase: true,
	enableInjected: true,
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
		[bsc.id]: http(),
		[bscTestnet.id]: http(),
		[polygon.id]: http(),
		[polygonAmoy.id]: http(),
		[avalanche.id]: http(),
		[avalancheFuji.id]: http(),
		[ronin.id]: http(),
		[saigon.id]: http(),
		[immutableZkEvm.id]: http(),
		[immutableZkEvmTestnet.id]: http(),
	  },
});

export const reconnectWallet = async () => await reconnect(wagmiConfig)

export const web3modal = createWeb3Modal({
	wagmiConfig,
	projectId,
	themeMode: 'dark',
	featuredWalletIds: [
		'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', //MetaMask
		'f323633c1f67055a45aac84e321af6ffe46322da677ffdd32f9bc1e33bafe29c', //Core
		'541d5dcd4ede02f3afaf75bf8e3e4c4f1fb09edb5fa6c4377ebf31c2785d9adf' //Ronin
	],
	enableAnalytics: true,
	customWallets
});

export const chainId = readable(getChainId(wagmiConfig), (set) =>
	watchChainId(wagmiConfig, { onChange: set })
);
export const account = readable(getAccount(wagmiConfig), (set) =>
	watchAccount(wagmiConfig, {
		onChange: async (account) => {
			const pathname = window.location.pathname;
			// console.log({ pathname });
			if (pathname === '/login' || pathname === '/personal-details') {
				return set(account);
			} else {
				if (account.isConnected) {
					const req = await fetch('/api/web3/get-accounts');
					const res = await req.json();
					const { metamask_address, ronin_address } = res;
					let savedAddress = null;

					switch (account.connector?.name) {
						case 'Ronin Wallet':
							savedAddress = ronin_address.toLowerCase();
							break;
						default:
							savedAddress = metamask_address.toLowerCase();
							break;
					}
					// console.log({ savedAddress });
					if (!savedAddress || savedAddress === '') {
						const userHasWallet = await checkAddressInDB(account.address?.toLowerCase());
						if (userHasWallet) {
							if (account.connector?.name === 'Ronin Wallet') {
								await saveAddress('ronin_address', account.address?.toLowerCase());
							} else {
								await saveAddress('metamask_address', account.address?.toLowerCase());
							}
							return set(account);
						} else {
							showPopup(
								`The wallet ${shortenAddress(
									account.address
								)} is already connected with a different account.`
							);
							return resetAccountState(set);
						}
					} else {
						if (account.address?.toLowerCase() !== savedAddress) {
							showPopup(
								`The account is already connected to this wallet ${shortenAddress(savedAddress)}`
							);
							await disconnect(wagmiConfig);
							// console.log(`Disconnecting ${account.address}`);
							return resetAccountState(set);
						} else {
							return set(account);
						}
					}
				} else {
					return resetAccountState(set);
				}
			}
		}
	})
);

export const handleConnectWallet = async () => {
	try {
		await web3modal.open({ view: 'Connect' });
		// had to add the time_out to wait for the wallet to be connected.
		await new Promise((resolve, reject) => {
			const connectionCheck = setInterval(() => {
				if (getAccount(wagmiConfig).isConnected) {
					clearInterval(connectionCheck);
					// @ts-ignore
					resolve();
				}
			}, 500);

			// Timeout after 60 seconds
			setTimeout(() => {
				clearInterval(connectionCheck);
				reject(new Error('Connection timeout'));
			}, 60000);
		});
	} catch (error) {
		console.error('Failed to connect wallet:', error);
	}
	return Promise.resolve();
};

export const handleDisConnectWallet = async () => {
	try {
		await web3modal.open({ view: 'Account' });
	} catch (error) {
		console.error('Failed to disconnect wallet:', error);
	}
	return Promise.resolve();
};

export const provider = readable(undefined, (set) =>
	watchAccount(wagmiConfig, {
		onChange: async (account) => {
			if (!account.connector) return set(undefined);
			// @ts-ignore
			set(await account.connector?.getProvider());
		}
	})
);

export const customWallet = writable({
	id: undefined,
	name: undefined,
	homepage: undefined,
	image_url: undefined,
	mobile_link: undefined,
	desktop_link: undefined,
	webapp_link: undefined,
	app_store: undefined,
	play_store: undefined
});

export const supported_chains = writable([]);

// @ts-ignore
export function showPopup(text) {
	// Create a container for the popup
	const popupContainer = document.createElement('div');
	popupContainer.className =
		'fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-[#0e0511e6] z-[51]';

	// Add the inner HTML to the container
	popupContainer.innerHTML = `
        <div class="popup-inner flex flex-col items-center justify-center gap-[40px] md:gap-[57px] p-[16px] md:p-[20px] pt-[40px] md:pt-[57px] w-full max-w-[343px] md:max-w-[420px] rounded-[12px] md:rounded-[16px] border border-[#3D2644] bg-[#200B26]">
            <div class="flex flex-col items-center justify-center gap-[24px] w-full max-w-[198px] md:max-w-[290px]">
                <img src="failed.svg" alt="" class="w-[120px] md:w-[140px]" />
                <div class="flex flex-col items-center justify-center gap-[6px] md:gap-[10px]">
                    <p class="text-[#A99FAC] text-[12px] md:text-[16px] text-center font-Gilroy-Medium">
                        ${text}
                    </p>
                </div>
            </div>
        </div>
    `;

	// Append the container to the body
	document.body.appendChild(popupContainer);

	// Add event listener to close the popup when the inner div is clicked
	const popupInner = popupContainer.querySelector('.popup-inner');
	popupInner?.addEventListener('click', (event) => {
		event.stopPropagation(); // Prevent the click from bubbling up to the container
	});

	popupContainer.addEventListener('click', () => {
		document.body.removeChild(popupContainer);
	});
}

// @ts-ignore
export const saveAddress = async (wallet_name, wallet_address) => {
	try {
		const response = await fetch('/api/web3/save-address', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ [wallet_name]: wallet_address })
		});

		const data = await response.json();
		if (data.save) {
			// console.log(`Address saved successfully for ${wallet_name}`);
		} else {
			console.error('Failed to save address:', data.msg);
		}
	} catch (error) {
		console.error('Error saving address:', error);
	}
};
// @ts-ignore
export const checkAddressInDB = async (address) => {
	try {
		const response = await fetch('/api/web3/check-address', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ address })
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error checking address in DB:', error);
		return false;
	}
};
// @ts-ignore
const resetAccountState = (set) => {
	return set({
		address: undefined,
		addresses: undefined,
		chain: undefined,
		chainId: undefined,
		connector: undefined,
		isConnected: false,
		isConnecting: false,
		isDisconnected: true,
		isReconnecting: false,
		status: 'disconnected'
	});
};
