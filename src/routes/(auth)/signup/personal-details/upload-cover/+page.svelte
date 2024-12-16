<script>
	// @ts-nocheck

	import TopBackground from '$lib/assets/login/top-background.png';
	import SignupUploadingCover from '$components/NewLogin/SignupUploadingCover.svelte';

	let main = true;
	let croppedImage;
</script>

<div
	class="flex flex-col items-start fixed top-0 left-0 w-full h-screen bg-[#140718] z-[90] overflow-y-scroll main-frame"
>
	<img src={TopBackground} alt="" class="w-full h-[120px]" />
	{#if main}
		<SignupUploadingCover bind:croppedImage />
	{/if}
</div>

<style>
	.main-frame {
		background-image: url('$lib/assets/login/big-main-bg.svg');
		background-position: center;
		background-size: cover;
	}
</style>
