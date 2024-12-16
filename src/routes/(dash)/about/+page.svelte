<script>
	import { locale } from '$lib/stores/i18n';
	export let data;
</script>

{#if data.about}
	<div class="lg:m-10">
		<article class="w-full max-w-[335px] sm:max-w-[550px] md:max-w-full article">
			{#if $locale === 'ar'}
				{@html data.about.content_ar}
			{:else}
				{@html data.about.content}
			{/if}
		</article>
	</div>
{/if}

<style>
	.article :global() {
		font-size: 16px;
	}
	.article :global(h1) {
		font-family: 'Gilroy-SemiBold';
	}
	.article :global(h2) {
		font-size: 3rem;
		font-family: 'Gilroy-SemiBold';
	}
	.article :global(h3) {
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-SemiBold, fallback, All-Gender-Light;
		font-size: 30px;
		margin-bottom: 12px;
		margin-top: 24px;
	}
	.article :global(h3:first-child) {
		margin-top: 0;
	}
	.article :global(h4) {
		font-size: 1.8rem;
		font-family: 'Gilroy-SemiBold ,fallback,All-Gender-Light';
	}
	.article :global(p) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular, fallback, All-Gender-Light;
		font-size: 22px;
	}

	.article :global(p span) {
		font-size: 24px !important;
	}
	.article :global(a) {
		color: yellow;
		font-style: italic;
		text-decoration: underline;
	}
	.article :global(img) {
		margin: 20px 0 20px 0;
		/* width: 100%; */
		display: inline;
		border-radius: 10px;
	}

	.article :global(ol) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular;
		font-size: 22px;
		list-style-type: auto;
		margin-left: 15px;
	}

	.article :global(ol span),
	.article :global(ol li) {
		font-size: 24px !important;
	}

	.article :global(ul) {
		color: rgba(255, 255, 255, 0.6);
		font-family: Gilroy-Regular;
		font-size: 22px;
		list-style-type: disc;
		margin-left: 15px;
	}

	.article :global(ul span),
	.article :global(ul li) {
		font-size: 24px !important;
	}

	.article :global(ol:lang(ar)) {
		margin-right: 15px;
		margin-left: 0;
	}

	.article :global(ul:lang(ar)) {
		margin-right: 15px;
	}

	.article :global(menu) {
		list-style: revert;
	}

	.progress-line::after {
		content: '';
		width: 20px;
		height: 20px;
		position: absolute;
		bottom: -1px;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
		border: 4px solid #e2fd70;
		background: #1b1b1b;
	}
</style>
