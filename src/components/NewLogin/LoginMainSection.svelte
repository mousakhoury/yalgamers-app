<script>
	import LoginEmail from './LoginEmail.svelte';
	import LoginWelcomeBack from './LoginWelcomeBack.svelte';

	let welcomeSection = true;
	let loginEmail = false;
</script>

<div
	class="flex items-center justify-center px-[16px] lg:px-[41px] py-[20px] lg:py-[24px] w-full h-full"
>
	{#if welcomeSection}
		<LoginWelcomeBack bind:welcomeSection bind:loginEmail />
	{/if}

	{#if loginEmail}
		<LoginEmail bind:welcomeSection bind:loginEmail />
	{/if}
</div>
