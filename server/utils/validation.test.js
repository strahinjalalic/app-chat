const expect = require("expect");

const {isRealString} = requrire("./validation");

describe("isRealString", () => {
	it("should reject non-string values", () => {
		var res = isRealString(867);
		expect(res).toBe(false);
	});

	it("should reject string with only spaces", () => {
		var res = isRealString("    ");
		expect(res).toBe(false);
	});

	it("should allow string with non-space characters", () => {
		var res = isRealString("  rezultat  ");
		expect(res).toBe(true);
	});
});