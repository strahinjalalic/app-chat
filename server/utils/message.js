var moment = require("moment");

var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: moment().valueOf() //ista funkcionalnost kao i new Date().getTimme()
	};
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from,
		url: `https://www.bing.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	};
};

module.exports = {generateMessage, generateLocationMessage};