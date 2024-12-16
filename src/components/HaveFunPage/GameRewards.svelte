<script>
	import StarstruckScorers from '$lib/assets/frame-1171276019.svg';
	import AscendantAchievers from '$lib/assets/frame-1171276020.svg';
	import SavageScoring from '$lib/assets/frame-1171276021.svg';
	import EpicPointMasters from '$lib/assets/frame-1171276022.svg';
	import GameReward from './GameReward.svelte';
</script>

<div class="phave-fun-child">
	<div class="prewards-parent">
		<div class="prewards">Rewards</div>
		<div class="pframe-parent2">
			<GameReward
				image={EpicPointMasters}
				name="Epic Pointmasters"
				subText="Score above 1000 to earn"
				xp="2000"
			/>

			<GameReward
				image={AscendantAchievers}
				name="Savage Scoring Legends"
				subText="Score above 1000 to earn"
				xp="1000"
			/>
			<GameReward
				image={SavageScoring}
				name="Ascendant Achievers"
				subText="Score above 1000 to earn"
				xp="500"
			/>
			<GameReward
				image={StarstruckScorers}
				name="Starstruck Scorers"
				subText="Score above 1000 to earn"
				xp="100"
			/>
		</div>
	</div>
</div>
