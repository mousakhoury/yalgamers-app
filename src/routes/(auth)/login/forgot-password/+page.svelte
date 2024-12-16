<script>
	import EnterOTP from '$components/NewLogin/EnterOTP.svelte';
	import TopBackground from '$lib/assets/login/top-background.png';
	import LoginForgetPassword from '$components/NewLogin/LoginForgetPassword.svelte';
	import LoginReset from '$components/NewLogin/LoginReset.svelte';

	let forgot = true;
	let otp = false;
	let reset = false;

	let email = '';

	function backFromOTP() {
		otp = false;
		forgot = true;
	}

	function OTPProceed() {
		otp = false;
		reset = true;
	}
</script>

<div
	class="flex flex-col items-start fixed top-0 left-0 w-full h-screen bg-[#140718] z-[90] overflow-hidden main-frame"
>
	<img src={TopBackground} alt="" class="w-full h-[100px] lg:h-[120px]" />
	{#if forgot}
		<LoginForgetPassword bind:forgot bind:otp bind:email />
	{/if}

	{#if otp}
		<EnterOTP back={backFromOTP} proceed={OTPProceed} {email} password_reset={true} />
	{/if}

	{#if reset}
		<LoginReset bind:forgot bind:reset {email} />
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
