<script>
	import { t, locale } from '$lib/stores/i18n';
	import { onMount, onDestroy } from 'svelte';
	import GameImage from '$lib/assets/ellipse-150@2x.png';
	import ArrowRight from '$lib/assets/iconlylightarrow--right.svg';
	import PlayNow from '$lib/assets/havehun-playnow.svg';
	import PlayStore from '$lib/assets/have-fun-play-store.svg';
	import OwnerImage from '$lib/assets/game-owner.svg';

	import { getImageUrl } from '$lib/utils';
	export let game;
	export let handlePlay;

	let formattedDate = ''; // Initialize an empty string for the formatted date

	// Reactive statement to update formattedDate whenever $locale or game.created changes
	$: {
		formattedDate = formatDate(game.created);
	}

	// Function to format the date based on the current locale
	function formatDate(dateString) {
		const date = new Date(dateString);
		let options = { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' };

		if ($locale === 'en') {
			// Format for English
			return new Date(date).toLocaleDateString('en-US', options);
		} else if ($locale === 'ar') {
			// Format for Arabic, adjust the options if necessary
			return new Date(date).toLocaleDateString('ar-EG', options);
		}

		// Default return if locale is not matched
		return new Date(date).toLocaleDateString($locale, options);
	}

	let isMobile = false;

	function updateButtonText() {
		if (window.innerWidth < 1280) {
			isMobile = true; // Text for smaller screens
		} else {
			isMobile = false; // Text for larger screens
		}
	}

	onMount(() => {
		// Initial check to set the correct button text
		updateButtonText();

		// Listen for window resize events to update the button text
		window.addEventListener('resize', updateButtonText);

		// Cleanup the event listener when the component is destroyed
		return () => {
			window.removeEventListener('resize', updateButtonText);
		};
	});
</script>

<div class="pframe-wrapper">
	<div class="flex flex-col items-end w-full">
		<div class="pk-played-wrapper">
			<div class="pk-played">{game.total_played} {$t('Played')}</div>
		</div>
		<div class="flex flex-col items-end gap-[42px] w-full">
			<div class="flex flex-col items-center gap-[20px] w-full">
				<div class="pframe-group w-full">
					<div class="flex flex-col items-center gap-[16px] w-full">
						<div class="pellipse-parent">
							<img
								class="pframe-child"
								alt=""
								src={getImageUrl('mini_games', game.id, game.icon)}
							/>

							<div class="pframe-container">
								<div class="pdino-t-rex-parent">
									<div class="pdino-t-rex">{$locale === 'ar' ? game.title_ar : game.title_en}</div>
									<div class="plaunched-on-20">
										{$locale === 'ar'
											? `تم الإطلاق في ${formattedDate} بواسطة يالغيمرز`
											: `Launched on ${formattedDate} by Yalgamers`}
									</div>
								</div>
							</div>
						</div>
						{#if game.google_play}
							<a
								target="_blank"
								href={game.google_play_url}
								class="flex items-center gap-[10px] p-[8px] pr-[16px] rounded-[6px] bg-[#ffffff14]"
							>
								<img src={PlayStore} alt="" class="w-[32px]" />
								<div class="flex flex-col items-start gap-[2px]">
									<p class="text-[#FFFFFF80] text-[12px] font-Gilroy leading-[14px]">
										{$t('Available on')}
									</p>
									<p class="text-[#FFFFFFCC] text-[18px] font-Gilroy-Medium leading-[22px]">
										{$t('Google Play')}
									</p>
								</div>
							</a>
						{/if}
					</div>
				</div>
				<div class="flex flex-col items-center gap-[16px] w-full">
					<hr class="w-full border-[#ffffff14]" />
					<div class="flex flex-col items-center gap-[20px] w-full">
						<div class="flex flex-col items-start gap-[6px] w-full">
							<p class="text-[#FFFFFFE5] text-[18px] font-Gilroy-Medium leading-[22px]">
								{$t('About This Game')}
							</p>
							<p class="text-[#FFFFFFB2] text-[14px] text-start font-Gilroy leading-[17px]">
								{#if $locale === 'ar'}
									{@html game.about_game_ar}
								{:else}
									{@html game.about_game_en}
								{/if}
							</p>
						</div>
						<div class="flex items-center gap-[8px] w-full">
							<img src={OwnerImage} alt="" class="w-[45.926px]" />
							<div class="flex flex-col items-start gap-[2px]">
								<p class="text-[#FFFFFF80] text-[12px] font-Gilroy leading-[14px]">
									{$t('Owned by')}
								</p>
								<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium leading-[20px]">
									{$t('Yalgamers')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{#if isMobile}
				<button on:click={handlePlay} class="pmedium-parent">
					<img src={PlayNow} alt="" class="w-[24px]" />
					<div class="pk-played">{$t('Play Now')}</div>
				</button>
			{:else}
				<a href={`/have-fun/${game.id}/play`} class="w-full">
					<button class="pmedium-parent">
						<img src={PlayNow} alt="" class="w-[24px]" />
						<div class="pk-played">{$t('Play Now')}</div>
					</button>
				</a>
			{/if}
		</div>
	</div>
</div>
