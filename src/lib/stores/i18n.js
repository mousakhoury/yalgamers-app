// @ts-nocheck
import { derived, writable } from 'svelte/store';
import translations from './translations.js';
import { browser } from '$app/environment';

function fromLocalStorage(storageKey, fallbackValue) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey);

		if (storedValue !== 'undefined' && storedValue !== null) {
			return typeof fallbackValue === 'object' ? JSON.parse(storedValue) : storedValue;
		}
	}

	return fallbackValue;
}

export const locale = writable(fromLocalStorage('preferred_language', 'en'));
export const locales = Object.keys(translations);

function translate(locale, key, vars) {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	try {
		// Grab the translation from the translations object.
		let text = translations[locale][key];

		if (!text) throw new Error(`no translation found for ${locale}.${key}`);

		// Replace any passed in variables in the translation string.
		Object.keys(vars).map((k) => {
			const regex = new RegExp(`{{${k}}}`, 'g');
			text = text.replace(regex, vars[k]);
		});

		return text;
	} catch (error) {
		key;
	}
}

export const t = derived(
	locale,
	($locale) =>
		(key, vars = {}) =>
			translate($locale, key, vars)
);
