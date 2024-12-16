<script>
	import { t, locale } from '$lib/stores/i18n';
	import ChatImage from '$lib/assets/networking/chat-image.jpeg';
	import Leave from '$lib/assets/networking/leave.svg';
	import Cancel from '$lib/assets/networking/cancel-01.svg';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { selectedChatStore } from '$lib/stores/selectedchat.js';
	import MetaVerse from '$lib/assets/networking/metaverse 2.svg';

	export let title;
	export let members;
	export let chatInfo;
</script>

<div
	class="flex items-center justify-between p-[12px] lg:p-[16px] pr-[18px] border-b border-[#533E59] w-full"
>
	<button on:click={() => (chatInfo = true)} class="flex items-center gap-[10px] lg:gap-[16px]">
		<img
			src={ChatImage}
			alt=""
			class="w-[32px] lg:w-[40px] h-[32px] lg:h-[40px] object-cover border border-[#533E59] rounded-full"
		/>
		<div class="flex flex-col items-start gap-[4px]">
			<p
				class="text-[#FFFFFFCC] text-[14px] lg:text-[18px] font-Gilroy-Medium leading-[17px] lg:leading-[22px]"
			>
				{title}
			</p>
			<p
				class="text-[#FFFFFF4D] text-[10px] lg:text-[12px] font-Gilroy leading-[12px] lg:leading-[14px]"
			>
				{members} members
			</p>
		</div>
	</button>
	<div class="relative">
		<img src={MetaVerse} alt="" class="w-[30px] lg:w-[36px]" />
		<div
			class="p-[2px] rounded-[100px] bg-[#24102A] absolute top-[-7px] lg:top-[-9px] {$locale ===
			'ar'
				? 'right-[-21px] lg:right-[-22px]'
				: 'left-[-52px] lg:left-[-61px]'}"
		>
			<div class="rounded-[100px] bg-[#792341] py-[2px] px-[4px]">
				<p
					class="text-[#E9E6EA] text-[8px] lg:text-[10px] font-Gilroy leading-[10px] lg:leading-[12px]"
				>
					{$t('Coming Soon')}
				</p>
			</div>
		</div>
	</div>
	<!-- <button on:click={() => (openLeave = true)} class="leave-group">
		<img src={Leave} alt="" />
		<p>Leave Group</p>
	</button> -->
</div>
