<script>
	import { t, locale } from '$lib/stores/i18n';

	import verify from '$lib/assets/verify.svg';
	import userImg from '$lib/assets/user.png';
	import twitterSvg from '$lib/assets/twitter-auth.svg';
</script>

<div class="flex flex-col gap-[20px]">
	{#each [1, 2, 3, 4, 5, 6] as item}
		<div class=" w-full pt-[15px]">
			<div
				class="rounded-[14px] w-full bg-accent-2 flex p-[30px] justify-center items-center gap-[30px]"
			>
				<div>
					<div class="flex items-center justify-between w-full">
						<div class="flex gap-[15px]">
							<img class="rounded-full" alt="" src={userImg} height="50px" width="50px" />
							<div>
								<div class="flex items-center justify-start gap-2">
									<p
										dir={$locale == 'ar' ? 'rtl' : 'ltr'}
										class="text-base not-italic font-normal text-white font-Gilroy-SemiBold"
									>
										PUBG
									</p>
									<img src={verify} alt="" />
								</div>
								<p
									dir={$locale == 'ar' ? 'rtl' : 'ltr'}
									class="text-sm not-italic font-normal text-white-60 font-Gilroy"
								>
									@pubggame
								</p>
							</div>
						</div>
						<div>
							<img width="30px" height="30px" src={twitterSvg} alt="" />
						</div>
					</div>
					<div class="mt-10">
						<p
							dir={$locale == 'ar' ? 'rtl' : 'ltr'}
							class="text-2xl not-italic font-normal text-white-80 font-Gilroy-Medium"
						>
							Lorem ipsum dolor sit amet consectetur. Donec et ut volutpat ut volutpat ut volutpat
							metus amet.
						</p>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
