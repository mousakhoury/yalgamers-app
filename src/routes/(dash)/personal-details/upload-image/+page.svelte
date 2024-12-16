<script>
	// @ts-nocheck

	import TopBackground from '$lib/assets/login/top-background.png';
	import SignupUploadingImage from '$components/NewLogin/SignupUploadingImage.svelte';

	let main = true;
	let croppedImage;
</script>

<div
	class="flex flex-col items-start fixed top-0 left-0 w-full h-screen bg-[#140718] z-[90] overflow-y-scroll main-frame"
>
	<img src={TopBackground} alt="" class="w-full h-[100px] lg:h-[120px]" />
	{#if main}
		<SignupUploadingImage bind:croppedImage />
	{/if}
</div>

<style>
	:global(header, nav, footer) {
		height: 0;
		opacity: 0;
		display: none;
	}

	.main-frame {
		background-image: url('$lib/assets/login/big-main-bg.svg');
		background-position: center;
		background-size: cover;
	}
</style>
