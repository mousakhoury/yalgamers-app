<script>
	import { t, locale } from '$lib/stores/i18n';

	import { fly } from 'svelte/transition';
	import trophyImg from '$lib/assets/trophy.svg';
	import close from '$lib/assets/close.svg';
	import Tickets from '../Tickets/Tickets.svelte';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import NavItem from '../Subnavbar/NavItem.svelte';
	import logoutSvg from '$lib/assets/logout.svg';
	import SupportTicket from '$lib/assets/Ticket-Star-mobile.svg';
	import xpimage from '$lib/assets/xp.svg';

	import { user } from '$lib/stores/user';
	import HeaderConnectWallet from '../HeaderConnectWallet.svelte';
	import HeaderMyAchievement from '../HeaderMyAchievement.svelte';
	import HeaderXpTicket from '../Header/HeaderXPTicket.svelte';
	import SideBarUserInfo from './SideBarUserInfo.svelte';
	import SideBarItems from './SideBarItems.svelte';

	export let btnHandler;
	export let logOutHandler;
	export let avatar;
	export let trophy;
	export let xp;
	export let percentage;
	export let currentLevel;
	export let levels;
	export let name;

	export let isTicketsOpen;

	function openTicketsHandler() {
		isTicketsOpen = true;
	}

	let isCreate = false;
	function closeTicketsHandler() {
		isTicketsOpen = false;
		isCreate = false;
	}

	function openCreateHandler() {
		isTicketsOpen = true;
		isCreate = true;
	}
</script>

<button on:click={btnHandler} class="bg" />
<div
	class="fixed flex flex-col items-start gap-[16px] bg-[#200B26] w-[90%] h-[100%] z-[60] top-0 right-0 p-[16px] overflow-y-auto overflow-x-hidden lg:hidden"
	transition:fly|local={{ x: 100, duration: 300 }}
>
	<div class="flex justify-between w-full">
		<HeaderXpTicket />
		<button on:click={btnHandler}>
			<img src={close} class=" w-[30px] h-30 object-cover" alt="close button" />
		</button>
	</div>

	<SideBarUserInfo {currentLevel} {percentage} {btnHandler} {avatar} {levels} {name} {xp} />

	<SideBarItems {openTicketsHandler} {logOutHandler} {btnHandler} />
</div>

<!-- {#if isTicketsOpen}
	<Tickets {closeTicketsHandler} {isCreate} />
{/if} -->

<style>
	.bg {
		position: fixed;
		z-index: -3;
		content: '';
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: var(--Accent, #140718);
		opacity: 0.7;
		transition: 0.3s all ease-in;
	}

	.overflow-y-auto::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>
