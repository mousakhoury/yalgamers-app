<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import BigCheck from '$lib/assets/main-quest/big-check.svg';
	import Failed from '$lib/assets/failed.svg';
	import { invalidateAll } from '$app/navigation';

	let code = '';
	let loading = false;
	let showModal = false;
	let success = false;
	let msg = '';

	async function markRadeem() {
		loading = true;
		let res = await fetch(`/api/radeem-code?code=${code}`);
		res = await res.json();
		msg = res.msg;
		success = res.success;
		if (success) {
			invalidateAll();
		}
		loading = false;
		showModal = true;
	}
</script>

<div
	class="flex flex-col items-center justify-center gap-[14px] lg:gap-[20px] px-[10px] lg:px-[20px] py-[16px] lg:py-[24px] w-full rounded-[12px] redeem"
>
	<p
		class="text-white text-[20px] lg:text-[32px] text-center font-Gilroy-Bold leading-[25px] lg:leading-[40px]"
	>
		{$t('Redeem Your Reward Code')}
	</p>

	<label
		class="flex items-center justify-between p-[5px] rounded-[10px] border border-[#fdeb5626] bg-[#2C1334] w-full max-w-[700px] {$locale ===
		'ar'
			? 'pr-[14px] lg:pr-[18px]'
			: 'pl-[14px] lg:pl-[18px]'}"
	>
		<input
			bind:value={code}
			type="text"
			placeholder={$t('Enter Your Code')}
			class="bg-transparent text-[14px] lg:text-[16px] text-white leading-[17px] lg:leading-[19px] redeem-input"
		/>

		<button
			on:click={markRadeem}
			class="px-[18px] lg:px-[28px] py-[12px] rounded-[8px] {code == ''
				? 'bg-[#ffffff1a] text-[#FFFFFF66] '
				: 'bg-[#FDEB56] box-shadow text-[#2A0D32] '} "
			disabled={code == ''}
		>
			<p class="text-[14px] lg:text-[18px] font-Gilroy-SemiBold leading-[17px] lg:leading-[22px]">
				{loading ? '...' : $t('Redeem Code')}
			</p>
		</button>
	</label>
</div>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (showModal = false)}
		class="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-[#0e0511e6] z-[51]"
	>
		<div
			class="flex flex-col items-center justify-center gap-[40px] md:gap-[57px] p-[16px] md:p-[20px] pt-[40px] md:pt-[57px] w-full max-w-[343px] md:max-w-[420px] rounded-[12px] md:rounded-[16px] border border-[#3D2644] bg-[#200B26]"
		>
			<div
				class="flex flex-col items-center justify-center gap-[24px] w-full max-w-[198px] md:max-w-[290px]"
			>
				{#if success}
					<img src={BigCheck} alt="" class="w-[120px] md:w-[140px]" />
				{:else}
					<img src={Failed} alt="" class="w-[120px] md:w-[140px]" />
				{/if}
				<div class="flex flex-col items-center justify-center gap-[6px] md:gap-[10px]">
					<p class="text-[#FFF] text-[24] md:text-[28px] text-center font-Gilroy-SemiBold">
						{$t(msg)}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.redeem {
		background-image: url('$lib/assets/rewards/redeem-background.svg');
		background-position: center;
		background-size: cover;
	}

	.redeem-input {
		border: 0 !important;
		box-shadow: 0 !important;
		outline: 0 !important;
	}

	@media (max-width: 1024px) {
		.redeem {
			background-image: url('$lib/assets/rewards/redeem-background-mobile.svg');
		}
	}
</style>
