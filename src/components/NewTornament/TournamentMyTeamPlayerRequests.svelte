<script>
	import { enhance } from '$app/forms';
	import AlreadyRegistered from '$lib/assets/Already_Registered.svg';
	import { env } from '$env/dynamic/public';
	import dummyImage from '$lib/assets/tournament-leader-dummy.png';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	export let reqs;
	export let empty_player_id;

	async function addToTeam(player, req_id) {
		const data = new FormData();
		data.append('empty_player_id', empty_player_id);
		data.append('player_id', player);
		data.append('req_id', req_id);

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/add_to_team`, {
			method: 'POST',
			body: data
		});

		if (res.ok) {
			invalidateAll();
		}
	}
</script>

<div class="flex flex-wrap gap-3">
	{#each reqs as req}
		<div class="p-3 flex justify-between items-center rounded-[8px] bg-[#2B1731] w-[30rem]">
			<div class="flex items-center gap-3">
				{#if req.expand.player.avatar == ''}
					<img src={dummyImage} alt="user_img" class="h-[50px] w-[50px] rounded-full" />
				{:else}
					<img
						src={`${env.PUBLIC_BASE_URL}/api/files/_pb_users_auth_/${req.expand.player.id}/${req.expand.player.avatar}`}
						alt="user_img"
						class="h-[50px] w-[50px] rounded-full"
					/>
				{/if}
				<div>
					<p class="text-[#E9E6EA] text-lg font-Gilroy-SemiBold">
						{req.expand.player.name == '' ? req.expand.player.username : req.expand.player.name}
					</p>
					<p class="text-[#948798]">@{req.expand.player.username}</p>
				</div>
			</div>
			<button
				on:click={() => addToTeam(req.player, req.id)}
				class="py-2 px-6 rounded-[10px] bg-[#272230] border border-solid border-[#254530] w-fit flex items-center gap-[10px]"
			>
				<img src={AlreadyRegistered} alt="" />
				<p class="text-[#1FD031] text-[17px] font-Gilroy-SemiBold">Accept and Add</p>
			</button>
		</div>
	{/each}
</div>
