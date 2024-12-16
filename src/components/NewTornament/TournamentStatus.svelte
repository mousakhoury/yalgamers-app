<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import UpcomingIcon from '$lib/assets/upcoming-icon.svg';
	import OngoingIcon from '$lib/assets/Ongoing.svg';
	import FinishedIcon from '$lib/assets/Finished.svg';
	export let tournament;

	// Adjusted function to account for 'deadline' even when 'start' is not available
	function determineStatus() {
		const now = new Date();
		const start = tournament.start ? new Date(tournament.start) : null;
		const deadline = tournament.deadline ? new Date(tournament.deadline) : null;

		if (deadline && now >= deadline) {
			return $t('finished');
		} else if (!start || now < start) {
			return $t('upcoming');
		} else {
			return $t('Ongoing');
		}
	}

	let status = determineStatus(); // Determine the initial status

	// Variables for dynamic values
	let iconSrc, bgColor, textColor;

	// Set values based on status
	if (status === $t('upcoming')) {
		iconSrc = UpcomingIcon;
		bgColor = '#35310C'; // Example background color for Upcoming
		textColor = '#FDEB56'; // Example text color for Upcoming
	} else if (status === $t('Ongoing')) {
		iconSrc = OngoingIcon;
		bgColor = '#072E0B'; // Example background color for Ongoing
		textColor = '#1FD031'; // Example text color for Ongoing
	} else if (status === $t('finished')) {
		iconSrc = FinishedIcon;
		bgColor = '#23040D'; // Example background color for Finished
		textColor = '#F71756'; // Example text color for Finished
	}
</script>

<div
	class="rounded-[100px] py-[6px] lg:py-[8px] px-[8px] lg:px-[12px] flex items-center gap-[8px] lg:gap-[10px]"
	style="background-color: {bgColor};"
>
	<img src={iconSrc} alt={status} class="h-[16px] lg:h-[20px] w-[16px] lg:w-[20px]" />
	<p class="text-[12px] lg:text-[14px] font-Gilroy-SemiBold" style="color: {textColor};">
		{status}
	</p>
</div>
