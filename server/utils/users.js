class Users {
	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		var user = this.users.filter((user) => user.id === id)[0];
		if(user) {
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}
	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}
	getUsersList(room) {
		var users = this.users.filter((user) => user.room === room);
		var namesArray = this.users.map((user) => user.name);

		return namesArray;
	}
}



module.exports = {Users};

// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription() {
// 		return `${this.name} is ${this.age} year(s) old.`
// 	}
// }

// var me = new Person("Strahinja", 21);
// var desc = me.getUserDescription();
// console.log(desc);