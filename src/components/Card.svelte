<script>
	export let image;
	import glow from '$lib/assets/glow.svg';
</script>

<div class="new-card">
	<img loading="lazy" src={image} alt="" />
	<slot />
</div>

<style>
	.new-card {
		width: 100%;
		/* max-width: 250px; */
		aspect-ratio: 250/391;
		border-radius: 10px;
		background: var(--Accent-2, #200b26);
		position: relative;
		transition: 0.3s;
		bottom: 0;
		border: 4px solid #200b26;
	}

	.new-card:hover {
		bottom: 13px;
	}

	.new-card::after {
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 12px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	.new-card:hover::after {
		width: calc(100% + 12px);
		height: calc(100% + 12px);
		background: linear-gradient(180deg, rgba(253, 235, 86, 0.6) 0%, rgba(255, 255, 255, 0) 100%);
		/* box-shadow: 0 -6px 14px -9px rgba(253, 235, 86, 0.6); */
	}

	.new-card:hover::before {
		content: '';
		width: calc(100% + 14px);
		height: calc(100% + 14px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		filter: blur(3px);
		padding: 20px;
		border-radius: 8px;
		/* Adjust the alpha values in the RGBA colors to control opacity */
		background: linear-gradient(to top, rgba(255, 126, 0, 0), rgba(254, 180, 123, 0.8));
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		z-index: -1;
		border-radius: 18px;
	}

	.new-card img {
		width: 100%;
		aspect-ratio: 240/320.67;
		object-fit: cover;
		border-radius: 6px;
	}

	:global(.card-content-container) {
		border-radius: 6px;
	}
</style>
