<script>
	import { t,locale } from "$lib/stores/i18n";

	import PrivateRoute from "$components/PrivateRoute.svelte";

  
import Subscribtion from "$components/Subscribtion.svelte";
</script>

<PrivateRoute>
    <slot/>
</PrivateRoute>
