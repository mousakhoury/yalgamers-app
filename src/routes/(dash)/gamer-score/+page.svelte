<script>
	import ScorePopup from '../../../components/GameScore/ScorePopup.svelte';
	import ScoreSteamLinked from '$components/GameScore/ScoreSteamLinked.svelte';
	import { t, locale } from '$lib/stores/i18n';
	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import ScoreLinkSteam from '$components/GameScore/ScoreLinkSteam.svelte';
	import ScoreNotLinked from '$components/GameScore/ScoreNotLinked.svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { score, last_scanned, steam_data } from '$lib/stores/steamscore';
	import SharePopup from '$components/GameScore/SharePopup.svelte';

	let isLinked = false;
	let isPublic = false;
	let isScanned = false;
	let openPopup = false;
	let scanning = false;
	let linkSharing = false;

	onMount(() => {
		if ($user.steam) {
			isLinked = true;
			get_steam_data();
		}
	});

	async function get_steam_data() {
		let res = await fetch('/api/steam');
		res = await res.json();

		if (res.data) {
			steam_data.set(res.data);
		}

		if (res.ok && res.data.profile_visible) {
			isPublic = true;
			score.set(res.data.score);
			if (res.data.last_scan) {
				last_scanned.set(new Date(res.data.last_scan));
			} else {
				openPopup = true;
			}
		} else {
			errorToast(res.msg);
		}
	}

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}
</script>

<div
	class="flex flex-col items-start gap-[16px] lg:gap-[24px] p-[16px] lg:px-[30px] lg:py-[24px] w-full"
>
	<div class="flex gap-[10px] justify-start items-center">
		<img
			height="24px"
			width="24px"
			src={leftArrow}
			alt="left arrow icon"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<a
			href="/"
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold">{$t('Explore')}</a
		>
		<img
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="inline-block overflow-hidden text-lg not-italic font-normal pointer-events-none text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			Game Score
		</p>
	</div>

	<ScoreLinkSteam bind:isLinked {isScanned} bind:openPopup bind:scanning {isPublic} />

	{#if isLinked}
		<ScoreSteamLinked {isScanned} bind:linkSharing />
	{:else}
		<ScoreNotLinked />
	{/if}
</div>

{#if openPopup}
	<ScorePopup bind:openPopup bind:scanning bind:isScanned bind:linkSharing />
{/if}

{#if linkSharing}
	<SharePopup bind:linkSharing />
{/if}
