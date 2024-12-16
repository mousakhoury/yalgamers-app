import { writable } from "svelte/store";
import banner1 from '$lib/assets/banner-1.png'

export const bannerImg = writable({title:"New tournament from Yal Gamers.",sub:"New tournament from Yal Gamers with a prize money of $1000. So don’t be lated. Register now.",img:banner1})