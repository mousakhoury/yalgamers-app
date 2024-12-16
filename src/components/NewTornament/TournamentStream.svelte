<script>
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils.js';
	export let tournament;
	export let links;

	// Adjusted function to account for 'deadline' even when 'start' is not available
	function determineStatus() {
		const now = new Date();
		const start = tournament.start ? new Date(tournament.start) : null;
		const deadline = tournament.deadline ? new Date(tournament.deadline) : null;

		if (deadline && now >= deadline) {
			return 'Finished';
		} else if (!start || now < start) {
			return 'Upcoming';
		} else {
			return 'Ongoing';
		}
	}

	let status = determineStatus(); // Determine the initial status

	// Variables for dynamic values
</script>

<div class="flex flex-col items-start gap-[12px] w-full">
	<h5 class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">{$t('LiveStream')}</h5>
	{#if status === 'Upcoming'}
		<p class="text-[#7E6E83] text-[20px] font-Gilroy-Medium">
			{$t('StreamAvailable')}
		</p>
	{/if}
	{#if status === 'Finished'}
		<p class="text-[#7E6E83] text-[20px] font-Gilroy-Medium">{$t('StreamFinished')}</p>
	{/if}
	{#if status === 'Ongoing'}
		<div class="flex items-start gap-[24px]">
			{#each links as link}
				<a
					href={link.link}
					class="flex items-center gap-[10px] px-[20px] py-[10px] bg-[#392240] border border-solid border-[#503C56] rounded-[10px]"
				>
					<img class="h-15 w-16" src={getImageUrl('stream_links', link.id, link.logo)} alt="" />
					<p class="text-[#D4CFD6] text-[20px] font-Gilroy-SemiBold">
						Watch Live Stream on {link.name}
					</p>
				</a>
			{/each}
		</div>
	{/if}
</div>
