<script>
	import { t, locale } from '$lib/stores/i18n';
	import Button from '$components/Button.svelte';
	import OngoingIcon from '$lib/assets/Ongoing.svg';
	import rightArrow from '$lib/assets/right-arrow-colored.svg';
	import CloseSquare from '$lib/assets/Close_Square.svg';
	import AlreadyRegistered from '$lib/assets/Already_Registered.svg';
	import TournamentFinished from '$lib/assets/Tournament_Finished.svg';
	import SeeWinner from '$lib/assets/See_Winner.svg';
	import dummyImage from '$lib/assets/tournament-leader-dummy.png';
	import RequestButton from '$lib/assets/request-button-check.svg';
	import { env } from '$env/dynamic/public';
	import DeclineRequest from '$lib/assets/decline-request-x.svg';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let showRegistrationHandler;
	export let tournament;
	export let exist_as_player;
	let isNoSpot = false;
	let now = new Date();
	let status = 'Unknown'; // Initial status
	let isHasRequest = false;
	let isRequestAccepted = false;

	onMount(() => {
		// Update 'now' periodically if needed for countdowns or real-time updates
		const interval = setInterval(() => {
			now = new Date();
			determineStatus(); // Re-evaluate status based on the new 'now'
		}, 1000); // Every second

		return () => {
			clearInterval(interval); // Cleanup on component destruction
		};
	});

	function determineStatus() {
		const registrationStart = tournament.registration_starting_date
			? new Date(tournament.registration_starting_date)
			: null;
		const registrationDeadline = tournament.registration_deadline
			? new Date(tournament.registration_deadline)
			: null;
		const tournamentStart = tournament.start ? new Date(tournament.start) : null;
		const tournamentDeadline = tournament.deadline ? new Date(tournament.deadline) : null;

		if (!registrationStart) {
			status = 'Before Registration';
		} else if (now < registrationStart) {
			status = 'Countdown To Registration';
			// Here you could calculate the exact time until registration starts for display
		} else if (now >= registrationStart && now < registrationDeadline) {
			if (tournament.registered) {
				status = 'Already Registered';
			} else if (isNoSpot) {
				status = 'No Spot Available';
			} else {
				status = 'Register Now';
			}
		} else if (now >= registrationDeadline && now < tournamentStart && !tournament.registered) {
			status = 'Registration Closed';
		} else if (now >= tournamentStart && now < tournamentDeadline) {
			status = 'Ongoing';
		} else if (now >= tournamentDeadline) {
			status = 'Tournament Finished';
		}
	}

	determineStatus(); // Initial determination

	let countdown = '';

	function updateCountdown() {
		const now = new Date();
		const registrationStart = new Date(tournament.registration_starting_date);
		const diff = registrationStart - now;

		if (diff <= 0) {
			countdown = 'Registration is starting...';
			return;
		}

		// Calculate time components
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);

		// Update countdown string
		countdown = `Registration Starts in ${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
	}

	onMount(() => {
		if (exist_as_player && exist_as_player.state == 'accepted') {
			isRequestAccepted = true;
		} else if (exist_as_player && exist_as_player.state == 'pending') {
			isHasRequest = true;
		}
		updateCountdown(); // Initialize countdown
		const interval = setInterval(updateCountdown, 1000); // Update every second

		return () => clearInterval(interval); // Cleanup on component destruction
	});

	const acceptRequestHandler = async () => {
		const formData = new FormData();
		formData.append('id', exist_as_player.id);

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/accept_req`, {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			isRequestAccepted = true;
			isHasRequest = false;
		}

		invalidateAll();
	};

	const declineRequestHandler = async () => {
		const formData = new FormData();
		formData.append('id', exist_as_player.id);

		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/rej_req`, {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			isHasRequest = false;
		}

		invalidateAll();
	};
</script>

<!-- Use the determined 'status' to conditionally render the UI -->
{#if isRequestAccepted}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#272230] border border-solid border-[#254530] w-fit flex items-center gap-[10px]"
	>
		<img src={AlreadyRegistered} alt="" />
		<p class="text-[#1FD031] text-[20px] font-Gilroy-SemiBold">{$t('Request Accepted')}</p>
	</div>
{:else if isHasRequest}
	<div class="flex items-center gap-[40px]">
		<div
			class="flex items-center gap-[12px] p-[6px] pr-[20px] rounded-[100px] bg-[#200B26] border border-solid border-[#3D2644]"
		>
			<img
				src={`${env.PUBLIC_BASE_URL}/api/files/_pb_users_auth_/${exist_as_player.expand.leader.id}/${exist_as_player.expand.leader.avatar}`}
				alt=""
				class="w-[36px] h-[36px] rounded-[50%] border border-solid border-[#533E59]"
			/>
			<p class="text-[#A99FAC] text-[14px] font-Gilroy-Medium max-w-[237px] leading-[17px]">
				<span class="underline">{exist_as_player.expand.leader.username}</span>
				{$t('tournamentSendRequest')}
			</p>
		</div>
		<div class="flex items-center gap-[24px]">
			<button class="request-button" on:click={acceptRequestHandler}>
				<p>Accept Request</p>
				<img src={RequestButton} alt="" />
			</button>
			<button class="decline-request" on:click={declineRequestHandler}>
				<img src={DeclineRequest} alt="" />
			</button>
		</div>
	</div>
{:else if status === 'Before Registration'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#3D2434] border border-solid border-[#6D563C] w-fit"
	>
		<p class="text-[#BEB6C0] text-[20px] font-Gilroy-SemiBold">
			{$t('Registration Will Be Started Soon')}
		</p>
	</div>
{:else if status === 'Countdown To Registration'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#3D2434] border border-solid border-[#6D563C] w-fit"
	>
		<p class="text-[#BEB6C0] text-[20px] font-Gilroy-SemiBold">
			{countdown}
		</p>
	</div>
{:else if status === 'Register Now'}
	<Button
		disabled={tournament.registered}
		type="gradient"
		size="lg"
		class="pt-[16px] pb-[15px] px-[32px] !text-[20px] gap-[10px] !w-fit !rounded-[10px] cursor-pointer"
		on:click={showRegistrationHandler}
	>
		{$t('registerNow')}
		<img src={rightArrow} />
	</Button>
{:else if status === 'Already Registered'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#272230] border border-solid border-[#254530] w-fit flex items-center gap-[10px]"
	>
		<img src={AlreadyRegistered} alt="" />
		<p class="text-[#1FD031] text-[20px] font-Gilroy-SemiBold">{$t('Already Registered')}</p>
	</div>
{:else if status === 'No Spot Available'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#320E32] border border-solid border-[#460F36] w-fit flex items-center gap-[10px]"
	>
		<img src={CloseSquare} alt="" />
		<p class="text-[#F71756] text-[20px] font-Gilroy-SemiBold">{$t('No Spot Available')}</p>
	</div>
{:else if status === 'Registration Closed'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#320E32] border border-solid border-[#460F36] w-fit flex items-center gap-[10px]"
	>
		<img src={TournamentFinished} alt="" />
		<p class="text-[#F71756] text-[20px] font-Gilroy-SemiBold">{$t('Registration Closed')}</p>
	</div>
{:else if status === 'Ongoing'}
	<div
		class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#272230] border border-solid border-[#254530] w-fit flex items-center gap-[10px]"
	>
		<img src={OngoingIcon} alt="" />
		<p class="text-[#1FD031] text-[20px] font-Gilroy-SemiBold">{$t('Ongoing Tournament')}</p>
	</div>
{:else if status === 'Tournament Finished'}
	<div class="flex items-start lg:items-center gap-[20px] flex-col lg:flex-row">
		<button
			class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#FDEB56] border border-solid border-[#D9C842] w-fit flex items-center gap-[10px]"
		>
			<img src={SeeWinner} alt="" />
			<p class="text-[#2A0D32] text-[20px] font-Gilroy-SemiBold">{$t('See Winner')}</p>
		</button>
		<div
			class="pt-[16px] pb-[15px] px-[32px] rounded-[10px] bg-[#320E32] border border-solid border-[#460F36] w-fit flex items-center gap-[10px]"
		>
			<img src={TournamentFinished} alt="" />
			<p class="text-[#F71756] text-[20px] font-Gilroy-SemiBold">{$t('Tournament Finished')}</p>
		</div>
	</div>
{/if}

<style>
	.request-button {
		display: flex;
		padding: 16px 32px 15px 32px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		background: var(--Positive, #1fd031);
	}

	.request-button:hover {
		box-shadow: 0px 5px 14px 0px rgba(31, 208, 49, 0.25);
	}

	.request-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 20px;
	}

	.decline-request {
		display: flex;
		padding: 16px 16px 15px 16px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 10px;
		background: rgba(247, 23, 86, 0.15);
	}
</style>
