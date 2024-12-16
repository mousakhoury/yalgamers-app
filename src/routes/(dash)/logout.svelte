<script>
	import { locale } from '$lib/stores/i18n';

	export let logoutDialog;
</script>

<div
	class="fixed w-full h-full left-0 top-0 bg-[#140718e6] z-[60] flex justify-center items-center"
>
	<div
		role="dialog"
		class="flex flex-col items-start gap-[40px] p-[15px] lg:p-[30px] max-w-[330px] lg:max-w-[500px] rounded-[14px] bg-[#3D2644]"
	>
		<div class="flex flex-col items-start gap-[15px]">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-[#E9E6EA] text-[27px] lg:text-[36px] font-Gilroy-SemiBold leading-[32px] lg:leading-[44px]"
			>
				Are you sure you want to log out?
			</p>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-[#948798] text-[14px] lg:text-[18px] font-Gilroy-Medium leading-[17px] lg:leading-[26px]"
			>
				We will keep eye on your courses, tournaments and games. We will miss you a lot.
			</p>
		</div>
		<div class="flex items-center justify-end gap-[20px] lg:gap-[40px] w-full">
			<button
				class="text-[#D4CFD6] text-[18px] font-Gilroy-Medium leading-[26px]"
				on:click={() => (logoutDialog = false)}
			>
				No, I'm staying
			</button>
			<form action="/logout" method="post">
				<button class="px-[28px] py-[12px] rounded-[8px] bg-[#F71756]">
					<p class="text-[#2A0D32] text-[18px] font-Gilroy-SemiBold leading-[22px]">Yes, Log Out</p>
				</button>
			</form>
		</div>
	</div>
</div>
