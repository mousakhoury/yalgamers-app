<script>
	import { page } from '$app/stores';
	let genre = $page.params.genresname;
	import { genreList } from '$lib/genereList';

	$: currentGenre = genreList.filter((item) => item.genre == genre);
</script>

<div class="w-full px-5 py-10">
	<div
		class="relative bg-accent-yellow w-full flex justify-center items-end rounded-2xl overflow-hidden"
	>
		<div class="w-full h-[300px] relative">
			<img
				src={currentGenre[0]?.src}
				alt=""
				class="w-full h-full object-cover rounded-2xl top-0 left-0 right-0 aspect-[205/160]"
			/>
			<div class="z-10 absolute bg-gradient-primary w-full h-full bottom-0 left-0 right-0" />
		</div>
		<div class="absolute z-10 w-[90%] h-full flex justify-center items-start flex-col">
			<p class="text-white text-center font-Gilroy-Bold text-[40px] font-normal not-italic">
				{currentGenre[0]?.genre}
			</p>
			<p class=" text-center font-Gilroy-Bold text-lg font-normal not-italic text-white-60">
				{currentGenre[0]?.title}
			</p>
		</div>
	</div>
</div>
