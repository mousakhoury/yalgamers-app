<script>
	export let text;
	export let rating;

	// Function to calculate width percentage
	function calculateWidth(rating) {
		return (rating / 10) * 100;
	}

	// Calculate the width percentage based on the rating
	let widthPercentage = calculateWidth(rating);
</script>

<div class="all-rating">
	<div class="text">
		<p>{text}</p>
		<div class="rate">{rating}</div>
	</div>
	<div class="bar">
		<span style="width: {widthPercentage}%;" />
	</div>
</div>

<style>
	.all-rating {
		display: flex;
		height: 47px;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		/* max-width: 223px; */
	}

	.text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.text p {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 14px;
	}

	.rate {
		color: var(--Accent, #fdeb56);
		text-align: right;
		font-family: Gilroy-Medium;
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.bar {
		width: 100%;
		height: 8px;
		flex-shrink: 0;
		border-radius: 100px;
		background: var(--white-10, #3d2644);
		position: relative;
	}

	.bar span {
		height: 8px;
		flex-shrink: 0;
		border-radius: 100px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		position: absolute;
		top: 0%;
		left: 0;
	}
</style>
