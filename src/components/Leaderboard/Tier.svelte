<script>
	import { t, locale } from '$lib/stores/i18n';

	import leaders from '$lib/assets/leaders-icon.svg';
	import nagivators from '$lib/assets/nagivators-icon.svg';
	import crossers from '$lib/assets/crossers-icon.svg';
	import Lead from './Lead.svelte';
	import supreme from '$lib/assets/supreme-champion.svg';
	import grand from '$lib/assets/grand-master.svg';
	import elite from '$lib/assets/elite-commander.svg';
	import legendary from '$lib/assets/legengary-hero.svg';
	import master from '$lib/assets/master-gurdian.svg';
	import verteran from '$lib/assets/verteran-voyager.svg';

	export let prize;

	let activeId = null;

	function handleLeadClick(id) {
		if (activeId === id) {
			activeId = null; // If the same lead is clicked, close it
		} else {
			activeId = id; // Open the clicked lead and close others
		}
	}
</script>

<div class="tier">
	<h1>{$t('Tier')}</h1>
	<div class="total-price">
		<p>{$t('Total Prize')}</p>
		<div class="price">{prize} <span>{$t('usd')}</span></div>
	</div>
	<Lead
		image={supreme}
		title="Supreme Champion"
		subtitle="Rank 1"
		newClass="supreme"
		content="The ultimate achiever, standing at the pinnacle."
		on:click={() => handleLeadClick(1)}
		isActive={activeId === 1}
	/>
	<Lead
		image={grand}
		title="Grand Master"
		subtitle="Rank 2"
		newClass="grand"
		content="Second only to the supreme champion, a mark of near-peak accomplishment."
		on:click={() => handleLeadClick(2)}
		isActive={activeId === 2}
	/>
	<Lead
		image={elite}
		title="Elite Commander"
		subtitle="Rank 3"
		newClass="elite"
		content="A title signifying distinguished skill and leadership."
		on:click={() => handleLeadClick(3)}
		isActive={activeId === 3}
	/>

	<Lead
		image={legendary}
		title="Legendary Heroes"
		subtitle="{$t('top')} 4 {$t('to')} 10"
		newClass="legendary"
		content="Reserved for those in the top ten, indicating remarkable achievements."
		on:click={() => handleLeadClick(4)}
		isActive={activeId === 4}
	/>
	<Lead
		image={master}
		title="Master Guardian"
		subtitle="{$t('top')} 11 {$t('to')} 50"
		newClass="master"
		content="A broad category recognizing the significant abilities of those within the top 100."
		on:click={() => handleLeadClick(5)}
		isActive={activeId === 5}
	/>
	<!-- <Lead
		image={verteran}
		title="Veteran Voyager"
		subtitle="{$t('top')} 101 {$t('to')} 500"
		newClass="verteran"
		content="Acknowledging the substantial efforts and skills of those ranking up to 500."
		on:click={() => handleLeadClick(6)}
		isActive={activeId === 6}
	/> -->
</div>

<style>
	.tier {
		flex: 1 1 28.85%;
		padding: 20px;
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 10px;
		border-radius: 6px;
		background: #29152f;
		height: 622.8px;
	}

	.tier:lang(ar) {
		height: 658.6px;
	}

	.tier h1 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.total-price {
		padding: 16px;
		border-radius: 4px;
		background: #382432;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		margin-bottom: 10px;
	}

	.total-price p {
		color: var(--Accent, #fdeb56);
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.price {
		color: #fff;
		text-align: center;
		font-family: Gilroy-Bold;
		font-size: 40px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}
</style>
