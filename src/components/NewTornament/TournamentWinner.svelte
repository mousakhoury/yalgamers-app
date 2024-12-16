<script>
	import TournamentItem from './TournamentItem.svelte';

	export let image;
	export let title;
	export let price;
	export let ticket;
	export let xp;
</script>

<div
	class="flex flex-col items-center justify-center pt-[30px] pb-[20px] gap-[20px] rounded-[8px] bg-[#36202E] border-[1px] border-solid border-[#FFE272] w-full"
>
	<img src={image} alt="" />
	<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">{title}</p>
	<div class="flex flex-col items-center gap-[16px]">
		<TournamentItem type="price" text={price} />
		<TournamentItem type="xp" text={xp} />
		<TournamentItem type="box" text={ticket} />
	</div>
</div>
