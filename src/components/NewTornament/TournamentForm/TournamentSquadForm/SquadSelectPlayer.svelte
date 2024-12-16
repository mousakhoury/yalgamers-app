<script>
	// @ts-nocheck

	import Search from '$lib/assets/Search-add-player.svg';
	import Select from '$lib/assets/add-player-select-check.svg';
	import SendActive from '$lib/assets/Send-request-active.svg';
	import SendDisabled from '$lib/assets/Send-request-disabled.svg';
	import dummyImage from '$lib/assets/tournament-leader-dummy.png';

	export let selectedPosition;
	export let ShowInputs;
	export let allUsers;
	export let backToInputsHandler;
	export let selectPlayerHandler;
	export let selectedUserName;

	let searchInput = '';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: filteredUsers = searchInput
		? allUsers.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
		: allUsers;

	function selectUser(userName) {
		if (selectedUserName === userName) {
			selectedUserName = '';
			dispatch('updatePlayer', { selectedUserName });
		} else {
			selectedUserName = userName;
			dispatch('updatePlayer', { selectedUserName });
		}
	}
</script>

<div class="flex flex-col items-start gap-[12.5px] w-full">
	<div class="flex flex-col items-start gap-[24px] w-full">
		<div class="flex flex-col items-start gap-[24px] w-full">
			<h5 class="text-[#fff] text-[20px] font-Gilroy-SemiBold">Add {selectedPosition}</h5>
			<div class="search-box">
				<img src={Search} alt="" />
				<input type="text" placeholder="Search {selectedPosition}" bind:value={searchInput} />
			</div>
		</div>
		<div class="flex flex-col items-start gap-[12px] w-full h-[191px] overflow-y-scroll">
			{#each filteredUsers as user}
				<button
					class="flex items-center justify-between gap-[12px] p-[6px] rounded-[2px] cursor-pointer w-full {user.name ===
					selectedUserName
						? 'bg-[#272130] border border-solid border-[#255630]'
						: 'hover:bg-[#2e1535]'}"
					on:click={() => selectUser(user.name)}
				>
					<div class="flex items-center gap-[12px]">
						{#if user.image}
							<img src={user.image} alt="" class="w-[32px] h-[32px] rounded-[50%]" />
						{:else}
							<img src={dummyImage} alt="" class="w-[32px] h-[32px] rounded-[50%]" />
						{/if}
						<p class="text-[#D4CFD6] text-[18px] font-Gilroy-Medium">{user.name}</p>
					</div>
					{#if user.name === selectedUserName}
						<div class="flex items-center gap-[6px]">
							<img src={Select} alt="" />
							<p class="text-[#1FD031] text-[14px] font-Gilroy-Medium">Selected</p>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
	<div class="flex items-start gap-[10px] w-full">
		<button
			on:click={backToInputsHandler}
			class="py-[11px] pl-[22px] pr-[18px] rounded-[4px] bg-[#3D2644] w-full flex items-center justify-center gap-[15px]"
		>
			<p class="text-[#948798] text-[16px] font-Gilroy-SemiBold">back</p>
		</button>
		<button disabled={!selectedUserName} on:click={selectPlayerHandler} class="request-button">
			<p>Select Player</p>
			<img src={!selectedUserName ? SendDisabled : SendActive} alt="" />
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
