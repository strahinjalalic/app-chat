var moment = require("moment");

var date = moment(); //ovako pozvan metod ce vratiti trenutno vreme
//date.add(1, "year").subtract(5, "months"); //metodi za dodavanje i oduzimanje vremena
//console.log(date.format("MMM YYYY, Do")); //MMM je sablon koji vraca skracenicu za trenutni mesec, YYYY vraca trenutnu godinu(zarez samo sa prikaz), Do vraca redni broj dana(1st, 2nd..) => ukoliko ne prosledimo nista, vratice kompletan datum

console.log(date.format("h:mm a"));