<script>
	import { t, locale } from '$lib/stores/i18n';

	import Genres from './Swiper/Genres.svelte';
	import { genreList } from '$lib/genereList';
	import GamesSwiper from './Swiper/GamesSwiper.svelte';
    export let genres;
</script>

<div class="pt-[30px]">
	<p
		dir={$locale == 'ar' ? 'rtl' : 'ltr'}
		class="text-white font-Gilroy-Bold text-xl min-[768px]:text-[28px] md:text-[42px] font-normal not-italic"
	>
		{$t('genres')}
	</p>
	<div class="flex items-center justify-center w-full sm:mt-5">
		<div class="w-full overflow-hidden ">
			<GamesSwiper genreList={genres} />
			<!-- <Genres {genreList} /> -->
		</div>
	</div>
</div>
