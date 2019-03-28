const expect = require("expect");
const {Users} = require("./users");

describe("Users class", () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "1",
			name: "Mike",
			room: "Node Course"
		}, {
			id: "2",
			name: "Jen",
			room: "React Course"
		}, {
			id: "3",
			name: "John",
			room: "Node Course"
		}];
	});

	it("should add new user", () => {
		var users = new Users();
		var user = {
			id: "123",
			name: "Andrew",
			room: "The office fans"
		};
		var resUser = Users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});

	it("should remove a user", () => {
		var userId = "1";
		users.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it("should not remove a user", () => {
		var userId = "99";
		users.removeUser(userId);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it("should find user", () => {
		var userId = "2";
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it("should not find a user", () => {
		var userId = "99";
		var user = users.getUser(userId);

		expect(user).toNotExist();
	});

	it("should get room name Node Course", () => {
		var userList = users.getUsersList("Node Course");
		expect(userList).toEqual(['Mike', 'John']);
	});

	it("should get room name React Course", () => {
		var userList = users.getUsersList("React Course");
		expect(userList).toEqual(['Jen']);
	});
});