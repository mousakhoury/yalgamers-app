<script>
	import CloseButton from '$lib/assets/profile/close-button.svg';
	import UnFollow from '$lib/assets/profile/unfollow.svg';
	import PlaceholderUser from '$lib/assets/login/profile-placeholder.svg';
	import { enhance } from '$app/forms';

	export let label;
	export let type;
	export let boolean;
	export let items;
	export let unfollow;
</script>

<div
	class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511e6] z-[90] p-[16px]"
>
	<div
		class="flex flex-col items-start gap-[14px] w-full max-w-[480px] pb-[14px] rounded-[12px] border border-[#321F37] bg-[#200B26] relative"
	>
		<button
			on:click={() => {
				boolean = !boolean;
			}}
			class="absolute top-[-13px] right-[-13px] lg:top-[-17px] lg:right-[-17px]"
		>
			<img src={CloseButton} alt="" class="w-[24px] lg:w-[32px]" />
		</button>
		<div
			class="flex items-center justify-between p-[14px] w-full border-b border-[#2F1C35] bg-[#24102A] rounded-t-[12px]"
		>
			<p class="text-[#FFFFFFE5] font-Gilroy-Medium text-[18px]">
				{label}
			</p>
		</div>
		<div class="flex flex-col items-start gap-[8px] px-[8px] w-full h-[422px] overflow-y-auto">
			{#each items as item}
				<div
					class="flex items-center justify-between p-[6px] w-full pb-[8px] border-b border-[#2B1731] hover:rounded-[6px] hover:bg-[#ffffff0d]"
				>
					<a href={`/${item.username}`}>
						<div class="flex items-center gap-[12px]">
							{#if item.image}
								<img src={item.image} alt="" class="w-[38px] h-[38px] object-cover rounded-full" />
							{:else}
								<img
									src={PlaceholderUser}
									alt=""
									class="w-[38px] h-[38px] object-cover rounded-full"
								/>
							{/if}
							<div class="flex flex-col items-start gap-[4px]">
								<p class="text-[#FFFFFFE5] text-[16px] font-Gilroy-Medium">{item.name}</p>
								<p class="text-[#FFFFFF66] text-[12px] font-Gilroy">@{item.username}</p>
							</div>
						</div>
					</a>

					{#if type === 'followings'}
						<form
							action="?/unfollow"
							method="post"
							use:enhance={() => {
								return ({ result }) => {
									if (result.data.ok) {
										unfollow(item.id);
									}
								};
							}}
						>
							<input type="hidden" name="id" value={item.id} />
							<button class="flex items-center gap-[8px] px-[6px] py-[4px]">
								<img src={UnFollow} alt="" class="w-[16px]" />
								<p class="text-[#F71756] text-[14px] font-Gilroy-Medium">Unfollow</p>
							</button>
						</form>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
