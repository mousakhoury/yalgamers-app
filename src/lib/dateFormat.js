export default (date) => {
	const addLeadingZero = (x) => ((x + '').length === 1 ? `0${x}` : x);

	const formattedDate = `${date.getFullYear()}-${addLeadingZero(
		date.getMonth() + 1
	)}-${addLeadingZero(date.getDate())}`;

	return formattedDate;
};
