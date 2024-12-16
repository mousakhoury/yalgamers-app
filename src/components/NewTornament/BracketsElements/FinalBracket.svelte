<script>
	export let parentExist;
	export let finalArray;
</script>

<div class="final-container">
	<div
		class="final p-[12px] md:p-[0.801vw] 2xl:p-[12px] bg-[#2B1731] rounded-[4px] md:rounded-[0.267vw] 2xl:rounded-[4px] border border-solid border-[#fdeb5600] flex flex-col items-center gap-[7px] md:gap-[0.467vw] 2xl:gap-[7px] w-[156px] md:w-[10.414vw] 2xl:w-[156px]"
	>
		<h5
			class="text-[#fff] text-[24px] md:text-[1.601vw] 2xl:text-[24px] font-Gilroy-SemiBold leading-[29px] md:leading-[1.935vw] 2xl:leading-[29px]"
		>
			Final
		</h5>
		{#each finalArray as match}
			<div
				class="flex flex-col justify-center items-center gap-[4px] md:gap-[0.267vw] 2xl:gap-[4px]"
			>
				<p
					class="text-[#BEB6C0] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
				>
					{match.team_1 == ''
						? `${parentExist ? 'Winner of Semi Final 1' : 'on way'}`
						: match.expand.team_1.name}
				</p>
				<p
					class="text-[#BEB6C0] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
				>
					VS
				</p>
				<p
					class="text-[#BEB6C0] text-center text-[14px] md:text-[0.935vw] 2xl:text-[14px] font-Gilroy-Medium leading-[17px] md:leading-[1.135vw] 2xl:leading-[17px]"
				>
					{match.team_2 == ''
						? `${parentExist ? 'Winner of Semi Final 2' : 'on way'}`
						: match.expand.team_2.name}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.final-container {
		position: relative;
		z-index: 2;
	}
	.final {
		width: 15.754vw; /* 236px / 1498px * 100 */

		aspect-ratio: 240/165;
		border-radius: 0.534vw; /* 8px / 1498px * 100 */
		box-shadow: 0px 0px 6.675vw 0.668vw rgba(253, 235, 86, 0.3);

		background: #2b1731;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.801vw; /* 12px / 1498px * 100 */

		z-index: 2;
	}

	.final-container::before {
		content: '';
		width: 16.022vw; /* 240px / 1498px * 100 */

		aspect-ratio: 240/165;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(to right, #f71756, #fdeb56);
		border-radius: 0.534vw; /* 8px / 1498px * 100 */

		z-index: -1;
	}

	@media (max-width: 768px) {
		.final {
			width: 236px;
			border-radius: 8px;
			box-shadow: 0px 0px 100px 10px rgba(253, 235, 86, 0.3);
			gap: 12px;
		}
		.final-container::before {
			width: 240px;
			border-radius: 8px;
		}
	}

	@media (min-width: 1536px) {
		.final {
			width: 236px;
			border-radius: 8px;
			box-shadow: 0px 0px 100px 10px rgba(253, 235, 86, 0.3);
			gap: 12px;
		}
		.final-container::before {
			width: 240px;
			border-radius: 8px;
		}
	}
</style>
