<script>
	import Send from '$lib/assets/header/history-send.svg';
	import Receive from '$lib/assets/header/history-receive.svg';
	import NFT from '$lib/assets/header/history-nft.svg';
	import Successful from '$lib/assets/header/successful.svg';
	import Unsuccessful from '$lib/assets/header/unsuccessful.svg';
	export let openHistory = false;
	let history = [
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'unsuccessful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'successful'
		},
		{
			title: 'NFT Received',
			nftName: 'OG',
			date: '12 December, 2024. 02 : 32pm',
			type: 'nft',
			status: 'successful'
		},
		{
			title: 'USDT Received',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'receive',
			status: 'successful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'unsuccessful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'successful'
		},
		{
			title: 'NFT Received',
			nftName: 'OG',
			date: '12 December, 2024. 02 : 32pm',
			type: 'nft',
			status: 'successful'
		},
		{
			title: 'USDT Received',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'receive',
			status: 'successful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'unsuccessful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'successful'
		},
		{
			title: 'NFT Received',
			nftName: 'OG',
			date: '12 December, 2024. 02 : 32pm',
			type: 'nft',
			status: 'successful'
		},
		{
			title: 'USDT Received',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'receive',
			status: 'successful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'unsuccessful'
		},
		{
			title: 'USDT Send',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'send',
			status: 'successful'
		},
		{
			title: 'NFT Received',
			nftName: 'OG',
			date: '12 December, 2024. 02 : 32pm',
			type: 'nft',
			status: 'successful'
		},
		{
			title: 'USDT Received',
			amount: '10',
			date: '12 December, 2024. 02 : 32pm',
			type: 'receive',
			status: 'successful'
		}
	];
</script>

<button
	on:click={() => (openHistory = false)}
	class="fixed top-0 left-0 w-full h-screen bg-[#140718b3] z-[60]"
/>
<div
	class="flex flex-col items-start gap-[20px] p-[16px] lg:p-[20px] rounded-[12px] border border-[#8EC9ED1A] bg-[#29152F] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[343px] lg:max-w-[444px] z-[70]"
>
	<p class="text-[#FFFFFFE5] text-[20px] font-Gilroy-SemiBold">Transaction History</p>
	<div class="flex flex-col items-start gap-[16px] w-full h-[435px] overflow-auto">
		{#each history as item}
			<div
				class="flex items-center justify-between w-full p-[12px] rounded-[10px] bg-[#FFFFFF08] shrink-0"
			>
				<div class="flex items-center gap-[12px]">
					<img
						src={item.type === 'send' ? Send : item.type === 'receive' ? Receive : NFT}
						alt=""
						class="w-[32px]"
					/>
					<div class="flex flex-col items-start gap-[4px]">
						<div class="flex items-center gap-[9px]">
							<p class="text-[#FFFFFFE5] text-[16px] font-Gilroy-SemiBold">{item.title}</p>
							<div class="flex items-center gap-[4px]">
								<img
									src={item.status === 'successful' ? Successful : Unsuccessful}
									alt=""
									class="w-[12px]"
								/>
								<p
									class="text-[11px] font-Gilroy-Medium capitalize {item.status === 'successful'
										? 'text-[#1FD031]'
										: 'text-[#F71756]'}"
								>
									{item.status}
								</p>
							</div>
						</div>
						<p class="text-[#FFFFFF66] text-[11px] font-Gilroy-Medium">{item.date}</p>
					</div>
				</div>

				<p
					class="text-[14px] font-Gilroy-Medium {item.type === 'send'
						? 'text-[#F71756]'
						: 'text-[#1FD031]'}"
				>
					{item.type === 'nft'
						? item.nftName
						: item.type === 'send'
						? `-${item.amount} USDT`
						: `+${item.amount} USDT`}
				</p>
			</div>
		{/each}
	</div>
</div>
