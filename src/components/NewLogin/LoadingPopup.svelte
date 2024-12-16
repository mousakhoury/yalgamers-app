<!-- LoadingPopup.svelte -->
<script>
	export let progress = 0;
</script>

<div class="loading-overlay">
	<div class="loading-content">
		<svg class="circle-loader" width="80" height="80" viewBox="0 0 80 80">
			<!-- Background circle -->
			<circle class="circle-background" cx="40" cy="40" r="36" stroke-width="8" />
			<!-- Progress circle -->
			<circle
				class="circle-progress"
				cx="40"
				cy="40"
				r="36"
				stroke-width="8"
				transform="rotate(-90 40 40)"
				style="
					stroke-dasharray: 226.19467105846508; /* 2 * pi * radius */
					stroke-dashoffset: {226.19467105846508 - (226.19467105846508 * progress) / 100}"
			/>
			<!-- Text displaying the progress percentage -->
			<text class="circle-text" x="50%" y="50%" dy=".3em" text-anchor="middle">
				{progress}%
			</text>
		</svg>
		<p class="text-[#FFFFFF99] text-[16px] font-Gilroy-Medium">Uploading Photo...</p>
	</div>
</div>

<style>
	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(14, 5, 17, 0.9);
		z-index: 1000;
	}

	.loading-content {
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.circle-loader {
		width: 80px;
		height: 80px;
		margin-bottom: 16px;
	}

	.circle-background,
	.circle-progress {
		fill: none;
	}

	.circle-background {
		stroke: #2b212c;
	}

	.circle-progress {
		stroke: #1fd031;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: stroke-dashoffset 0.5s;
	}

	.circle-text {
		font-family: Gilroy-SemiBold;
		font-size: 13px;
		fill: #ffffff80;
	}
</style>
