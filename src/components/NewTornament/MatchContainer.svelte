<script>
	import empty from '$lib/assets/empty-match.svg';
	import VS from '$lib/assets/match-vs.svg';
	import { env } from '$env/dynamic/public';
	import { getImageUrl } from '$lib/utils.js';
	import { page } from '$app/stores';

	export let match;
	export let total;
	export let tournament;

	function getLabel(label) {
		if (label == 'The Final') {
			return 'Final';
		} else if (label == 'Round Of Matches') {
			return 'Round Of';
		} else if (label == 'Knockout Matches') {
			return 'Knockout';
		} else if (label == 'Quarter Finals') {
			return 'Quarter Finals';
		} else if (label == 'Semi Final') {
			return 'Semi Finals';
		}
		return '';
	}

	function formatDate(timestamp) {
		const dateObject = new Date(timestamp);
		const day = dateObject.getUTCDate();
		const month = dateObject.getUTCMonth() + 1; // January is 0
		const year = dateObject.getUTCFullYear();
		return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
	}

	function formatTime(timestamp) {
		const dateObject = new Date(timestamp);
		const hours = dateObject.getUTCHours();
		const minutes = dateObject.getUTCMinutes();
		const amOrPm = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');
		return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
	}
</script>

<div
	class="bg-[#2B1731] rounded-[8px] border-[1px] border-solid border-[#3d2544] flex flex-col items-center gap-[20px] w-full p-[20px]"
>
	<div class="flex items-start justify-between w-full">
		<div class="flex flex-col items-start gap-[8px] w-[280px]">
			<h5 class="text-[#fff] text-[18px] font-Gilroy-SemiBold">
				{$page.data.tournament.title} Championship- {getLabel(match.label)}
			</h5>
			<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">Match {match.match} of {total}</p>
		</div>
		<div class="flex flex-col items-end gap-[6px]">
			{#if match.match_date == ''}
				<p class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium">coming soon</p>
			{:else}
				<p class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium">
					{formatDate(match.match_date)}
				</p>
				<p class="text-[#BEB6C0] text-[14px] font-Gilroy-Medium">
					{formatTime(match.match_date)}
				</p>
			{/if}
		</div>
	</div>
	<span class="match-line" />
	<div class="flex items-center gap-[13px] w-full justify-between">
		<div class="flex items-center gap-[10px] justify-start w-[160px]">
			{#if match.team_1}
				{#if tournament.mode == 'squad' && match.expand.team_1.team_logo != ''}
					<img
						src={`${env.PUBLIC_BASE_URL}/api/files/tournament_registrations/${match.expand.team_1.id}/${match.expand.team_1.team_logo}`}
						alt=""
						class="w-[40px] h-[40px] object-cover rounded-[100px]"
					/>
				{:else}
					<img
						src={getImageUrl(
							'users',
							match.expand.team_1.expand.user.id,
							match.expand.team_1.expand.user.avatar
						)}
						alt=""
						class="w-[40px] h-[40px] object-cover rounded-[100px]"
					/>
				{/if}
				<p class="text-[#E9E6EA] text-[14px] font-Gilroy-SemiBold">
					{match.expand.team_1.name}
				</p>
			{:else}
				<p class="text-[#E9E6EA] text-[14px] font-Gilroy-SemiBold">You Can Be</p>
				<img src={empty} alt="" class="w-[40px] h-[40px] object-cover rounded-[100px]" />
			{/if}
		</div>
		<img src={VS} alt="" />
		<div class="flex items-center gap-[10px] justify-end w-[160px]">
			{#if match.team_2 != ''}
				<p class="text-[#E9E6EA] text-[14px] font-Gilroy-SemiBold">
					{match.expand.team_2.name}
				</p>
				{#if tournament.mode == 'squad' && match.expand.team_1.team_logo != ''}
					<img
						src={`${env.PUBLIC_BASE_URL}/api/files/tournament_registrations/${match.expand.team_2.id}/${match.expand.team_2.team_logo}`}
						alt=""
						class="w-[40px] h-[40px] object-cover rounded-[100px]"
					/>
				{:else}
					<img
						src={getImageUrl(
							'users',
							match.expand.team_2.expand.user.id,
							match.expand.team_2.expand.user.avatar
						)}
						alt=""
						class="w-[40px] h-[40px] object-cover rounded-[100px]"
					/>
				{/if}
			{:else}
				<p class="text-[#E9E6EA] text-[14px] font-Gilroy-SemiBold">You Can Be</p>
				<img src={empty} alt="" class="w-[40px] h-[40px] object-cover rounded-[100px]" />
			{/if}
		</div>
	</div>
</div>

<style>
	.match-line {
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
