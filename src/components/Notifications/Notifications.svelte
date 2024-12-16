<script>
	import { t, locale } from '$lib/stores/i18n';
	import NotificationPlaceHolder from '$lib/assets/notification-placeholder.png';
	import NotificationSmallIcon from '$lib/assets/notification-small-icon.svg';
	import XPIcon from '$lib/assets/notification-xp-icon.svg';
	import TicketsIcon from '$lib/assets/notification-tickets-icon.svg';
	import LevelIcon from '$lib/assets/notification-level-icon.svg';
	import { courses, games, tournaments, haveFun, Quests } from '$lib/assets/navicons.js';
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	export let notifications = [];
	let groupedNotifications = {};

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const now = new Date();
		const secondsAgo = Math.floor((now - date) / 1000);
		const minutesAgo = Math.floor(secondsAgo / 60);
		const hoursAgo = Math.floor(minutesAgo / 60);

		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - 1);

		const isToday = date.toDateString() === now.toDateString();
		const isYesterday = date.toDateString() === yesterday.toDateString();

		if (isToday) {
			if (secondsAgo < 60) {
				return `${secondsAgo} secs ago`;
			} else if (minutesAgo < 60) {
				return `${minutesAgo} mins ago`;
			} else if (hoursAgo < 24) {
				return `${hoursAgo} hours ago`;
			}
		}

		return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
	}

	function formatDateKey(date) {
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
	}

	function formatItemCount(count) {
		return count < 10 ? `0${count}` : count;
	}

	function groupNotifications() {
		const now = new Date();
		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - 1);

		groupedNotifications = notifications
			.slice() // Create a shallow copy to avoid mutating the original array
			.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
			.reduce((groups, not) => {
				const date = new Date(not.date);
				const isToday = date.toDateString() === now.toDateString();
				const isYesterday = date.toDateString() === yesterday.toDateString();

				let key = formatDateKey(date);
				if (isToday) key = 'Today';
				else if (isYesterday) key = 'Yesterday';

				if (!groups[key]) groups[key] = [];
				groups[key].push(not);

				return groups;
			}, {});
	}

	function mark_read(notification_id) {
		const item = notifications.find((f) => f.id == notification_id);
		if (!item.read) {
			fetch(`/api/mark-read?id=${notification_id}`);
		}
	}

	function gethref(notification) {
		if (notification.url) {
			return notification.url;
		} else if (notification.link) {
			return notification.link;
		} else return '';
	}

	const iconMap = {
		tutorials: courses,
		'game articles': games,
		'local tournament': tournaments,
		'have fun': haveFun,
		'project quest': Quests
	};

	$: groupNotifications();

	let defaultImage = NotificationPlaceHolder;
	function handleError(event) {
		event.target.src = defaultImage;
	}
</script>

<div
	class="flex items-center gap-[6px] px-[12px] py-[9px] rounded-t-[10px] border-b border-[#ffffff0d] bg-[#341C3C]"
>
	<img src={NotificationSmallIcon} alt="" />
	<p dir={$locale == 'ar' ? 'rtl' : 'ltr'} class="text-[#948798] text-[14px] font-Gilroy-Medium">
		{$t('notification')}
	</p>
</div>
<div class=" h-[518px] rounded-b-[10px] w-full overflow-y-scroll">
	<div class="flex flex-col items-start bg-[#2e1536]">
		{#each Object.entries(groupedNotifications) as [group, items]}
			<div class="flex flex-col items-center pt-[14px] border-b border-[#FFFFFF26] w-full">
				<div class="w-full px-[14px]">
					<div
						class="flex items-center justify-between w-full pb-[12px] border-b border-[#FFFFFF1A]"
					>
						<p class="text-[#FFFFFFB2] text-[12px] font-Gilroy">{group}</p>
						<p class="text-[#FFFFFF4D] text-[12px] font-Gilroy">{formatItemCount(items.length)}</p>
					</div>
				</div>
				{#each items as not}
					<a
						on:click={() => mark_read(not.id)}
						href={gethref(not)}
						class="px-[14px] hover:bg-[#FFFFFF0F] w-full {!not.read ? 'bg-[#fdeb560d]' : ''}"
					>
						{#if not.type === 'xp'}
							<div
								class="flex items-center justify-between gap-[10px] py-[12px] border-b border-[#FFFFFF1A] w-full"
							>
								<div class="flex items-start gap-[12px] w-full max-w-[245px]">
									<img src={XPIcon} alt="" class="w-[42px]" />
									<div class="flex flex-col items-start gap-[4px] w-full max-w-[191px]">
										<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium leading-[19px]">
											{not.title}
										</p>
										{#if not.subtitle != ''}
											<p
												class="text-[#FFFFFF66] text-[14px] text-left font-Gilroy-Medium leading-[17px]"
											>
												{not.subtitle}
											</p>
										{/if}
									</div>
								</div>
								<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium leading-[17px]">
									{formatDate(not.date)}
								</p>
							</div>
						{:else if not.type === 'tickets'}
							<div
								class="flex items-center justify-between gap-[10px] py-[12px] border-b border-[#FFFFFF1A] w-full"
							>
								<div class="flex items-start gap-[12px] w-full max-w-[245px]">
									<img src={TicketsIcon} alt="" class="w-[42px]" />
									<div class="flex flex-col items-start gap-[4px] w-full max-w-[191px]">
										<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium leading-[19px]">
											{not.title}
										</p>
										{#if not.subtitle != ''}
											<p
												class="text-[#FFFFFF66] text-[14px] text-left font-Gilroy-Medium leading-[17px]"
											>
												{not.subtitle}
											</p>
										{/if}
									</div>
								</div>
								<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium leading-[17px]">
									{formatDate(not.date)}
								</p>
							</div>
						{:else if not.type === 'level'}
							<div
								class="flex items-start justify-between gap-[10px] py-[12px] border-b border-[#FFFFFF1A] w-full"
							>
								<div class="flex items-start gap-[12px] w-full max-w-[245px]">
									<img src={LevelIcon} alt="" class="w-[42px]" />
									<div class="flex flex-col items-start gap-[4px] w-full max-w-[191px]">
										<p class="text-[#FFFFFFCC] text-[16px] font-Gilroy-Medium leading-[19px]">
											{not.title}
										</p>
										{#if not.subtitle != ''}
											<p
												class="text-[#FFFFFF66] text-[14px] text-left font-Gilroy-Medium leading-[17px]"
											>
												{not.subtitle}
											</p>
										{/if}
									</div>
								</div>
								<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium leading-[17px]">
									{formatDate(not.date)}
								</p>
							</div>
						{:else}
							<div
								class="flex flex-col items-start gap-[12px] py-[12px] border-b border-[#FFFFFF1A]"
							>
								<div class="flex items-center justify-between w-full">
									<div class="flex items-center gap-[6px]">
										<img src={iconMap[not.type]} alt="" class="w-[18px]" />
										<p
											class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium capitalize leading-[17px]"
										>
											{not.type}
										</p>
									</div>

									<div class="flex items-center gap-[4px]">
										<p class="text-[#FFFFFF66] text-[14px] font-Gilroy-Medium leading-[17px]">
											{formatDate(not.date)}
										</p>
										{#if !not.read}
											<ul
												class="text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px] list-disc {$locale ==
												'ar'
													? ' mr-[25px]'
													: ' ml-[25px]'}"
											>
												<li>Unread</li>
											</ul>
										{/if}
									</div>
								</div>

								<div class="flex flex-col items-start gap-[12px] w-full">
									<div class="flex flex-col items-start gap-[6px] w-full">
										<p class="text-[#FFFFFFCC] text-[18px] font-Gilroy-SemiBold leading-[22px]">
											{not.title}
										</p>
										{#if not.subtitle}
											<p class="text-[#FDEB56] text-[14px] font-Gilroy-Medium leading-[17px]">
												{not.subtitle}
											</p>
										{/if}
									</div>
									{#if not.image != ''}
										<img
											src={`${env.PUBLIC_BASE_URL}${not.image}`}
											alt="notification"
											class="w-full rounded-[7px]"
											on:error={handleError}
										/>
									{/if}
								</div>
							</div>
						{/if}
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>
