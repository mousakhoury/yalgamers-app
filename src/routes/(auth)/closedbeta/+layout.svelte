<script>
	import Logo from '$lib/assets/closed_beta/Logo.svg';
	// import Telegram from '$lib/assets/closed_beta/telegram.svg';
	// import Twitter from '$lib/assets/closed_beta/twitter.svg';
	// import Frame from '$lib/assets/closed_beta/frame.svg';

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

	let social = [
		{
			title: 'facebook',
			image: facebookColor,
			link: 'https://www.facebook.com/Yalgamers?mibextid=ZbWKwL'
		},
		{ title: 'insta', image: instaColor, link: 'https://www.instagram.com/yalgamers/' },
		{ title: 'twitter', image: twitterColor, link: 'https://twitter.com/yalgamers_gg' },
		{ title: 'telegram', image: telegramColor, link: 'https://t.me/Ar_Gaming_Guild_Ann' },
		{ title: 'discord', image: discordColor, link: 'https://discord.com/invite/vMPU44vmpU' },
		{ title: 'youtube', image: youtubeColor, link: 'https://www.youtube.com/@agguild' }
	];
</script>

<div class="fixed top-0 left-0 z-[90] bg-image w-full h-screen overflow-auto">
	<div
		class="flex flex-col items-start justify-between gap-[30px] lg:gap-0 w-full h-full px-[16px] lg:px-[60px] pt-[18.6px] lg:pt-[24px] pb-[18.5px] lg:pb-[21px] max-w-[1280px] mx-auto"
	>
		<header class="flex items-center justify-between w-full">
			<img src={Logo} alt="" class="w-[198.889px]" />
			<div class="flex items-center gap-[40px]">
				<a
					href="/"
					class="text-[#ffffff80] hover:text-[#FDEB56] text-[16px] font-Gilroy-Medium hover:underline hidden lg:block"
				>
					Visit Platform
				</a>
				<a
					href="/login"
					class="px-[18px] lg:px-[24px] pt-[8px] lg:pt-[10px] pb-[9px] lg:pb-[11px] rounded-[6px] border border-[#fdeb5633] hover:bg-[#FDEB56] group"
				>
					<p
						class="text-[#FDEB56] text-[14px] lg:text-[16px] font-Gilroy-Medium group-hover:text-[#1E1C09]"
					>
						Login
					</p>
				</a>
			</div>
		</header>
		<div class="flex items-center justify-center w-full h-full pt-[52px] pb-[48px] lg:p-0">
			<slot />
		</div>
		<footer class="flex items-center justify-between w-full">
			<p class="text-[#ffffff4d] text-[12px] lg:text-[14px] font-Gilroy-Medium">
				©Yalgamers. All rights reserved.
			</p>

			<div class="flex items-center gap-[20px]">
				{#each social as item}
					<a href={item.link}>
						<img src={item.image} alt={item.title} class="w-[20px]" />
					</a>
				{/each}
			</div>
		</footer>
	</div>
</div>

<style>
	.bg-image {
		background-image: url('$lib/assets/closed_beta/closed-beta-bg.svg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
