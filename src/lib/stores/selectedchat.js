import { writable } from 'svelte/store';

export const chatStore = writable([]);
export const selectedChatStore = writable(undefined);
export const selectedChatMembers = writable([]);