<script>
	import { t, locale } from '$lib/stores/i18n';
	import GameContainer from '$components/HaveFun/GameContainer.svelte';
	import LaunchGame from '$components/HaveFun/LaunchGame.svelte';
	import '$lib/assets/css/have-fun.css';
	export let data;
</script>

<div class="have-fun">
	<div class="have-fun1">
		<h1 class="our-games">{$t('Mini Games')}</h1>
		<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[30px]">
			{#each data.games as game}
				<GameContainer {game} />
			{/each}
		</div>
	</div>
	<LaunchGame />
</div>
