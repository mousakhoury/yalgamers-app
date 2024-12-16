<script>
	import { t, locale } from '$lib/stores/i18n';
	import GameImage from '$lib/assets/ellipse-150@2x.png';
	import ArrowRight from '$lib/assets/iconlylightarrow--right.svg';
	import OwnerImage from '$lib/assets/games-yalgamers-logo.svg';
	import GameSlider from './GameSlider.svelte';
	import { getImageUrl } from '$lib/utils';
	export let game;
</script>

<div class="new-game-card">
	<div class="new-game-card-child">
		<div class="w-full relative mb-[6px]">
			<img
				src={getImageUrl('mini_games', game.id, game.main_image)}
				alt=""
				class="w-full aspect-[428/220] rounded-[8px] object-cover"
			/>
			<div
				class={`px-[10px] pt-[5px] pb-[4px] rounded-[5px] bg-[#06330A] border border-solid border-[#3D2644]
				absolute top-[6px] ${$locale === 'ar' ? 'right-[6px]' : 'left-[6px]'} `}
			>
				<p class="text-[#1FD031] text-[14px] font-Gilroy-SemiBold">{$t('Most Playing Game Now')}</p>
			</div>
		</div>
		<div class="flex flex-col items-start p-[8px] w-full">
			<div class="flex w-full justify-between items-center mb-[20px]">
				<h6 class="text-[#E9E6EA] text-[24px] font-Gilroy-Bold">
					{$locale === 'ar' ? game.title_ar : game.title_en}
				</h6>
				<div
					class="px-[10px] pt-[5px] pb-[4px] rounded-[5px] bg-[#FDEB56]
				"
				>
					<p class="text-[#3D2644] text-[14px] font-Gilroy-SemiBold">
						{game.total_played ?? 0}
						{$t('Played')}
					</p>
				</div>
			</div>
			<div class="flex items-center gap-[12px] mb-[32px]">
				<img src={OwnerImage} alt="" class="w-[48px] h-[48px] rounded-[100px] object-cover" />
				<div class="flex flex-col items-start gap-[4px]">
					<p class="text-[#7E6E83] text-[14px] font-Gilroy-Medium">{$t('Owned by')}</p>
					<p class="text-[#E9E6EA] text-[18px] font-Gilroy-SemiBold">{$t('Yalgamers')}</p>
				</div>
			</div>
			<a class="medium-parent" href={`/have-fun/${game.id}`}>
				<div class="medium">{$t('ViewDetails')}</div>
				<img
					class={`iconlylightarrow-right ${$locale === 'ar' ? 'rotate-180' : 'rotate-0'}`}
					alt=""
					src={ArrowRight}
				/>
			</a>
		</div>
	</div>
</div>

<style>
	.new-game-card {
		width: 100%;
		position: relative;
		z-index: 1;
		max-width: 476px;
	}

	.new-game-card-child {
		padding: 6px;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background: var(--Accent-2, #200b26);
	}

	.new-game-card::before {
		width: calc(100% + 1px);
		height: calc(100% + 1px);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		position: absolute;
		content: '';
		z-index: -1;
		border-radius: 12px;
		transition: 0.1s ease-in;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
	}

	@media (max-width: 640px) {
		.new-game-card {
			max-width: unset;
		}
	}
</style>
