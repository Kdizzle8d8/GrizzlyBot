import calendar from "./formattedCalendar.json";

const today = new Date();

export const getDayType = (month: number, day: number) => {
	const targetMonth = calendar.months.find((m) => m.number === month);
	day = day - 1;
	return targetMonth?.days[day];
};

export const getTodayType = () => {
	const month = today.getMonth() + 1;
	const day = today.getDate();
	return getDayType(month, day);
};
