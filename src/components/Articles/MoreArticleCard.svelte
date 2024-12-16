<script>
	import { t, locale } from '$lib/stores/i18n';

	export let article;
</script>

<a href={`/games/${article.unique_title}`}>
	<div class="flex flex-col items-start gap-[14.19px] p-[6px] w-full rounded-[8px] bg-[#200B26]">
		<div class="relative w-full">
			<img
				src={article.image}
				alt=""
				class="w-full aspect-[277/155.813] rounded-[6px] object-cover"
			/>
		</div>
		<div class="flex flex-col items-start gap-[14px] p-[8px] w-full">
			<div class="flex flex-col items-start gap-[8px] w-full">
				<p class="text-white text-[20px] font-Gilroy-SemiBold leading-[25px]">{article.title}</p>
				<div class="flex items-center gap-[6px]">
					{#each article.tags as tag}
						<div class="px-[6px] py-[4px] rounded-[100px] border border-[#ffffff14]">
							<p class="text-[#FFFFFF80] text-[12px] font-Gilroy leading-[14px]">{tag}</p>
						</div>
					{/each}
				</div>
			</div>
			<hr class="w-full border-[#ffffff1a]" />
			<div class="flex items-center gap-[4px]">
				<p class="text-[#FFFFFF66] text-[14px] font-Gilroy leading-[17px]">{$t('by')}:</p>
				<p class="text-[#FFFFFFCC] text-[14px] font-Gilroy-Medium leading-[17px]">
					{$t(article.auth)}
				</p>
			</div>
		</div>
	</div>
</a>
