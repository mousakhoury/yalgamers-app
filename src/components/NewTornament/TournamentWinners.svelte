<script>
	import TeamMember4 from '$lib/assets/team-member-4.svg';
	import Star from '$lib/assets/leader-star.svg';
	import { getImageUrl } from '$lib/utils.js';

	export let tournament;
	export let winners;
</script>

{#if tournament.mode === 'solo'}
	<div class="flex flex-col justify-center items-center gap-[32px]">
		<h5 class="text-[#E9E6EA] text-[32px] font-Gilroy-SemiBold">Winning Teams</h5>
		<div class="flex items-center justify-center gap-[48px]">
			<div class="second-winner">
				<div class="flex fle-col items-center gap-[16.889px] max-w-[190px]">
					<div class="flex flex-col items-center gap-[10.133px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.second_winner.id,
								winners.second_winner.img
							)}
							alt=""
							class="w-[67.556px] h-[67.556px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[27.022px] font-Gilroy-SemiBold">
							{winners.second_winner.name}
						</p>
					</div>
				</div>
			</div>
			<div class="first-winner">
				<div class="flex fle-col items-center gap-[20px] max-w-[225px]">
					<div class="flex flex-col items-center gap-[12px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.first_winner.id,
								winners.first_winner.img
							)}
							alt=""
							class="w-[80px] h-[80px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[32px] font-Gilroy-SemiBold">
							{winners.first_winner.name}
						</p>
					</div>
				</div>
			</div>
			<div class="third-winner">
				<div class="flex fle-col items-center gap-[16.889px] max-w-[190px]">
					<div class="flex flex-col items-center gap-[10.133px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.third_winner.id,
								winners.third_winner.img
							)}
							alt=""
							class="w-[67.556px] h-[67.556px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[27.022px] font-Gilroy-SemiBold">
							{winners.third_winner.name}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center gap-[32px]">
		<h5 class="text-[#E9E6EA] text-[32px] font-Gilroy-SemiBold">Winning Teams</h5>
		<div class="flex items-center justify-center gap-[48px]">
			<div class="second-winner">
				<div class="flex flex-col items-center gap-[16.889px] max-w-[190px] mt-[69px]">
					<div class="flex flex-col items-center gap-[10.133px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.second_winner.id,
								winners.second_winner.img
							)}
							alt=""
							class="w-[67.556px] h-[67.556px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[27.022px] font-Gilroy-SemiBold">
							{winners.second_winner.name}
						</p>
					</div>
					<div class="relative z-[1] main-container">
						<div
							class="flex flex-col items-start gap-[10.133px] p-[13.511px] team-container rounded-[10.133px]"
						>
							<div class="flex items-center gap-[8.444px]">
								{#if winners.second_winner.leader.img}
									<img
										src={getImageUrl(
											'users',
											winners.second_winner.leader.id,
											winners.second_winner.leader.img
										)}
										alt=""
										class="w-[25.333px] h-[25.333px] object-cover"
									/>
								{:else}
									<img src={TeamMember4} alt="" class="w-[30px] h-[30px] object-cover" />
								{/if}
								<div class="flex items-center gap-[5.067px]">
									<p class="text-[#E9E6EA] text-[11.822px] font-Gilroy-Medium">
										{winners.second_winner.leader.name}
									</p>
									<img src={Star} alt="" class="w-[15.2px]" />
								</div>
							</div>
							{#each winners.second_winner.players as player}
								<div class="flex items-center gap-[10px]">
									{#if player.img}
										<img
											src={getImageUrl('users', player.id, player.img)}
											alt=""
											class="w-[25.333px] h-[25.333px] object-cover"
										/>
									{:else}
										<img src={TeamMember4} alt="" class="w-[30px] h-[30px] object-cover" />
									{/if}
									<div class="flex items-center gap-[6px]">
										<p class="text-[#E9E6EA] text-[11.822px] font-Gilroy-Medium">{player.name}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="first-winner">
				<div class="flex flex-col items-center gap-[20px] max-w-[225px] mt-[81px]">
					<div class="flex flex-col items-center gap-[12px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.first_winner.id,
								winners.first_winner.img
							)}
							alt=""
							class="w-[80px] h-[80px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[32px] font-Gilroy-SemiBold">
							{winners.first_winner.name}
						</p>
					</div>
					<div class="relative z-[1] main-container">
						<div
							class="flex flex-col items-start gap-[12px] p-[16px] team-container rounded-[12px]"
						>
							<div class="flex items-center gap-[10px]">
								<img
									src={getImageUrl(
										'users',
										winners.first_winner.leader.id,
										winners.first_winner.leader.img
									)}
									alt=""
									class="w-[30px] h-[30px] object-cover"
								/>
								<div class="flex items-center gap-[6px]">
									<p class="text-[#E9E6EA] text-[14px] font-Gilroy-Medium">
										{winners.first_winner.leader.name}
									</p>
									<img src={Star} alt="" />
								</div>
							</div>
							{#each winners.first_winner.players as player}
								<div class="flex items-center gap-[10px]">
									{#if player.img}
										<img
											src={getImageUrl('users', player.id, player.img)}
											alt=""
											class="w-[30px] h-[30px] object-cover"
										/>
									{:else}
										<img src={TeamMember4} alt="" class="w-[30px] h-[30px] object-cover" />
									{/if}
									<div class="flex items-center gap-[6px]">
										<p class="text-[#E9E6EA] text-[14px] font-Gilroy-Medium">{player.name}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="third-winner">
				<div class="flex flex-col items-center gap-[16.889px] max-w-[190px] mt-[69px]">
					<div class="flex flex-col items-center gap-[10.133px]">
						<img
							src={getImageUrl(
								'tournament_registrations',
								winners.third_winner.id,
								winners.third_winner.img
							)}
							alt=""
							class="w-[67.556px] h-[67.556px] object-cover"
						/>
						<p class="text-[#E9E6EA] text-[27.022px] font-Gilroy-SemiBold">
							{winners.third_winner.name}
						</p>
					</div>
					<div class="relative z-[1] main-container">
						<div
							class="flex flex-col items-start gap-[10.133px] p-[13.511px] team-container rounded-[10.133px]"
						>
							<div class="flex items-center gap-[8.444px]">
								<img
									src={getImageUrl(
										'users',
										winners.third_winner.leader.id,
										winners.third_winner.leader.img
									)}
									alt=""
									class="w-[25.333px] h-[25.333px] object-cover"
								/>
								<div class="flex items-center gap-[5.067px]">
									<p class="text-[#E9E6EA] text-[11.822px] font-Gilroy-Medium">
										{winners.third_winner.leader.name}
									</p>
									<img src={Star} alt="" class="w-[15.2px]" />
								</div>
							</div>
							{#each winners.third_winner.players as player}
								<div class="flex items-center gap-[10px]">
									{#if player.img}
										<img
											src={getImageUrl('users', player.id, player.img)}
											alt=""
											class="w-[25.333px] h-[25.333px] object-cover"
										/>
									{:else}
										<img src={TeamMember4} alt="" class="w-[30px] h-[30px] object-cover" />
									{/if}
									<div class="flex items-center gap-[6px]">
										<p class="text-[#E9E6EA] text-[11.822px] font-Gilroy-Medium">{player.name}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.second-winner {
		width: 262.123px;
		height: 440px;
		background: url('$lib/assets/second-winner.svg');
		background-position: center;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.second-winner .team-container {
		border-radius: 10.133px;
		background: linear-gradient(180deg, #374256 0%, #586781 64%);
	}

	.second-winner .main-container::before {
		content: '';
		width: 192px;
		aspect-ratio: 222.45/188;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12px;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(to bottom, rgba(142, 201, 237, 0.7), transparent);
		z-index: -1;
	}

	.first-winner {
		width: 298.036px;
		height: 500px;
		background: url('$lib/assets/first-winner.svg');
		background-position: center;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.first-winner .team-container {
		border-radius: 12px;
		/* border: 1px solid rgba(253, 235, 86, 0.7); */
		background: linear-gradient(180deg, #72612a 0%, #a78f43 70%);
	}

	.first-winner .main-container::before {
		content: '';
		width: 227px;
		aspect-ratio: 222.45/188;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 14px;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(to bottom, rgba(253, 235, 86, 0.7), transparent);
		z-index: -1;
	}

	.third-winner {
		width: 261.271px;
		height: 440px;
		background: url('$lib/assets/third-winner.svg');
		background-position: center;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.third-winner .team-container {
		border-radius: 10.133px;
		background: linear-gradient(180deg, #451d50 0%, #6d327d 100%);
	}

	.third-winner .main-container::before {
		content: '';
		width: 192px;
		aspect-ratio: 222.45/188;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 12px;
		transform: translate(-50%, -50%);
		background-image: linear-gradient(to bottom, rgba(188, 90, 215, 0.7), transparent);
		z-index: -1;
	}
</style>
