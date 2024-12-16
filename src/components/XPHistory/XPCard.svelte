<script>
	import { t, locale } from '$lib/stores/i18n';
	import XPImage from '$lib/assets/xp.svg';

	export let xp = 0;
    export let main = '';
    export let sub = null;
</script>

<div class="flex justify-between items-center w-full p-4 my-2 bg-[#321e37] xp-container">
	<span>
		<div class="flex flex-col gap-2">
			<p class="main">{main}</p>
            {#if sub !== null}
			    <p class="sub">{sub}</p>
            {/if}
		</div>
	</span>
	<span>
		<div
			class="h-[38px] w-fit rounded-full p-[3px] bg-white-10 flex justify-start items-center gap-3"
		>
			<div
				class="w-[34px] h-[34px] flex justify-center items-center bg-white-30 border border-solid border-accent-yellow rounded-full"
			>
				<img width="22px" height="24px" alt="xp icon" src={XPImage} />
			</div>
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class={`${
					$locale == 'ar' ? 'pl-4' : 'pr-4'
				} text-lg not-italic font-normal text-accent-yellow font-Gilroy-Semibold`}
			>
				{xp}
			</p>
		</div>
	</span>
</div>

<style>
    p{
        font-family: "Gilroy-SemiBold";
    }
    .main{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }
    .sub {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #7E6E83;

    }
    .xp-container{
        border-color: #6e5252;
        border-width: 1px;
        border-radius: 8px;
    }
</style>
