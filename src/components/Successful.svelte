<script>
	import { t,locale } from "$lib/stores/i18n";

    import {fly} from "svelte/transition";
     export let title = ""
     export let message = ""
</script>
<div class="flex items-center justify-center h-screen" in:fly={{ y: 250, duration: 1000 }}>
    <div class="bg-accent rounded-[20px] w-fit h-fit">
        <div
            class="w-[400px] h-[450px] pt-[122px] pb-[121px] px-[90px] flex justify-center items-center"
        >
            <div class="flex flex-col items-center justify-center w-full h-full">
                <div class="w-[150px] h-[150px]">
                    <svg
                        class="align-middle"
                        xmlns="http://www.w3.org/2000/svg"
                        width="150"
                        height="150"
                        viewBox="0 0 200 200"
                        fill="none"
                    >
                        <path
                            d="M100 183.333C88.1945 183.333 77.2222 181.215 67.0834 176.979C56.9445 172.743 48.125 166.875 40.625 159.375C33.125 151.875 27.257 143.056 23.0209 132.917C18.7847 122.778 16.6667 111.806 16.6667 100C16.6667 88.3334 18.7847 77.4306 23.0209 67.2917C27.257 57.1528 33.125 48.3334 40.625 40.8334C48.125 33.3334 56.9445 27.4306 67.0834 23.125C77.2222 18.8195 88.1945 16.6667 100 16.6667C108.333 16.6667 116.458 17.882 124.375 20.3125C132.292 22.7431 139.722 26.3195 146.667 31.0417C148.194 32.0139 149.132 33.3334 149.479 35C149.826 36.6667 149.444 38.1945 148.333 39.5834C147.222 40.9722 145.833 41.7361 144.167 41.875C142.5 42.0139 140.903 41.5972 139.375 40.625C133.542 36.875 127.292 34.0278 120.625 32.0834C113.958 30.1389 107.083 29.1667 100 29.1667C79.8611 29.1667 63.0209 35.9375 49.4792 49.4792C35.9375 63.0209 29.1667 79.8611 29.1667 100C29.1667 120.139 35.9375 136.979 49.4792 150.521C63.0209 164.063 79.8611 170.833 100 170.833C120.139 170.833 136.979 164.063 150.521 150.521C164.063 136.979 170.833 120.139 170.833 100C170.833 97.3611 170.729 94.7917 170.521 92.2917C170.313 89.7917 169.931 87.3611 169.375 85C169.097 83.1945 169.375 81.5278 170.208 80C171.042 78.4722 172.292 77.5695 173.958 77.2917C175.764 76.875 177.431 77.1875 178.958 78.2292C180.486 79.2709 181.389 80.6945 181.667 82.5C182.222 85.2778 182.639 88.125 182.917 91.0417C183.194 93.9584 183.333 96.9445 183.333 100C183.333 111.806 181.181 122.778 176.875 132.917C172.569 143.056 166.667 151.875 159.167 159.375C151.667 166.875 142.847 172.743 132.708 176.979C122.569 181.215 111.667 183.333 100 183.333ZM87.7084 118.958L169.375 37.2917C170.625 36.0417 172.153 35.4167 173.958 35.4167C175.764 35.4167 177.361 36.0417 178.75 37.2917C180.139 38.6806 180.833 40.2778 180.833 42.0834C180.833 43.8889 180.139 45.4861 178.75 46.875L92.0834 133.542C90.8334 134.792 89.375 135.417 87.7084 135.417C86.0417 135.417 84.5834 134.792 83.3334 133.542L57.9167 107.917C56.6667 106.667 56.0764 105.104 56.1459 103.229C56.2153 101.354 56.875 99.7917 58.125 98.5417C59.375 97.2917 60.9375 96.6667 62.8125 96.6667C64.6875 96.6667 66.25 97.2917 67.5 98.5417L87.7084 118.958Z"
                            fill="#1FD031"
                        />
                    </svg>
                </div>
                <p  dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-2xl pt-[24px] font-normal font-Gilroy-SemiBold text-green text-center">
                    {title}
                </p>
                <p
                     dir={$locale == 'ar' ? 'rtl' : 'ltr'}  class="text-white-60 pt-[15px] w-[320px] text-center text-xl font-normal font-Gilroy-Medium not-italic"
                >
                    {message}
                </p>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
</style>
