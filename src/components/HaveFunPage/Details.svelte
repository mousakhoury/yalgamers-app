<script>
	import { locale } from '$lib/stores/i18n';

	export let details;
</script>

<div class="pthe-dino-t-rex-game-often-ref-wrapper">
	<div class={`pthe-dino-t-rex-container ${$locale === 'ar' ? 'text-right' : 'text-left'}`}>
		{@html $locale === 'ar' ? details.description_ar : details.description_en}
	</div>
</div>
