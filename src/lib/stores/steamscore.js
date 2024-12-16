import { writable } from 'svelte/store';
export const score = writable(0);
export const last_scanned = writable(new Date());
export const steam_data = writable(null);