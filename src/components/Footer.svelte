<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import logo from '$lib/assets/svg-logo.svg';
	import arrow from '$lib/assets/footer-arrow-down.svg';
	import top from '$lib/assets/footer-top-line.svg';
	import bottom from '$lib/assets/footer-bottom-line.svg';
	import { browser } from '$app/environment';

	$: contents = [
		{
			title: $t('Yalgamers'),
			items: [
				{
					name: $t(`courses`),
					url: '/courses'
				},
				{
					name: $t(`games`),
					url: '/games'
				},
				{
					name: $t(`tournaments`),
					url: '/tournaments'
				},
				{
					name: $t(`havefun`),
					url: '/have-fun'
				},
				{
					name: $t(`leaderboard`),
					url: '/leaderboard'
				},
				{
					name: $t(`Quests`),
					url: '/quests'
				},
				{
					name: $t(`networking`),
					url: '/networking'
				}
			]
		},

		{
			title: $t(`company`),
			items: [
				{
					name: $t(`about`),
					url: '/about'
				},
				{
					name: $t(`privacy`),
					url: '/privacy-policy'
				},
				{
					name: $t(`contact`),
					url: '/contact'
				}
			]
		}
	];

	// Add a local state variable to track visibility
	let menuVisibility = {};

	// Function to toggle the visibility of the menu
	function toggleMenu(title) {
		menuVisibility = { [title]: !menuVisibility[title] };
	}

	// Function to close all menus
	function closeAllMenus() {
		menuVisibility = {};
	}

	// Reactive statement to add/remove global click listener
	$: {
		if (browser) {
			if (Object.values(menuVisibility).includes(true)) {
				window.addEventListener('click', closeAllMenus);
			} else {
				window.removeEventListener('click', closeAllMenus);
			}
		}
	}

	import {
		facebook,
		insta,
		twitter,
		telegram,
		discord,
		youtube,
		facebookColor,
		instaColor,
		twitterColor,
		telegramColor,
		discordColor,
		youtubeColor
	} from '$lib/assets/socials.js';
	const socials = [
		{
			svg: facebook,
			hover: facebookColor,
			url: 'https://www.facebook.com/Yalgamers?mibextid=ZbWKwL'
		},
		{ svg: insta, hover: instaColor, url: 'https://www.instagram.com/yalgamers/' },
		{ svg: twitter, hover: twitterColor, url: 'https://twitter.com/yalgamers_gg' },
		{ svg: telegram, hover: telegramColor, url: 'https://t.me/Ar_Gaming_Guild_Ann' },
		{ svg: discord, hover: discordColor, url: 'https://discord.com/invite/vMPU44vmpU' },
		{ svg: youtube, hover: youtubeColor, url: 'https://www.youtube.com/@agguild' }
	];
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<footer>
	<div class="footer-container">
		<div class="footer-content">
			<img loading="lazy" alt="" src={logo} class="logo" />
			<h6>{$t('footer.desc')}</h6>
			<div class="social">
				{#each socials as item}
					<a class="social-link" href={item.url}>
						<img loading="lazy" src={item.svg} class="social-icon main-icon" alt="social icon" />
						<img
							loading="lazy"
							src={item.hover}
							class="social-icon hovered-icon"
							alt="social icon"
						/>
					</a>
				{/each}
			</div>
		</div>
		<div class="footer-top-line">
			<img loading="lazy" alt="" class="" src={top} />
		</div>
		<div class="footer-bottom-line">
			<img loading="lazy" alt="" class="" src={bottom} />
		</div>
	</div>

	<div class="footer-bottom">
		<h6>{$t('Copyright © 2023 YALGAMERS')}</h6>
		<div class="footer-tags">
			{#each contents as content}
				<button class="tag" on:click|stopPropagation={() => toggleMenu(content.title)}>
					<p>
						{content.title}
						<img
							loading="lazy"
							alt=""
							class={menuVisibility[content.title] ? 'arrow-flip' : ''}
							src={arrow}
						/>
					</p>

					<ul class={menuVisibility[content.title] ? 'visible' : 'hidden'}>
						{#each content.items as item}
							<li class="hover:underline"><a href={item.url}>{item.name}</a></li>
						{/each}
					</ul>
				</button>
			{/each}
		</div>
	</div>
</footer>

<style>
	.footer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		padding-top: 89px;
		padding-bottom: 94px;
		position: relative;
		background-image: url('$lib/assets/new-footer-bg.svg');
		margin-top: 80px;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		max-width: 403px;
	}

	.logo {
		width: 112.987px;
	}

	.footer-content h6 {
		color: var(--white-80, #d4cfd6);
		text-align: center;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		font-family: Gilroy-SemiBold;
	}

	.social {
		max-width: 264px;
		display: flex;
		align-items: center;
		gap: 24px;
	}
	.footer-top-line {
		position: absolute;
		top: 0;
		left: 0;
	}

	.footer-bottom-line {
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.footer-bottom {
		padding: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--Accent-2, #140718);
		flex-wrap: wrap-reverse;
	}

	.footer-bottom h6 {
		color: var(--white-30, #68566e);
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.footer-tags {
		display: flex;
		align-items: flex-start;
		gap: 60px;
	}

	.tag {
		position: relative;
	}

	.tag p {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--white-80, #d4cfd6);
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		cursor: pointer;
	}

	.tag p img {
		display: flex;
		width: 18px;
		height: 18px;
		justify-content: center;
		align-items: center;
	}

	.arrow-flip {
		transform: rotate(180deg);
	}

	.tag ul {
		position: absolute;
		bottom: 66px;
		background: #1a0620;
		color: var(--white-80, #d4cfd6);
		width: 141px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.tag ul::after {
		content: '';
		width: 20px;
		height: 20px;
		background: var(--Accent-2, #200b26);
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		bottom: -7px;
		z-index: -1;
	}

	.tag ul.visible {
		display: flex; /* or 'block', depending on your design */
	}

	.tag ul.hidden {
		display: none;
	}

	.social-link {
		position: relative;
		z-index: 10;
	}

	.social-link img {
		width: 24px;
		height: 24px;
	}

	.hovered-icon {
		display: none;
	}

	.social-link:hover .hovered-icon {
		display: block;
	}

	.social-link:hover .main-icon {
		display: none;
	}

	@media (max-width: 866px) {
		.footer-top-line {
			top: -19px;
		}

		.footer-bottom-line {
			bottom: -19px;
		}
		.footer-container {
			margin-top: 20px;
		}
	}

	@media (max-width: 720px) {
		.footer-content h6 {
			font-size: 24px;
		}
		.footer-bottom {
			gap: 24px;
			justify-content: center;
		}

		.footer-tags {
			gap: 35px;
		}

		.tag p img {
			width: 15px;
			height: 15px;
		}

		.tag p {
			gap: 5px;
			font-size: 12px;
		}

		.footer-top-line {
			top: 0;
		}

		.footer-bottom-line {
			bottom: 0;
		}
	}
</style>
