<script>
	import { t, locale } from '$lib/stores/i18n';

	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (!$user && browser) {
		goto('/login');
	}

	if ($user && browser && !$user.on_boarding) {
		goto('/personal-details');
	}
</script>

{#if $user}
	<slot />
{/if}
