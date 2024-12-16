<script>
	import ScoreURL from './../GameScore/ScoreURL.svelte';
	// @ts-nocheck

	import HeaderSearch from './HeaderSearch.svelte';
	import { t, locale, locales } from '$lib/stores/i18n';
	import logoDesktop from '$lib/assets/new-header-logo2.svg';
	import logoMobile from '$lib/assets/logo.png';

	import CreateMini from '$lib/assets/create-mini.svg';
	import { user } from '$lib/stores/user';
	import userImg from '$lib/assets/unknown.png';
	import Ticket from '$lib/assets/Ticket-Star-mobile1.svg';
	import AlphaEn from '$lib/assets/alpha-en.svg';
	import AlphaAr from '$lib/assets/alpha-ar.svg';
	import logoutSvg from '$lib/assets/logout1.svg';
	import { env } from '$env/dynamic/public';
	import unknown from '$lib/assets/unknown.png';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import { browser } from '$app/environment';
	import { getImageUrl } from '$lib/utils';
	import PocketBase from 'pocketbase';

	let showProfile = false;
	let logoutDialog = false;

	function clickEvent(event) {
		if (!event.target.closest('.profileDropDown')) {
			showProfile = false;
		}
		if (!event.target.closest('.notification')) {
			notificationOpen = false;
		}
	}

	$: notifications = [];
	let notificationLock = false;
	let pb;

	onMount(() => {
		fetchNotifications();
		// notification realtime subscription
		pb = new PocketBase(env.PUBLIC_BASE_URL);
		pb.authStore?.loadFromCookie(document.cookie || '');
		pb.collection('notifications').subscribe('*', (e) => {
			switch (e.action) {
				case 'create':
					if (e.record.user == $user.id) {
						let obj = e.record.data;
						obj.read = e.record.read;
						obj.id = e.record.id;
						notifications = [...notifications, obj];
					}
					break;
				case 'update':
					if (e.record.user == $user.id) {
						let copyNotifications = notifications;
						const itemIndex = copyNotifications.findIndex((f) => f.id == e.record.id);
						copyNotifications[itemIndex].read = true;
						notifications = [...copyNotifications];
					}
					break;
				default:
					break;
			}
		});

		if (browser) {
			document.addEventListener('click', clickEvent);
		}
	});

	onDestroy(() => {
		if (pb) {
			pb.collection('notifications').unsubscribe('*');
		}
		if (browser) {
			document.removeEventListener('click', clickEvent);
		}
	});

	async function fetchNotifications() {
		try {
			const res = await fetch(`/api/notifications`);
			notifications = await res.json();
		} catch (error) {
			notifications = [];
		}
	}

	let notificationOpen = false;
	let userLogo;
	$: if ($user?.avatar) {
		userLogo = getImageUrl('users', $user.id, $user?.avatar);
	}

	$: currentLevel = findLevel($user?.xp);
	let percentage;

	$: percentage =
		(($user?.xp - (currentLevel ? $levels[currentLevel - 1].end : 0)) /
			($levels[currentLevel].end - $levels[currentLevel].start)) *
		100;

	let pathname = [];
	$: pathname = $page.url.pathname.split('/');
	$: sidebar = false;
	$: if (sidebar) {
		if (browser) document.body.style.overflow = 'hidden';
	} else {
		if (browser) document.body.style.overflow = 'scroll';
	}
	$: visibleSearch = false;
	$: expandSearch = false;
	$: innerWidth = 0;

	import HeaderMyAchievement from '$components/HeaderMyAchievement.svelte';
	import Button from '$components/Button.svelte';
	import SearchBar from '$components/SearchBar.svelte';
	import LocaleSelect from '$components/LocaleSelect.svelte';
	import Sidebar from '$components/SideBar/Sidebar.svelte';
	import NotificationCard from '$components/NotificationCard.svelte';
	import Tickets from '$components/Tickets/Tickets.svelte';
	import HeaderConnectWallet from '$components/HeaderConnectWallet.svelte';
	import HeaderItems from './HeaderItems.svelte';
	import HeaderXpTicket from './HeaderXPTicket.svelte';
	import Notifications from '$components/Notifications/Notifications.svelte';
	import Logout from '../../routes/(dash)/logout.svelte';

	let isTicketsOpen = false;

	function openTicketsHandler() {
		isTicketsOpen = true;
		showProfile = false;
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

	let isHovered = false;

	function handleMouseEnter() {
		isHovered = true;
		const nav = document.querySelector('nav');
		if (nav) {
			nav.classList.add('scroll-up');
			nav.classList.remove('scroll-down');
		}
	}

	function handleMouseLeave() {
		isHovered = false;
		const nav = document.querySelector('nav');
		if (nav) {
			nav.classList.add('scroll-down');
			nav.classList.remove('scroll-up');
		}
	}
</script>

<svelte:window bind:innerWidth />

{#if pathname[1] != 'login' && pathname[1] != 'signup'}
	<header
		role="banner"
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="bg-accent px-[30px] sticky top-0 w-full z-[51] flex flex-col items-center"
		on:mouseenter={handleMouseEnter}
	>
		<div
			class="flex justify-between items-center py-[19px] w-full max-w-[2000px] relative"
			role="banner"
			transition:fade
			on:mouseleave={() => {
				expandSearch = false;
			}}
		>
			<div class={`absolute top-0  ${$locale == 'ar' ? 'right-[67px]' : 'left-[67px]'} w-[70px]`}>
				<img src={$locale == 'ar' ? AlphaAr : AlphaEn} alt="" />
				<p
					class="bg-[#947517] text-[#fccf15] text-[12px] absolute top-0 {$locale == 'ar'
						? 'pl-[7px] left-[12px]'
						: 'right-[12px] pr-[7px]'}"
				>
					{$t('Beta')}
				</p>
			</div>
			<div class="flex items-center gap-[24px]">
				<a href="/" class="">
					<img src={logoDesktop} alt="logo" class="lg:block hidden h-[40px]" />
					<img src={logoMobile} alt="logo" class="lg:hidden block h-[40px]" />
				</a>

				{#if $user}
					<LocaleSelect />
				{/if}
			</div>

			{#if $user}
				<div class="lg:block hidden w-full max-w-[400px]">
					<HeaderSearch />
				</div>
			{/if}

			<div class="flex gap-4">
				{#if $user}
					<div class="flex items-center justify-center gap-[25px]">
						<div class="hidden lg:block">
							<ScoreURL />
						</div>
						<div class="hidden lg:block">
							<HeaderXpTicket />
						</div>

						<div class="flex justify-evenly items-center gap-[25px]">
							<button
								on:click={() => {
									notificationOpen = !notificationOpen;
									showProfile = false;
								}}
								class="relative flex items-center justify-center rounded-full notification"
							>
								<svg
									width="42"
									height="42"
									viewBox="0 0 42 42"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle opacity="0.1" cx="21" cy="21" r="20.5" stroke="#BEB6C0" />
									<path
										d="M28.0799 23.9999C27.1833 22.6388 26.7164 21.0396 26.7399 19.4099V19.2399C26.7389 18.312 26.5077 17.399 26.0672 16.5824C25.6266 15.7658 24.9904 15.0713 24.2155 14.561C23.4406 14.0507 22.5512 13.7405 21.6271 13.6583C20.7029 13.5761 19.7727 13.7244 18.9199 14.0899C17.9218 14.5026 17.0707 15.2056 16.4769 16.1078C15.8831 17.0101 15.5741 18.0699 15.5899 19.1499V19.2199C15.5964 20.9656 15.0387 22.6668 13.9999 24.0699L13.3399 24.9999C13.0728 25.3656 12.9292 25.807 12.9299 26.2599V26.2599C12.9299 26.8221 13.1533 27.3614 13.5509 27.7589C13.9484 28.1565 14.4877 28.3799 15.0499 28.3799H26.9999C27.2783 28.3799 27.554 28.325 27.8112 28.2185C28.0684 28.112 28.3021 27.9558 28.499 27.7589C28.6959 27.5621 28.852 27.3284 28.9586 27.0712C29.0651 26.814 29.1199 26.5383 29.1199 26.2599V26.1999C29.1223 25.7729 28.997 25.355 28.7599 24.9999L28.0799 23.9999Z"
										fill="#BEB6C0"
									/>
									<path
										d="M19.0898 29.3301C19.205 29.7538 19.4563 30.1278 19.8051 30.3944C20.1539 30.6611 20.5808 30.8056 21.0198 30.8056C21.4589 30.8056 21.8857 30.6611 22.2345 30.3944C22.5833 30.1278 22.8347 29.7538 22.9498 29.3301H19.0898Z"
										fill="#BEB6C0"
									/>
									<path
										d="M21.7599 13.6898V11.7598C21.7599 11.5609 21.6809 11.3701 21.5403 11.2294C21.3996 11.0888 21.2089 11.0098 21.0099 11.0098C20.811 11.0098 20.6203 11.0888 20.4796 11.2294C20.339 11.3701 20.2599 11.5609 20.2599 11.7598V13.6498C20.2555 13.6762 20.2555 13.7033 20.2599 13.7298C20.7559 13.6492 21.2604 13.6357 21.7599 13.6898V13.6898Z"
										fill="#BEB6C0"
									/>
									{#if notifications.filter((d) => !d.read).length > 0}
										<circle
											cx="26"
											cy="17"
											r="4"
											fill="#F71756"
											stroke="#140718"
											stroke-width="2"
										/>
									{/if}
								</svg>

								{#if notificationOpen}
									<div
										role="banner"
										transition:fade={{ duration: 200 }}
										class={`rounded-[10px] bg-[#2E1536] border border-[#432C4A] h-[560px] w-[316px] lg:w-[360px] absolute z-[150] top-14 ${
											$locale == 'ar' ? 'left-[-78px] lg:left-0' : 'right-[-78px] lg:right-0'
										} border-white-20`}
										on:mouseleave={() => (notificationOpen = false)}
									>
										<Notifications {notifications} />
									</div>
								{/if}
							</button>

							<button
								on:click={() => {
									notificationOpen = false;
									showProfile = !showProfile;
								}}
							>
								<img
									class="profileDropDown h-[42px] w-[42px] object-cover rounded-full cursor-pointer hidden lg:flex border-[2px] border-[#ffffff3b]"
									src={userLogo ? userLogo : userImg}
									alt="user logo"
								/>
							</button>

							<button
								class="flex lg:hidden w-[28px] h-[28px] flex-col justify-around items-end py-[2px]"
								on:click={() => {
									notificationOpen = false;

									sidebar = !sidebar;
								}}
							>
								<span class="w-[90%] h-[2px] bg-white-80 rounded-md" />
								<span class="w-[65%] h-[2px] bg-white-80 rounded-md" />
								<span class="w-[90%] h-[2px] bg-white-80 rounded-md" />
							</button>
							{#if sidebar}
								<Sidebar
									trophy={$user?.trophy}
									btnHandler={() => (sidebar = !sidebar)}
									logOutHandler={() => (logoutDialog = true)}
									avatar={userLogo ? userLogo : unknown}
									name={$user?.username}
									xp={$user?.xp}
									{percentage}
									{currentLevel}
									{levels}
									bind:isTicketsOpen
								/>
							{/if}
							{#if showProfile}
								<button
									class={`profileDropDown shadow-lg rounded-[10px] border border-[#432C4A] bg-[#2E1536] p-[10px] pb-[16px] absolute  top-[6rem] max-h-[550px] overflow-auto ${
										$locale == 'ar' ? 'left-10' : 'right-10'
									}  flex-col gap-[16px] hidden lg:flex z-[60]`}
									transition:fade={{ duration: 250 }}
									on:click|stopPropagation
								>
									<HeaderConnectWallet avatar={userLogo ? userLogo : userImg} />

									<div class="flex flex-col items-start gap-[16px] w-full p-[6px]">
										<hr class="w-full border-[#432C4A]" />
										<div
											class="flex flex-col items-start gap-[16px] w-full p-[12px] rounded-[12px] border border-[#3D2644] bg-[#280E30]"
										>
											<div class="flex items-center justify-between w-full">
												<div class="flex flex-col items-start gap-[4px]">
													<p
														dir={$locale == 'ar' ? 'rtl' : 'ltr'}
														class="text-[18px] text-[#D4CFD6] font-Gilroy-SemiBold leading-[22px]"
													>
														{$t('My Level')}
													</p>
													<p
														dir={$locale == 'ar' ? 'rtl' : 'ltr'}
														class="text-[#9E937F] text-[14px] font-Gilroy-Medium leading-[17px]"
													>
														{$t('level', {
															levelNum: `${currentLevel + 1}`
														})}
														<span class="text-[#FDEB56]">
															{$t('levelName', {
																levelName: `${$t(`${$levels[currentLevel].title}`)}`
															})}
														</span>
													</p>
												</div>
												<div>
													<img
														src={$levels[currentLevel].img}
														alt="level img"
														class="w-[38.501px]"
													/>
												</div>
											</div>
											<div class="flex flex-col items-start gap-[4px] w-full">
												<div class="h-[6px] w-[360px] relative bg-[#7e6e8333] rounded-[100px]">
													<div
														class={`h-[6px] relative bg-gradient-135 rounded-[100px]`}
														style="width: {percentage}%"
													/>
												</div>
												<div class="flex justify-between items-center w-full">
													<p
														dir={$locale == 'ar' ? 'rtl' : 'ltr'}
														class="text-[14px] leading-[17px]"
													>
														<span class="text-[#FDEB56] fontSemiBold">{$user?.xp}XP</span><span
															dir={$locale == 'ar' ? 'rtl' : 'ltr'}
															class="text-[#7E6E83] font-Gilroy-Medium"
															>/{$levels[currentLevel].end}XP</span
														>
													</p>
													<p
														dir={$locale == 'ar' ? 'rtl' : 'ltr'}
														class="text-[#948798] text-[14px] font-Gilroy-Medium leading-[17px]"
													>
														{$t('until', {
															levelNum: `${currentLevel + 2}`,
															xp: `${$levels[currentLevel].end - $user?.xp}`
														})}
													</p>
												</div>
											</div>
										</div>

										<HeaderMyAchievement />

										<hr class="w-full border-[#432C4A]" />

										<div class="flex flex-col items-start gap-[8px] w-full">
											<button
												on:click={openTicketsHandler}
												class="flex justify-start items-center gap-[16px] p-[8px] text-[#FDEB56] font-Gilroy-Medium not-italic text-[16px] leading-[19px] ease-in duration-100 w-full hover:bg-white-20 rounded-md"
											>
												<img src={Ticket} alt="logout svg" height="24px" width="24px" />
												<p>{$t('Support Ticket')}</p>
											</button>
											<button
												on:click={() => ((logoutDialog = true), (showProfile = false))}
												class="flex justify-start items-center gap-[16px] p-[8px] text-[#F71756] font-Gilroy-Medium not-italic text-[16px] leading-[19px] ease-in duration-100 w-full hover:bg-white-20 rounded-md"
											>
												<img src={logoutSvg} alt="logout svg" height="24px" width="24px" />
												<p>{$t('logout')}</p>
											</button>
										</div>
									</div>
								</button>
							{/if}
						</div>
						{#if logoutDialog}
							<Logout bind:logoutDialog />
						{/if}
					</div>
				{:else}
					<div class="flex items-center justify-center">
						<a href="/signup" class="">
							<Button type="transparent" size="md" class={$locale === 'ar' ? 'ml-2' : 'mr-2'}
								>{$t('signUp')}</Button
							>
						</a>
						<a href="/login" class="h-10">
							<Button type="gradient" class="hover:shadow-primary h-full py-[6px]" size="md"
								>{$t('login')}</Button
							>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</header>
	<HeaderItems />
{/if}

{#if isTicketsOpen}
	<Tickets {closeTicketsHandler} {isCreate} />
{/if}

{#if $user}
	<div
		class="hidden lg:flex items-center gap-[30px] fixed {$locale === 'ar'
			? 'left-[30px]'
			: 'right-[30px]'}  bottom-[66px] z-50 support-ticket-floating"
	>
		<button class="create-ticket-mini" on:click={openTicketsHandler}>
			<img src={CreateMini} alt="" />
			<p>{$locale == 'ar' ? 'الدعم' : 'Support'}</p>
		</button>
	</div>
{/if}

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	.dropdown * {
		background: #170118;
	}
	:global(.expand svg) {
		display: none;
	}
	:global(.expand input) {
		padding-left: 10px;
	}

	.header-search {
		border-radius: 8px;
		border: 2px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		z-index: 10;
		display: flex;
		align-items: center;
	}

	.header-search button {
		display: inline-flex;
		padding: 14px 18px 14px 22px;
		justify-content: flex-end;
		align-items: center;
		border-radius: 5px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		color: var(--white-10, #3d2644);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px; /* 88.889% */
	}

	.create-ticket-mini {
		width: 60px;
		height: 60px;
		display: flex;
		padding: 12px;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		border-radius: 1000px;
		background: var(--Accent, #fdeb56);

		cursor: pointer;
		z-index: 40;
		/* transition: 0.3s; */
	}

	.create-ticket-mini:hover {
		box-shadow: 0px 4px 30px 0px rgba(253, 235, 86, 0.2);
		width: 132px;
	}

	.create-ticket-mini:hover:lang(ar) {
		width: 135px;
		justify-content: flex-start;
		flex-direction: row-reverse;
	}

	.create-ticket-mini p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		padding-left: 12px;
		display: none;
	}

	.create-ticket-mini p:lang(ar) {
		padding-left: 0;
		padding-right: 12px;
		font-size: 20px;
	}

	.create-ticket-mini:hover p {
		display: block;
	}

	.profileDropDown::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>
