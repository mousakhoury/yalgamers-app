<script>
	import BackArrow from '$lib/assets/networking/Arrow - Left.svg';
	import ChatImage from '$lib/assets/networking/chat-image.jpeg';
	import LeaveRed from '$lib/assets/networking/leave-red.svg';
	import Cancel from '$lib/assets/networking/cancel-01.svg';
	import Members from '$lib/assets/networking/members.svg';
	import Leave from '$lib/assets/networking/leave.svg';

	import unknown from '$lib/assets/unknown.png';

	import Twitch from '$lib/assets/networking/twitch.svg';
	import Discord from '$lib/assets/networking/discord.svg';
	import Instagram from '$lib/assets/networking/instagram.svg';
	import Facebook from '$lib/assets/networking/facebook.svg';
	import Twitter from '$lib/assets/networking/twitter.svg';
	import Telegram from '$lib/assets/networking/telegram.svg';

	import { selectedChatMembers, selectedChatStore } from '$lib/stores/selectedchat.js';
	import { enhance } from '$app/forms';
	import { getImageUrl } from '$lib/utils';
	import { onMount } from 'svelte';

	export let chat;
	export let chatInfo;

	let openLeave = false;

	// Function to format the date
	function formatDate(dateString) {
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', options);
	}

	const formattedDate = formatDate(chat.created);
</script>

<div class="flex flex-col items-start gap-[12px] lg:gap-[20px] w-full h-full bg-[#200b26]">
	<div
		class="flex items-center justify-between p-[16px] border-b border-[#533E59] bg-[#24102A] w-full"
	>
		<button on:click={() => (chatInfo = false)} class="flex items-center gap-[10px]">
			<img src={BackArrow} alt="" class="w-[18px] lg:w-[20px]" />
			<p
				class="text-[#D4CFD6] text-[12px] lg:text-[14px] font-Gilroy-SemiBold leading-[15px] lg:leading-[17px]"
			>
				Back
			</p>
		</button>

		<button on:click={() => (openLeave = true)} class="lg:hidden flex items-center gap-[8px]">
			<img src={LeaveRed} alt="" class="w-[16px]" />
			<p class="text-[#F71756] text-[14px] font-Gilroy-Medium leading-[17px]">Leave Group</p>
		</button>
	</div>

	<div
		class="flex flex-col items-start gap-[12px] lg:gap-[20px] w-full px-[12px] lg:px-[20px] overflow-y-scroll"
	>
		<div
			class="flex items-center justify-between w-full border-b border-[#ffffff0f] lg:border-0 pb-[12px] lg:pb-0"
		>
			<div class="flex items-start gap-[10px]">
				<div class="flex items-center gap-[12px]">
					<img
						src={ChatImage}
						alt=""
						class="w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] object-cover border border-[#533E59] rounded-full"
					/>
					<div class="flex flex-col items-start gap-[4px]">
						<p
							class="text-[#FFFFFFCC] text-[18px] lg:text-[22px] font-Gilroy-Medium leading-[22px] lg:leading-[27px]"
						>
							{chat.name}
						</p>
						<p
							class="text-[#FFFFFF4D] text-[12px] lg:text-[14px] font-Gilroy leading-[14px] lg:leading-[17px]"
						>
							Created on {formattedDate}
						</p>
					</div>
				</div>

				<div
					class="hidden lg:flex items-center gap-[6px] rounded-[100px] bg-[#8ec9ed26] px-[8px] py-[4px] mt-[7px]"
				>
					<img src={Members} alt="" class="w-[14px]" />
					<p class="text-[#8EC9ED] text-[14px] font-Gilroy leading-[17px]">
						{chat.members} Members
					</p>
				</div>
			</div>
			<button on:click={() => (openLeave = true)} class="leave-group hidden lg:flex">
				<img src={Leave} alt="" />
				<p>Leave Group</p>
			</button>
		</div>

		<div
			class="lg:hidden flex items-center gap-[6px] rounded-[100px] bg-[#8ec9ed26] px-[8px] py-[2px]"
		>
			<img src={Members} alt="" class="w-[14px]" />
			<p class="text-[#8EC9ED] text-[12px] font-Gilroy leading-[14px]">
				{chat.members} Members
			</p>
		</div>

		{#if chat.type != 'default'}
			<div
				class="flex flex-col items-start gap-[12px] lg:gap-[16px] p-[12px] lg:p-[16px] rounded-[8px] bg-[#27122D] w-full"
			>
				<div class="flex flex-col items-start gap-[6px]">
					<p
						class="text-[#FFFFFFE5] text-[16px] lg:text-[18px] font-Gilroy-Medium leading-[19px] lg:leading-[22px]"
					>
						About This Project
					</p>
					<p
						class="text-[#FFFFFF80] text-[12px] lg:text-[14px] font-Gilroy-Medium leading-[14px] lg:leading-[17px]"
					>
						{chat.expand.project.chat_room_about}
					</p>
				</div>
				<hr class="w-full h-[1px] bg-[#FFFFFF0F] border-0" />
				<div class="flex flex-col items-start gap-[6px]">
					<p
						class="text-[#FFFFFFE5] text-[16px] lg:text-[18px] font-Gilroy-Medium leading-[19px] lg:leading-[22px]"
					>
						Social Media
					</p>
					<div class="flex items-center gap-[6px]">
						{#if chat.expand.project.telegram}
							<a target="_blank" href={chat.expand.project.telegram}>
								<img src={Telegram} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}

						{#if chat.expand.project.discord}
							<a target="_blank" href={chat.expand.project.discord}>
								<img src={Discord} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}

						{#if chat.expand.project.facebook}
							<a target="_blank" href={chat.expand.project.facebook}>
								<img src={Facebook} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}

						{#if chat.expand.project.instagram}
							<a target="_blank" href={chat.expand.project.instagram}>
								<img src={Instagram} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}

						{#if chat.expand.project.twitch}
							<a target="_blank" href={chat.expand.project.twitch}>
								<img src={Twitch} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}

						{#if chat.expand.project.x}
							<a target="_blank" href={chat.expand.project.x}>
								<img src={Twitter} alt="" class="w-[28px] lg:w-[30px]" />
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<hr class="border-[#FFFFFF14] w-full" />

		<div class="flex flex-col items-start gap-[16px] w-full">
			<div class="flex items-center justify-between w-full">
				<p
					class="text-[#FFFFFFE5] text-[16px] lg:text-[20px] font-Gilroy-Medium leading-[19px] lg:leading-[24px]"
				>
					Group Members
				</p>
				<p
					class="text-[#FFFFFF66] text-[12px] lg:text-[14px] font-Gilroy leading-[14px] lg:leading-[17px]"
				>
					{chat.members} Members
				</p>
			</div>
			<div class="flex flex-col items-start gap-[8px] w-full">
				{#each $selectedChatMembers as member}
					<div
						class="flex items-center gap-[10px] lg:gap-[12px] pb-[8px] border-b border-[#ffffff0d] w-full"
					>
						<a href={`/${member.username}`}>
							{#if member.avatar}
								<img
									src={getImageUrl('users', member.id, member.avatar)}
									alt=""
									class="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px] object-cover rounded-full"
								/>
							{:else}
								<img
									src={unknown}
									alt=""
									class="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px] object-cover rounded-full"
								/>
							{/if}
						</a>

						<div class="flex flex-col items-start gap-[4px]">
							<a
								href={`/${member.username}`}
								class="text-[#FFFFFFE5] text-[14px] lg:text-[16px] font-Gilroy-Medium leading-[17px] lg:leading-[19px]"
							>
								{#if member.name}
									{member.name}
								{:else}
									{member.username}
								{/if}
							</a>
							<p
								class="text-[#FFFFFF66] text-[10px] lg:text-[12px] font-Gilroy leading-[12px] lg:leading-[14px]"
							>
								Joined {new Date(member.join_date).toDateString()}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

{#if openLeave}
	<div
		class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511e6] z-[100]"
	>
		<div class="leave-container">
			<div class="flex flex-col items-start gap-[10px]">
				<p class="text-white text-[28px] font-Gilroy-SemiBold leading-[34px]">
					Are you sure you want to<br />leave this group?
				</p>
				<p class="text-[#A99FAC] text-[16px] font-Gilroy leading-[19px]">
					If you leave this group, you will not be<br />
					able to join this group anymore.
				</p>
			</div>

			<div class="flex items-center justify-between gap-[20px] w-full">
				<button class="cancel-leave" on:click={() => (openLeave = false)}>
					<img src={Cancel} alt="" />
					<p>Cancel</p>
				</button>
				<form
					action="?/leave_chat"
					method="post"
					class="w-[192px]"
					use:enhance={() => {
						return ({ result }) => {
							if (result.data.ok) {
								localStorage.removeItem('selectedChatId');
								selectedChatStore.set(undefined);
								openLeave = false;
								invalidateAll();
							}
						};
					}}
				>
					<input type="hidden" name="chatid" value={$selectedChatStore?.id} />
					<button class="leave-group-big">
						<img src={Leave} alt="" />
						<p>Leave Group</p>
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<style>
	.leave-group {
		padding: 8px 12px;
		align-items: center;
		gap: 8px;
		border-radius: 6px;
		background: #f71756;
	}

	.leave-group p {
		color: #110105;
		font-family: Gilroy-Medium;
		font-size: 14px;
	}

	.leave-group:hover,
	.leave-group-big:hover {
		background: #c61245;
	}

	.cancel-leave {
		display: flex;
		height: 46px;
		width: 192px;
		padding: 12px 53px 12px 52px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.1);
	}

	.cancel-leave p {
		color: rgba(255, 255, 255, 0.8);
		font-family: Gilroy-Medium;
		font-size: 18px;
	}

	.cancel-leave:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.leave-group-big {
		display: flex;
		width: 100%;
		height: 46px;
		padding: 12px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		flex: 1 0 0;
		border-radius: 6px;
		background: #f71756;
	}

	.leave-group-big p {
		color: #110105;
		font-family: Gilroy-Medium;
		font-size: 18px;
	}

	.leave-container {
		display: flex;
		width: 100%;
		max-width: 444px;
		padding: 20px;
		flex-direction: column;
		align-items: flex-start;
		gap: 36px;
		border-radius: 16px;
		border: 1px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
	}
</style>
