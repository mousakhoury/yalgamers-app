<script>
	import MatchContainer from './MatchContainer.svelte';
	export let matches;
	export let total_number_of_matches;
	export let tournament;
</script>

<div class="flex flex-col items-start gap-[40px] w-full">
	<div class="flex flex-col items-start gap-[40px] w-full">
		<!-- ROUND OF MATCHES -->
		{#if matches['Round Of Matches']}
			<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">Round Of Matches</p>
			<div class="matches-container">
				{#each matches['Round Of Matches'] as match}
					<MatchContainer {tournament} bind:match total={total_number_of_matches} />
				{/each}
			</div>
		{/if}

		<!-- KNOCKOUT MATCHES -->
		{#if matches['Knockout Matches']}
			<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">Knockout Matches</p>
			<div class="matches-container">
				{#each matches['Knockout Matches'] as match}
					<MatchContainer {tournament} bind:match total={total_number_of_matches} />
				{/each}
			</div>
		{/if}

		<!-- Quarter Finals -->
		{#if matches['Quarter Finals']}
			<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">Quarter Finals</p>
			<div class="matches-container">
				{#each matches['Quarter Finals'] as match}
					<MatchContainer {tournament} bind:match total={total_number_of_matches} />
				{/each}
			</div>
		{/if}

		<!-- KNOCKOUT MATCHES -->
		{#if matches['Semi Final']}
			<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">Knockout Matches</p>
			<div class="matches-container">
				{#each matches['Semi Final'] as match}
					<MatchContainer {tournament} bind:match total={total_number_of_matches} />
				{/each}
			</div>
		{/if}

		<!-- FINAL -->
		{#if matches['The Final']}
			<p class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">The Final</p>
			<div class="matches-container">
				{#each matches['The Final'] as match}
					<MatchContainer {tournament} bind:match total={total_number_of_matches} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.matches-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 30px;
		width: 100%;
		/* height: auto; */
	}
</style>
