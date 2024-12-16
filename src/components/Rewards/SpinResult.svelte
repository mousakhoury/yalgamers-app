<script>
	import { t, locale } from '$lib/stores/i18n';
	import LeftArrow from '$lib/assets/rewards/button-left-arrow.svg';
	import RightArrow from '$lib/assets/rewards/button-right-arrow.svg';
	import HoverLeftArrow from '$lib/assets/rewards/hover-button-left-arrow.svg';
	import HoverRightArrow from '$lib/assets/rewards/hover-button-right-arrow.svg';
	import CloseButton from '$lib/assets/rewards/close-button.svg';
	import XPType from '$lib/assets/rewards/XP-type.svg';

	export let selectedItem;
	export let availableSpins;
	export let closeItem;
	export let closeSpinWheel;

	let title = selectedItem.label.split(' ')[0];
	let type = selectedItem.label.split(' ')[1];
</script>

<div
	class="flex flex-col items-center justify-between gap-[30px] p-[20px] pt-[80px] rounded-[14px] bg-[#200B26] w-full max-w-[440px] h-[492px] bg-result relative scale-90 lg:scale-100"
>
	<button on:click={closeSpinWheel} class="absolute top-[-18px] right-[-18px]">
		<img src={CloseButton} alt="" class="w-[32px]" />
	</button>

	<div class="flex flex-col items-center gap-[48px] max-w-[237px]">
		<div class="flex flex-col items-center max-w-[162px]">
			{#if type === 'XP'}
				<p class="text-[#FDEB56] text-[80px] text-center leading-[100px] font-Lexend">
					{title}
				</p>
				<img src={XPType} alt="" />
			{:else}
				<p class="text-[#FDEB56] text-[80px] text-center leading-[79px] font-Lexend">
					{selectedItem.label}
				</p>
			{/if}
		</div>

		{#if selectedItem.label !== 'Bad Luck'}
			<div class="flex flex-col items-center gap-[8px]">
				<p class="text-[#FDEB56] text-[28px] text-center font-Gilroy-Bold leading-[35px]">
					{$t('congratulations')}
				</p>
				<p class="text-[#BEB6C0] text-[16px] text-center font-Gilroy-Medium leading-[19px]">
					{#if $locale === ar}
						لقد ربحت {selectedItem.label}، دور يوميًا لكسب المزيد من الجوائز.
					{:else}
						You won {selectedItem.label}, spin everyday to earn more prizes.
					{/if}
				</p>
			</div>
		{/if}
	</div>

	<div class="flex flex-col items-center gap-[8px] w-full">
		<button
			on:click={closeItem()}
			disabled={availableSpins <= 0}
			class="spin-button {availableSpins > 0 ? '' : 'not-available'}"
		>
			{#if availableSpins > 0}
				<img src={LeftArrow} alt="" class="unhover-left-arrow" />
				<img src={HoverLeftArrow} alt="" class="hover-left-arrow" />

				<p>{$t('SpinAgain')}</p>
				<img src={RightArrow} alt="" class="unhover-right-arrow" />
				<img src={HoverRightArrow} alt="" class="hover-right-arrow" />
			{:else}
				<p>{$t('No Spin Available')}</p>
			{/if}
		</button>
		<p class="text-[#68566E] text-[12px] text-center font-Gilroy-Medium leading-[15px]">
			{availableSpins > 0
				? `${availableSpins} ${$locale === 'ar' ? 'دورة متبقية' : 'More Spins Left'}`
				: `${$locale === 'ar' ? '0 دورة متبقية' : '0 Spin Left'}`}
		</p>
	</div>
</div>

<style>
	.bg-result {
		background-image: url('$lib/assets/rewards/SpinResult-background.svg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.font-Lexend {
		font-family: 'Lexend';
	}

	.spin-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 18px;
		width: 100%;
		padding: 15px;
		border-radius: 6px;
		background: rgba(253, 235, 86, 0.15);
		transition: 0.3s;
	}

	.spin-button:hover {
		background: #fdeb56;
		gap: 12px;
	}

	.spin-button p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 16px;
	}

	.spin-button:hover p {
		color: #2a0d32;
	}

	@keyframes slideLeftRight {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(6px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.unhover-left-arrow {
		animation: slideLeftRight 2s infinite;
	}

	@keyframes slideRightLeft {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-6px);
		}
		100% {
			transform: translateX(0);
		}
	}

	.unhover-right-arrow {
		animation: slideRightLeft 2s infinite;
	}

	.hover-left-arrow,
	.hover-right-arrow {
		display: none;
	}

	.spin-button:hover .unhover-left-arrow,
	.spin-button:hover .unhover-right-arrow {
		display: none;
	}

	.spin-button:hover .hover-left-arrow,
	.spin-button:hover .hover-right-arrow {
		display: block;
	}

	.not-available,
	.not-available:disabled {
		background: rgba(255, 255, 255, 0.05);
	}

	.not-available p,
	.not-available:disabled p {
		color: var(--white-50, #948798);
	}
</style>
