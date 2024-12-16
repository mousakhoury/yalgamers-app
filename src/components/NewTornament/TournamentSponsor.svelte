<script>
	import { t, locale } from '$lib/stores/i18n';

	import ImagePlaceholder from '$lib/assets/ImagePlaceholder.svg';
	import { getImageUrl } from '$lib/utils.js';

	export let sponsors;
	let diamond = [];
	let participating = [];

	$: if (sponsors) {
		diamond = sponsors.filter((f) => f.category == 'Diamond');
		participating = sponsors.filter((f) => f.category == 'Participating');
	}
</script>

<div class="flex flex-col items-start gap-[30px] w-full">
	<div class="flex flex-col items-start gap-[12px]">
		<p class="text-[#E9E6EA] text-[20px] font-Gilroy-SemiBold">{$t('DiamondSponsor')}</p>
		<div class="flex items-start gap-[10px]">
			{#each diamond as sponsor}
				<img
					src={getImageUrl('sponsors', sponsor.id, sponsor.logo)}
					alt=""
					class="w-[100px] h-[100px] object-contain"
				/>
			{/each}
		</div>
	</div>
	{#if participating.length != 0}
		<div class="flex flex-col items-start gap-[12px]">
			<p class="text-[#E9E6EA] text-[20px] font-Gilroy-SemiBold">{$t('ParticipatingSponsors')}</p>
			<div class="flex items-start gap-[10px]">
				{#each participating as sponsor}
					<img
						src={getImageUrl('sponsors', sponsor.id, sponsor.logo)}
						alt=""
						class="w-[60px] h-[60px] object-contain"
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
