<script>
	import ScorePopupSuccess from './ScorePopupSuccess.svelte';
	import ScorePopupFailed from './ScorePopupFailed.svelte';
	import ScorePopupScanning from './ScorePopupScanning.svelte';
	import ScorePopupSteamLinked from './ScorePopupSteamLinked.svelte';

	export let openPopup = false;
	export let scanning = false;
	export let linkSharing = false;
	export let isScanned = false;

	let finishScanning = false;
	let isFailed = false;
	let msg = `Looks like your Steam account is in private mode. Make sure you turned your account into
				public mode before you scan again.`;
</script>

<div
	class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511b3] px-[16px] z-[51]"
>
	<div
		class="w-full max-w-[440px] p-[20px] lg:p-[24px] rounded-[12px] border border-[#321F37] bg-[#200B26]"
	>
		{#if scanning}
			{#if finishScanning}
				{#if isFailed}
					<ScorePopupFailed bind:openPopup bind:scanning bind:finishScanning bind:msg />
				{:else}
					<ScorePopupSuccess bind:openPopup bind:scanning bind:linkSharing />
				{/if}
				<div />
			{:else}
				<ScorePopupScanning
					bind:openPopup
					bind:scanning
					bind:finishScanning
					bind:isFailed
					bind:isScanned
					bind:msg
				/>
			{/if}
		{:else}
			<ScorePopupSteamLinked bind:openPopup bind:scanning />
		{/if}
	</div>
</div>
