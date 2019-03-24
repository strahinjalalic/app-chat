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

	socket.emit("newMessage", {//server emituje akciju ka klijentu emit() metodom, ime metoda mora da se podudara sa imenom na klijent strani
		from: "Andrew",
		text: "Hey. What's going on?",
		createdAt: 123
	});

	socket.on("createMessage", (message) => {
		console.log("New message", message);
	})

	socket.on("disconnect", () => {
		console.log("User disconnected");//printuje se u terminalu kad se iskljuci chrome(tj. tab u kome prikazujemo stranicu)
	});
}); 


server.listen(port, () => {
	console.log(`Server je pokrenut na portu ${port}`);
});