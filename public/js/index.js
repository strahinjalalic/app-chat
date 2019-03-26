var socket = io();//pravimo zahtev od klijenta ka serveru za otvaranje web socketa i odrzavanje te konekcije otvorenom
  	socket.on("connect", function() {
  		console.log("Connected to server");//metod se izvrsava na klijent strani
  	});

  	socket.on("newMessage", function(message) {//argument koji prosledjujemo je zapravo objekat kreiran na server strani
  	  var formattedTime = moment(message.createdAt).format("h:mm a"); // ne moramo da ucitamo biblioteku ovde, ucitavamo moment.js kao skriptu unutar html strane
      var template = jQuery("#message-template").html();
      var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      });

      jQuery("#messages").append(html);
  	});

  	socket.on("disconnect", function() {//arrow functions ce se renderovati samo na chrome-u, zato se koriste regular functions
  		console.log("Disconnected from server");
  	});

      jQuery("#message-form").on("submit", function(e) {
        e.preventDefault();//sprecavamo refresh stranice i pojavu key/value para u URL baru => zapravo sprecavaju se sve defaultne akcije submita
        var messageTextbox = jQuery('[name=message]');

        socket.emit("createMessage", {
          from: "User",
          text: messageTextbox.val()
        }, function() {
          messageTextbox.val(""); //praznjenje textbox-a nakon slanja poruke
        });
      });

    socket.on("newLocationMessage", function(message) {
        var formattedTime = moment(message.createdAt).format("h:mm a");
        var template = jQuery("#location-message-template").html();
        var html = Mustache.render(template, {
          from: message.from,
          createdAt: formattedTime,
          url: message.url
        });

        jQuery("#messages").append(html);
    });

    var locationButton = jQuery("#send-location");
    locationButton.on("click", function(){
      if(!navigator.geolocation) {
        return alert("Your browser doesn't support geolocation");
      }

      locationButton.attr("disabled", "disabled").text("Sending location...");

      navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function() {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
      });
    });


    //socket.emit("createMessage", {
    //   from: "Frank",
    //   text: "Hello everyone"
    // }, function(data){//data se odnosi na string koji smo prosledili callbacku na server strani
    //   console.log("Got it!", data); //treci argument u ovom slucaju je callback funkcija koja se zove event acknowledgements => pise se kod kojim ce server odgovoriti user-u da su podaci uspesno poslati na server
    // });