<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import { onMount } from 'svelte';
	import Claimed from '$lib/assets/rewards/claimed.svg';
	import { invalidateAll } from '$app/navigation';
	import { spinStore } from '$lib/stores/spinStore';

	export let weekly_spin = {};

	$: dailySpins = [
		{
			title: $locale === 'ar' ? 'اليوم الأول' : 'day 1',
			spin: 1,
			isClaimed: false,
			day: 1,
			date: '15-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم الثاني' : 'day 2',
			spin: 2,
			isClaimed: false,
			day: 2,
			date: '16-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم الثلث' : 'day 3',
			spin: 3,
			isClaimed: false,
			day: 3,
			date: '17-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم الرابع' : 'day 4',
			spin: 4,
			isClaimed: false,
			day: 4,
			date: '18-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم الخامس' : 'day 5',
			spin: 5,
			isClaimed: false,
			day: 5,
			date: '19-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم السادس' : 'day 6',
			spin: 6,
			isClaimed: false,
			day: 6,
			date: '20-7-2024'
		},
		{
			title: $locale === 'ar' ? 'اليوم السابع' : 'day 7',
			spin: 7,
			isClaimed: false,
			day: 7,
			date: '21-7-2024'
		}
	];

	// Function to format date in dd-mm-yyyy format
	function formatDate(date) {
		const d = date.getDate();
		const m = date.getMonth() + 1; // Months are zero-based
		const y = date.getFullYear();
		return `${d}-${m}-${y}`;
	}

	// Get today's date
	const today = formatDate(new Date());

	// Add isToday property
	$: dailySpins = dailySpins.map((spin) => ({
		...spin,
		isToday: spin.day == weekly_spin.day
	}));

	let isDown = false;
	let startX;
	let scrollLeft;

	function mouseDownHandler(e) {
		isDown = true;
		startX = e.pageX - e.currentTarget.offsetLeft;
		scrollLeft = e.currentTarget.scrollLeft;
	}

	function mouseLeaveHandler() {
		isDown = false;
	}

	function mouseUpHandler() {
		isDown = false;
	}

	function mouseMoveHandler(e) {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - e.currentTarget.offsetLeft;
		const walk = (x - startX) * 2; // The multiplier can be adjusted for faster/slower scrolling
		e.currentTarget.scrollLeft = scrollLeft - walk;
	}

	function centerSpin() {
		const container = document.querySelector('.overflow-x-scroll');
		const todaySpin = document.querySelector('.today-spin');

		const firstUnclaimedPassedDay = dailySpins.find((spin) => {
			const [day, month, year] = spin.date.split('-').map(Number);
			const spinDate = new Date(year, month - 1, day);
			return spinDate < new Date() && !spin.isClaimed;
		});

		let targetElement;

		if (firstUnclaimedPassedDay) {
			const passedSpinIndex = dailySpins.indexOf(firstUnclaimedPassedDay);
			targetElement = container.children[passedSpinIndex];
		} else {
			targetElement = todaySpin;
		}

		if (container && targetElement) {
			const containerWidth = container.offsetWidth;
			const targetWidth = targetElement.offsetWidth;
			const targetOffsetLeft = targetElement.offsetLeft;
			const scrollPosition = targetOffsetLeft - containerWidth / 2 + targetWidth / 2;
			container.scrollLeft = scrollPosition;
		}
	}

	onMount(() => {
		centerSpin();
		ClaimedByDay();
	});

	function ClaimedByDay() {
		let x = [];
		dailySpins.forEach((e) => {
			let obj = {
				title: e.title,
				spin: e.spin,
				day: e.day,
				date: e.date,
				isClaimed: false
			};
			if (e.day < weekly_spin.day) {
				obj.isClaimed = true;
			} else if (e.day == weekly_spin.day) {
				obj.isClaimed = weekly_spin.isClaimed;
				obj.id = weekly_spin.id;
			}
			x.push(obj);
		});

		dailySpins = x;
	}

	function isPastAndUnclaimed(spin) {
		const [day, month, year] = spin.date.split('-').map(Number);
		const spinDate = new Date(year, month - 1, day);
		return spinDate < new Date() && !spin.isClaimed;
	}

	async function claim() {
		const item = dailySpins.find((f) => f.isToday);
		let res = await fetch(`/api/claim-spin`, {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'content-type': 'application/json'
			}
		});
		res = await res.json();
		if (res.ok) {
			spinStore.set(item.spin);
			let copy = dailySpins;
			const index = dailySpins.findIndex((f) => f.isToday);
			copy[index].isClaimed = true;
			dailySpins = copy;
			invalidateAll();
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="flex items-center gap-[12px] w-full overflow-x-scroll p-[2px] px-3 pb-5"
	on:mousedown={mouseDownHandler}
	on:mouseleave={mouseLeaveHandler}
	on:mouseup={mouseUpHandler}
	on:mousemove={mouseMoveHandler}
>
	{#each dailySpins as spin}
		<div class="relative z-10 {spin.isToday ? 'today-spin claim' : ''}">
			<div
				class="flex flex-col items-start gap-[12px] p-[12px] rounded-[8px] bg-[#2b1731] w-[140px] h-[110px] relative"
			>
				<div class="flex flex-col items-start gap-[5px]">
					<p class="text-[#FFFFFF80] text-[14px] font-Gilroy leading-[17px]">
						{spin.title}
					</p>
					<p class="text-[#FFFFFFE5] text-[18px] font-Gilroy-SemiBold leading-[22px]">
						{#if $locale === 'ar'}
							{spin.spin} دورة
						{:else}
							{spin.spin} Spin{spin.spin > 1 ? 's' : ''}
						{/if}
					</p>
				</div>

				{#if spin.isClaimed}
					<button
						disabled
						class="flex items-center justify-center gap-[4px] py-[5px] w-full rounded-[6px] border border-[#1fd0310d] bg-[#1fd0311a]"
					>
						<img src={Claimed} alt="" class="w-[16px]" />
						<p class="text-[#1FD031] text-[16px] font-Gilroy-SemiBold leading-[20px]">
							{$locale === 'ar' ? 'تم الحصول' : 'Claimed'}
						</p>
					</button>
				{:else if spin.isToday}
					<button
						on:click={claim}
						class="py-[5px] w-full rounded-[6px] border border-[#fdeb564d] bg-[#FDEB56]"
					>
						<p class="text-[#2D290E] text-[16px] font-Gilroy-SemiBold leading-[20px]">
							{$locale === 'ar' ? 'مطالبة' : 'Claim'}
						</p>
					</button>
				{:else}
					<button
						disabled
						class="py-[5px] w-full rounded-[6px] border border-[#ffffff0d] bg-[#ffffff0d]"
					>
						<p class="text-[#FFFFFFB2] text-[16px] font-Gilroy-SemiBold leading-[20px]">
							{$locale === 'ar' ? 'القادمة' : 'Upcoming'}
						</p>
					</button>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.claim::before {
		width: calc(100% + 2px);
		height: calc(100% + 4px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 9px;
		background: linear-gradient(180deg, #695535 0%, rgba(255, 255, 255, 0) 100%);
	}

	.overflow-x-scroll::-webkit-scrollbar {
		height: 0px;
	}

	.overflow-x-scroll {
		cursor: grab;
		user-select: none;
	}

	.overflow-x-scroll:active {
		cursor: grabbing;
	}
</style>
