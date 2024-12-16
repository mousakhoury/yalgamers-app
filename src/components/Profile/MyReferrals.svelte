<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import rImage from '$lib/assets/referrals-image.svg';
	import { getImageUrl } from '$lib/utils';

	export let referrals = [];

	const middle = Math.ceil(referrals.length / 2);
	const firstReferrals = referrals.slice(0, middle);
	const secondReferrals = referrals.slice(middle);

	function formatDate(dateString) {
		const [day, month, year] = dateString.split('-');
		const date = new Date(`${month}/${day}/${year}`);
		return new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(date);
	}
</script>

<div class="referrals">
	<h1>{$t('My Referrals')}</h1>

	<div class="flex">
		<table
			class="{$locale == 'ar' ? 'border-l-[1px]' : 'border-r-[1px]'} border-solid border-[#3d2644]"
		>
			,

			<thead>
				<th>{$t('Username')}</th>
				<th>{$t('Referral Date')}</th>
			</thead>
			{#each firstReferrals as referral}
				<tr>
					<td>
						<div class="flex items-center gap-[16px]">
							<img src={getImageUrl('users', referral.id, referral.avatar)} alt="" />
							{referral.username}
						</div>
					</td>
					<td>{referral.created}</td>
				</tr>
			{/each}
		</table>
		<!-- <table>
			<thead>
				<th>{$t('Username')}</th>
				<th>{$t('Referral Date')}</th>
			</thead>
			{#each secondReferrals as referral}
				<tr>
					<td>
						<div class="flex items-center gap-[16px]">
							<img src={getImageUrl("users",referral.id,referral.avatar)} alt="" />
							{referral.username}
						</div>
					</td>
					<td>{referral.created}</td>
				</tr>
			{/each}
		</table> -->
	</div>

	<button>{$t('seeAll')}</button>
</div>

<style>
	.referrals {
		border-radius: 12px;
		background: #29152f;
		width: 100%;
	}

	.referrals h1 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding: 20px;
	}

	table {
		width: 100%;
		text-align: left;
	}

	table:lang(ar) {
		text-align: right;
	}

	thead {
		border-top: 2px solid var(--white-10, #3d2644);
		border-bottom: 2px solid var(--white-10, #3d2644);
		background: var(--Accent-2, #200b26);
		height: 60px;
	}

	thead th {
		color: var(--white-40, #7e6e83);
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-left: 20px;
	}

	thead th:lang(ar) {
		padding-left: unset;
		padding-right: 20px;
	}

	tr {
		border-bottom: 1px solid var(--white-10, #3d2644);
		height: 50px;
	}

	tr td {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-left: 20px;
		width: 25%;
	}

	tr td:lang(ar) {
		padding-left: unset;
		padding-right: 20px;
	}

	tr td img {
		width: 30px;
		height: 30px;
		object-fit: cover;
		border-radius: 30px;
		border: 1px solid var(--stroke-stroke-2, #2f3338);
	}

	button {
		display: flex;
		padding: 9px 24px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 6px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin: 30px auto;
	}

	button:hover {
		box-shadow: 0px 3px 10px 0px rgba(251, 134, 86, 0.25);
	}

	@media (max-width: 1200px) {
		.referrals {
			overflow-x: scroll;
		}
		table {
			min-width: 1150px;
		}
	}
</style>
