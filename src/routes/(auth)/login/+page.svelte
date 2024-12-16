<script>
	// @ts-nocheck

	import LoginMainSection from '$components/NewLogin/LoginMainSection.svelte';
	import LoginSide from '$components/NewLogin/LoginSide.svelte';

	export let data;
</script>

<div
	class="flex flex-col lg:flex-row items-start fixed top-0 left-0 w-full h-screen bg-[#140718] z-[90] overflow-auto"
>
	<LoginSide />
	<div class="flex items-center justify-center w-full h-full main-section">
		<LoginMainSection />
	</div>
</div>

<style>
	.main-section {
		background-image: url('$lib/assets/login/main-bg.svg');
		background-position: center;
		background-size: cover;
	}
</style>
