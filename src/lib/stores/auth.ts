import type { Writable } from "svelte/store";
import {writable} from 'svelte/store'

export const stepForget:Writable<number> = writable(1)

export const stepSignup:Writable<number> = writable(1)