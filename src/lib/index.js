import { writable } from "svelte/store";
import Web3 from "web3";

import abi from './nftABI.json';
import controllerAbi from './ControllerABI.json';
import { Wallet } from "ethers";
import { shortenAddress } from "./utils";

const getMetaMaskPresent = () =>
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

const getLocalStorageState = () => {
    // if not in browser, return empty object
    if (typeof window === "undefined") {
        return {};
    }

    return JSON.parse(localStorage.getItem("walletState") || "{}");
};

export function MetaMaskStore() {
    const loaded = writable(false);
    const isMetaMaskPresent = writable(getMetaMaskPresent());
    const walletState = writable(getLocalStorageState());

    const handleAccountsChanged = async (newAccounts) => {
        if (
            Array.isArray(newAccounts) &&
            newAccounts.length > 0 &&
            newAccounts[0] !== undefined
        ) {
            const account = newAccounts[0];

            const req = await fetch(`/api/action/getaccount`);
            const metamask_address = (await req.json()).metamask;
            if (account == metamask_address) {
                walletState.set({ account });
            } else {
                showPopup(shortenAddress(metamask_address));
                // alert(`This account is already connected to this wallet ${shortenAddress(metamask_address)}`)
            }
        } else {
            walletState.set({});
        }
    };

    function showPopup(wallet) {
        // Create a container for the popup
        const popupContainer = document.createElement('div');
        popupContainer.className = 'fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-[#0e0511e6] z-[51]';

        // Add the inner HTML to the container
        popupContainer.innerHTML = `
            <div class="popup-inner flex flex-col items-center justify-center gap-[40px] md:gap-[57px] p-[16px] md:p-[20px] pt-[40px] md:pt-[57px] w-full max-w-[343px] md:max-w-[420px] rounded-[12px] md:rounded-[16px] border border-[#3D2644] bg-[#200B26]">
                <div class="flex flex-col items-center justify-center gap-[24px] w-full max-w-[198px] md:max-w-[290px]">
                    <img src="failed.svg" alt="" class="w-[120px] md:w-[140px]" />
                    <div class="flex flex-col items-center justify-center gap-[6px] md:gap-[10px]">
                        <p class="text-[#A99FAC] text-[12px] md:text-[16px] text-center font-Gilroy-Medium">
                            This account is already connected to this wallet ${wallet}
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Append the container to the body
        document.body.appendChild(popupContainer);

        // Add event listener to close the popup when the inner div is clicked
        const popupInner = popupContainer.querySelector('.popup-inner');
        popupInner.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the container
        });

        popupContainer.addEventListener('click', () => {
            document.body.removeChild(popupContainer);
        });
    }

    const checkAmoyNetwork = async () => {
        const chainId = await window.ethereum?.request({ method: "eth_chainId" });
        return chainId === "0x13882"; // Chain ID for Amoy Mainnet
    };

    const addAmoyNetwork = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: '0x13882', // Hexadecimal string of the chain ID
                        chainName: 'Amoy', // Network name
                        nativeCurrency: {
                            name: 'MATIC', // Native currency name
                            symbol: 'MATIC', // Native currency symbol
                            decimals: 18 // Currency decimals
                        },
                        rpcUrls: ['https://polygon-amoy.drpc.org'], // RPC URL
                        blockExplorerUrls: ['https://www.oklink.com/amoy'] // Block explorer URL
                    }
                ]
            });
        } catch (error) {
            console.error('Error adding Amoy Network', error);
        }
    };

    const init = async () => {
        // if metamask is not present, do nothing
        if (!getMetaMaskPresent()) {
            return;
        }

        // if we have an account in local storage, we can assume the user left the page with metamask connected last time
        // so we can connect to metamask automatically
        if (getLocalStorageState().account) {
            const accountResponse = await window.ethereum?.request({
                method: "eth_requestAccounts",
            });

            if (accountResponse && accountResponse.length && accountResponse[0]) {
                const account = accountResponse[0];
                const req = await fetch(`/api/action/getaccount`);
                const metamask_address = (await req.json()).metamask;
                if (account == metamask_address) {
                    walletState.set({ account });
                } else {
                    walletState.set({ account: metamask_address });
                }

                // watch for account changes from the extension
                window.ethereum?.on("accountsChanged", handleAccountsChanged);
            }
        }

        // if metamask is present, but not connected previously, we will wait for the user to click connect. For now, we will just set loaded to true
        setTimeout(() => {
            // delay to allow a flashing screen and layout shift
            loaded.set(true);
        }, 300);

        // any time the wallet state changes, we will update local storage
        walletState.subscribe((state) => {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("walletState", JSON.stringify(state));
            }
        });
    };

    const connect = async () => {
        // Directly check and update isMetaMaskPresent state here
        isMetaMaskPresent.set(getMetaMaskPresent());
        // if metamask is not present, do nothing
        if (!getMetaMaskPresent()) {
            window.alert('MetaMask is not installed. Please install MetaMask to continue.');
            return;
        }

        const isAmoyNetwork = await checkAmoyNetwork();
        if (!isAmoyNetwork) {
            await addAmoyNetwork();
            const isNowAmoyNetwork = await checkAmoyNetwork();
            if (!isNowAmoyNetwork) {
                window.alert("Failed to add Amoy network. Please connect to the Amoy network in MetaMask.");
                return;
            }
        }

        // if metamask is present, but not connected, connect
        const accountResponse = await window.ethereum?.request({
            method: "eth_requestAccounts",
        });

        if (accountResponse && accountResponse.length && accountResponse[0]) {
            const account = accountResponse[0];
            const req = await fetch(`/api/action/getaccount`);
            const metamask_address = (await req.json()).metamask;
            if (metamask_address == '') {
                fetch(`/api/action/save_meta_addr?account=${account}`);
                walletState.set({ account });
                // watch for account changes from the extension
                window.ethereum?.on("accountsChanged", handleAccountsChanged);
            }

            if (metamask_address && metamask_address == account) {
                walletState.set({ account });
                // watch for account changes from the extension
                window.ethereum?.on("accountsChanged", handleAccountsChanged);
            }
        }

        //web3 init
        if (window.ethereum) {
            // @ts-ignore
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        }
    };

    const signerPK = '0x69b052379e423025871f25597e159e1e7feb94af0b1980db3a242412c8bebd0c'
    const ylNFTAddress = '0x675DfEdd37AE4fbbc1F9f69AbAC8a4C3236FcD8C'
    const controllerAddress = '0xf386b33A82b3383ada584d4c1a8B3630028b4C8a'

    function getRandomNumber() {
        return Math.floor(Math.random() * (9000000 - 1000000 + 1)) + 1000000;
    }


    const claim = async () => {
        try {
            if (window.ethereum) {
                //@ts-ignore
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
            }
            const addr = JSON.parse(localStorage.getItem("walletState")).account;
            // console.log("walletstate", addr);
            const contract = await new window.web3.eth.Contract(abi, "0xA64EE78b07aC03A594Aa1c86EBea1Be066a4577E");
            await contract.methods.safeMint(addr).send({ from: addr });
            fetch(`/api/action/save_claimed_og`)
            return true;
        } catch (e) {
            if (e.message.includes('denied')) {
                return null
            }
            return false;
        }
    };

    const claimNFTBySig = async (pid) => {
        try {
            if (window.ethereum) {
                //@ts-ignore
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
            }
            const signer = new Wallet(signerPK);
            const _pid = pid;
            const _random = getRandomNumber()
            const _pass = pid;
            const _mintTo = JSON.parse(localStorage.getItem("walletState")).account;

            // console.log("ChainId", Number(await window.web3.eth.getChainId()))
            const domain = {
                name: "YLGamers",
                version: "1.0.0",
                chainId: Number(await window.web3.eth.getChainId()),
                verifyingContract: controllerAddress,
            };
            const types = {
                NFT: [
                    { name: "_pid", type: "uint256" },
                    { name: "_YLGamers", type: "address" },
                    { name: "_random", type: "uint256" },
                    { name: "_pass", type: "uint256" },
                    { name: "_userAddress", type: "address" },
                ],
            };

            const values = {
                _pid,
                _YLGamers: ylNFTAddress,
                _random,
                _pass,
                _userAddress: _mintTo,
            };

            const sig = await signer._signTypedData(domain, types, values);

            // console.log("walletstate", _mintTo);
            const contract = await new window.web3.eth.Contract(controllerAbi, controllerAddress);
            // const contract = await new window.web3.eth.Contract(abi, "0xA64EE78b07aC03A594Aa1c86EBea1Be066a4577E");
            await contract.methods.claim(_pid, ylNFTAddress, _random, _pass, _mintTo, sig).send({ from: _mintTo });
            // project success after claimed
            fetch(`/api/action/claim_project_nft?pid=${pid}`);
            return true;
        } catch (e) {
            if (e.message.includes('denied')) {
                return null
            }
            return false;
        }
    };

    const disconnect = () => {
        // Reset wallet state
        walletState.set({});

        // Remove the account from local storage
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("walletState");
        }

        // Remove listener for account changes
        if (window.ethereum?.removeListener) {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
    };

    return {
        isMetaMaskPresent,
        walletState,
        loaded,
        connect,
        init,
        claim,
        claimNFTBySig,
        disconnect,
    };
}
