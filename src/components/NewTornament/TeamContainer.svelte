<script>
	import Star from '$lib/assets/leader-star.svg';
	import empty from '$lib/assets/empty-team.svg';
	import PendingMember from '$lib/assets/pending-member.svg';
	import FreeSlot from '$lib/assets/free-slot.svg';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';

	export let team;
	export let index;
	export let type = 'default';

	let show_success = false;
	let error = false;

	let already_send_req = false;
	$: if (team && team.reqs) {
		let exist = team.reqs.find((f) => f.player == $page.data.profile.id);
		if (exist) already_send_req = true;
	}

	async function send_req() {
		const data = new FormData();
		data.append('id', team.id);
		data.append('p_id', $page.data.profile.id);

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/send_req`, {
			method: 'POST',
			body: data
		});

		if (!res.ok) {
			error = true;
		}

		show_success = true;
		setTimeout(() => {
			show_success = false;
		}, 2000);

		invalidate();
	}
</script>

{#if type === 'default'}
	<div
		class="w-full bg-[#2B1731] rounded-[8px] border-[1px] border-solid border-[#3d2544] flex flex-col items-start gap-[20px] p-[20px]"
	>
		<div class="flex items-center gap-[16px]">
			{#if team.team_logo}
				<img src={team.team_logo} alt="" class="w-[60px] h-[60px] object-cover" />
			{/if}
			<div class="flex flex-col items-start gap-[2px]">
				<p class="text-[#948798] text-[14px] font-Gilroy-Medium">#Team {index}</p>
				<p class="text-[#E9E6EA] text-[22px] font-Gilroy-SemiBold">{team.name}</p>
			</div>
		</div>
		<span class="team-line" />
		<div class="flex flex-col items-start gap-[12px] w-full">
			{#each team.members as member}
				{#if member.isPending}
					<div class="flex items-center gap-[10px]">
						<img src={PendingMember} alt="" class="w-[30px] h-[30px] object-cover" />
						<div class="flex items-center gap-[6px]">
							<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">
								Waiting for user to accept...
							</p>
						</div>
					</div>
				{:else if member.isEmpty}
					<div class="flex justify-between items-center w-full">
						<div class="flex items-center gap-[10px]">
							<img src={FreeSlot} alt="" class="w-[30px] h-[30px] object-cover" />
							<div class="flex items-center gap-[6px]">
								<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">Slot free</p>
							</div>
						</div>
						{#if team.members.find((f) => f.id != $page.data.profile.id) && !$page.data.my_team}
							<button
								on:click={send_req}
								disabled={already_send_req}
								class="py-[5px] px-[12px] bg-[#fdec56f5] rounded-[100px] {already_send_req
									? 'cursor-not-allowed'
									: ''}"
							>
								<p class="text-[#3D2644] text-[14px] font-Gilroy-Medium">
									{already_send_req ? 'Already send' : 'Send Request'}
								</p>
							</button>
						{/if}
					</div>
				{:else}
					<div class="flex items-center gap-[10px]">
						{#if member.image}
							<img src={member.image} alt="" class="w-[30px] h-[30px] object-cover" />
						{:else}
							<img src={PendingMember} alt="" class="w-[30px] h-[30px] object-cover" />
						{/if}
						<div class="flex items-center gap-[6px]">
							<p class="text-[#D4CFD6] text-[14px] font-Gilroy-Medium">{member.name}</p>
							{#if member.isLeader}
								<img src={Star} alt="" />
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{:else if type === 'notRegistered'}
	<div
		class="flex flex-col items-center justify-center gap-[16px] py-[29px] rounded-[8px] bg-[#310C2A] border-[1px] border-dashed border-[#F71756]"
	>
		<img src={empty} alt="" class="w-[60px] h-[60px] object-cover" />
		<div class="flex flex-col items-center justify-center gap-[2px]">
			<p class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium">#Team {index}</p>
			<p class="text-[#F71756] text-[22px] font-Gilroy-SemiBold">Not yet registered</p>
		</div>
	</div>
{/if}

{#if show_success}
	<div class="w-full h-full fixed top-0 left-0 bg-[#140718] opacity-90 z-50">
		<div
			class="p-[24px] {error
				? ' bg-[#310C2A] border-[#F71756] '
				: ' bg-[#200B26] border-[#3D2644] '} rounded-[16px] border-2 border-solid fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 tournament-registration"
		>
			<div class="p-[56px] flex flex-col items-center gap-[32px]">
				<div class="flex flex-col items-center gap-[12px]">
					<p class="{error ? 'text-[#F71756]' : 'text-[#1FD031]'} text-[24px] font-Gilroy-SemiBold">
						{error ? 'Already, request send!' : 'Request Send Successfully!'}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.team-line {
		display: block;
		height: 1px;
		width: 100%;
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.1) 50.52%,
			rgba(255, 255, 255, 0) 100%
		);
	}
</style>
