import {
	writeContract,
	waitForTransactionReceipt,
	getAccount,
	switchChain,
	getBalance,
	readContract
} from '@wagmi/core';
import abi from '../nftABI.json';
import controllerAbi from '../ControllerABI.json';
import { Wallet } from 'ethers';
import {
	avalanche,
	avalancheFuji,
	immutableZkEvm,
	immutableZkEvmTestnet,
	mainnet,
	polygon,
	polygonAmoy,
	ronin,
	saigon,
	sepolia,
	bsc,
	bscTestnet
} from 'viem/chains';
import { handleConnectWallet, wagmiConfig } from './web3Modal';
import { erc20Abi, formatEther, formatUnits, isAddress } from 'viem';

const walletNotConnected = async () => {
	let isConnected = getAccount(wagmiConfig).isConnected;
	console.log({ isConnected });
	if (!isConnected) {
		try {
			await handleConnectWallet();
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	}
	return Promise.resolve();
};

export const getBalances = async (/** @type {any} */ address) => {
	try {
		if (!address || !isAddress(address)) {
			return { pol: '0', usdt: '0' };
		}
		const pol = await getBalance(wagmiConfig, { address, chainId: 80002 });
		const usdt = await readContract(wagmiConfig, {
			abi: erc20Abi,
			address: '0xBFcf1d9D6ff9dEDbc7716A4c9De87aa00dd441B7', // USDT on Amoy 80002
			functionName: 'balanceOf',
			args: [address],
			chainId: 80002
		});
		return { pol: formatEther(pol.value), usdt: formatUnits(usdt, 6) };
	} catch (e) {
		// @ts-ignore
		console.log(e.message);
		return { pol: '0', usdt: '0' };
	}
};

export const claim = async () => {
	try {
		walletNotConnected();
		const { baseNFT } = getContractConfig(getAccount(wagmiConfig).chainId);
		const hash = await writeContract(wagmiConfig, {
			abi: abi,
			// @ts-ignore
			address: baseNFT,
			functionName: 'safeMint',
			args: [getAccount(wagmiConfig).address]
		});
		await waitForTransactionReceipt(wagmiConfig, { hash });
		// const transactionReceipt = await waitForTransactionReceipt(config, { hash });
		// console.log(transactionReceipt.transactionHash);
		return true;
	} catch (e) {
		// @ts-ignore
		console.error(e.message);
		// @ts-ignore
		if (e.message.includes('denied')) {
			return null;
		}
		return false;
	}
};

const signerPKs = (/** @type {number} */ chainId) => {
	let privateKey;
	switch (chainId) {
		case mainnet.id:
		case polygon.id:
		case bsc.id:
		case avalanche.id:
		case immutableZkEvm.id:
		case sepolia.id:
		case bscTestnet.id:
		case polygonAmoy.id:
		case avalancheFuji.id:
		case immutableZkEvmTestnet.id:
			privateKey = '0x69b052379e423025871f25597e159e1e7feb94af0b1980db3a242412c8bebd0c';
			break;
		case ronin.id:
		case saigon.id:
			privateKey = '0x072117dd3eb9f0107d686046f1b4a0525cc104435bd4734c85d7e76bb17af028';
			break;
		default:
			throw Error('UnSupported Chain');
	}
	return privateKey;
};

const getContractConfig = (/** @type {number | undefined} */ chainId) => {
	let ylNFTAddress, controllerAddress, baseNFT, signerPK;
	switch (chainId) {
		case mainnet.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(mainnet.id);
			break;
		case sepolia.id:
			ylNFTAddress = '0xfb9a14a97ebd89dd2cee8b12886a38ec5f6da472';
			controllerAddress = '0xb16ee43c5e880f36b08c56439cc4efe21058f79c';
			baseNFT = '';
			signerPK = signerPKs(sepolia.id);
			break;
		case bsc.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(bsc.id);
			break;
		case bscTestnet.id:
			ylNFTAddress = '0x6d9503af8783ed35353e50d22204724a7a100c08';
			controllerAddress = '0x89cc5dbc414cc004be2c9e6648ca5e2aa1848891';
			baseNFT = '';
			signerPK = signerPKs(bscTestnet.id);
			break;
		case polygon.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(polygon.id);
			break;
		case polygonAmoy.id:
			ylNFTAddress = '0x675DfEdd37AE4fbbc1F9f69AbAC8a4C3236FcD8C';
			controllerAddress = '0xf386b33A82b3383ada584d4c1a8B3630028b4C8a';
			baseNFT = '0xA64EE78b07aC03A594Aa1c86EBea1Be066a4577E';
			signerPK = signerPKs(polygonAmoy.id);
			break;
		case avalanche.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(avalanche.id);
			break;
		case avalancheFuji.id:
			ylNFTAddress = '0x6D9503aF8783ED35353E50d22204724A7A100c08';
			controllerAddress = '0x89cc5DbC414cC004Be2c9E6648cA5E2aA1848891';
			baseNFT = '';
			signerPK = signerPKs(avalancheFuji.id);
			break;
		case ronin.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(ronin.id);
			break;
		case saigon.id:
			ylNFTAddress = '0x6c7066029a8bc3d5d8045a43ede0bc11425ecb6e';
			controllerAddress = '0xdb7a642ce2e834aa234b594f79983b6efa324417';
			baseNFT = '';
			signerPK = signerPKs(saigon.id);
			break;
		case immutableZkEvm.id:
			ylNFTAddress = '';
			controllerAddress = '';
			baseNFT = '';
			signerPK = signerPKs(immutableZkEvm.id);
			break;
		case immutableZkEvmTestnet.id:
			ylNFTAddress = '0x6D9503aF8783ED35353E50d22204724A7A100c08';
			controllerAddress = '0x89cc5DbC414cC004Be2c9E6648cA5E2aA1848891';
			baseNFT = '';
			signerPK = signerPKs(immutableZkEvmTestnet.id);
			break;
		default:
			throw Error('UnSupported Chain');
	}
	if (!ylNFTAddress || !controllerAddress) {
		throw Error('Contract does not exist on this chain');
	}
	const signer = new Wallet(signerPK);
	return { ylNFTAddress, controllerAddress, baseNFT, signer };
};

function getRandomNumber() {
	return Math.floor(Math.random() * (9000000 - 1000000 + 1)) + 1000000;
}

export const claimNFTBySig = async (
	/** @type {number | string} */ pid,
	/** @type {number} */ blockchain_network,
	/** @type {String} */ id
) => {
	try {
		console.log({ pid, blockchain_network });
		await walletNotConnected();

		// @ts-ignore
		if (blockchain_network == 'Solana') blockchain_network = 901; // temporary fix

		const { ylNFTAddress, controllerAddress, signer } = getContractConfig(blockchain_network);

		if (getAccount(wagmiConfig).chainId != blockchain_network) {
			await switchChain(wagmiConfig, { chainId: blockchain_network });
		}
		// console.log({ blockchain_network, pid })
		const { chainId, address } = getAccount(wagmiConfig);

		const _pid = pid;
		const _random = getRandomNumber();
		const _pass = pid;
		const _mintTo = address;

		// console.log("ChainId", chainId)

		const domain = {
			name: 'YLGamers',
			version: '1.0.0',
			chainId: chainId,
			verifyingContract: controllerAddress
		};
		const types = {
			NFT: [
				{ name: '_pid', type: 'uint256' },
				{ name: '_YLGamers', type: 'address' },
				{ name: '_random', type: 'uint256' },
				{ name: '_pass', type: 'uint256' },
				{ name: '_userAddress', type: 'address' }
			]
		};

		const values = {
			_pid,
			_YLGamers: ylNFTAddress,
			_random,
			_pass,
			_userAddress: _mintTo
		};

		const sig = await signer._signTypedData(domain, types, values);
		// console.log(config)
		const hash = await writeContract(wagmiConfig, {
			abi: controllerAbi,
			// @ts-ignore
			address: controllerAddress,
			functionName: 'claim',
			args: [_pid, ylNFTAddress, _random, _pass, _mintTo, sig]
		});
		await waitForTransactionReceipt(wagmiConfig, { hash });
		// const transactionReceipt = await waitForTransactionReceipt(config, { hash });
		// console.log(transactionReceipt.transactionHash);
		return true;
	} catch (e) {
		// @ts-ignore
		console.error(e.message);
		// @ts-ignore
		if (e.message.includes('denied')) {
			return null;
		}
		return false;
	}
};
