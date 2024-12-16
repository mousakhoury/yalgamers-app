<script>
	import { t, locale } from '$lib/stores/i18n';

	import logo from '$lib/assets/logo.png';

	$: contents = [
		{
			title: 'Yal Gamers',
			items: [
				{
					name: $t(`courses`),
					url: '/'
				},
				{
					name: $t(`streams`),
					url: '/'
				},
				{
					name: $t(`games`),
					url: '/'
				},
				{
					name: $t(`tournaments`),
					url: '/'
				},
				{
					name: $t(`earn`),
					url: '/'
				},
				{
					name: $t(`scholarship`),
					url: '/'
				},
				{
					name: $t(`networking`),
					url: '/'
				}
			]
		},
		{
			title: $t(`pages`),
			items: [
				{
					name: $t(`news`),
					url: '/'
				},
				{
					name: $t(`events`),
					url: '/'
				},
				{
					name: $t(`terms`),
					url: '/'
				},
				{
					name: $t(`privacy`),
					url: '/'
				},
				{
					name: $t(`platforms`),
					url: '/'
				}
			]
		},
		{
			title: $t(`company`),
			items: [
				{
					name: $t(`about`),
					url: '/'
				},
				{
					name: $t(`partners`),
					url: '/'
				},
				{
					name: $t(`team`),
					url: '/'
				}
			]
		}
	];

	// Add a local state variable to track visibility
	let menuVisibility = {};

	// Function to toggle the visibility of the menu
	function toggleMenu(title) {
		menuVisibility[title] = !menuVisibility[title];
	}

	import { facebook, insta, twitter, telegram, discord, youtube } from '$lib/assets/socials.js';
	const socials = [
		{ svg: facebook, url: '' },
		{ svg: insta, url: '' },
		{ svg: twitter, url: '' },
		{ svg: telegram, url: '' },
		{ svg: discord, url: '' },
		{ svg: youtube, url: '' }
	];
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<div class="footer-container">
	<div class="footer-content">
		<img src={logo} class="logo" />
		<h6>{$t('footer.desc')}</h6>
		<div class="social">
			{#each socials as item}
				<a href={item.url}>
					<object type="image/svg+xml" data={item.svg} class="ease-in duration-30" />
				</a>
			{/each}
		</div>
	</div>
	<img class="footer-top-line" src="src/lib/assets/footer-top-line.svg" />
	<img class="footer-bottom-line" src="src/lib/assets/footer-bottom-line.svg" />
</div>

<div class="footer-bottom">
	<h6>Copyright © 2023 YAL GAMERS</h6>
	<div class="footer-tags">
		{#each contents as content}
			<div class="tag" on:click={() => toggleMenu(content.title)}>
				<p>
					{content.title}
					<img
						class={menuVisibility[content.title] ? 'arrow-flip' : ''}
						src="src/lib/assets/footer-arrow-down.svg"
					/>
				</p>

				<ul class={menuVisibility[content.title] ? 'visible' : 'hidden'}>
					{#each content.items as item}
						<li><a href={item.url}>{item.name}</a></li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<style>
	.footer-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 89px;
		padding-bottom: 94px;
		position: relative;
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
		background: var(--Accent-2, #200b26);
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
		background: #220d28;
		color: var(--white-80, #d4cfd6);
		width: 129px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
		left: 50%;
		transform: translateX(-50%);
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
	}

	.tag ul.visible {
		display: flex; /* or 'block', depending on your design */
	}

	.tag ul.hidden {
		display: none;
	}
</style>
