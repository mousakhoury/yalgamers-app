<script>
	import PrivateRoute from '$components/PrivateRoute.svelte';
</script>

<svelte:head>
	<title>Yalgamers - Xp History</title>
</svelte:head>

<PrivateRoute>
	<slot />
</PrivateRoute>
