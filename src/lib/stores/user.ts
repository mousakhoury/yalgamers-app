import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const user: Writable<typeof loginedUser> = writable(null);

