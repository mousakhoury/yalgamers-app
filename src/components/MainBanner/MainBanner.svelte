<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import LandingSwiper from '$components/Swiper/LandingSwiper.svelte';
	export let items = [];
</script>

<div class="flex items-center justify-center w-full">
	<div
		class="w-full relative overflow-hidden bg-accent rounded-[12px] border-2 border-solid border-[#3D2644]"
	>
		<LandingSwiper {items} />
	</div>
</div>
