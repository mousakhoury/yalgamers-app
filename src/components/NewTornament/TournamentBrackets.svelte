<script>
	import FinalBracket from './BracketsElements/FinalBracket.svelte';
	import KnockoutBracket from './BracketsElements/KnockoutBracket.svelte';
	import QuarterFinalBracket from './BracketsElements/QuarterFinalBracket.svelte';
	import RoundOfBracket from './BracketsElements/RoundOfBracket.svelte';
	import SemiFinalBracket from './BracketsElements/SemiFinalBracket.svelte';

	export let brackets = [];
	let data = groupBy(brackets, 'label');
	function groupBy(array, keyOrIterator) {
		let iterator, key;

		// use the function passed in, or create one
		if (typeof key !== 'function') {
			key = String(keyOrIterator);
			iterator = function (item) {
				return item[key];
			};
		} else {
			iterator = keyOrIterator;
		}

		return array.reduce(function (memo, item) {
			let key = iterator(item);
			memo[key] = memo[key] || [];
			memo[key].push(item);
			return memo;
		}, {});
	}
</script>

<div class="w-full overflow-x-scroll block md:flex items-center justify-center">
	<div
		class="flex items-center justify-center w-[1378.4px] md:w-[92.016vw] 2xl:w-[1378.4px] h-[730px] md:h-[48.732vw] 2xl:h-[730px] relative"
	>
		{#if data['Round Of Matches']}
			<RoundOfBracket
				type="left"
				roundOf32={data['Round Of Matches'].slice(0, data['Round Of Matches'].length / 2)}
			/>
		{/if}

		{#if data['Knockout Matches']}
			<KnockoutBracket
				parentExist={data['Round of Matches']}
				type="left"
				knockout={data['Knockout Matches'].slice(0, data['Knockout Matches'].length / 2)}
			/>
		{/if}

		{#if data['Quarter Finals']}
			<QuarterFinalBracket
				parentExist={data['Knockout Matches']}
				type="left"
				quarterFinal={data['Quarter Finals'].slice(0, data['Quarter Finals'].length / 2)}
			/>
		{/if}

		{#if data['Semi Final']}
			<SemiFinalBracket
				parentExist={data['Quarter Finals']}
				type="left"
				semiFinal={data['Semi Final'].slice(0, data['Semi Final'].length / 2)}
			/>
		{/if}

		{#if data['The Final']}
			<FinalBracket finalArray={data['The Final']} parentExist={data['Semi Final']} />
		{/if}

		{#if data['Semi Final']}
			<SemiFinalBracket
				parentExist={data['Quarter Finals']}
				type="right"
				semiFinal={data['Semi Final'].slice(data['Semi Final'].length / 2)}
			/>
		{/if}

		{#if data['Quarter Finals']}
			<QuarterFinalBracket
				parentExist={data['Knockout Matches']}
				type="right"
				quarterFinal={data['Quarter Finals'].slice(data['Quarter Finals'].length / 2)}
			/>
		{/if}

		{#if data['Knockout Matches']}
			<KnockoutBracket
				parentExist={data['Round of Matches']}
				type="right"
				knockout={data['Knockout Matches'].slice(data['Knockout Matches'].length / 2)}
			/>
		{/if}

		{#if data['Round Of Matches']}
			<RoundOfBracket
				type="right"
				roundOf32={data['Round Of Matches'].slice(data['Round Of Matches'].length / 2)}
			/>
		{/if}
	</div>
</div>
