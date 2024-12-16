<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import twitch from '$lib/assets/profile/twitch-logo.svg';
	import youtube from '$lib/assets/profile/youtube-logo.svg';
	import twitter from '$lib/assets/profile/twitter-logo.svg';
	import discord from '$lib/assets/profile/discord-logo.svg';
	import telegram from '$lib/assets/profile/telegram-logo.svg';

	import steam from '$lib/assets/profile/steam-logo.svg';
	import activision from '$lib/assets/profile/activision-logo.svg';
	import ea_sports from '$lib/assets/profile/ea-sports-logo.svg';
	import facebook from '$lib/assets/profile/facebook-logo.svg';
	import epic_games from '$lib/assets/profile/epic-games-logo.svg';
	import xp_icon from '$lib/assets/xp-icon.svg';
	import link_button from '$lib/assets/profile/link-button-icon.svg';
	import link_button_hover from '$lib/assets/profile/link-button-icon-hover.svg';

	import update_button from '$lib/assets/profile/update-button-icon.svg';
	import update_button_hover from '$lib/assets/profile/update-button-icon-hover.svg';

	import horizontal from '$lib/assets/link-horizontal-line.svg';
	import vertical from '$lib/assets/link-vertical-line.svg';
	import XpContainer from '$components/XpContainer.svelte';

	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;

	const { userAuthProviders, authProviders, redirectURL } = data;

	const isLinked = (sso) => {
		return userAuthProviders.find((s) => {
			return s.provider === sso;
		});
	};

	let social = [
		{
			name: $t('twitch'),
			sso: 'twitch',
			xp: '100',
			image: twitch,
			status: isLinked('twitch'),
			redeemed: false
		},
		{
			name: $t('youtube'),
			sso: 'youtube',
			xp: '100',
			image: youtube,
			status: false,
			redeemed: false
		},
		{
			name: $t('twitter'),
			xp: '100',
			sso: 'twitter',
			image: twitter,
			status: isLinked('twitter'),
			redeemed: false
		},
		{
			name: $t('discord'),
			xp: '200',
			sso: 'discord',
			image: discord,
			status: isLinked('discord'),
			redeemed: false
		},
		{
			name: $t('telegram'),
			xp: '200',
			sso: 'telegram',
			image: telegram,
			status: false,
			redeemed: false
		},
		{
			name: $t('steam'),
			xp: '500',
			sso: 'steam',
			image: steam,
			status: data.profile.steam ? true : false,
			redeemed: data.profile.steam ? true : false
		},

		{
			name: $t('activision'),
			sso: 'activision',
			xp: '500',
			image: activision,
			status: false,
			redeemed: false
		},
		{
			name: $t('ea sports'),
			sso: 'ea_sports',
			xp: '500',
			image: ea_sports,
			status: false,
			redeemed: false
		},
		{
			name: $t('facebook'),
			sso: 'facebook',
			xp: '500',
			image: facebook,
			status: false,
			redeemed: false
		},
		{
			name: $t('epic games'),
			sso: 'epic_games',
			xp: '500',
			image: epic_games,
			status: false,
			redeemed: false
		}
	];

	const ssoLogin = (providerName) => {
		// if (providerName == 'epic_games') {
		// 	goto(`/api/epic-game/login`);
		// } else
		if (providerName === 'steam') {
			goto(`/api/steam/login`);
		} else {
			const authProvider = authProviders.find((x) => x.name === providerName);
			if (authProvider) {
				const redirect = `${authProvider.authUrl}${redirectURL}`;
				const state = authProvider.state;
				const codeVerifier = authProvider.codeVerifier;

				if (browser) {
					document.cookie = `state=${state}`;
					document.cookie = `provider=${providerName}`;
					document.cookie = `codeVerifier=${codeVerifier}`;
				}

				window.location.href = redirect || '';
			}
		}
	};

	const midpoint = Math.ceil(social.length / 2);

	// Split the array into two halves
	const socialFirstHalf = social.slice(0, midpoint);
	const socialSecondHalf = social.slice(midpoint);

	let isMobile = false;
	let showAll = false; // Reactive variable to track the visibility of the second half

	onMount(() => {
		// Set the isMobile variable based on the initial screen width
		isMobile = window.matchMedia('(max-width: 768px)').matches;

		// Add an event listener to update isMobile if the screen size changes
		const handleResize = () => {
			isMobile = window.matchMedia('(max-width: 768px)').matches;
		};

		window.addEventListener('resize', handleResize);

		// Clean up the event listener when the component is destroyed
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const toggleShowAll = () => {
		showAll = !showAll;
	};
</script>

<div
	class="flex flex-col items-start gap-[12px] lg:gap-[14px] w-full pb-[12px] lg:pb-[14px] rounded-[8px] lg:rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
>
	<div
		class="flex items-center justify-between p-[12px] lg:p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-t-[8px] lg:rounded-t-[12px]"
	>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-[#FFFFFFE5] font-Gilroy-Medium text-[16px] lg:text-[18px]"
		>
			{$t('Link Social Media')}
		</p>
	</div>

	<div class="flex flex-col items-center gap-[16px] w-full">
		<div
			class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[14px] px-[12px] lg:px-[14px] w-full"
		>
			<div class="flex flex-col items-start w-full gap-[12px] lg:gap-[6px]">
				{#each socialFirstHalf as item}
					<div class="social">
						<div class="social-data">
							<img src={item.image} alt="" class="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px]" />
							<div class="social-name-xp">
								<p class={item.redeemed ? 'redeemed' : ''}>
									{$t('Link')}
									{item.name}
								</p>
								<p class="!text-[#FDEB56] !text-[12px] !lg:text-[14px] !font-Gilroy-Medium">
									{item.xp} XP
								</p>
							</div>
						</div>

						<div class="social-button">
							{#if item.status}
								<button class="button-update group">
									<img src={update_button} alt="" class="group-hover:hidden w-[16px] lg:w-[18px]" />
									<img
										src={update_button_hover}
										alt=""
										class="hidden group-hover:block w-[16px] lg:w-[18px]"
									/>
									<p>{$t('Update')}</p>
								</button>
							{:else}
								<button class="button-link group" on:click={() => ssoLogin(item.sso)}>
									<img src={link_button} alt="" class="group-hover:hidden w-[16px] lg:w-[18px]" />
									<img
										src={link_button_hover}
										alt=""
										class="hidden group-hover:block w-[16px] lg:w-[18px]"
									/>

									<p>{$t('Link Now')}</p>
								</button>
							{/if}
						</div>
					</div>
					<hr class="w-full border-[#36233C]" />
				{/each}
			</div>
			{#if !isMobile}
				<hr class="w-[1px] h-[348px] border-0 bg-[#36233C]" />
			{/if}

			{#if !isMobile || showAll}
				<div class="flex flex-col items-start w-full gap-[6px]">
					{#each socialSecondHalf as item}
						<div class="social">
							<div class="social-data">
								<img src={item.image} alt="" class="w-[30px] lg:w-[40px] h-[30px] lg:h-[40px]" />
								<div class="social-name-xp">
									<p class={item.redeemed ? 'redeemed' : ''}>
										{$t('Link')}
										{item.name}
									</p>
									<p class="!text-[#FDEB56] !text-[12px] !lg:text-[14px] !font-Gilroy-Medium">
										{item.xp} XP
									</p>
								</div>
							</div>

							<div class="social-button">
								{#if item.status}
									<button class="button-update group">
										<img
											src={update_button}
											alt=""
											class="group-hover:hidden w-[16px] lg:w-[18px]"
										/>
										<img
											src={update_button_hover}
											alt=""
											class="hidden group-hover:block w-[16px] lg:w-[18px]"
										/>
										<p>{$t('Update')}</p>
									</button>
								{:else}
									<button class="button-link group" on:click={() => ssoLogin(item.sso)}>
										<img src={link_button} alt="" class="group-hover:hidden w-[16px] lg:w-[18px]" />
										<img
											src={link_button_hover}
											alt=""
											class="hidden group-hover:block w-[16px] lg:w-[18px]"
										/>

										<p>{$t('Link Now')}</p>
									</button>
								{/if}
							</div>
						</div>
						<hr class="w-full border-[#36233C]" />
					{/each}
				</div>
			{/if}
		</div>
		{#if isMobile}
			<button
				class="text-[#FDEB56] text-[14px] font-Gilroy-Medium underline"
				on:click={toggleShowAll}
			>
				{showAll ? $t('SeeLess') : $t('seeAll')}
			</button>
		{/if}
	</div>
</div>

<style>
	.social {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		position: relative;
		padding: 10px 12px 10px 10px;
	}

	.social-data {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.social-name-xp {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}

	.social-name-xp p {
		color: rgba(255, 255, 255, 0.7);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px; /* 100% */
		position: relative;
	}

	.button-link {
		display: flex;
		padding: 8px 10px;
		align-items: center;
		gap: 8px;
		border-radius: 4px;
		border: 1px solid rgba(142, 201, 237, 0.15);
		background: rgba(142, 201, 237, 0.15);
	}

	.button-link:hover {
		background: #8ec9ed;
	}

	.button-link p {
		color: var(--Accent, #8ec9ed);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.button-link:hover p {
		color: #182228;
	}

	.button-update {
		display: flex;
		padding: 8px 10px;
		align-items: center;
		gap: 8px;
		border-radius: 4px;
		border: 1px solid rgba(188, 90, 215, 0.15);
		background: rgba(188, 90, 215, 0.15);
	}

	.button-update:hover {
		background: #bc5ad7;
	}

	.button-update p {
		color: #bc5ad7;
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.button-update:hover p {
		color: #281827;
	}

	.redeemed::after {
		content: 'Redeemed';
		display: flex;
		padding: 4px 8px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 100px;
		background: var(--Positive, #1fd031);
		color: var(--white-10, #3d2644);
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 16px; /* 133.333% */
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -81px;
	}

	@media (max-width: 1024px) {
		.social {
			padding: 0;
		}

		.social-data {
			gap: 12px;
		}

		.redeemed::after {
			top: 99%;
			transform: translateY(-50%);
			right: 0;
		}

		.social-name-xp {
			gap: 4px;
		}

		.social-name-xp p {
			font-size: 14px;
			line-height: 16px; /* 114.286% */
		}

		.button-link {
			padding: 6px 8px;
			gap: 8px;
			border-radius: 4px;
		}

		.button-link p {
			font-size: 14px;
		}

		.button-update {
			padding: 6px 8px;
			gap: 8px;
			border-radius: 4px;
		}

		.button-update p {
			font-size: 14px;
		}
	}
</style>
