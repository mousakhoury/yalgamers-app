// @ts-nocheck
import { env } from '$env/dynamic/public';

export function generateUsername(name) {
	const random = Math.floor(Math.random() * 100) + 1;
	const id = random.toString(16);
	return `${name.slice(0, 5)}${id}`;
}

export const getImageUrl = (collectionId, recordId, fileName) => {
	return `${env.PUBLIC_BASE_URL}/api/files/${collectionId}/${recordId}/${fileName}`;
};

export function validateData(formData, schema) {
	const body = Object.fromEntries(formData);
	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (e) {
		console.log(e);
		const errors = e.flatten();
		return {
			formData: body,
			errors
		};
	}
}

// A function to shorten an Ethereum address
export function shortenAddress(address, chars = 4) {
	// Ensure the address is a string and not null or undefined
	if (!address) return '';
	// Take the first `chars + 2` characters (to include the '0x') and the last `chars` characters and combine them
	return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function getDateFromTimestamp(timestamp) {
	// Create a new Date object using the provided timestamp
	const date = new Date(timestamp);

	// Extract the year, month, and day from the date object
	const year = date.getFullYear();
	// Months are zero-based, so we add 1 to get the correct month
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// Return the formatted date string
	return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

export function getTimeFromTimestamp(timestamp) {
	// Create a new Date object using the provided timestamp
	const date = new Date(timestamp);

	// Extract the hour, minute, and second from the date object
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Return the formatted time string
	return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''
		}${seconds}`;
}

export function getOneWeekBeforeToday() {
	// Get today's date
	let today = new Date();

	// Subtract 7 days from today's date
	let oneWeekBefore = new Date(today);
	oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);

	// Extract year, month, and day
	let year = oneWeekBefore.getFullYear();
	let month = (oneWeekBefore.getMonth() + 1).toString().padStart(2, '0');
	let day = oneWeekBefore.getDate().toString().padStart(2, '0');

	// Format and return the date
	return `${year}-${month}-${day}`;
}
