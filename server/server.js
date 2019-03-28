const path = require("path"); //built-in module, ne mora da se instalira u terminalu
const publicPath = path.join(__dirname + "./../public"); //izlazi se iz server foldera i ulazi u public => koristi se join() zato sto u apsolutnoj putanji ne belezi ulazak u server pa izlazak iz njega, vec samo ulazak u public 
var http = require("http");
var socketIO = require("socket.io");
const express = require("express");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require('./utils/users');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); // ovaj metod je inace deo listen() metoda, ali je pravilnije listen() pozivati sa server promenljivom u ovom slucaju
var io = socketIO(server); // konfigursanje servera da takodje koristi socketIO
var users = new Users();

app.use(express.static(publicPath));


io.on("connection", (socket) => {//server izvrsava neku akciju kada se novi user konektuje
	console.log("New user connected");

	socket.on("join", (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback("Name and room name are required!");
		}

		socket.join(params.room); //pridruzje user-a grupi kojoj zeli da pristupi(samo clanovi grupe vide poruke)
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit("updateUserList", users.getUsersList(params.room));
		socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
		socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} has joined the room!`));//prikazuje se poruka svima u grupi osim user-u koji se priduzio
		callback();
	});

	socket.on("createMessage", (message, callback) => {
		console.log("New message", message);
		io.emit("newMessage", generateMessage(message.from, message.text)); //ovim metodom server emituje poruku svakom user-u sa otvorenom konekcijom(pravi se poruka u Consoli ali socket.emit(createMessage) metodom, videce se i u drugom tabu poruka;
		callback(); //odnosi se na event acknowledgement callback => potencijalni argument koji se prosledjuje je odgovor servera na poslat event acknowledge
	});

	socket.on("createLocationMessage", (coords) => {
		io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
	});

	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id); //uklanjamo korisnika pri diskonektovanju sa stranice

		if(user) {
			io.to(user.room).emit("updateUserList", users.getUsersList(user.room));//update-ujemo listu korisnika kada jedan korisnik napusti stranicu
			io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
		}
	});
}); 


server.listen(port, () => {
	console.log(`Server je pokrenut na portu ${port}`);
});