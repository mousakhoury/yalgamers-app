<script>
	import Select from '$lib/assets/add-player-select-check.svg';
	import Search from '$lib/assets/Search-add-player.svg';
	import SendActive from '$lib/assets/Send-request-active.svg';
	import dummyImage from '$lib/assets/tournament-leader-dummy.png';
	import SendDisabled from '$lib/assets/Send-request-disabled.svg';

	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import { toast } from '@zerodevx/svelte-toast';

	export let member;
	export let show_success;
	export let is_invite;

	$: selectedUser = '';
	let searchInput = '';

	$: filteredUsers = searchInput
		? $page.data.users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
		: $page.data.users;

	async function submit() {
		const data = new FormData();
		data.append('u_id', selectedUser);
		data.append('id', member.id);

		if (!is_invite) {
			data.append('prev_u_id', member.player);
		}

		const end_point = is_invite ? 'invite_team_member' : 'replace_team_member';

		let res = await fetch(`/api/tournaments/${$page.params.tournamentid}/${end_point}`, {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			show_success = true;
		} else {
			const msg = (await res.json()).message;
			toast.push(msg);
		}
	}
</script>

<div class="flex flex-col items-start gap-[12.5px] w-[552px] z-[60]" on:click|stopPropagation>
	<div class="flex flex-col items-start gap-[24px] w-full">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<h5 class="text-[#fff] text-[20px] font-Gilroy-SemiBold">Select Player</h5>
			<div class="search-box">
				<img src={Search} alt="" />
				<input type="text" placeholder="Search..." bind:value={searchInput} />
			</div>
		</div>
		<div class="flex flex-col items-start gap-[12px] w-full h-[191px] overflow-y-scroll">
			{#each filteredUsers as user}
				<div
					class="flex items-center justify-between gap-[12px] p-[6px] rounded-[2px] cursor-pointer w-full {user.id ===
					selectedUser
						? 'bg-[#272130] border border-solid border-[#255630]'
						: 'hover:bg-[#2e1535]'}"
					on:click|stopPropagation={() => (selectedUser = user.id)}
				>
					<div class="flex items-center gap-[12px]">
						{#if user.avatar == ''}
							<img src={dummyImage} alt="" class="w-[32px] h-[32px] rounded-[50%]" />
						{:else}
							<img src={user.avatar} alt="" class="w-[32px] h-[32px] rounded-[50%]" />
						{/if}
						<p class="text-[#D4CFD6] text-[18px] font-Gilroy-Medium">
							{user.name == '' ? user.username : user.name}
						</p>
					</div>
					{#if user.id === selectedUser}
						<div class="flex items-center gap-[6px]">
							<img src={Select} alt="" />
							<p class="text-[#1FD031] text-[14px] font-Gilroy-Medium">Selected</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="flex items-start gap-[10px] w-full">
		<button disabled={selectedUser == ''} class="request-button" on:click|stopPropagation={submit}>
			<p>{is_invite ? 'Invite' : 'Replace'} Player</p>
			<img src={selectedUser == '' ? SendDisabled : SendActive} alt="" />
		</button>
	</div>
</div>

<style>
	.search-box {
		display: flex;
		width: 100%;
		padding: 13px;
		align-items: center;
		gap: 18px;
		border-radius: 6px;
		border: 1px solid var(--white-20, #533e59);
		background: var(--Accent-2, #200b26);
	}

	.search-box input {
		background-color: #200b26;
		border: 0 !important;
		outline: 0 !important;
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Medium;
		font-size: 16px;
		width: 100%;
	}

	.search-box:focus-within {
		border-radius: 6px;
		border: 1px solid var(--Accent, #fdeb56);
		background: var(--Accent-2, #200b26);
		box-shadow: 0px 0px 0px 4px rgba(253, 235, 86, 0.15);
	}

	.request-button {
		display: flex;
		width: 100%;
		padding: 11px 18px 11px 22px;
		justify-content: center;
		align-items: center;
		gap: 6px;
		border-radius: 4px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	.request-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.request-button:disabled {
		background: var(--white-10, #3d2644);
	}

	.request-button:disabled p {
		color: #948798;
	}
</style>
