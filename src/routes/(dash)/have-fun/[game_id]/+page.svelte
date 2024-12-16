<script>
	// @ts-nocheck

	import GameDetailsContainer from '$components/HaveFunPage/GameDetailsContainer.svelte';
	import GameInfo from '$components/HaveFunPage/GameInfo.svelte';
	import GameRewards from '$components/HaveFunPage/GameRewards.svelte';
	export let data;
	import '$lib/assets/css/have-fun-page.css';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let iframe;

	let isPlaying = false;

	const handlePlay = () => {
		isPlaying = true;
		iframe.src = `/mini-games/${data.game.bucket_path}/index.html`;
		iframe
			.requestFullscreen()
			.then(() => {
				screen.orientation.lock('landscape-primary');
			})
			.catch((e) => {
				console.error('Error trying to lock the screen orientation:', e);
			});
	};

	// Function to call when exiting fullscreen
	const handleFullScreenChange = () => {
		if (!browser) return;
		if (!document.fullscreenElement) {
			isPlaying = false; // This will show the play button again
			screen.orientation.unlock();
		}
	};

	onMount(() => {
		if (!browser) return;
		// Add fullscreen change event listener
		document.addEventListener('fullscreenchange', handleFullScreenChange);
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('fullscreenchange', handleFullScreenChange);
		isPlaying = false;
		screen.orientation.unlock();
	});
</script>

<svelte:head>
	<title>Game - {data.game.title_en}</title>
</svelte:head>

<div class="phave-fun">
	<div class="phave-fun-inner">
		<div class="pframe-parent">
			<GameInfo {handlePlay} game={data.game} />
			<GameDetailsContainer
				game={data.game}
				leaderboard={data.leaderboard}
				me={data.profile}
				comulative_score={data.comulative_score}
			/>
		</div>
	</div>
	<!-- <GameRewards /> -->
</div>

<div class="w-full flex-grow flex items-center justify-center mt-[50px] relative">
	<!-- <div
		class="h-[518px] w-[922px] z-10 backdrop-blur-md absolute top-0 left-0 w-full"
		class:hidden={isPlaying}
	>
		<div class="flex items-center justify-center w-full h-full">
			<button class="play" on:click={handlePlay}>Play</button>
		</div>
	</div> -->
	<iframe
		bind:this={iframe}
		height="518"
		width="922"
		class:hidden={!isPlaying}
		class="absolute top-0 left-1/4"
		title={$page.params.game_id}
		allowfullscreen
	/>
</div>
