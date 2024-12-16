<script>
	import { t, locale } from '$lib/stores/i18n';
	import { user } from '$lib/stores/user';
	import Edit from '$lib/assets/profile/edit.svg';
	import EditHover from '$lib/assets/profile/edit-hover.svg';

	export let showEditBio;
</script>

<div class="flex flex-col items-start gap-[6px] max-w-[559px] w-full">
	<p class="text-[#FFFFFFCC] text-[14px] lg:text-[16px] font-Gilroy-SemiBold">{$t('Bio')}-</p>
	<p
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="text-[#FFFFFF66] text-[12px] lg:text-[14px] font-Gilroy-Medium"
	>
		{$user?.bio}
		<span class=" inline-block">
			<button
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				on:click={() => (showEditBio = true)}
				class="flex items-center gap-[4px] group"
			>
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-[#FFFFFFB2] text-[12px] lg:text-[14px] font-Gilroy-Medium underline group-hover:text-[#FDEB56]"
				>
					{$user.bio ? $t('Edit Bio') : $t('Add Bio')}
				</p>
				<img src={Edit} alt="" class="w-[12px] lg:w-[14px] group-hover:hidden" />
				<img src={EditHover} alt="" class="w-[12px] lg:w-[14px] hidden group-hover:block" />
			</button>
		</span>
	</p>
</div>
