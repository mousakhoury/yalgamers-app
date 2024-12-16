<script>
	import Share from '$lib/assets/game-score/share.svg';
</script>

<div class="p-[1px] w-full rounded-[16px] bg-border h-[496px] lg:h-full">
	<div
		class="flex flex-col items-start gap-[12px] lg:gap-[20px] w-full h-full rounded-[15px] p-[12px] lg:p-[20px] bg-[#2c1334]"
	>
		<div class="flex items-center justify-between w-full">
			<p class="text-[#FFFFFFE5] text-[14px] lg:text-[20px] font-Gilroy-SemiBold">
				Guide For Making Your Steam <br class="block lg:hidden" /> Account Better
			</p>
			<button
				class="flex items-center justify-center w-[24px] h-[24px] rounded-[4px] hover:bg-[#FFFFFF1A] relative group"
			>
				<img src={Share} alt="" class="w-[18px]" />
				<p
					class="text-[#FFFFFFB2] text-[10px] font-Gilroy-Medium absolute top-[50%] translate-y-[-50%] right-0 opacity-0 group-hover:opacity-100 group-hover:right-[31px] duration-300"
				>
					Share
				</p>
			</button>
		</div>
		<hr class="w-full border-[#FFFFFF0D]" />
		<div class="w-full h-full overflow-auto article pr-[5px]">
			<p class="text-[#FFFFFFB2] text-[12px] lg:text-[14px] font-Gilroy">
				To improve your Steam account score or Steam Level, focus on activities that contribute
				experience points (XP). Here are some of the best methods to increase your Steam Level and
				make your account look better:
				<br />
				<br />
				Complete Your Profile Steam offers XP for filling out your profile details, like adding a profile
				picture, bio, and linking accounts. Make sure all sections of your profile are filled out.
				<br />
				<br />
				Craft Badges Badges are one of the primary ways to earn XP. You can craft badges by collecting
				trading cards, which you earn from playing games or trading/buying them on the Steam Market.
				There are several types of badges to focus on:
				<br />
				<br />
				Game Badges: Collect a full set of cards for a game to craft a badge. Event Badges: Participate
				in Steam events (like summer and winter sales) where you can earn special badges. Community Badges:
				Earn badges for things like adding friends, playing games, or voting on Greenlight games. Complete
				Event Challenges During major sales, Steam often has challenges that reward you with event XP.
				These can include tasks like playing certain games, voting, or collecting points in event-themed
				activities.
				<br />
				<br />
				Earn Achievements Some achievements in games provide Steam XP. While not all games contribute
				to XP in this way, achievement hunting in compatible games can be another way to level up.
				<br />
				<br />
				Participate in Steam Community Regularly using the Steam Community features like reviews, discussions,
				and guides may help in some cases, especially during events that reward XP for participation.
				<br />
				<br />
				Level Up Steam Profile Badges Some badges, like the Steam Community badge, can be leveled up
				by performing activities like adding friends, commenting, and joining groups.
				<br />
				<br />
				Purchase Games on Steam Every dollar you spend on Steam counts toward your Steam Points, which
				can be redeemed for additional items that enhance your profile. Though these don’t directly affect
				XP, they add to your profile’s appearance and can encourage interaction from others.
				<br />
				<br />
				Complete Sales and Seasonal Quests During Steam’s seasonal sales, special quests and challenges
				are offered that reward XP or event badges. Keep an eye on the Steam News during these periods.
			</p>
		</div>
	</div>
</div>

<style>
	.bg-border {
		background: linear-gradient(180deg, #412a48 0%, #2c1334 100%);
	}

	.article::-webkit-scrollbar-track {
		background: transparent;
	}

	.article::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	.article::-webkit-scrollbar-thumb {
		background: #412b48;
		border-radius: 100px;
	}
</style>
