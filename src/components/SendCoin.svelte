<script>
	import { toast } from '@zerodevx/svelte-toast';
	import SelectOption from './SelectOption.svelte';
	import LoginInput from './NewLogin/LoginInput.svelte';

	export let openSend = false;

	let address = '';
	let amount = '';
	let coin = '';
	let network = '';
	let loading = false;

	// Computed property to check if the form is valid
	$: isFormValid = address.trim() && amount.trim() && coin.trim() && network.trim();

	async function sendCoin() {
		loading = true;
		try {
			let res = await fetch('/api/web3/transfer-coin', {
				method: 'POST',
				body: JSON.stringify({
					address,
					amount,
					coin,
					network
				})
			});
			res = await res.json();
			if (res.success) {
				successToast(res.message);
				console.log(res);
			} else {
				errorToast(res.message);
				res;
			}
		} catch (error) {}
		loading = false;
	}

	function successToast(text) {
		toast.push(text, {
			pausable: true,
			theme: {
				'--toastColor': 'mintcream',
				'--toastBackground': 'rgba(72,187,120,0.9)',
				'--toastBarBackground': '#2F855A'
			}
		});
	}

	function errorToast(text) {
		toast.push(text, {
			theme: {
				'--toastColor': 'mistyrose',
				'--toastBackground': 'rgba(255, 99, 71, 0.3)',
				'--toastBarBackground': '#C53030'
			}
		});
	}
</script>

<button
	on:click={() => (openSend = false)}
	class="fixed top-0 left-0 w-full h-screen bg-[#140718b3] z-[60]"
/>
<div
	class="flex flex-col items-start gap-[32px] p-[16px] lg:p-[20px] rounded-[12px] border border-[#8EC9ED1A] bg-[#29152F] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[343px] lg:max-w-[444px] z-[70]"
>
	<div class="flex flex-col items-start gap-[24px] w-full">
		<div class="flex flex-col items-start gap-[8px] w-full">
			<p class="text-[#FFFFFFE5] text-[20px] font-Gilroy-SemiBold">Send</p>
			<div class="flex flex-col items-start gap-[4px]">
				<p class="text-[#FFFFFF99] text-[12px] text-start font-Gilroy-Medium">
					Ensure you are transferring your funds to the correct wallet address and using the
					appropriate network for the transaction.
				</p>
				<p class="text-[#F71756] text-[11px] font-Gilroy">
					*If lost, Yalgamers will be not responsible for that.
				</p>
			</div>
		</div>
		<div class="flex flex-col items-start gap-[28px] w-full">
			<div class="flex flex-col items-start gap-[20px] w-full">
				<SelectOption label="Select Coin" bind:value={coin} options={['USDT', 'POL']} />
				<SelectOption label="Select Network" bind:value={network} options={['Polygon']} />
				<LoginInput label="Wallet Address" name="address" type="text" bind:value={address} />
				<LoginInput label="Amount" name="amount" type="amount" bind:value={amount} />
			</div>
			<hr class="w-full border-[#FFFFFF0D]" />
			<div class="flex flex-col items-start gap-[16px] w-full">
				<div class="flex items-center justify-between w-full">
					<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy-Medium">Network Fee</p>
					<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium">~ 0.002 POL</p>
				</div>
				<div class="flex items-center justify-between w-full">
					<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy-Medium">Receive Amount</p>
					<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium">{amount} {coin}</p>
				</div>
			</div>
		</div>
	</div>
	<button
		class="w-full h-[50px] rounded-[8px] bg-gradient group"
		disabled={!isFormValid || loading}
		on:click={sendCoin}
	>
		<p class="text-[#2F1A11] text-[16px] font-Gilroy-SemiBold group-disabled:text-[#FFFFFF26]">
			{#if loading}
				{@html `<div
					class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status">
					<span
					  class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					  >Loading...</span
					>
				  </div>`}
			{:else}
				Send
			{/if}
		</p>
	</button>
</div>

<style>
	.bg-gradient {
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
	}

	.bg-gradient:disabled {
		background: #ffffff26;
	}
</style>
