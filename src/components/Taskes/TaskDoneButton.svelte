<script>
	import { t, locale } from '$lib/stores/i18n';
	export let isDisabled;
	export let click;
	export let text = $t('Done');
</script>

<button on:click={click} disabled={isDisabled} class="done-button" type="submit">
	<p>{text}</p>
</button>

<style>
	.done-button {
		display: flex;
		width: 100%;
		padding: 16px 32px 15px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	.done-button:hover {
		box-shadow: 0px 5px 14px 0px rgba(251, 134, 86, 0.25);
	}

	.done-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.done-button:disabled {
		display: flex;
		width: 100%;
		padding: 16px 32px 15px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		opacity: 0.2;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		box-shadow: 0px 5px 14px 0px rgba(251, 134, 86, 0.25);
	}
</style>
