<script>
	import EnterOTP from '$components/NewLogin/EnterOTP.svelte';
	import TopBackground from '$lib/assets/login/top-background.png';
	import SignupDetails from '$components/NewLogin/SignupDetails.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { account } from '$lib/connect';

	$: main = true;
	let email = '';
	let isvalid = false;

	if (!$page.data.profile?.verified) {
		main = false;
		email = $page.data.profile?.email;
	}

	function OTPProceed() {
		isvalid = true;
		goto('/new-signup/upload-image');
	}
	// console.log('Wallet Address', $account.address);
	// console.log('Connector Name', $account.connector?.name);

	function backFromOTP() {
		isvalid = true;
		goto('/signup/personal-details/upload-image');
	}
</script>

<div
	class="flex flex-col items-start fixed top-0 left-0 w-full h-screen bg-[#140718] z-[90] overflow-y-scroll main-frame"
>
	<img src={TopBackground} alt="" class="w-full h-[120px]" />
	{#if main}
		<SignupDetails bind:email bind:main />
	{/if}

	{#if !main}
		<EnterOTP back={backFromOTP} proceed={OTPProceed} {email} {isvalid} />
	{/if}
</div>

<style>
	:global(header, nav, footer) {
		height: 0;
		opacity: 0;
		display: none;
	}

	.main-frame {
		background-image: url('$lib/assets/login/big-main-bg.svg');
		background-position: center;
		background-size: cover;
	}
</style>
