<script>
	import { t, locale } from '$lib/stores/i18n';

	import XpContainer from '$components/XpContainer.svelte';
	import Completed from '$lib/assets/task-completed.svg';
	export let taskNB;
	export let xp;
</script>

<div class="task-completed-container">
	<div class="flex flex-col items-center gap-[32px]">
		<img src={Completed} alt="" />
		<div class="flex flex-col items-center gap-[12px]">
			<p class="text-[#1FD031] text-[24px] font-Gilroy-SemiBold w-[295px] lg:w-fit">
				{$locale == 'ar'
					? `تهانينا، تم إكمال المهمة ${taskNB}!`
					: `Congratulations, Task ${taskNB} Completed!`}
			</p>
			<p class="text-[#A99FAC] text-[16px] Gilroy-Medium">
				{$t('Complete more tasks to earn more XP’s.')}
			</p>
		</div>
	</div>
	<div class="flex items-center gap-[16px] w-[229px] lg:w-fit">
		<p class="text-[#D4CFD6] text-[20px] Gilroy-Medium">{$t('You have earned')}</p>
		<XpContainer {xp} />
	</div>
</div>

<style>
	.task-completed-container {
		display: inline-flex;
		padding: 55px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40px;
	}

	@media (max-width: 720px) {
		.task-completed-container {
			text-align: center;
		}
	}
</style>
