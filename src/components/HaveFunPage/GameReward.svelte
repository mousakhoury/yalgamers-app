<script>
	import XpContainer from '$components/XpContainer.svelte';

	export let image;
	export let xp;
	export let name;
	export let subText;
</script>

<div class="pframe-parent3">
	<div class="pframe-parent4">
		<img class="pframe-inner" alt="" src={image} />

		<div class="pstarstruck-scorers-parent">
			<div class="pk-played">{name}</div>
			<div class="pscore-above-1000">{subText}</div>
		</div>
	</div>
	<XpContainer {xp} />
</div>
