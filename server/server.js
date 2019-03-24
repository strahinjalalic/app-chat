const path = require("path"); //built-in module, ne mora da se instalira u terminalu
const publicPath = path.join(__dirname + "../public"); //izlazi se iz server foldera i ulazi u public => koristi se join() zato sto u apsolutnoj putanji ne belezi ulazak u server pa izlazak iz njega, vec samo ulazak u public 
var http = require("http");
var socketIO = require("socket.io");
const express = require("express");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); // ovaj metod je inace deo listen() metoda, ali je pravilnije listen() pozivati sa server promenljivom u ovom slucaju
var io = socketIO(server); // konfigursanje servera da takodje koristi socketIO

app.use(express.static(publicPath));


io.on("connection", (socket) => {//server izvrsava neku akciju kada se novi user konektuje
	console.log("New user connected");

	socket.emit("newMessage", {
		from: Admin,
		text: "Welcome to the chat app!",
		createdAt: new Date().getTime()
	});

	socket.broadcast.emit("newMessage", {
		from: Admin,
		text: "New user has joined chatt app",
		createdAt: new Date().getTime()
	});

	socket.on("createMessage", (message) => {
		console.log("New message", message);
		io.emit("newMessage", {  //ovim metodom server emituje poruku svakom user-u sa otvorenom konekcijom(pravi se poruka u Consoli ali socket.emit(createMessage) metodom, videce se i u drugom tabu poruka)
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});


		// socket.broadcast.emit("newMessage", {  // broadcast => svima ce se emitovati poruka osim onom ko salje tu poruku
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");//printuje se u terminalu kad se iskljuci chrome(tj. tab u kome prikazujemo stranicu)
	});
}); 


server.listen(port, () => {
	console.log(`Server je pokrenut na portu ${port}`);
});