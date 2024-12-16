<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';
	import Show from '$lib/assets/login/Show.svg';
	import Hide from '$lib/assets/login/hide.svg';
	import Editable from '$lib/assets/login/editable.svg';
	import AutoGenerate from '$lib/assets/login/auto-generate.svg';
	import { page } from '$app/stores';

	export let label;
	export let type;
	export let value = '';
	export let name = 'text';
	export let disabled = false;
	export let required = true;

	let username_available = true;
	let show_user_name_msg = false;
	let username_loading = false;
	let auto_gen_username_loading = false;

	// Check if the input has a value to set the label as active
	let isActive = false;

	// Make label active if inputValue is not empty
	$: isActive = value !== '';

	// Variable to control the password visibility
	let showPassword = false;

	// Toggle password visibility
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}

	async function check_user_name(username) {
		if (username.length < 6) {
			username_available = false;
			show_user_name_msg = true;
			return;
		}

		value = username.toLowerCase();

		username_loading = true;
		if (await check_api(username)) {
			username_available = true;
		} else {
			username_available = false;
		}
		show_user_name_msg = true;
		username_loading = false;
	}

	async function check_api(username) {
		const res = await fetch(`/api/check-user-name`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username })
		});
		return (await res.json()).ok;
	}

	async function auto_generate(e) {
		e.stopPropagation();
		auto_gen_username_loading = true;
		let username = '';
		username = $page.data.profile.email.split('@')[0];
		let isUnique = await check_api(username);

		while (!isUnique) {
			const randomSuffix = Math.floor(Math.random() * 10000);
			username = `${username}${randomSuffix}`;
			isUnique = await check_api(username);
		}

		value = username;
		username_available = true;
		show_user_name_msg = true;
		auto_gen_username_loading = false;
	}
</script>

<div class="input-element">
	<label for={name} class={isActive ? 'active' : ''}>
		{label}<span>{required ? '*' : ''}</span>
	</label>

	{#if type === 'password'}
		<div class="password-wrapper">
			{#if showPassword}
				<input autocomplete="off" type="text" bind:value {name} id={name} maxlength="150" />
			{:else}
				<input autocomplete="off" type="password" bind:value {name} id={name} maxlength="150" />
			{/if}
			<button
				class=" absolute top-[50%] translate-y-[-50%] {$locale === 'ar'
					? 'left-[13px]'
					: 'right-[13px]'}"
				type="button"
				on:click={togglePasswordVisibility}
			>
				{#if showPassword}
					<img src={Hide} alt="" class="w-[24px]" />
				{:else}
					<img src={Show} alt="" class="w-[24px]" />
				{/if}
			</button>
		</div>
	{:else if type === 'text'}
		<input autocomplete="off" {disabled} type="text" bind:value {name} id={name} maxlength="150" />
	{:else if type === 'email'}
		<input autocomplete="off" type="email" bind:value {name} {disabled} id={name} maxlength="150" />
	{:else if type === 'name'}
		<input autocomplete="off" type="text" bind:value {name} id={name} maxlength="150" />
		<div
			class="flex items-center gap-[8px] absolute top-[50%] translate-y-[-50%] {$locale === 'ar'
				? 'left-[13px]'
				: 'right-[13px]'}"
		>
			<img src={Editable} alt="" class="w-[20px]" />
			<p class="text-[#FFFFFF66] text-[16px] font-Gilroy-Medium">{$t('Editable')}</p>
		</div>
	{:else if type === 'amount'}
		<input autocomplete="off" type="text" bind:value {name} id={name} maxlength="150" />
		<button
			class="flex items-center gap-[8px] absolute top-[50%] translate-y-[-50%] {$locale === 'ar'
				? 'left-[13px]'
				: 'right-[13px]'}"
		>
			<p class="text-[#8EC9ED] text-[16px] underline font-Gilroy-Medium">MAX</p>
		</button>
	{:else if type === 'username'}
		<div class="relative w-full">
			<input
				autocomplete="off"
				type="text"
				bind:value
				{name}
				id={name}
				on:input={(e) => check_user_name(e.target.value)}
				maxlength="150"
			/>
			<button
				disabled={auto_gen_username_loading}
				on:click={auto_generate}
				class="flex items-center gap-[8px] absolute top-[50%] translate-y-[-50%] {$locale === 'ar'
					? 'left-[13px]'
					: 'right-[13px]'}"
			>
				<img src={AutoGenerate} alt="" class="w-[20px]" />
				<p class="text-[#8EC9ED] text-[16px] font-Gilroy-Medium">
					{$t('Auto Generate')}
					{auto_gen_username_loading ? '....' : ''}
				</p>
			</button>
		</div>
		<div>
			{#if username_loading}
				<span class="text-white">...</span>
			{:else if show_user_name_msg && username_available}
				<span class="text-green">{$t('Available')}</span>
			{:else if show_user_name_msg}
				<span class="text-accent-red">{$t('not available')}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.input-element {
		width: 100%;
		position: relative;
	}

	.input-element:focus-within label,
	.input-element label.active {
		font-size: 12px;
		color: #beb6c0;
		transform: translateY(-150%) scale(0.85);
		background: var(--Accent-2, #200b26);
		padding: 0 8px !important;
	}

	.input-element label {
		position: absolute;
		color: #ffffff66;
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		top: 15px;
		left: 1px;
		padding: 0 15px;
		border-radius: 3px;
		transition: transform 0.2s ease, font-size 0.2s ease, color 0.2s ease;
		z-index: 1;
	}

	.input-element label:lang(ar) {
		left: unset;
		right: 1px;
	}

	.input-element label.active {
		font-size: 14px;
		color: #beb6c0;
		transform: translateY(-150%) scale(0.85);
		background: var(--Accent-2, #150719);
		padding: 0 8px !important;
	}

	.input-element label span {
		color: var(--Accent, #f71756);
	}

	.input-element input {
		width: 100% !important;
		padding: 15px !important;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		font-size: 18px !important;
		font-style: normal !important;
		font-weight: 400 !important;
		background-color: transparent !important;
		color: var(--white-80, #d4cfd6) !important;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		border: 1px solid var(--white-10, #3d2644) !important;
		-webkit-text-fill-color: var(--white-80, #d4cfd6) !important;
		-webkit-box-shadow: 0 0 0px 1000px #140718 inset !important;
		transition: background-color 5000s ease-in-out 0s;
	}

	/* .input-element input[type='date'] {
		color-scheme: dark;
	} */

	/* textarea {
		height: 160px;
	} */

	.input-element input:focus-visible {
		outline: 0;
		border: 1px solid var(--Accent, #fdeb56) !important;
		background: var(--Accent-2, #200b26);
	}

	.password-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
	}

	/* .toggle-button {
		position: absolute;
		right: 10px;
		padding: 5px 10px;
		background: none;
		border: none;
		color: var(--Accent, #f71756);
		font-family: Gilroy-Medium;
		cursor: pointer;
	} */

	@media (max-width: 1024px) {
		.input-element input {
			padding: 14px !important;
			font-size: 16px !important;
		}
	}
</style>
