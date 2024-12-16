<script>
	import Controller1 from '$lib/assets/game-score/game-controller-01.svg';
	import Controller2 from '$lib/assets/game-score/game-controller-02.svg';
</script>

<a
	href="/gamer-score"
	class="flex items-center gap-[8px] py-[6px] pl-[12px] pr-[16px] rounded-full score-animation"
>
	<div class="w-[24px] h-[24px] controller-animation" />
	<p class="text-[#1FD031] text-[16px] font-Gilroy-SemiBold text-animation">Gamer Score</p>
</a>

<style>
	.score-animation {
		animation: borderAndBgToggle 2s infinite steps(1);
	}

	.score-animation:hover {
		animation: none;
		border: 1px solid #1fd031;
		background: #0e2212;
		box-shadow: 0px 0px 18px 4px rgba(31, 208, 49, 0.4);
	}

	@keyframes borderAndBgToggle {
		0%,
		49% {
			border: 1px solid rgba(31, 208, 49, 0.3);
			background: #16251b;
			box-shadow: 0px 0px 12px 3px rgba(31, 208, 49, 0.2);
		}
		50%,
		100% {
			border: 1px solid rgba(31, 208, 49, 0.8);
			background: #17361d;
			box-shadow: 0px 0px 18px 4px rgba(31, 208, 49, 0.4);
		}
	}

	.text-animation {
		animation: textLeftRight 2s infinite steps(1);
	}

	.score-animation:hover .text-animation {
		animation: none;
	}

	@keyframes textLeftRight {
		0%,
		49% {
			transform: rotate(2deg);
		}
		50%,
		100% {
			transform: rotate(-2deg);
		}
	}

	.controller-animation {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		animation: controllerLeftRight 2s infinite steps(1);
	}

	.score-animation:hover .controller-animation {
		animation: none;
		background-image: url('$lib/assets/game-score/game-controller-01.svg');
	}

	@keyframes controllerLeftRight {
		0%,
		49% {
			transform: rotate(-2deg);
			background-image: url('$lib/assets/game-score/game-controller-02.svg');
		}
		50%,
		100% {
			transform: rotate(2deg);
			background-image: url('$lib/assets/game-score/game-controller-01.svg');
		}
	}
</style>
