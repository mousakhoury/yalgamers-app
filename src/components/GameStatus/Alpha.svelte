<script>
	import { t, locale } from '$lib/stores/i18n';

	import normal from '$lib/assets/alpha-normal.svg';
	import hover from '$lib/assets/alpha-hover.svg';
	export let filter = null;
</script>

<button on:click={filter}>
	<div class="status-container">
		<img class="normal" src={normal} alt="" />
		<img class="hover" src={hover} alt="" />
		<p>{$t('Alpha')}</p>
	</div>
</button>

<style>
	.status-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 100px;
		background: #400c2d;
		width: fit-content;
	}

	.status-container p {
		color: var(--Accent, #f71756);
		font-family: Gilroy-Medium;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.status-container img {
		width: 14px;
	}

	.status-container:hover {
		background: var(--Accent, #f71756);
	}

	.status-container:hover p {
		color: var(--White, #fff);
	}

	.status-container .normal {
		display: block;
	}

	.status-container .hover {
		display: none;
	}

	.status-container:hover .normal {
		display: none;
	}

	.status-container:hover .hover {
		display: block;
	}

	@media (max-width: 1024px) {
		.status-container {
			gap: 2.857px;
			padding: 2.857px 5.714px;
		}

		.status-container p {
			font-size: 11px;
		}

		.status-container img {
			width: 14px;
		}
	}
</style>
