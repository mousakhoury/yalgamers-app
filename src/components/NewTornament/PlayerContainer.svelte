<script>
	import empty from '$lib/assets/empty-team.svg';
	import FreeSlot from '$lib/assets/empty-user.png';
	import { getImageUrl } from '$lib/utils.js';

	export let team;
	export let index;
	export let type = 'default';
</script>

{#if type === 'default'}
	<div
		class="w-full bg-[#2B1731] rounded-[8px] border-[1px] border-solid border-[#3d2544] flex flex-col items-start gap-[20px] p-[20px] h-min"
	>
		<div class="flex items-center gap-[16px]">
			{#if team.expand.user.avatar == ''}
				<img src={FreeSlot} alt="" class="w-[60px] h-[60px] object-cover" />
			{:else}
				<img
					src={getImageUrl('users', team.expand.user.id, team.expand.user.avatar)}
					alt=""
					class="w-[60px] h-[60px] object-cover"
				/>
			{/if}
			<div class="flex flex-col items-start gap-[2px]">
				<p class="text-[#948798] text-[14px] font-Gilroy-Medium">#Player {index}</p>
				<p class="text-[#E9E6EA] text-[22px] font-Gilroy-SemiBold">{team.expand.user.name}</p>
			</div>
		</div>
	</div>
{:else if type === 'notRegistered'}
	<div
		class="flex flex-col items-center justify-center gap-[16px] py-[29px] rounded-[8px] bg-[#310C2A] border-[1px] border-dashed border-[#F71756]"
	>
		<img src={empty} alt="" class="w-[60px] h-[60px] object-cover" />
		<div class="flex flex-col items-center justify-center gap-[2px]">
			<p class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium">#Player {index}</p>
			<p class="text-[#F71756] text-[22px] font-Gilroy-SemiBold">Not yet registered</p>
		</div>
	</div>
{/if}
