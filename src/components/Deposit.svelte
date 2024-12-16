<script>
	import QRCodeIMG from '$lib/assets/header/qrcode.svg';
	import Copy from '$lib/assets/header/copy.svg';
	import { user } from '$lib/stores/user';
	import { shortenAddress } from '$lib/utils';
	import QRCode from 'qrcode';
	import { onMount } from 'svelte';

	export let openDeposit = false;

	onMount(() => {
		const qrcodeContainer = document.getElementById('qrcode');

		// Check if the element is correct
		if (!qrcodeContainer) {
			console.error('Element #qrcode not found');
			return;
		}

		// Generate the QR code in the container
		QRCode.toCanvas(qrcodeContainer, $user.custodial_wallet, {
			color: {
				dark: '#000000',
				light: '#ffffff'
			},
			width: 200
		}).catch((err) => console.error(err));
	});
</script>

<button
	on:click={() => (openDeposit = false)}
	class="fixed top-0 left-0 w-full h-screen bg-[#140718b3] z-[60]"
/>
<div
	class="flex flex-col items-center gap-[42px] p-[16px] lg:p-[20px] pb-[32px] rounded-[12px] border border-[#8EC9ED1A] bg-[#29152F] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[343px] lg:max-w-[444px] z-[70]"
>
	<div class="flex flex-col items-start gap-[8px] w-full">
		<p class="text-[#FFFFFFE5] text-[20px] font-Gilroy-SemiBold">Deposit</p>
		<div class="flex flex-col items-start gap-[4px] w-full">
			<p class="text-[#FFFFFF99] text-[14px] font-Gilroy-Medium">
				Please deposit only USDT or POL to this wallet address. Depositing any other assets may
				result in a loss of funds, which cannot be recovered.
			</p>
			<p class="text-[#F71756] text-[11px] font-Gilroy">
				*Yalgamers will be not responsible for that.
			</p>
		</div>
	</div>

	<canvas id="qrcode" class="qr-container p-[20px] aspect-square">{''}</canvas>

	<div
		class="flex items-center gap-[6px] pl-[12px] pr-[8px] pt-[5px] pb-[4px] rounded-full bg-[#FFFFFF1A]"
	>
		<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium">Wallet Address:</p>
		<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy">
			{#if $user && $user.custodial_wallet}
				{shortenAddress($user.custodial_wallet)}
			{/if}
		</p>
		<button
			on:click={() => {
				window.navigator.clipboard.writeText($user.custodial_wallet);
			}}
		>
			<img src={Copy} alt="" class="w-[16px]" />
		</button>
	</div>
</div>

<style>
	.qr-container {
		background-image: url('$lib/assets/header/qr-border.svg');
		background-position: center;
		background-size: cover;
	}
</style>
