var expect = require("expect");
var {generateMessage, genrateLocationMessage} = require("./message");

describe("generate message", () => {
	it("should generate correct message object", () => {
		var from = "Jen";
		var text = "Some message";
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA("number");
		expect(message).toInclude({from, text});
	});
});

describe("generate location message", () => {
	it("should generate correct location object", () => {
		var from = "Deb";
		var latitude =  15;
		var longitude = 19;
		var url = `https://www.google.com/maps?q=15,19`;
		var message = genrateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA("number");
		expect(message).toInclude({from, url});
	});
});