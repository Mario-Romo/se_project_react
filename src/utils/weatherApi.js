export const getWeather = ({ latitude, longitude }, APIkey) => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
	).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error: ${res.status}`);
		}
	});
};

/* function to filter data and extract only the props needed */
export const filterWeatherData = (data) => {
	const result = {};
	result.city = data.name;
	result.temp = { F: data.main.temp };
	result.type = getWeatherCondition(result.temp.F);
	result.condition = data.weather[0].main.toLowerCase();
	result.isDay = isDay(data.sys, Date.now());
	return result;
};

/* function to determine whether is day or night */
const isDay = ({ sunrise, sunset }, now) => {
	return sunrise * 1000 < now && now < sunset * 1000;
};

/* function to set the range that determines the type of weather, doesn't get exported because is used here */
const getWeatherCondition = (temperature) => {
	if (temperature >= 86) {
		return 'hot';
	} else if (temperature >= 66) {
		return 'warm';
	} else {
		return 'cold';
	}
};
