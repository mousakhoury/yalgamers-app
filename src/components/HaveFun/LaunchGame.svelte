<script>
	import { t, locale } from '$lib/stores/i18n';
	import Image from '$lib/assets/objects@2x.png';
</script>

<div class="have-fun2">
	<div class="launch-a-new-game-parent">
		<h1 class="launch-a-new">{$t('new.game.title')}</h1>
		<div class="frame-wrapper4">
			<div class="frame-parent5">
				<div class="frame-parent6">
					<div class="launch-your-browser-game-and-g-parent">
						<h5 class="launch-your-browser">{$t('new.game.head')}</h5>
						<p class="step-into-the">
							{$t('new.game.desc')}
						</p>
					</div>
					<button class="large-wrapper">
						<div class="large">{$t('applyNow')}</div>
					</button>
				</div>
				<img class="objects-icon" alt="" src={Image} />
			</div>
		</div>
	</div>
</div>
