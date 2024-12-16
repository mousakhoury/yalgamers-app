<script>
	import { t, locale } from '$lib/stores/i18n';

	import Card from './Tournament-card.svelte';
	import image from '$lib/assets/tournament-1.png';
	import logo from '$lib/assets/powered.png';
	import Button from '$components/Button.svelte';
	import { SplideSlide } from '@splidejs/svelte-splide';

	import Swiper from '$components/Swiper/Swiper.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';

	export let tournaments;
</script>

<div class="py-16">
	<SectionHeading href="/tournaments" title={$t('tournaments.title')} />
	<div class="flex justify-start items-center gap-[33px]">
		<Swiper>
			{#each tournaments as item (item.id)}
				<SplideSlide class="explor-sider">
					<Card
						id={item.id}
						image={item.image}
						deadline={item.deadline}
						price={item.price}
						title={$locale === 'en' ? item.title_en : item.title}
						powered={item.poweredby}
						logo={item.poweredimg}
						mode={item.mode}
					/>
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>
