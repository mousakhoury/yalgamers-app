<script>
	import { explore } from '$lib/assets/navicons';
	import ScoreGuide from './ScoreGuide.svelte';
	import ScoreProfile from './ScoreProfile.svelte';

	export let isScanned = true;
	export let linkSharing = false;
</script>

<div class="flex flex-col lg:flex-row items-start gap-[16px] lg:gap-[24px] w-full lg:h-[619px]">
	<ScoreProfile {isScanned} bind:linkSharing />

	<ScoreGuide />
</div>
