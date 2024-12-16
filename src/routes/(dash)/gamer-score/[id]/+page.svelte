<script>
	import { page } from '$app/stores';
	export let data;
</script>

<svelte:head>
	<!-- Open Graph Meta Tags -->
	<meta property="og:url" content={`${$page.url.origin}/gamer-score/${data.id}`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Yalgamers Gamer Score" />
	<meta
		property="og:description"
		content="I scanned my steam account on Yalgamers. See! what score I got!! 🙌😎"
	/>
	<meta property="og:image" content={data.img} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@Yalgamers" />
	<meta name="twitter:title" content="Yalgamers Gamer Score" />
	<meta
		name="twitter:description"
		content="I scanned my steam account on Yalgamers. See! what score I got!! 🙌😎"
	/>
	<meta name="twitter:image" content={data.img} />

	<!-- Pinterest -->
	<meta name="pinterest-rich-pin" content="true" />

	<!-- SEO Meta Tag -->
	<meta
		name="description"
		content="I scanned my steam account on Yalgamers. See! what score I got!! 🙌😎"
	/>
</svelte:head>
