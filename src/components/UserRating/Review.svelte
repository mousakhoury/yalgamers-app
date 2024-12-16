<script>
	import ratingStar from '$lib/assets/rating-star.svg';
	import like from '$lib/assets/like-arrow.svg';
	import dislike from '$lib/assets/dislike-arrow.svg';
	import likegreen from '$lib/assets/like_green_arrow.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let id = '';
	export let name;
	export let image;
	export let date;
	export let games_rated;
	export let stars;
	export let likes = 0;
	export let dislikes = 0;
	export let text;
	export let mylike = false;
	export let mydislike = false;

	// Function to decide whether to use 'game' or 'games'
	function gameOrGames(numberOfGames) {
		return numberOfGames === 1 ? 'game' : 'games';
	}

	// Function to add a leading zero if the number is a single digit
	function addLeadingZero(number) {
		return number < 10 ? `0${number}` : number;
	}

	async function like_fn() {
		if (await mark_like_dislike_review('like')) {
			if (mylike) {
				mylike = false;
				likes -= 1;
			} else {
				mylike = true;
				likes += 1;
				if (mydislike) {
					mydislike = false;
					dislikes -= 1;
				}
			}
		}
	}

	async function dislike_fn() {
		if (await mark_like_dislike_review('dislike')) {
			if (mydislike) {
				mydislike = false;
				dislikes -= 1;
			} else {
				mydislike = true;
				dislikes += 1;
				if (mylike) {
					mylike = false;
					likes -= 1;
				}
			}
		}
	}
	onMount(() => {});

	async function mark_like_dislike_review(action) {
		let url = '';
		if ($page.url.pathname.includes('games')) {
			url = `/api/review/like-dislike/${id}`;
		} else {
			url = `/api/tutorial/review/like-dislike/${id}`;
		}
		let res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				like: mylike,
				dislike: mydislike,
				action
			})
		});
		res = await res.json();
		return res.ok;
	}
</script>

<div class="flex flex-col items-start gap-[20px] p-[16px] w-full rounded-[12px] bg-[#230C2A]">
	<div class="flex items-center justify-between w-full gap-[20px]">
		<div class="flex items-center gap-[15px]">
			<img src={image} alt="" class="w-[48px] h-[48px] object-cover rounded-full" />
			<div class="flex flex-col items-start gap-[4px]">
				<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">{name}</p>
				<p class="text-[#E9E6EA]">{stars}</p>
			</div>
		</div>
	</div>
	<p class="text-[#948798] text-[14px] font-Gilroy-Medium">{text}</p>
	<hr class="w-full border-[#FFFFFF0D]" />
	<div class="flex items-center justify-between w-full gap-[20px]">
		<div class="flex items-center gap-[12px]">
			<button
				on:click={like_fn}
				class="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[100px] border {mylike
					? 'border-green text-green'
					: 'border-[#FFFFFF0D] text-[#E9E6EA]'}"
			>
				{#if mylike}
					<img src={likegreen} alt="" />
				{:else}
					<img src={like} alt="" />
				{/if}
				{#if likes > 0}
					{likes}
				{/if}
			</button>
			<button
				on:click={dislike_fn}
				class="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[100px] text-[#E9E6EA] border {mydislike
					? 'border-green text-green'
					: 'border-[#FFFFFF0D] text-[#E9E6EA]'}"
			>
				{#if mydislike}
					<img src={likegreen} alt="" class="rotate-180" />
				{:else}
					<img src={dislike} alt="" />
				{/if}
				{#if dislikes > 0}
					{dislikes}
				{/if}
			</button>
		</div>
	</div>
</div>
