<script>
	import { t, locale } from '$lib/stores/i18n';
	import Logo from '$lib/assets/svg-logo.svg';
	import Video from '$lib/assets/login/video.mp4';

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
		{ svg: facebook, hover: facebookColor, url: '/' },
		{ svg: insta, hover: instaColor, url: '/' },
		{ svg: twitter, hover: twitterColor, url: 'https://x.com/yalgamersgg' },
		{ svg: telegram, hover: telegramColor, url: 'https://t.me/Ar_Gaming_Guild_Ann' },
		{ svg: discord, hover: discordColor, url: 'https://discord.gg/tZ4U754urD' },
		{ svg: youtube, hover: youtubeColor, url: 'https://youtube.com/@agguild' }
	];
</script>

<!-- <div class="flex items-center justify-center w-full max-w-[720px] h-[200px] lg:h-full bg-image">
	<div
		class="flex items-center justify-center w-full max-w-[420px] h-[200px] lg:h-auto lg:aspect-[420/400.117] main-frame"
	>
		<div class="flex flex-col items-center gap-[16px]">
			<div class="flex flex-col items-center gap-[12px] lg:gap-[20px]">
				<img src={Logo} alt="" class="w-[80px] lg:w-[120px]" />
				<p
					class="text-[#E9E6EA] text-[16px] lg:text-[22px] text-center font-Gilroy-Bold leading-[20px] lg:leading-[27px] max-w-[249px] lg:max-w-[300px]"
				>
					{$t('footer.desc')}
				</p>
			</div>

			<div class="lg:flex items-center gap-[14px] hidden">
				{#each socials as item}
					<a href={item.url} class="w-[20px] h-[20px] group">
						<img src={item.svg} alt="" class="group-hover:hidden" />
						<img src={item.hover} alt="" class="hidden group-hover:block" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</div> -->

<!-- <video src={Video}  /> -->
<video
	autoplay
	muted
	loop
	playsinline
	class="w-full max-w-[720px] h-[200px] lg:h-full object-cover"
	src={Video}
/>

<!-- <source  type="video/mp4" />
	Your browser does not support the video tag.
</video> -->

<style>
	.bg-image {
		background-image: url('$lib/assets/login/Background.png');
		background-position: center;
		background-size: cover;
	}

	.main-frame {
		background-image: url('$lib/assets/login/Main-Frame.svg');
		background-position: center;
		background-size: cover;
	}
</style>
