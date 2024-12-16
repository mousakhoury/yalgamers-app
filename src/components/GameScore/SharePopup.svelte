<script>
	import BgPattern from '$lib/assets/game-score/bg_pattern.svg';
	import QrFrame from '$lib/assets/game-score/qr_frame.svg';
	import { levels, findLevel } from '$lib/stores/profileLevels';
	import { score, steam_data } from '$lib/stores/steamscore.js';
	import x from '$lib/assets/game-score/x.svg';
	import x_hover from '$lib/assets/game-score/x_hover.svg';
	import fb from '$lib/assets/game-score/fb.svg';
	import fb_hover from '$lib/assets/game-score/fb_hover.svg';
	import tg from '$lib/assets/game-score/tg.svg';
	import tg_hover from '$lib/assets/game-score/tg_hover.svg';
	import mail from '$lib/assets/game-score/mail.svg';
	import mail_hover from '$lib/assets/game-score/mail_hover.svg';
	import tiktok from '$lib/assets/game-score/tiktok.svg';
	import insta from '$lib/assets/game-score/insta.svg';
	import insta_hover from '$lib/assets/game-score/insta_hover.svg';
	import tiktok_hover from '$lib/assets/game-score/tiktok_hover.svg';
	import copy from '$lib/assets/game-score/copy.svg';
	import check from '$lib/assets/game-score/checkmark-circle.svg';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import html2canvas from 'html2canvas';
	import { twitter, facebook, email, telegram, whatsapp } from '$lib/sharelink';
	import { onMount } from 'svelte';

	export let linkSharing = false;
	let clicked = false;
	$: currentLevel = findLevel($score);
	$: sharelink = `${$page.url.origin}/gamer-score/${$page.data.profile.id}`;

	$: links = [];

	function btnclicked() {
		navigator.clipboard.writeText(sharelink);
		clicked = true;
		setTimeout(() => {
			clicked = false;
		}, 2000);
	}

	onMount(() => {
		setTimeout(() => {
			saveImg();
		}, 500);

		if (sharelink) {
			links = [
				{
					icon: x,
					hover: x_hover,
					url: twitter(sharelink)
				},
				// {
				// 	icon: insta,
				// 	hover: insta_hover,
				// 	url: twitter(sharelink)
				// },
				{
					icon: fb,
					hover: fb_hover,
					url: facebook(sharelink)
				},
				{
					icon: mail,
					hover: mail_hover,
					url: email(sharelink)
				},
				// {
				// 	icon: tiktok,
				// 	hover: tiktok_hover,
				// 	url: sharelink
				// },
				{
					icon: tg,
					hover: tg_hover,
					url: telegram(sharelink)
				}
			];
		}
	});

	async function saveImg() {
		const element = document.getElementById('html2canvas'); // Remove the #
		if (element) {
			const form = new FormData();

			// Generate the canvas
			const canvas = await html2canvas(element);
			// Convert canvas to Blob
			canvas.toBlob((blob) => {
				if (blob) {
					// Append the Blob to FormData
					form.append('img', blob, 'screenshot.png');
					form.append('id', $steam_data.id);

					// Log FormData entries
					for (let pair of form.entries()) {
						console.log(pair[0] + ':', pair[1]); // Check FormData content
					}

					// Send the FormData to the server (example)
					fetch('/api/steam/save-img', {
						method: 'POST',
						body: form
					})
						.then((response) => console.log('Upload successful:', response))
						.catch((error) => console.error('Error uploading:', error));
				} else {
					console.error('Failed to convert canvas to Blob');
				}
			}, 'image/png');
		} else {
			console.error('Element with ID "html2canvas" not found.');
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => (linkSharing = false)}
	class="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-[#0e0511b3] px-[16px] z-[51]"
>
	<div
		on:click|stopPropagation
		class="w-full max-w-[640px] p-[20px] lg:p-[24px] rounded-[12px] border border-[#BC5AD7] bg-[#200B26] text-white z-[52]"
	>
		<h1>
			Yalgamer Steam Score https://yalgamers.gg/gamer-score #yalgamers #community #game
			@yalgamers_gg
		</h1>

		<div
			id="html2canvas"
			class="rounded-lg mt-4 bg-no-repeat bg-cover p-2 bg-[#200B26]"
			style="background-image: url({BgPattern})"
		>
			<div class="flex items-center px-4 gap-10">
				<div class="space-y-2">
					<h1 class="text-[#22F937] text-sm lg:text-xl mb-3">My score across gaming platforms</h1>
					<h2 class="text-sm">Scan Result: <span class="text-[#FDEB56]">{$score}</span></h2>
					<h2 class="text-sm">
						Rank: <span class="text-[#8EC9ED]">{$levels[currentLevel].title}</span>
					</h2>
					<hr style="border: 0.56px solid #FFFFFF26" class="w-full" />
					<h2 class="text-white">About Yourself</h2>
					<p class="text-xs md:text-sm text-white-80">
						You're like an apprentice wizard—brimming with potential, casting some cool spells, but
						often disappearing from the scoreboard like a puff of smoke! Keep practicing, and you
						might just unlock your ultimate form!
					</p>
				</div>
				<div class="rounded-lg bg-[#5E4E63] w-96 grid place-content-center p-4">
					<img src={$levels[currentLevel].img} alt="badge" class="w-32" />
				</div>
			</div>

			<img src={QrFrame} alt="frame" class="rounded-lg mt-4 w-full mb-2" />
		</div>

		<div>
			<h1 class="text-xl text-white mt-3 mb-1">Share</h1>

			<div class="lg:flex justify-between items-center">
				<div class="flex justify-between lg:gap-3">
					{#each links as link}
						<a href={link.url} target="_blank">
							<img class="default-icon" src={link.icon} alt="icon" />
							<img class="hover-icon" src={link.hover} alt="hover icon" />
						</a>
					{/each}
				</div>

				<button
					on:click={btnclicked}
					class="rounded-md py-3 {clicked
						? 'bg-[#1F2628] text-[#1FD031]'
						: 'bg-[#8EC9ED1A] text-[#8EC9EDCC]'} mt-4 lg:mt-0 w-full lg:w-1/4"
				>
					{#if clicked}
						<span in:fly={{ x: 10, duration: 300 }} class="flex items-center gap-2 justify-center">
							<img src={check} alt="check icon" class="w-4 h-4" /> Link Copied
						</span>
					{:else}
						<span in:fly={{ x: -10, duration: 300 }} class="flex items-center gap-2 justify-center">
							<img src={copy} alt="copy icon" class="w-4 h-4" /> Copy Link
						</span>
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	a {
		position: relative;
		display: inline-block;
	}

	.default-icon {
		display: block;
		transition: opacity 0.3s ease-in-out;
	}

	.hover-icon {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	a:hover .default-icon {
		opacity: 0;
	}

	a:hover .hover-icon {
		opacity: 1;
	}

	@media (max-width: 768px) {
		.default-icon {
			display: none;
		}

		.hover-icon {
			position: static; /* No overlap */
			opacity: 1; /* Always visible */
		}
	}
</style>
