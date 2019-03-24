var socket = io();//pravimo zahtev od klijenta ka serveru za otvaranje web socketa i odrzavanje te konekcije otvorenom
  	socket.on("connect", function() {
  		console.log("Connected to server");//metod se izvrsava na klijent strani

  		// socket.emit("createMessage", {
  		// 	from: "Mike",
  		// 	text: "Best regards from our team!"
  		// });
  	});

  	socket.on("newMessage", function(message) {//argument koji prosledjujemo je zapravo objekat kreiran na server strani
  		console.log("newMessage", message);
  	});

  	socket.on("disconnect", function() {//arrow functions ce se renderovati samo na chrome-u, zato se koriste regular functions
  		console.log("Disconnected from server");
  	});