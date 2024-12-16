<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import leftArrow from '$lib/assets/arrow-left.svg';
	import smallRightArrow from '$lib/assets/small-right-arrow.svg';
	import PlayingTime2 from '$lib/assets/tournament-playingtime.svg';

	export let data;

	import XP from '$lib/assets/xp-have-fun-icon.svg';
	import Coin from '$lib/assets/coin-have-fun-icon.svg';

	import { getImageUrl } from '$lib/utils.js';
	import TournamentItem from '$components/NewTornament/TournamentItem.svelte';
	import TournamentOverview from '$components/NewTornament/TournamentOverview.svelte';
	import TournamentRewards from '$components/NewTornament/TournamentRewards.svelte';
	import TournamentTeams from '$components/NewTornament/TournamentTeams.svelte';
	import TournamentMatches from '$components/NewTornament/TournamentMatches.svelte';
	import TournamentStatus from '$components/NewTornament/TournamentStatus.svelte';
	import TournamentMode from '$components/NewTornament/TournamentMode.svelte';
	import TournamentRegisterTag from '$components/NewTornament/TournamentRegisterTag.svelte';
	import TournamentRegistrationButton from '$components/NewTornament/TournamentRegistrationButton.svelte';
	import TournamentBrackets from '$components/NewTornament/TournamentBrackets.svelte';
	import TournamentStream from '$components/NewTornament/TournamentStream.svelte';
	import TournamentSponsor from '$components/NewTornament/TournamentSponsor.svelte';
	import TournamentWinner from '$components/NewTornament/TournamentWinner.svelte';
	import TournamentSoloForm from '$components/NewTornament/TournamentForm/TournamentSoloForm/TournamentSoloForm.svelte';
	import TournamentSquadForm from '$components/NewTornament/TournamentForm/TournamentSquadForm/TournamentSquadForm.svelte';
	import TournamentMyTeam from '$components/NewTornament/TournamentMyTeam.svelte';
	import TournamentPlayers from '$components/NewTornament/TournamentPlayers.svelte';
	import { tournaments } from '$lib/assets/navicons';
	import TournamentWinners from '$components/NewTornament/TournamentWinners.svelte';
	import TournamentsLeaderboard from '$components/NewTornament/TournamentsLeaderboard/TournamentsLeaderboard.svelte';

	let showRegistration = false;
	let showSucess = false;
	let check = false;

	$: tournament = data.tournament;
	$: processedDeadline = new Date(tournament?.deadline).toLocaleDateString('en-us', {
		hour: '2-digit',
		month: 'short',
		day: 'numeric'
	});

	const handleRegistration = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				showSucess = true;
			}
			update();
		};
	};

	const showRegistrationHandler = () => {
		showRegistration = true;
	};

	const closeRegistrationHandler = () => {
		showRegistration = false;
	};

	$: gameUrl = getImageUrl('tournaments', tournament.id, tournament.image);
	$: body = $locale === 'en' ? tournament.body_en : tournament.body;

	let activeTab = $t('Overview'); // Default active tab

	function setActiveTab(tab) {
		activeTab = tab;
	}

	$: pastDeadline = new Date() > new Date(tournament?.deadline);

	function get_tabs() {
		if (data.tournament.type == 'bracket') {
			return [
				$t('Overview'),
				$t('Rewards'),
				`${tournament.mode == 'solo' ? $t('Players') : $t('Teams')}`,
				$t('Matches'),
				$t('Bracket'),
				$t('leaderboard'),
				$t('Stream'),
				$t('Sponsors')
			];
		}

		if (data.tournament.type == 'leaderboard' && data.tournament.mode == 'squad') {
			return [
				$t('Overview'),
				$t('Rewards'),
				$t('Teams'),
				$t('leaderboard'),
				$t('Stream'),
				$t('Sponsors')
			];
		} else {
			return [$t('Overview'), $t('Rewards'), $t('leaderboard'), $t('Stream'), $t('Sponsors')];
		}
	}

	$: tabs = get_tabs();

	$: if (pastDeadline && data.tournament.type == 'bracket') {
		tabs.push($t('Winners'));
	}

	$: isTeamRegistered = true;
	$: if (isTeamRegistered) {
		const teamsIndex = tabs.indexOf($t('Teams'));
		if (teamsIndex !== -1) {
			tabs.splice(teamsIndex + 1, 0, $t('My Team'));
		}
	}

	function get_date(date) {
		if (date) {
			return new Date(date);
		} else {
			return new Date();
		}
	}

	function formatDate(isoString) {
		const date = new Date(isoString);

		// Define options to get the required format for the date
		const dateOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		};

		// Define options to get the required format for the time
		const timeOptions = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: 'UTC'
		};

		// Format the date and time separately
		const formattedDate = date.toLocaleDateString('en-US', dateOptions);
		const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

		// Combine date and time into the final format
		const finalDate = `${formattedDate} sharp at ${formattedTime} UTC`;

		return finalDate;
	}
</script>

<svelte:head>
	<title>Tournament - {tournament.title}</title>
</svelte:head>

<div class="my-[30px] px-[10px] sm:px-[30px]">
	<div class="flex gap-[10px] justify-start items-center">
		<a
			href="/tournaments"
			class="flex text-lg not-italic font-normal text-white-80 font-Gilroy-SemiBold"
		>
			<img
				height="24px"
				width="24px"
				src={leftArrow}
				alt="left arrow icon"
				style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
			/>

			{$t('tournaments')}</a
		>
		<img
			src={smallRightArrow}
			alt="small right arrow"
			width="16px"
			height="16px"
			style={$locale == 'ar' ? 'transform:rotateY(180deg)' : ''}
		/>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="inline-block overflow-hidden text-lg not-italic font-normal pointer-events-none text-white-40 font-Gilroy-SemiBold w-36 text-ellipsis whitespace-nowrap"
		>
			{$locale === 'en' ? tournament.title_en : tournament.title}
		</p>
	</div>
</div>

<div class="px-[10px] sm:px-[30px]">
	<div class="relative">
		<img
			src={gameUrl}
			alt=""
			class="w-full aspect-[343/200] lg:aspect-[1380/320] object-cover rounded-[8px] border-[2px] border-solid border-[#3d2544]"
		/>
		<div
			class="absolute top-[10px] lg:top-[20px] flex items-center gap-[12px] w-[200px] flex-wrap lg:w-full {$locale ===
			'ar'
				? 'right-[10px] lg:right-[20px]'
				: 'left-[10px] lg:left-[20px]'}"
		>
			<TournamentStatus {tournament} />
			<TournamentMode {tournament} />
			<TournamentRegisterTag {tournament} />
		</div>
	</div>
	<div
		class="flex flex-col items-start gap-[12px] lg:gap-[20px] mt-[16px] lg:mt-[30px] mb-[24px] lg:mb-[40px]"
	>
		<h1 class="text-[#E9E6EA] text-[20px] lg:text-[42px] font-Gilroy-Bold">
			{$locale === 'en' ? tournament.title_en : tournament.title}
		</h1>

		{#if get_date() < get_date(tournament.start)}
			<TournamentItem
				image={PlayingTime2}
				bg="#3D2644"
				text="Starting On: "
				span={formatDate(tournament.start)}
			/>
		{/if}

		<div class="flex items-center gap-[20px] flex-wrap">
			<span class="score-container">
				<img src={Coin} alt="" />
				<p>{tournament.price} {$t('Total')}</p>
			</span>
			<span class="score-container">
				<img src={XP} alt="" />
				<p>{tournament.xp} {$t('Total')}</p>
			</span>

			<!-- <TournamentItem type="price" text={tournament.price} />
			<TournamentItem type="xp" text={tournament.xp} /> -->
		</div>
	</div>
	<TournamentRegistrationButton
		{showRegistrationHandler}
		{tournament}
		exist_as_player={data.exist_as_player}
	/>

	<div class="flex flex-col items-start w-full mt-[60px]">
		<div
			class="flex items-center gap-[6px] border border-[#FFFFFF0D] bg-[#24102A] p-[12px] w-full rounded-t-[8px] overflow-x-scroll lg:hidden"
		>
			{#each tabs as tab}
				<button
					class="py-[4px] px-[12px] rounded-[4px] cursor-pointer"
					class:active={activeTab === tab}
					on:click={() => setActiveTab(tab)}
				>
					<p class="text-[#FFFFFFB2] text-[12px] font-Gilroy-Medium">{tab}</p>
				</button>
			{/each}
		</div>
		<div
			class=" bg-[#200B26] rounded-b-[8px] lg:rounded-[20px] p-[12px] lg:p-[30px] flex flex-col items-center gap-[40px] w-full"
		>
			<div
				class="bg-[#140718] lg:flex items-center gap-[20px] rounded-[100px] py-[13px] px-[14px] hidden"
			>
				{#each tabs as tab}
					<button
						class="py-[8px] px-[24px] rounded-[100px] cursor-pointer"
						class:active={activeTab === tab}
						on:click={() => setActiveTab(tab)}
					>
						<p class="text-[#BEB6C0] text-[22px] font-Gilroy-SemiBold">{tab}</p>
					</button>
				{/each}
			</div>

			{#if activeTab === $t('Overview')}
				<TournamentOverview {body} {gameUrl} {tournament} />
			{/if}
			{#if activeTab === $t('Rewards')}
				<TournamentRewards {tournament} />
			{/if}
			{#if activeTab === $t('Teams') && tournament.mode == 'squad'}
				<TournamentTeams bind:teams={data.reg_teams} {tournament} />
			{/if}
			{#if activeTab === $t('My Team') && tournament.mode == 'squad'}
				<TournamentMyTeam bind:team={data.my_team} />
			{/if}
			{#if activeTab === $t('Players') && tournament.mode == 'solo'}
				<TournamentPlayers bind:teams={data.reg_teams} {tournament} />
			{/if}
			{#if activeTab === $t('Matches')}
				<TournamentMatches
					bind:matches={data.matches}
					total_number_of_matches={data.tournament.teams_can_register - 1}
					{tournament}
				/>
			{/if}
			{#if activeTab === $t('Bracket')}
				<TournamentBrackets brackets={data.brackets} />
			{/if}
			{#if activeTab === $t('leaderboard') && data.leaderboard.length > 0}
				<TournamentsLeaderboard
					originalLeaderboard={data.leaderboard}
					my_username={data.profile.username}
				/>
			{/if}
			{#if activeTab === $t('Stream')}
				<TournamentStream {tournament} bind:links={data.stream_links} />
			{/if}
			{#if activeTab === $t('Sponsors')}
				<TournamentSponsor bind:sponsors={data.sponsors} />
			{/if}
			{#if activeTab === $t('Winners')}
				<TournamentWinners {tournament} bind:winners={data.winners} />
			{/if}
		</div>
	</div>
</div>

{#if showRegistration}
	<button
		class="w-full h-full fixed top-0 left-0 bg-[#140718] opacity-90 z-50"
		on:click={closeRegistrationHandler}
	/>

	<div
		class="p-[24px] bg-[#200B26] rounded-[16px] border-2 border-solid border-[#3D2644] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 tournament-registration"
	>
		{#if data.tickets >= tournament.fees}
			{#if tournament.mode === 'solo'}
				<TournamentSoloForm {tournament} {closeRegistrationHandler} />
			{:else if tournament.mode === 'squad'}
				<TournamentSquadForm
					{tournament}
					{closeRegistrationHandler}
					user={data.profile}
					users={data.users}
				/>
			{/if}
		{:else}
			<h1 class="text-3xl text-white">Sorry, You don't have enough tickets!</h1>
		{/if}
	</div>
{/if}

<style>
	.active {
		background-color: #3d2644;
	}

	.active p {
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.score-container {
		display: flex;
		padding: 6px 16px 6px 6px;
		align-items: center;
		gap: 8px;
		border-radius: 6px;
		background: #200b26;
		direction: ltr;
	}

	.score-container p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
	}

	.score-container img {
		width: 34px;
	}

	@media (max-width: 1024px) {
		.score-container {
			display: flex;
			padding: 4px 12px 4px 4px;
			align-items: center;
			gap: 8px;
		}

		.score-container img {
			width: 20px;
		}

		.score-container p {
			font-size: 12px;
		}
	}
</style>
