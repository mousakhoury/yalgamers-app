<script>
	// @ts-nocheck

	import BackArrow from '$lib/assets/closed_beta/back-arrow.svg';
	import Success from '$lib/assets/closed_beta/success.svg';
	import Fail from '$lib/assets/closed_beta/fail.svg';

	import { enhance } from '$app/forms';
	import LoginInput from '$components/NewLogin/LoginInput.svelte';
	import LoginButton from '$components/NewLogin/LoginButton.svelte';
	import { goto } from '$app/navigation';

	let name = '';
	let email = '';
	let loading = false;
	let success = false;
	let fail = false;
	let isChecked = false;

	function validateEmail(email) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	}

	$: isButtonDisabled = name === '' || email === '' || !validateEmail(email);
</script>

<div class="flex flex-col items-start gap-[42px] w-full max-w-[558px] h-[71vh] lg:h-auto">
	<a href="/closedbeta" class="flex items-center gap-[6px] lg:gap-[10px]">
		<img src={BackArrow} alt="" class="w-[16px] lg:w-[20px]" />
		<p class="text-[#FFFFFFB2] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">Back</p>
	</a>
	<div class="flex flex-col items-start gap-[32px] w-full">
		<div class="flex flex-col items-start lg:items-center gap-[6px] w-full">
			<h1
				class="text-[#E9E6EA] text-[24px] lg:text-[36px] text-center font-Gilroy-Bold leading-[30px] lg:leading-[45px]"
			>
				Apply for Beta Access
			</h1>
			<p
				class="text-[#A99FAC] text-[14px] lg:text-[18px] text-start lg:text-center font-Gilroy-Medium leading-[17px] lg:leading-[28px]"
			>
				To get beta access, please fill those informations up.
			</p>
		</div>
		<form
			action="?/apply"
			method="post"
			class="flex flex-col items-start lg:items-center gap-[24px] w-full"
			use:enhance={() => {
				loading = true;
				return ({ result, update }) => {
					if (result.data.ok) {
						success = true;
						goto('/signup');
						setTimeout(() => {
							success = false;
						}, 3000);
					} else {
						fail = true;
						setTimeout(() => {
							fail = false;
						}, 3000);
					}
					loading = false;
					update();
				};
			}}
		>
			<LoginInput label="Name" name="name" type="name" bind:value={name} />
			<LoginInput label="Email" name="email" type="email" bind:value={email} />
			<LoginButton label="Apply" disable={isButtonDisabled} {loading} />
		</form>
	</div>
</div>

{#if success}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-[90] px-[16px] bg-[#08030AE5]"
	>
		<div
			class="flex flex-col items-center gap-[20px] w-full max-w-[340px] px-[25px] py-[73.5px] rounded-[12px] border border-[#281C2C] bg-[#1A0D1E]"
		>
			<img src={Success} alt="" class="w-[100px]" />
			<div class="flex flex-col items-center gap-[10px] w-full">
				<h1 class="text-[#E9E6EA] text-[20px] text-center font-Gilroy-SemiBold">
					Application Submitted!
				</h1>
				<p class="text-[#A99FAC] text-[14px] text-center font-Gilroy">
					Your application was submitted successfully, you will get an activation code soon.
				</p>
			</div>
		</div>
	</div>
{/if}

{#if fail}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen z-[90] px-[16px] bg-[#08030AE5]"
	>
		<div
			class="flex flex-col items-center gap-[20px] w-full max-w-[340px] px-[25px] py-[73.5px] rounded-[12px] border border-[#281C2C] bg-[#1A0D1E]"
		>
			<img src={Fail} alt="" class="w-[100px]" />
			<div class="flex flex-col items-center gap-[10px] w-full">
				<h1 class="text-[#E9E6EA] text-[20px] text-center font-Gilroy-SemiBold">
					Mail Already Used!
				</h1>
				<p class="text-[#A99FAC] text-[14px] text-center font-Gilroy">
					The mail you are using is already used, please try again with a new mail address..
				</p>
			</div>
		</div>
	</div>
{/if}
