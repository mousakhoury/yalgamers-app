<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { env } from '$env/dynamic/public';
	import LeftArrow from '$lib/assets/pagination-back-arrow.svg';
	import RightArrow from '$lib/assets/small-right-arrow.svg';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Exclusive from './Exclusive.svelte';

	$: xp_logs = [];
	let totalPages = 1;
	let current_page = 1;
	let loading = false;
	let total_items = 0;
	$: active_tab = 'history';

	onMount(async () => {
		loading = true;
		let query_param = $page.url.searchParams.get('page') ?? 1;
		if (typeof query_param == 'string') {
			query_param = parseInt(query_param);
		}
		await fetch_xp_logs(query_param);
	});

	const REWARDS = [
		{
			main: $t('signUp'),
			xp: 100
		},
		{
			main: `${$t('Link')} ${$t('steam')}`,
			xp: 500
		},
		{
			main: `${$t('Link')} ${$t('twitch')}`,
			xp: 100
		},
		{
			main: `${$t('Link')} ${$t('discord')}`,
			xp: 100
		},
		{
			main: `${$t('Link')} ${$t('twitter')}`,
			xp: 100
		},
		{
			main: $t('Refer a Friend'),
			xp: 50
		}
	];

	const GENERAL_REWARDS = [
		{
			main: $t('Spend 20 Minute per day'),
			xp: 5
		},
		{
			main: $t('Spend 1 Hour per day'),
			xp: 20
		},
		{
			main: $t('Spend 3 Hour per day'),
			xp: 75
		},
		{
			main: $t('Write Game review'),
			xp: 20
		},
		{
			main: $t('Complete course quiz'),
			xp: 'Depends'
		},
		{
			main: $t('Complete course review'),
			xp: 20
		},
		{
			main: $t('Attend a tournament'),
			xp: 'Depends'
		}
	];

	const xpLogToTitle = (log) => {
		const type = log.type;
		if (type === 'SIGN_UP') {
			return $t('Sign Up XP Reward');
		} else if (type === 'REFERRAL') {
			return $t('Refer a Friend');
		} else if (type === 'LINKING') {
			return `${$t('Link')} ${$t(log.data.subType)}`;
		} else if (type === 'COURSE_REVIEW') {
			return $t('Write a Course Review');
		} else if (type === 'COURSE_QUIZ') {
			return $t('Finish Course Quiz');
		} else if (type === 'DURATION') {
			return $t('Spending time');
		} else if (type === 'TOURNAMENT_REGISTRATION') {
			return $t('Attended Tournament');
		} else if (type === 'GAME_REVIEW') {
			return $t('Write a Game Review');
		} else if (type === 'DAILY_MINI_GAME') {
			return `You have ranked ${log.data.rank} in Mini Game.`;
		} else if (type == 'MAIN TASK MONTHLY PRIZE') {
			return $t('Main Quests Monthly Reward');
		} else if (type == 'PROJECT QUEST') {
			return $t('Project task Reward');
		} else if (type == 'EXPLORE QUEST TASK' || type == 'MAIN QUEST') {
			return $t('Main Quest Task Reward');
		} else if (type == 'MAIN TASK WEEKLY PRIZE') {
			return $t('Main Quests Weekly Reward');
		} else {
			return type;
		}
	};

	function formatDate(ds) {
		const date = new Date(ds);
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(date);
	}

	function formatTime(ds) {
		const date = new Date(ds);
		return new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		}).format(date);
	}

	async function fetch_xp_logs(pg_nmbr) {
		loading = true;
		let response = await fetch(
			`${env.PUBLIC_BASE_URL}/api/collections/xp_logs/records?page=${pg_nmbr}&perPage=10&sort=-created&filter=user='${$page.data.profile.id}'`
		);
		response = await response.json();
		xp_logs = response.items;
		totalPages = response.totalPages;
		total_items = response.totalItems;
		current_page = response.page;
		loading = false;
		change_param();
	}

	function change_param() {
		const url = new URLSearchParams();
		url.set('page', `${current_page}`);
		goto(`?${url.toString()}`);
	}

	function makeHistory(list) {
		return list
			.map((log) => {
				const date = new Date(log.data?.date ?? log.created);
				log.date = date;
				return log;
			})
			.sort((a, b) => b.date - a.date);
	}
</script>

<div class="flex flex-col p-10 gap-10">
	<div class="xp-card">
		<div class="flex flex-col lg:flex-row gap-[20px] justify-between items-center px-[24px] my-4">
			{#if active_tab == 'main'}
				<h3 class="heading text-center">{$t('Yalgamers Exclusive Rewards')}</h3>
			{:else}
				<h3 class="heading text-center">{$t('My History')}</h3>
			{/if}

			<!-- Toggle buttons -->
			<div class="flex p-[6px] gap-[6px] rounded-[10px] bg-[#28112E]">
				<button
					class="p-[10px] text-[#A99FAC] text-[16px] font-Gilroy-SemiBold rounded-[6px]"
					class:active={active_tab == 'main'}
					on:click={() => (active_tab = 'main')}
				>
					{$t('Rewards')}
				</button>
				<button
					class="p-[10px] text-[#A99FAC] text-[16px] font-Gilroy-SemiBold rounded-[6px]"
					class:active={active_tab == 'history'}
					on:click={() => (active_tab = 'history')}
				>
					{$t('Earning History')}
				</button>
			</div>
		</div>
		{#if active_tab == 'main'}
			<Exclusive {REWARDS} {GENERAL_REWARDS} />
		{/if}
		{#if active_tab == 'history'}
			<div class="overflow-x-scroll lg:overflow-x-auto">
				<div class="w-[740px] lg:w-full py-4 px-[24px] bg-[#28112E] flex justify-between">
					<div class="flex gap-5 w-56">
						<span class="text-[#68566E]">#</span>
						<span class="text-[#68566E]">{$t('Name')}</span>
					</div>
					<div class="flex gap-20 w-[250px]">
						<span class="text-[#68566E] w-[95px]">{$t('Date')}</span>
						<span class="text-[#68566E]">{$t('Time')}</span>
					</div>
					<span class="text-[#68566E] w-[59px]">{$t('Rewards')}</span>
				</div>
				<div class="w-[740px] lg:w-full border-b-[1px] border-[#311C38]">
					{#if loading}
						loading
					{:else}
						{#each makeHistory(xp_logs) as log, i}
							<div
								class="px-[26px] text-[#BEB6C0] border-t-[1px] border-[#311C38] border-dashed flex items-center justify-between py-3"
							>
								<div class="flex gap-5 w-56">
									<span>{i + 1}</span>
									<span>{xpLogToTitle(log)}</span>
								</div>
								<div class="flex gap-20 w-[250px]">
									<span class="w-[95px]">{formatDate(log.created)}</span>
									<span>{formatTime(log.created)}</span>
								</div>
								<span class="flex justify-end text-[#FDEB56] w-[59px]">{log.xp} XP</span>
							</div>
						{/each}
					{/if}
				</div>
			</div>
			<div class="flex justify-between px-[26px] py-4">
				<span class="text-[#68566E]">{$t('Total Result')}: {total_items}</span>
				<div class="flex items-center">
					{#if current_page > 1}
						<button on:click={() => fetch_xp_logs(current_page - 1)}>
							<img
								src={LeftArrow}
								alt="left arrow"
								class="hover:bg-accent-yellow-10 cursor-pointer p-2 rounded {$locale === 'ar'
									? 'rotate-180'
									: ''}"
							/>
						</button>
					{:else}
						<button>
							<img src={LeftArrow} alt="left arrow" class={$locale === 'ar' ? 'rotate-180' : ''} />
						</button>
					{/if}

					<div class="flex gap-2 mx-2">
						{#each { length: totalPages } as _, i}
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span
								on:click={() => fetch_xp_logs(i + 1)}
								class="px-2 h-6 cursor-pointer rounded hover:bg-accent-yellow-10 {current_page ==
								i + 1
									? 'bg-accent-yellow-10'
									: ''}">{i + 1}</span
							>
						{/each}
					</div>

					{#if current_page < totalPages}
						<button on:click={() => fetch_xp_logs(current_page + 1)}>
							<img
								src={RightArrow}
								alt="left arrow"
								class="hover:bg-accent-yellow-10 cursor-pointer p-2 rounded {$locale === 'ar'
									? 'rotate-180'
									: ''}"
							/>
						</button>
					{:else}
						<button>
							<img src={LeftArrow} alt="left arrow" class={$locale === 'ar' ? 'rotate-180' : ''} />
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	button.active {
		color: #e9e6ea;
		background: #ffffff33;
	}
	.xp-card {
		color: white;
		border-color: #3d2644;
		border-width: 1px;
		background-color: #200b26;
		min-height: 50px;
		width: 100%;
		border-radius: 12px;
	}
	.heading {
		font-family: 'Gilroy-SemiBold';
		font-weight: 400;
		font-size: 24px;
		line-height: 30px;
	}
</style>
