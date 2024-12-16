<script>
	import { t, locale } from '$lib/stores/i18n';

	import timer from '$lib/assets/timer-icon.svg';
	import { getImageUrl } from '$lib/utils';

	export let seasons = [];

	export let season;

	$: lastSeason = seasons[seasons.length - 1];

	// Function to format date from 'YYYY-MM-DD' to 'Month DD'
	function formatDate(dateString) {
		const options = { month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString('en-US', options);
	}

	function calculateTimeLeftPercentage(from, to) {
		const fromDate = new Date(from);
		const toDate = new Date(to);
		const currentDate = new Date();

		const totalDuration = toDate - fromDate;
		const timePassed = currentDate - fromDate;

		// Avoid division by zero and negative values
		if (totalDuration <= 0) {
			return 0;
		}

		const timeLeftPercentage = 100 * (timePassed / totalDuration);
		return Math.min(100, timeLeftPercentage); // Clamping between 0 and 100
	}

	// Example usage
	$: timeLeftPercentage = calculateTimeLeftPercentage(season.start, season.end);

	let countdown = '';

	function calculateCountdown(to) {
		const toDate = new Date(to);
		const now = new Date();
		const diff = toDate - now;

		if (diff <= 0) {
			return '00d : 00h : 00m : 00s';
		}

		let days = Math.floor(diff / (1000 * 60 * 60 * 24));
		let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((diff % (1000 * 60)) / 1000);

		return `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes
			.toString()
			.padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
	}

	// Update the countdown every second
	setInterval(() => {
		countdown = calculateCountdown(season.end); // Set your target date here
	}, 1000);
</script>

<div class="season">
	<h1>{$t('Season')}</h1>

	<div class="season-name-time">
		<h6>{$locale === 'en' ? season.title_en : season.title}</h6>
		<p>From {formatDate(season.start)} to {formatDate(season.end)}</p>
	</div>

	<div class="time-Progress">
		<span style="width: {timeLeftPercentage}%" />
	</div>

	<div class="time-left">
		<div class="time-left-title">
			<p>{$t('Time Left')}</p>
			<img src={timer} alt="" />
		</div>
		<div class="count-down">{countdown}</div>
	</div>

	<div class="sponsors">
		<p>{$t('Diamond Sponsor')}</p>
		{#each season.expand.diamond_sponsors as sponsor}
			<a href={sponsor.website}>
				<img src={getImageUrl('sponsors', sponsor.id, sponsor.logo)} class="w-[101px]" alt="" />
			</a>
		{/each}
	</div>

	<div class="sponsors">
		<p>{$t('Participating Sponsors')}</p>

		<div class="sponsors-images">
			{#each season.expand.participating_sponsors as sponsor}
				<a href={sponsor.website}>
					<img src={getImageUrl('sponsors', sponsor.id, sponsor.logo)} alt="" />
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.season {
		flex: 1 1 28.85%;
		border-radius: 6px;
		background: #29152f;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		height: 622.8px;
	}

	.season:lang(ar) {
		height: 658.6px;
	}

	.season h1 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.season-name-time {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}

	.season-name-time h6 {
		font-family: Gilroy-SemiBold;
		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.season-name-time p {
		color: var(--white-50, #948798);
		text-align: right;
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.time-Progress {
		height: 8px;
		width: 100%;
		border-radius: 100px;
		background: var(--white-10, #3d2644);
		position: relative;
	}

	.time-Progress span {
		height: 8px;
		border-radius: 100px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		position: absolute;
		left: 0;
		top: 0;
	}

	.time-left {
		display: flex;
		width: 100%;
		padding: 16px 16px 20px;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		border-radius: 4px;
		background: var(--Accent-2, #200b26);
	}

	.time-left-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.time-left-title {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		width: 100%;
	}

	.count-down {
		color: var(--white-60, #a99fac);
		text-align: center;
		font-family: Gilroy-SemiBold;
		font-size: 28px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.sponsors {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}

	.sponsors p {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.sponsors-images {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 16px;
	}

	.sponsors-images img {
		width: 54px;
	}
</style>
