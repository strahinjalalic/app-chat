const path = require("path"); //built-in module, ne mora da se instalira u terminalu
const publicPath = path.join(__dirname + "../public"); //izlazi se iz server foldera i ulazi u public => koristi se join() zato sto u apsolutnoj putanji ne belezi ulazak u server pa izlazak iz njega, vec samo ulazak u public 
const express = require("express");
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));





app.listen(3000, () => {
	console.log(`Server je pokrenut na portu ${port}`);
});