<script>
	import PendingMember from '$lib/assets/pending-member.svg';
	import EmptySlot from '$lib/assets/my-team-empty-slot.svg';
	import LeaderStar from '$lib/assets/my-team-leader-star.svg';
	import Dots from '$lib/assets/my-team-dots.svg';
	import CancelUnhover from '$lib/assets/my-team-cancel-request-unhover.svg';
	import CancelHover from '$lib/assets/my-team-cancel-request-hover.svg';
	import ReplaceUnhover from '$lib/assets/my-team-replace-request-unhover.svg';
	import ReplaceHover from '$lib/assets/my-team-replace-request-hover.svg';
	import RemoveUnhover from '$lib/assets/my-team-remove-member-unhover.svg';
	import RemoveHover from '$lib/assets/my-team-remove-member-hover.svg';
	import SendJoin from '$lib/assets/my-team-send-join.svg';
	import Success from '$lib/assets/tournament-form-success.svg';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import TournamentMyTeamInvite from './TournamentMyTeamInvite.svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';

	export let member;
	export let leader_id;

	let showList = false;
	let is_invite = false;
	let show_select_player_modal = false;
	let isLeader = false;

	$: show_success = false;
	$: if (show_success) {
		setTimeout(() => {
			show_success = false;
			show_select_player_modal = false;
			is_invite = false;
		}, 1500);
	}

	function showListHandler(event) {
		showList = !showList;
		event.stopPropagation();
	}

	function setupGlobalClickListener() {
		const handleGlobalClick = (event) => {
			// Check if the click is outside the specific interactive elements
			// Adjust this logic based on your component's structure and requirements
			if (!event.target.closest('.team-member-list')) {
				showList = false;
			}
		};

		// Add the listener after the component mounts
		window.addEventListener('click', handleGlobalClick);

		// Remove the listener when the component is destroyed
		return {
			destroy() {
				window.removeEventListener('click', handleGlobalClick);
			}
		};
	}

	function handleSelectMember(show_invite) {
		show_select_player_modal = true;
		is_invite = show_invite;
	}

	// Call the setup function on component mount
	onMount(() => {
		if (leader_id == $page.data.profile.id) {
			isLeader = true;
		}
		return setupGlobalClickListener();
	});

	async function remove() {
		const data = new FormData();
		data.append('id', member.id);

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/remove_team_member`, {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			toast.push('Please wait. Remove Successfully!');
			invalidateAll();
		} else {
			const msg = (await res.json()).message;
			toast.push(msg);
		}
	}
</script>

<div class="team-member-card relative w-full z-[1]">
	<div
		class="w-full rounded-[8px] bg-[#2B1731] flex flex-col justify-center items-center gap-[16px] aspect-[307/206]"
	>
		{#if member.isPending}
			<img src={PendingMember} alt="" class="w-[60px] h-[60px] rounded-[50%]" />
			<p class="text-[#948798] text-[14px]font-Gilroy-Medium text-center max-w-[194px]">
				Waiting for user to accept request.
			</p>
		{:else if member.isEmpty}
			<img src={EmptySlot} alt="" class="w-[60px] h-[60px] rounded-[50%]" />
			{#if isLeader}
				<div class="flex flex-col items-center justify-center gap-[18px]">
					<p class="text-[#948798] text-[14px]font-Gilroy-Medium text-center max-w-[219px]">
						This slot is free.
					</p>
					<button class="send-join-button" on:click={() => handleSelectMember(true)}>
						<img src={SendJoin} alt="" />

						<p>Send join request</p>
					</button>
				</div>
			{:else}
				<p class="text-[#948798] text-[14px]font-Gilroy-Medium text-center max-w-[219px]">
					This slot is free, no one joined yet.
				</p>
			{/if}
		{:else}
			{#if member.image}
				<img src={member.image} alt="" class="w-[60px] h-[60px] rounded-[50%]" />
			{:else}
				<img src={PendingMember} alt="" class="w-[60px] h-[60px] rounded-[50%]" />
			{/if}
			<div class="flex flex-col justify-center items-center gap-[6px]">
				<p class="text-[#E9E6EA] text-[22px]font-Gilroy-SemiBold text-center">{member.name}</p>
				<p class="text-[#948798] text-[14px]font-Gilroy-Medium text-center">{member.userName}</p>
			</div>
		{/if}
	</div>
	{#if member.isLeader}
		<div
			class="flex items-center gap-[4px] py-[3px] px-[6px] bg-[#FDEB56] rounded-[100px] absolute top-[7px] right-[7px]"
		>
			<img src={LeaderStar} alt="" />
			<p class="text-[#2A0D32] text-[12px]font-Gilroy-Medium">Leader</p>
		</div>
	{:else if isLeader && !member.isEmpty}
		<div class=" absolute top-[7px] right-[7px] cursor-pointer" on:click={showListHandler}>
			<img src={Dots} alt="" />
		</div>
	{/if}

	{#if showList && !member.isLeader && !member.isEmpty}
		<div
			class="py-[4px] rounded-[4px] bg-[#3D2644] border border-solid border-[#533E59] list absolute top-[29px] right-[9px] flex flex-col items-start w-full max-w-[224px] team-member-list"
			on:click|stopPropagation
		>
			{#if member.isPending}
				<button on:click={remove} class="cancel-request-button" type="submit">
					<img src={CancelUnhover} alt="" class="unhover" />
					<img src={CancelHover} alt="" class="hover" />
					<p>Cancel Request</p>
				</button>
			{:else}
				<button on:click={remove} class="cancel-request-button" type="submit">
					<img src={RemoveUnhover} alt="" class="unhover" />
					<img src={RemoveHover} alt="" class="hover" />
					<p>Remove this team member</p>
				</button>
			{/if}

			<button
				on:click={() => handleSelectMember(false)}
				class="replace-request-button"
				type="submit"
			>
				<img src={ReplaceUnhover} alt="" class="unhover" />
				<img src={ReplaceHover} alt="" class="hover" />
				<p>Replace member</p>
			</button>
		</div>
	{/if}
</div>

{#if show_select_player_modal}
	<div
		class="w-full h-full fixed top-0 left-0 bg-[#140718] opacity-90 z-50"
		on:click={() => (show_select_player_modal = false)}
	>
		<div
			class="p-[24px] bg-[#200B26] rounded-[16px] border-2 border-solid border-[#3D2644] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 tournament-registration"
		>
			{#if show_success == false}
				<TournamentMyTeamInvite bind:show_success {member} {is_invite} />
			{:else}
				<div class="p-[56px] flex flex-col items-center gap-[32px]">
					<img src={Success} alt="" />
					<div class="flex flex-col items-center gap-[12px]">
						<p class="text-[#1FD031] text-[24px] font-Gilroy-SemiBold">
							{is_invite ? 'Invite' : 'Replace Player'} Successful!
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.team-member-card::before {
		width: calc(100% + 3px);
		height: calc(100% + 3px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 8px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, #6a5c6e 0%, rgba(255, 255, 255, 0) 100%);
	}

	.list {
		box-shadow: 0px 8px 30px 0px rgba(20, 7, 24, 0.3);
	}

	.cancel-request-button {
		display: flex;
		padding: 10px;
		align-items: flex-start;
		gap: 8px;
		width: 100%;
	}

	.cancel-request-button p {
		color: var(--white-60, #a99fac);
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 14px;
	}

	.cancel-request-button .hover {
		display: none;
	}

	.cancel-request-button .unhover {
		display: block;
	}

	.cancel-request-button:hover {
		background: rgba(247, 23, 86, 0.15);
	}

	.cancel-request-button:hover p {
		color: var(--Accent, #f71756);
	}

	.cancel-request-button:hover .hover {
		display: block;
	}

	.cancel-request-button:hover .unhover {
		display: none;
	}

	.replace-request-button {
		display: flex;
		padding: 10px;
		align-items: flex-start;
		gap: 8px;
		width: 100%;
	}

	.replace-request-button p {
		color: var(--white-60, #a99fac);
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 14px;
	}

	.replace-request-button .hover {
		display: none;
	}

	.replace-request-button .unhover {
		display: block;
	}

	.replace-request-button:hover {
		background: rgba(142, 201, 237, 0.15);
	}

	.replace-request-button:hover p {
		color: #8ec9ed;
	}

	.replace-request-button:hover .hover {
		display: block;
	}

	.replace-request-button:hover .unhover {
		display: none;
	}

	.send-join-button {
		display: flex;
		padding: 5px 12px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 100px;
		background: var(--Accent, #fdeb56);
	}

	.send-join-button p {
		color: var(--white-10, #3d2644);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
	}
</style>
