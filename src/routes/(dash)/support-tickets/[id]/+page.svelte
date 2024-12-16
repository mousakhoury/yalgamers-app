<script>
	import { t, locale } from '$lib/stores/i18n';

	import ChatBox from './../../../../components/SupportChat/ChatBox.svelte';
	import ChatTicketInfo from '$components/SupportChat/ChatTicketInfo.svelte';
	import BackArrow from '$lib/assets/back-arrow.svg';
	import BackArrow2 from '$lib/assets/back-arrow-2.svg';

	import '$lib/assets/css/support-chat.css';

	export let data;

	let isClosed = false;
	let isSolved = data.ticket.status === 'RESOLVED';
	let isOpen = false;
	function addNoScroll() {
		document.body.classList.add('no-scroll');
	}

	function removeNoScroll() {
		document.body.classList.remove('no-scroll');
	}

	function openCloseTicketHandler() {
		isOpen = true;
		isClosed = true;
		addNoScroll();
	}

	function closeCloseTicketHandler() {
		isOpen = false;
		isClosed = false;
		isSolved = false;
		removeNoScroll();
	}
</script>

<div class="flex items-center gap-[20px] p-[16px] lg:p-[30px]">
	<a href="/" class="flex items-center gap-[10px]">
		<img src={BackArrow} alt="" class={$locale == 'ar' ? 'rotate-180' : 'rotate-0'} />
		<p class="text-[#D4CFD6] text-[18px] font-Gilroy-SemiBold">{$t('Explore')}</p>
	</a>
	<div class="flex items-center gap-[10px]">
		<img src={BackArrow2} alt="" />
		<p class="text-[#D4CFD6] text-[18px] font-Gilroy-SemiBold opacity-50">{$t('Support Chat')}</p>
	</div>
</div>
<div class="chat-page-container">
	<ChatTicketInfo ticket={data.ticket} {isClosed} {isSolved} {isOpen} {closeCloseTicketHandler} />
	<ChatBox ticket={data.ticket} {openCloseTicketHandler} />
</div>
