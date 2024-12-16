<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';

	import combat from '$lib/assets/combat-img.png';
	import mainImage from '$lib/assets/genres-image.svg';
	import strategy from '$lib/assets/strategy-img.png';
	import multiplayer from '$lib/assets/multiplayer-img.png';
	import controller from '$lib/assets/genres-controller.svg';
	import bottom from '$lib/assets/genres-bottom-line.svg';
	import top from '$lib/assets/genres-top-line.svg';
	import circle from '$lib/assets/genres-light-circle.svg';
	import ArrowYellow from '$lib/assets/duble-right-arrow-yellow.svg';
	import ArrowBlack from '$lib/assets/duble-right-arrow-black.svg';
	import { getImageUrl } from '$lib/utils';

	export let genres;
</script>

<div
	class="flex flex-col items-center justify-center gap-[32px] lg:gap-[42px] genres-container py-[36px] lg:py-[48px] rounded-[10px] lg:rounded-[16px] w-full"
>
	<div
		class="flex flex-col items-center justify-center gap-[12px] lg:gap-[24px] max-w-[280px] lg:max-w-[715px]"
	>
		{#if $locale === 'ar'}
			<h6
				class="text-[#FFFFFFE5] text-[22px] lg:text-[36px] text-center font-Gilroy-Bold lg:max-w-[634px]"
			>
				اطلع على أحدث المقالات حول ألعاب <span class="text-[#BC5AD7]">الويب 3</span> من مختلف الأنواع
			</h6>
		{:else}
			<h6
				class="text-[#FFFFFFE5] text-[22px] lg:text-[36px] text-center font-Gilroy-Bold lg:max-w-[635px]"
			>
				Check out latest articles about <span class="text-[#BC5AD7]">Web 3</span> games of various genres
			</h6>
		{/if}
		<div class="genres-buttons">
			{#each genres as item}
				<a href={item.link}>
					<button>
						<span>{$locale === 'ar' ? item.name_ar : item.name_en}</span>
					</button>
				</a>
			{/each}
		</div>
	</div>
	<a href="/games">
		<div
			class="flex items-center gap-[4px] px-[12px] py-[8px] rounded-[4px] bg-[#FDEB561A] hover:bg-[#FDEB56] group"
		>
			<p class="text-[#FDEB56] group-hover:text-[#201E0A] text-[16px] font-Gilroy-Medium">
				{$t('View Games')}
			</p>
			<img
				src={ArrowYellow}
				alt=""
				class="w-[16px] group-hover:hidden {$locale === 'ar' ? 'rotate-180' : ''}"
			/>
			<img
				src={ArrowBlack}
				alt=""
				class="w-[16px] hidden group-hover:block {$locale === 'ar' ? 'rotate-180' : ''}"
			/>
		</div>
	</a>
</div>

<style>
	.genres-container {
		background-image: url('$lib/assets/geners-bg.svg');
		background-position: center;
		background-size: cover;
	}

	.genres-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.genres-buttons button {
		display: flex;
		padding: 2px 12px;
		border-radius: 503.999px;
		background: var(--Secondary-Background, #792341);
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: unset;
	}

	.genres-buttons button img {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		object-fit: cover;
	}

	.genres-buttons button span {
		color: #fff;
		text-align: center;
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	@media (max-width: 1024px) {
		.genres-container {
			background-image: url('$lib/assets/geners-bg-mobile.svg');
		}

		.genres-buttons {
			row-gap: 6px;
			column-gap: 4px;
		}
		.genres-buttons button {
			padding: 1.5px 9px;
			gap: 4.5px;
		}

		.genres-buttons button img {
			width: 16px;
			height: 16px;
		}

		.genres-buttons button span {
			font-size: 10.5px;
		}
		.genres-buttons a:nth-child(n + 6) {
			display: none;
		}
	}
</style>
