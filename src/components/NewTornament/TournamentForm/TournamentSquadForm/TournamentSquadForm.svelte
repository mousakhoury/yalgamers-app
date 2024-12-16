<script>
	// @ts-nocheck

	import SquadMainInputs from './SquadMainInputs.svelte';
	import SquadSelectPlayer from './SquadSelectPlayer.svelte';
	import TournamentFormTerms from '../TournamentFormTerms.svelte';
	import TournamentFromSuccess from '../TournamentFromSuccess.svelte';
	import dummyImage from '$lib/assets/tournament-leader-dummy.png';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let users;
	export let user;
	export let tournament;
	export let closeRegistrationHandler;

	let fileInput;
	let imageUrl;
	let uploadProgress = 0;
	let name = '';
	let selectedUserName = '';
	let success = true;

	let isBack = true;

	$: allUsers = users
		.map((m) => ({
			id: m.id,
			name: m.name == '' ? m.username : m.name,
			image: m.avatar == '' ? dummyImage : m.avatar
		}))
		.filter((f) => f.id != $page.data.profile.id);

	$: selectedPlayers = [
		{
			position: 'Player 2',
			player_name: null,
			player_image: null,
			isSelected: false,
			id: ''
		},
		{
			position: 'Player 3',
			player_name: null,
			player_image: null,
			isSelected: false,
			id: ''
		},
		{
			position: 'Player 4',
			player_name: null,
			player_image: null,
			isSelected: false,
			id: ''
		}
	];

	let selectedPosition = null;

	let ShowInputs = true;
	let acceptedTerms = false;

	let showTerms = true;
	let showSuccess = false;
	let msg = '';

	const showTermsHandler = () => {
		ShowInputs = false;
		showTerms = true;
	};

	function updateSelectedPlayer(selectedPosition, selectedUserName) {
		if (selectedUserName !== '') {
			const playerIndex = selectedPlayers.findIndex(
				(player) => player.position === selectedPosition
			);
			if (playerIndex !== -1) {
				const selectedUser = allUsers.find((user) => user.name === selectedUserName);
				selectedPlayers[playerIndex] = {
					...selectedPlayers[playerIndex],
					player_name: selectedUserName,
					player_image: selectedUser ? selectedUser.image : null,
					isSelected: true,
					isPending: false,
					id: selectedUser.id
				};
				selectedPlayers = [...selectedPlayers]; // Ensure reactivity by reassigning
			}
		}
	}

	function handleUpdatePlayer(event) {
		const { selectedUserName } = event.detail;
		updateSelectedPlayer(selectedPosition, selectedUserName);
		// Any additional logic to handle the player update...
	}

	function selectPlayerHandler() {
		// Update the selected player only if a username has been selected
		if (selectedUserName) {
			updateSelectedPlayer(selectedPosition, selectedUserName);
		}

		// Reset states after updating the player
		selectedPosition = null;
		selectedUserName = ''; // Reset the username
		ShowInputs = true; // Show the main inputs again
	}

	const backToInputsHandler = () => {
		selectedPosition = null;
		selectedUserName = ''; // Make sure this name matches exactly what you're using.
		ShowInputs = true;
		showTerms = false;
		showSuccess = false;
	};

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('tournament', tournament.id);
		formData.append('user', user.id);
		formData.append('name', name);
		formData.append('team_logo', fileInput);
		formData.append('selected_players', JSON.stringify(selectedPlayers));

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/register_team`, {
			method: 'POST',
			body: formData
		});
		invalidateAll();

		if (!res.ok) {
			msg = (await res.json()).message;
			success = false;
		}
		showSuccess = true;
		showTerms = false;
		setTimeout(() => {
			closeRegistrationHandler();
		}, 5000);
	};
</script>

<form class="w-[552px]" enctype="multipart/form-data" on:submit={formSubmitHandler}>
	{#if selectedPosition !== null}
		<SquadSelectPlayer
			{selectedPosition}
			{ShowInputs}
			{allUsers}
			{backToInputsHandler}
			{selectPlayerHandler}
			bind:selectedUserName
		/>
	{:else if ShowInputs}
		<SquadMainInputs
			{tournament}
			bind:selectedPosition
			bind:imageUrl
			bind:fileInput
			bind:uploadProgress
			bind:name
			bind:selectedPlayers
			{showTermsHandler}
		/>
	{:else if showTerms}
		<TournamentFormTerms bind:acceptedTerms />
	{:else if showSuccess}
		<TournamentFromSuccess bind:success bind:msg />
	{/if}
</form>
