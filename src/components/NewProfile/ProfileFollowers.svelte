<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import following from '$lib/assets/profile/following.svg';
	import followers from '$lib/assets/profile/followers.svg';
	import FollowersArrow from '$lib/assets/profile/followers-arrow.svg';
	import FollowersArrowHover from '$lib/assets/profile/followers-arrow-hover.svg';
	import ProfileShowUsers from './ProfileShowUsers.svelte';
	import { onMount } from 'svelte';

	let showFollowing = false;
	let showFollowers = false;

	onMount(async () => {
		await fetch_data();
	});

	$: myFollowings = [];
	$: myFollowers = [];

	async function fetch_data() {
		let res = await fetch(`/api/get-followers`);
		res = await res.json();
		// @ts-ignore
		myFollowers = res.myFollowers;
		// @ts-ignore
		myFollowings = res.following;
	}

	function unfollow(id) {
		myFollowings = myFollowings.filter((f) => f.id != id);
	}
</script>

<div class="flex flex-col lg:flex-row items-center gap-[12px] lg:gap-[20px] w-full lg:w-fit">
	<button
		on:click={() => {
			showFollowing = true;
		}}
		class="flex items-center gap-[10px] p-[6px] rounded-[6px] border border-[#432C4A] bg-[#2C1334] hover:bg-[#341C3C] w-full lg:w-fit group {$locale ===
		'ar'
			? 'pl-[12px]'
			: 'pr-[12px]'}"
	>
		<img src={following} alt="" class="w-[44px]" />
		<div class="flex flex-col items-start gap-[4px]">
			<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-SemiBold leading-[19px]">
				{myFollowings.length}
				{$t('Following')}
			</p>
			<div class="flex items-center gap-[2px]">
				<p
					class="text-[#FFFFFF66] text-[14px] font-Gilroy group-hover:text-[#FDEB56] leading-[16.8px]"
				>
					{$t('See Them')}
				</p>
				<img
					src={FollowersArrow}
					alt=""
					class="w-[12px] group-hover:hidden {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
				<img
					src={FollowersArrowHover}
					alt=""
					class="w-[12px] hidden group-hover:block {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
			</div>
		</div>
	</button>
	<button
		on:click={() => {
			showFollowers = true;
		}}
		class="flex items-center gap-[10px] p-[6px] rounded-[6px] border border-[#432C4A] bg-[#2C1334] hover:bg-[#341C3C] w-full lg:w-fit group {$locale ===
		'ar'
			? 'pl-[12px]'
			: 'pr-[12px]'}"
	>
		<img src={followers} alt="" class="w-[44px]" />
		<div class="flex flex-col items-start gap-[4px]">
			<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-SemiBold leading-[19px]">
				{myFollowers.length}
				{$t('Followers')}
			</p>
			<div class="flex items-center gap-[2px]">
				<p
					class="text-[#FFFFFF66] text-[14px] font-Gilroy group-hover:text-[#FDEB56] leading-[16.8px]"
				>
					{$t('See Them')}
				</p>
				<img
					src={FollowersArrow}
					alt=""
					class="w-[12px] group-hover:hidden {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
				<img
					src={FollowersArrowHover}
					alt=""
					class="w-[12px] hidden group-hover:block {$locale === 'ar' ? 'rotate-180' : ''}"
				/>
			</div>
		</div>
	</button>
</div>

{#if showFollowing}
	<ProfileShowUsers
		label={$t('My Followings')}
		type="followings"
		bind:boolean={showFollowing}
		items={myFollowings}
		unfollow={(id) => unfollow(id)}
	/>
{/if}

{#if showFollowers}
	<ProfileShowUsers
		label={$t('My Followers')}
		type="followers"
		bind:boolean={showFollowers}
		items={myFollowers}
	/>
{/if}
