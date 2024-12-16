<script>
	import { t,locale } from "$lib/stores/i18n";

	import PrivateRoute from "$components/PrivateRoute.svelte";

</script>

<PrivateRoute>
	<slot />
</PrivateRoute>

