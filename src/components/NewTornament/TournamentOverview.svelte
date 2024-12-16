<script>
	import { t, locale } from '$lib/stores/i18n';

	import TournamentDetail from './TournamentDetail.svelte';
	import TournamentItem from './TournamentItem.svelte';
	import TeamGreen from '$lib/assets/tounament-team-icon-green.svg';
	import FeeGreen from '$lib/assets/tournament-fee-green.svg';
	import TimeGreen from '$lib/assets/Tournament-time-green.svg';
	import TeamRed from '$lib/assets/tournament-team-red.svg';
	import TimeRed from '$lib/assets/Tournament-time-red.svg';
	import Device from '$lib/assets/tournament-device-icon.svg';
	import GameMode from '$lib/assets/tournament-game-mode-icon.svg';
	import { getImageUrl } from '$lib/utils.js';

	export let body;
	export let gameUrl;
	export let tournament;

	$: processedDeadline = new Date(tournament?.deadline);
	$: poweredbyImg = getImageUrl('tournaments', tournament.id, tournament.poweredimg);

	function calculateDaysLeft(tournamentDeadline) {
		if (!tournamentDeadline) {
			return null; // Indicate that tournament deadline is not provided
		}

		const deadlineDate = new Date(tournamentDeadline);

		// Check if deadlineDate is a valid date
		if (isNaN(deadlineDate.getTime())) {
			throw new Error('Invalid date provided');
		}

		const currentDate = new Date();

		// Check if the deadline is in the past
		if (deadlineDate < currentDate) {
			return 'Passed'; // If the deadline has passed
		}

		const timeDifference = deadlineDate.getTime() - currentDate.getTime();
		const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
		return daysLeft;
	}
</script>

<div class="flex flex-col items-start gap-[40px] w-full">
	<div class="flex items-center gap-x-[15px] gap-y-[20px] flex-wrap">
		<TournamentItem
			bg="#68566E"
			image={TeamGreen}
			text={`${tournament.teams_can_register} ${
				tournament.mode == 'solo' ? $t('Players') : $t('Teams')
			}`}
		/>
		{#if tournament.mode == 'squad'}
			<TournamentItem
				bg="#68566E"
				image={TeamGreen}
				text={`${tournament.players_per_team} ${$t('Member Per Team')}`}
			/>
			<TournamentItem
				bg="#68566E"
				image={TeamGreen}
				text={`${tournament.selected_players} ${$t('Members')}`}
			/>
		{/if}
		<TournamentItem
			bg="#68566E"
			image={FeeGreen}
			text={`${tournament.fees} ${$t('Tickets Entry Fee')}`}
		/>
		<TournamentItem
			bg="#68566E"
			image={TimeGreen}
			text={`${$t('Registration Deadline')} ` +
				processedDeadline.toLocaleDateString('en-us', { month: 'short' }) +
				', ' +
				processedDeadline.getDate()}
		/>
		<TournamentItem
			bg="#68566E"
			image={TeamRed}
			text={tournament.registered_teams +
				`${tournament.mode == 'squad' ? ` ${$t('Teams Entered')}` : ` ${$t('players entered')}`}`}
		/>
		{#if tournament.mode == 'squad'}
			<TournamentItem
				bg="#68566E"
				image={TeamRed}
				text={`${tournament.teams_can_register - tournament.registered_teams} ${$t(
					'Teams Remaining'
				)}`}
			/>
		{/if}
		{#if tournament.mode == 'squad'}
			<TournamentItem
				bg="#68566E"
				image={TeamRed}
				text={`${
					tournament.players_per_team * tournament.teams_can_register - tournament.selected_players
				} ${$t('Members Left')}`}
			/>
		{:else}
			<TournamentItem
				bg="#68566E"
				image={TeamRed}
				text={`${tournament.teams_can_register - tournament.registered_teams} ${$t(
					'Players Left'
				)}`}
			/>
		{/if}
		<TournamentItem
			bg="#68566E"
			image={TimeRed}
			text={calculateDaysLeft(tournament.deadline) + ` ${$t('Days Left for Registration')}`}
		/>
	</div>
	<div class="flex flex-col items-start gap-[19px] w-full">
		<h5 class="text-[#E9E6EA] text-[24px] font-Gilroy-SemiBold">{$t('Details')}</h5>
		<div class="tournament-body-container prose custom-prose">
			{@html body}
		</div>
	</div>
	<div class="flex items-center justify-between gap-[30px] w-full overflow-x-auto">
		<div class="flex items-center gap-[30px]">
			<TournamentDetail
				image={gameUrl}
				title={$t('Game Name')}
				text={$locale === 'en' ? tournament.title_en : tournament.title}
			/>
			<TournamentDetail image={Device} title={$t('Device')} text={tournament.device} />
			<TournamentDetail image={GameMode} title={$t('game mode')} text={$t(tournament.mode)} />
		</div>
		<div class="flex items-center gap-[16px]">
			<img src={poweredbyImg} alt="" class="h-[81px] max-w-[140px]" />
			<div class="flex flex-col items-start gap-[4px] shrink-0">
				<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">{$t('Organized by')}</p>
				<p class="text-[#E9E6EA] text-[20px] font-Gilroy-SemiBold">{tournament.poweredby}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.tournament-body-container :global(p),
	.tournament-body-container :global(ul),
	.tournament-body-container :global(ol) {
		margin: 14px 0;
	}
	.tournament-body-container :global(a) {
		text-decoration: underline;
		color: #0d61bf;
	}

	.tournament-body-container :global(ul) {
		list-style: disc;
		padding-left: 40px;
	}

	.tournament-body-container :global(ol) {
		list-style: auto;
		padding-left: 40px;
	}
	.tournament-body-container :global(ul):lang(ar) {
		padding-right: 40px;
	}

	.tournament-body-container :global(ol):lang(ar) {
		padding-right: 40px;
	}
</style>
