<script>
	import PrivateRoute from '$components/PrivateRoute.svelte';
</script>

<PrivateRoute>
	<slot />
</PrivateRoute>
