<script>
	// @ts-nocheck

	import { ExploreCourse } from '$components/Explore-Course';
	import { MainBanner } from '$components/MainBanner';
	import { Tournaments } from '$components/Tournaments';
	import { ExploreGames } from '$components/Explore-Games';
	import FooterBanner from '$components/FooterBanner.svelte';
	import { tickets } from '$lib/stores/tickets.js';
	import { user } from '$lib/stores/user';
	import GamingGenres from '$components/GamingGenres/GamingGenres.svelte';
	import EarnXp from '$components/GamingGenres/EarnXP.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import ProjectQuest from '$components/NewExplore/ProjectQuest/ProjectQuest.svelte';
	import ExploreTutorials from '$components/NewExplore/ExploreTutorials/ExploreTutorials.svelte';
	import ExploreHaveFun from '$components/NewExplore/ExploreHaveFun/ExploreHaveFun.svelte';
	import ExploreLocal from '$components/NewExplore/ExploreLocal/ExploreLocal.svelte';
	import ExploreNewTournaments from '$components/NewExplore/ExploreNewTournaments/ExploreNewTournaments.svelte';
	import ExploreRewards from '$components/NewExplore/ExploreRewards/ExploreRewards.svelte';
	import ExploreArticle from '$components/NewExplore/ExploreArticle/ExploreArticle.svelte';
	import ExploreNews from '$components/News/ExploreNews.svelte';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import {
		workSpace,
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
	import { goto } from '$app/navigation';

	export let data;
	// $tickets = data.tickets;
	// $user = data.profile || null;
	$: $walletStore.publicKey && disconnectWrongWallet();
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

	onMount(() => {
		if (browser) {
			if (data.profile && !data.profile.on_boarding) {
				goto('/personal-details');
			}
			const reload = localStorage.getItem('reload');
			if (reload) {
				localStorage.removeItem('reload');
				window.location.reload();
			}
		}
	});

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
</script>

<div
	class="flex flex-col items-start gap-[40px] lg:gap-[80px] p-[16px] lg:pt-[40px] lg:px-[30px] w-full overflow-x-hidden"
>
	<MainBanner bind:items={data.announcements} />
	<!-- data.projects -->
	<ProjectQuest projects={data.projects} />
	<ExploreNews news={data.news} />
	<!-- data.genres -->
	<GamingGenres genres={data.genres} />
	<ExploreTutorials courses={data.courses} />
	<ExploreHaveFun />
	<ExploreNewTournaments bind:tournaments={data.tournaments} />
	<!-- data.local_events -->
	<ExploreLocal tournaments={data.local_events} />
	<ExploreRewards />
	<ExploreArticle bind:games={data.games} />
	<EarnXp />
	<!-- <News bind:news={data.news} /> -->

	<!-- {#if $user && !$user?.subscribed_to_newsletter}
		<Subscribtion />
	{/if} -->

	<!-- {#if !$user}
		<FooterBanner />
	{/if} -->
	<WalletProvider {localStorageKey} {wallets} autoConnect />
	<ConnectionProvider {network} />
</div>
