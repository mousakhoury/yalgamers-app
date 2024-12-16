<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import '../../app.css';
	import MainNavbar from '$components/Header/MainNavbar.svelte';
	import Footer from '$components/Footer.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	export let data;
	import { user } from '$lib/stores/user';
	import Logout from './logout.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import { tickets } from '$lib/stores/tickets.js';
	import { boxes } from '$lib/stores/boxes.js';
	import { page } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { account, reconnectWallet, wagmiConfig } from '$lib/connect';
	import { reconnect } from '@wagmi/core';

	// $tickets = data.tickets;
	$boxes = data.boxes;

	$user = data.profile || null;

	let sendVerificationButton = false;

	const sendVerification = async () => {
		const res = await fetch('/api/login/verify', {
			method: 'POST',
			credentials: 'same-origin'
		});
		if (res.ok) {
			sendVerificationButton = true;
			invalidateAll();
		}
	};

	$: $account.address != undefined && reconnectWallet();

	onMount(async () => {
		await reconnectWallet();
		// console.log('in layout', $account.isConnected);
		if ($user && !$user.on_boarding) {
			goto('/personal-details');
		}
		if (browser) {
			if (typeof window !== 'undefined') {
				window.global = window;
			}
			const reload = localStorage.getItem('reload');
			if (reload) {
				localStorage.removeItem('reload');
				window.location.reload();
			}
		}

		// console.log('before re-connecting', $account);

		// if (window.ethereum) {
		// }
		// else {
		// 	// console.log('no web3 wallet');
		// }

		function saveScrollPosition() {
			sessionStorage.setItem('scrollPosition', window.scrollY.toString());
		}

		// Function to restore the scroll position from session storage
		function restoreScrollPosition() {
			const scrollPosition = sessionStorage.getItem('scrollPosition');
			if (scrollPosition) {
				window.scroll({
					top: parseInt(scrollPosition)
				});

				sessionStorage.removeItem('scrollPosition');
			}
		}

		if (browser) {
			// Add an event listener to save the scroll position when the page is about to be refreshed
			window.addEventListener('beforeunload', saveScrollPosition);
			document.documentElement.setAttribute('lang', $locale);
			// window.addEventListener('load', restoreScrollPosition);
			if (import.meta.env.PROD) {
				setInterval(() => {
					const data = new FormData();
					data.append('timestamp', '' + Date.now());
					fetch('/api/usage/duration', {
						method: 'POST',
						credentials: 'include',
						body: data
					});
				}, 2000);
			}
		}
	});

	let title = 'explore';

	$: if ($page.url.pathname) {
		const pathname = $page.url.pathname;

		if (pathname == '/') {
			title = '- Explore';
		} else if (pathname.includes('courses')) {
			title = '- Courses';
		} else if (pathname.includes('games')) {
			title = '- Games';
		} else if (pathname.includes('local-events')) {
			title = '- Local Events';
		} else if (pathname.includes('tournaments')) {
			title = '- Tournaments';
		} else if (pathname.includes('have-fun')) {
			title = '- Have Fun';
		} else if (pathname.includes('leaderboard')) {
			title = '- Leaderboard';
		} else if (pathname.includes('quests')) {
			title = '- Quests';
		} else {
			title = '';
		}
	}
</script>

<svelte:head>
	<title>Yalgamers {title}</title>
</svelte:head>

{#if !$page.url.pathname.includes('closedbeta')}
	<MainNavbar />
{/if}

<div class="bg-black h-full w-[min(100%,2000px)] m-auto rel" dir={$locale == 'ar' ? 'rtl' : 'ltr'}>
	{#if !$user ^ $user?.verified}
		{#key data.pathname}
			<div
				in:fly|local={{ y: 200, duration: 300, delay: 400 }}
				out:fly|local={{ y: -200, duration: 300 }}
				class="w-[100%]"
			>
				<slot />
			</div>
		{/key}
	{:else if $user?.blocked}
		<div class="flex flex-col gap-8 items-center justify-center w-full h-[100vh]">
			<h2 class="text-lg text-white">
				Your account has been blocked. Check your inbox for further details or contact our support
				team.
			</h2>
		</div>
	{:else}
		<div class="flex flex-col gap-8 items-center justify-center w-full h-[100vh]">
			<h2 class="text-lg text-white">Verify your email first. Check your inbox.</h2>
			<Button
				disabled={sendVerificationButton}
				on:click={sendVerification}
				class="text-white bg-white-20"
			>
				{!sendVerificationButton
					? 'Click here to resend verification email'
					: 'Verifcation email has been sent.'}
			</Button>
		</div>
	{/if}

	{#if !$page.url.pathname.includes('closedbeta') && !$page.url.pathname.includes('login')}
		<Footer />
	{/if}
</div>

<SvelteToast />

<style lang="post">
	:global(body) {
		background-color: #280e30;
	}
	:global(.description p strong) {
		font-size: 32px;
		color: white;
	}
	:global(.description p) {
		font-size: 18px;
		color: #a99fac;
	}
	:global(.description ul li strong) {
		padding-right: 8px;
		font-size: 24px;
		color: #e9e6ea;
	}
	:global(.description ul li) {
		font-size: 18px;
		color: #beb6c0;
	}
</style>
