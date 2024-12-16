<script>
	import { t } from '$lib/stores/i18n';
	import { page } from '$app/stores';

	export let usernameSubmitted = false;

	let isOpen = false;
	let username = '';
	let loading = false;

	async function saveUsername() {
		if (username == '') {
			return;
		}
		const tournament = $page.data.tournament.id;
		loading = true;

		let res = await fetch(`/api/tournament/${tournament}/save-username`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ in_game_username: username })
		});
		res = await res.json();

		if (res.ok) {
			usernameSubmitted = true;
			isOpen = false;
		}

		loading = false;
	}
</script>

<div
	class="flex items-center justify-between flex-wrap gap-[20px] w-full px-[20px] py-[16px] rounded-[4px] border border-[#D83EFF33] bg-[#301433]"
>
	<div class="flex flex-col items-start gap-[6px]">
		<p class="text-[#D4CFD6] text-[18px] font-Gilroy-SemiBold">
			{$t('NotFindingYourself')}
		</p>
		<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">
			{$t('SubmitYourUsername')}
		</p>
	</div>

	<button
		on:click={() => (isOpen = true)}
		class="px-[16px] py-[10px] rounded-[6px] bg-[#8EC9ED26] hover:bg-[#8EC9ED] group"
	>
		<p class="text-[#8EC9ED] text-[14px] font-Gilroy-Medium group-hover:text-[#1B262D]">
			{$t('SubmitUsername')}
		</p>
	</button>
</div>

{#if isOpen}
	<button
		on:click={() => (isOpen = false)}
		class="fixed top-0 left-0 w-full h-screen bg-[#140718CC] z-[60]"
	/>
	<div
		class="flex flex-col items-start gap-[32px] max-w-[480px] w-full fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[20px] rounded-[12px] border border-[#FDEB5633] bg-[#271228] z-[61]"
	>
		<div class="flex flex-col items-start gap-[24px]">
			<div class="flex flex-col items-start gap-[8px]">
				<p class="text-[#D4CFD6] text-[18px] font-Gilroy-SemiBold">{$t('EnterUsername')}</p>
				<p class="text-[#7E6E83] text-[12px] font-Gilroy">
					{$t('ToDisplayYourRank')}
				</p>
			</div>
			<input
				bind:value={username}
				type="text"
				placeholder="Enter your username..."
				class="px-[16px] py-[13px] w-full outline-none border-[#FFFFFF08] bg-[#2D192E] text-[#D4CFD6] text-[14px]"
			/>
		</div>

		<button
			on:click={saveUsername}
			class="px-[16px] py-[13px] w-full rounded-[6px] bg-[#8EC9ED] hover:bg-[#8EC9ED26] group"
		>
			<p class="text-[#1B262D] text-[16px] font-Gilroy-Medium group-hover:text-[#8EC9ED]">
				{@html loading
					? `<div
				class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status">
				<span
				  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
				  >Loading...</span
				>
			  </div>`
					: $t('submit')}
			</p>
		</button>
	</div>
{/if}
