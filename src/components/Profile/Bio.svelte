<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';
	import { user } from '$lib/stores/user';
	export let visible = false;
</script>

<div
	class="fixed left-0 right-0 top-0 bottom-0 h-full w-full flex justify-center z-10 bg-blur items-center backdrop-blur-md p-[16px]"
>
	<div
		class="flex flex-col items-start gap-[14px] pb-[14px] rounded-[12px] border border-[#321F37] bg-[#200B26] relative z-30 overflow-hidden w-full max-w-[480px]"
	>
		<div class="p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A]">
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-white-70 font-Gilroy-SemiBold text-[20px]"
			>
				{$t('profile.editBio')}
			</p>
		</div>
		<form
			action="/profile?/bio"
			method="post"
			class="flex flex-col items-start gap-[40px] px-[12.5px] w-full"
		>
			<div class="w-full">
				<textarea
					name="bio"
					value={$user.bio}
					class=" resize-none outline-none text-[#FFFFFFE5] text-[16px] font-Gilroy-Medium p-[12px] rounded-[6px] border border-[#36233C] bg-[#200b26] focus-visible:border-[#FDEB56] w-full"
					id=""
					rows="3"
					maxlength="320"
					placeholder={$t('profile.placeholder.bio')}
				/>
			</div>
			<div class="flex justify-end items-center gap-4 w-full">
				<Button
					type="primary"
					on:click={() => {
						visible = false;
					}}
					class="bg-white-20 text-[#FFFFFFCC] text-[16px] font-Gilroy-SemiBold w-full"
					>{$t('cancel')}</Button
				>
				<Button type="gradient" size="md" class="text-[16px] font-Gilroy-SemiBold w-full"
					>{$t('save')}</Button
				>
			</div>
		</form>
	</div>
</div>
