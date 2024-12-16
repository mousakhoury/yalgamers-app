<script>
	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';
	import banner from '$lib/assets/footerbanner.png';
	import { invalidate } from '$app/navigation';
	let email;

	const handleSubmit = async () => {
		// console.log(email);
		if (!email) return;
		const r = await fetch('/api/subscribe/newsletter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email
			})
		});

		if (r.ok) {
			alert('Subscribed to newsletter');
			invalidate('/');
			window.location.reload();
		}
	};
</script>

<div
	class=" mt-15 bg-accent-2 rounded-[7px] flex flex-col justify-between gap-5 md:gap-10 items-center px-5 py-[106px] md:py-[106px] md:px-[288px] w-full relative"
>
	<img src={banner} class="absolute top-0 right-0 object-cover w-full h-full" />
	<div class="relative z-10 flex flex-col w-full text-center gap-2 md:gap-5">
		<!-- <p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="gradient font-Gilroy-SemiBold text-[14px] sm:text-lg font-normal not-italic"
		>
			{$t('subscribe.tagline')}
		</p> -->
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white font-Gilroy-SemiBold text-[20px] sm:text-[28px] md:text-[30px] lg:text-[48px] font-normal not-italic"
		>
			{$t('subscribe.title')}
		</p>
	</div>

	<div class="w-full min-h-[66px] relative">
		<input
			bind:value={email}
			type="search"
			id="default-search"
			class="bg-input-background block h-[50px] sm:h-[60px] w-full p-3 pl-5 focus:border-1 border-1 border-solid focus:border-accent-yellow text-base leading-normal placeholder-white-60 font-medium not-italic border-accent-yellow font-Gilroy-Medium text-white-30 border rounded-lg focus:ring-0 focus:outline-none"
			placeholder={$t('subscribe.input')}
		/>
		<Button
			on:click={handleSubmit}
			type="gradient"
			size="sm"
			class={`absolute ${
				$locale == 'ar' ? 'left-0' : 'right-0'
			} top-0 bottom-0 m-[5px] h-[40px] sm:h-[50px] sm:text-base`}>{$t('subscribe')}</Button
		>
	</div>
</div>

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
	.subscription {
	}

	.bg-input-background {
		background-color: #3d2644;
	}
</style>
