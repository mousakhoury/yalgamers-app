<script>
	import { t, locale } from '$lib/stores/i18n';

	import Open from '$lib/assets/registration-open.svg';
	import Closed from '$lib/assets/registration-closed.svg';
	export let tournament;

	function determineStatus() {
		const now = new Date();
		const start = tournament.registration_starting_date
			? new Date(tournament.registration_starting_date)
			: null;
		const deadline = tournament.registration_deadline
			? new Date(tournament.registration_deadline)
			: null;

		// Handle case where starting date is unset or not reached yet
		if (!start || now < start) {
			return $t('Before Registration');
		} else if (deadline && now >= deadline) {
			return 'Finished';
		} else {
			return $t('Registration Open');
		}
	}

	let status = determineStatus(); // Determine the initial status

	let iconSrc, bgColor, textColor;

	// Set values based on status
	if (status === $t('Registration Open')) {
		iconSrc = Open;
		bgColor = '#072E0B'; // Background color for Registration Open
		textColor = '#1FD031'; // Text color for Registration Open
	} else if (status === 'Finished' || status === $t('Before Registration')) {
		iconSrc = Closed;
		bgColor = '#23040D'; // Background color for Finished or Before Registration
		textColor = '#F71756'; // Text color for Finished or Before Registration
	}
</script>

{#if status === 'Finished'}
	<div class="hidden" />
{:else if status === $t('Before Registration')}
	<!-- Additional hidden div for when registration_starting_date is unset or not reached yet -->
	<div class="hidden" />
{:else}
	<div
		class="rounded-[100px] py-[6px] lg:py-[8px] px-[8px] lg:px-[12px] flex items-center gap-[8px] lg:gap-[10px]"
		style="background-color: {bgColor};"
	>
		<img src={iconSrc} alt={status} class="h-[16px] lg:h-[20px] w-[16px] lg:w-[20px" />
		<p class="text-[12px] lg:text-[14px] font-Gilroy-SemiBold" style="color: {textColor};">
			{status}
		</p>
	</div>
{/if}
