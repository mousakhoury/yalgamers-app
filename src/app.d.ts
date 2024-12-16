// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
	// Web3
	interface Window {
		ethereum: MetaMaskInpageProvider?;
	}

	namespace App {
		// interface Error {}
		interface Locals {
			pb: any,
			user: any
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
