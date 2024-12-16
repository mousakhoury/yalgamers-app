import { writable } from 'svelte/store';
import level1 from '$lib/assets/badges/rank1.png';
import level2 from '$lib/assets/badges/rank2.png';
import level3 from '$lib/assets/badges/rank3.png';
import level4 from '$lib/assets/badges/rank4.png';
import level5 from '$lib/assets/badges/rank5.png';
import level6 from '$lib/assets/badges/rank6.png';
import level7 from '$lib/assets/badges/rank7.png';
import level8 from '$lib/assets/badges/rank8.png';
import level9 from '$lib/assets/badges/rank9.png';
import level10 from '$lib/assets/badges/rank10.png';
import level11 from '$lib/assets/badges/rank11.png';
import level12 from '$lib/assets/badges/rank12.png';
import level13 from '$lib/assets/badges/rank13.png';
import level14 from '$lib/assets/badges/rank14.png';
import level15 from '$lib/assets/badges/rank15.png';

export let levels = writable([
	{
		title: 'Beginner',
		start: 0,
		end: 1000,
		img: level1
	},
	{
		title: 'Apprentice',
		start: 1001,
		end: 10000,
		img: level2
	},
	{
		title: 'Rookie',
		start: 10001,
		end: 25000,
		img: level3
	},
	{
		title: 'Adept',
		start: 25001,
		end: 50000,
		img: level4
	},
	{
		title: 'Skilled',
		start: 50001,
		end: 75000,
		img: level5
	},
	{
		title: 'Professional',
		start: 75001,
		end: 100000,
		img: level6
	},
	{
		title: 'Expert',
		start: 100001,
		end: 150000,
		img: level7
	},
	{
		title: 'Veteran',
		start: 150001,
		end: 200000,
		img: level8
	},
	{
		title: 'Master',
		start: 200001,
		end: 300000,
		img: level9
	},
	{
		title: 'Grandmaster',
		start: 300001,
		end: 400000,
		img: level10
	},
	{
		title: 'Champion',
		start: 400001,
		end: 500000,
		img: level11
	},
	{
		title: 'Heroic',
		start: 500001,
		end: 600000,
		img: level12
	},
	{
		title: 'Legendary',
		start: 600001,
		end: 700000,
		img: level13
	},
	{
		title: 'Mythic',
		start: 700001,
		end: 850000,
		img: level14
	},
	{
		title: 'Ultimate',
		start: 850001,
		end: 1000000,
		img: level15
	}
]);

export function findLevel(xp) {
	let index = 0;
	levels.subscribe((items) => {
		items.forEach((e, i) => {
			if (xp >= e.start && xp <= e.end) {
				index = i;
			}
		});
	});
	return index;
}

