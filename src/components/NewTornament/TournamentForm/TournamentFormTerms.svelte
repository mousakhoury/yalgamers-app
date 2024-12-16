<script>
	// @ts-nocheck

	import unChecked from '$lib/assets/tournament-form-checkbox.svg';
	import checked from '$lib/assets/tournament-form-checkbox-checked.svg';
	export let acceptedTerms;
</script>

<div class="flex flex-col items-start gap-[48px]">
	<div class="flex flex-col items-start gap-[24px] w-full">
		<h5 class="text-[#fff] text-[20px] font-Gilroy-SemiBold">Terms and Conditions</h5>
		<div class="flex flex-col items-start gap-[24px] w-full">
			<p class="text-[#A99FAC] text-[16px] font-Gilroy-Medium">
				The Terms and Conditions are nothing other than a contract in which the owner clarifies the
				conditions of use of its service. Some quick examples are the use of the content (copyright)
				, the rules that users must follow while interacting with one another on the website / app
				and, finally, rules related to the cancellation or suspension of a user’s account etc.
			</p>
			<label for="check_term" class="flex items-center gap-[8px] cursor-pointer">
				<input
					type="checkbox"
					name="check_term"
					id="check_term"
					bind:checked={acceptedTerms}
					hidden
				/>
				<img src={acceptedTerms ? checked : unChecked} alt="" />
				<p class="text-[#BEB6C0] text-[16px] font-Gilroy-Medium">
					I accept all the terms and conditions.
				</p>
			</label>
		</div>
	</div>
	<button type="submit" class="register-button" disabled={!acceptedTerms}>
		<p>Register</p>
	</button>
</div>

<style>
	.register-button {
		display: flex;
		width: 552px;
		padding: 11px 18px 11px 22px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
	}

	.register-button p {
		color: var(--text-dark, #2a0d32);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.register-button:disabled {
		display: flex;
		width: 552px;
		padding: 11px 18px 11px 22px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		background: var(--white-10, #3d2644);
	}

	.register-button:disabled p {
		color: var(--white-50, #948798);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}
</style>
