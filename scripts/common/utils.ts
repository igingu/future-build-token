import { Constants } from "./constants";

export const getDayInSecondsByOffset = (offsetInDays: number): number => {
	return (
		(Math.floor(Date.now() / Constants.MILLISECONDS_IN_A_DAY) + offsetInDays) *
		Constants.SECONDS_IN_A_DAY
	);
};
