<script>
	import { t, locale } from '$lib/stores/i18n';

	import SoloIcon from '$lib/assets/tournament-solo.svg';
	import SquadIcon from '$lib/assets/tournament-squad.svg';

	export let tournament;

	let iconSrc, modeText, bgColor, textColor;

	// Reactively update values based on tournament.mode
	$: if (tournament.mode === 'solo') {
		iconSrc = SoloIcon;
		modeText = $t('solo');
		bgColor = '#372A4C'; // Example background color for Solo
		textColor = '#8EC9ED'; // Example text color for Solo
	} else if (tournament.mode === 'squad') {
		iconSrc = SquadIcon;
		modeText = $t('squad');
		bgColor = '#3E1949'; // Example background color for Squad
		textColor = '#BC5AD7'; // Example text color for Squad
	}
</script>

<div
	class="rounded-[100px] py-[6px] lg:py-[8px] px-[8px] lg:px-[12px] flex items-center gap-[8px] lg:gap-[10px]"
	style="background-color: {bgColor};"
>
	<img src={iconSrc} alt={modeText} class="h-[16px] lg:h-[20px] w-[16px] lg:w-[20px" />
	<p class="text-[12px] lg:text-[14px] font-Gilroy-SemiBold" style="color: {textColor};">
		{modeText}
	</p>
</div>
