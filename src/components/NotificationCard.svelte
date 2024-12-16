<script>
	export let data;

	import courses from '$lib/assets/courses-not-icon.svg';
	import games from '$lib/assets/games-not-icon.svg';
	import tournaments from '$lib/assets/tournamet-not-icon.svg';

	import Image from '$lib/assets/notification-test.png';

	function timeAgo(date) {
		const now = new Date();
		const secondsPast = (now.getTime() - date.getTime()) / 1000;

		if (secondsPast < 60) {
			return `${Math.round(secondsPast)} seconds ago`;
		}
		if (secondsPast < 3600) {
			return `${Math.round(secondsPast / 60)} minutes ago`;
		}
		if (secondsPast <= 86400) {
			return `${Math.round(secondsPast / 3600)} hours ago`;
		}
		if (secondsPast > 86400) {
			const day = date.getDate();
			const month = date
				.toDateString()
				.match(/ [a-zA-Z]*/)[0]
				.replace(' ', '');
			const year = date.getFullYear() === now.getFullYear() ? '' : ` ${date.getFullYear()}`;
			return `${day} ${month}${year}`;
		}
	}

	const handleClick = async () => {
		if (data.read) return;
		data.read = true;
		const res = await fetch('/api/notifications/' + data.id, {
			method: 'POST'
		});
		const _data = await res.json();
		data = _data;
	};

	let message = '';
	let image = null;
	let title = '';
	let icon = null;
	let content = '';

	if (data.data.type === 'XP_REWARD') {
		let xp = data.data.subType.xp ?? '';
		let subType = data.data.subType.type;

		if (subType === 'DURATION') {
			title = 'Spending Time';
			message = `Congratulations, You have recevied ${xp}XP for spending time on the platform.`;
		} else if (subType === 'COURSE_REVIEW') {
			icon = courses;
			title = 'Course';
			message = `Congratulations, You have recevied XP for completing the course.`;
		} else if (subType === 'GAME_REVIEW') {
			icon = games;
			title = 'Game';
			message = `Congratulations, You have recevied ${xp}XP for reviewing the game.`;
		} else if (subType === 'LINKING') {
			title = 'Socials';
			message = `Congratulations, You have recevied ${xp}XP for linking your account with ${data.data.subType.subType}`;
		} else if (subType === 'SIGN_UP') {
			title = 'Sign Up';
			message = 'Welcome';
			content = `
                Welcome to Yalgamers

                Hey there  username!  We're thrilled to have you join our community. Here’s a quick start to ensure you have an epic gaming journey with us:

                Explore & Play: Dive into our vast library of games - there’s something for everyone! 

                Connect with Gamers: Join our forums and chat rooms to meet fellow gaming enthusiasts. Share tips, strategies, or just some good old fun banter. 
                Customize Your Experience: Check out your profile settings. Customize your avatar, manage notifications, and set up your gaming preferences. 
                Stay Updated: Keep an eye on this notification section for the latest game releases, updates, and exclusive events. 
                Get Support: Got questions? Our support team is here to help you navigate and enjoy a seamless gaming experience.`;
		} else if (subType === 'REFERRAL') {
			title = 'Referral reward';
			message = `Congratulations, You have recevied ${xp}XP for referring your friend.`;
		} else if (subType === 'TOURNAMENT_REGISTRATION') {
			message = 'Congratulations, You have recevied XP from registering to the tournamet.';
			icon = tournaments;
        }else if ( subType === 'DAILY_MINI_GAME' ){
            message = `Congratulations, You have recevied ${xp}XP for being rank #${data.data.subType.rank} in a mini-game.`
            title = 'Have Fun'
        }
	}
</script>

<div class={`notification-card ${data.read ? 'read' : ''}`} on:click={handleClick}>
	<div class="type-date">
		<div class="type">
			{#if icon}
				<img src={icon} alt="" />
			{/if}
			<p>{title}</p>
		</div>
		<span>&#8226;</span>
		<div class="date">{timeAgo(new Date(data.created))}</div>
	</div>
	<div class="title">{message}</div>

	{#if content}
		<ul>
			<li>{content}</li>
		</ul>
	{/if}
	{#if image}
		<img src={image} alt="" />
	{/if}
</div>

<style>
	.main-date {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: 24px;
		padding-top: 19px;
		margin-bottom: 15px;
	}

	.notification-card {
		padding: 15px 20px 15px 15px;
		width: 100%;
		align-items: center;
		flex-shrink: 0;
		border-radius: 6px;
		background: #2a1430;
		margin-bottom: 15px;
	}

	.read {
		background: #481e54;
	}

	.type-date {
		display: flex;
		align-items: flex-end;
		gap: 15px;
	}

	.type {
		display: flex;
		align-items: flex-end;
		gap: 10px;
	}

	.type p,
	.date,
	.notification-card span {
		color: var(--white-50, #948798);
		font-family: Gilroy-Medium;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.title {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 17.6px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 15px;
		max-width: 342px;
	}

	.notification-card ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 15px;
		margin-bottom: 10px;
		margin-left: 15px;
	}

	.notification-card ul:lang(ar) {
		margin-left: 0;
		margin-right: 15px;
	}

	.notification-card li {
		color: var(--white-70, #beb6c0);
		font-family: Gilroy-Medium;
		font-size: 14.4px;
		font-style: normal;
		font-weight: 400;
		line-height: 24px; /* 133.333% */
	}

	.notification-card img {
		border-radius: 7px;
		width: 100%;
		max-width: 342px;
	}
</style>
