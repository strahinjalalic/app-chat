var socket = io();//pravimo zahtev od klijenta ka serveru za otvaranje web socketa i odrzavanje te konekcije otvorenom
  	
    socket.on("connect", function() {
  	 var params = jQuery.deparam(window.location.search); //metod koji uzima string iz search url bara i konvertuje ga u key/value parove

     socket.emit("join", params, function(err){
      if(err){
        alert(err);
        window.location.href = "/";
      } else {
        console.log("No errors");
      }
     });
  	});

    function scrollToBottom() {//funkcija koja ce skrolovati na dole automatski pri pisanju poruka, a ukoliko smo mi skrolovali malo vise na gore(iznad poslednje poruke), nece nas spustati dole kada dodje nova poruka
      //Selektori
      var messages = jQuery("#messages");
      var newMessage = messages.children("li:last-child");
      //Heights
      var clientHeight = messages.prop("clientHeight");
      var scrollTop = messages.prop("scrollTop");
      var scrollHeight = messages.prop("scrollHeight");
      var newMessageHeight = newMessage.innerHeight();
      var lastMessageHeight = newMessage.prev().innerHeight();

      if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
          messages.scrollTop(scrollHeight);//metod koji skroluje
      }
    };


  	socket.on("newMessage", function(message) {//argument koji prosledjujemo je zapravo objekat kreiran na server strani
  	  var formattedTime = moment(message.createdAt).format("h:mm a"); // ne moramo da ucitamo biblioteku ovde, ucitavamo moment.js kao skriptu unutar html strane
      var template = jQuery("#message-template").html();
      var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      });

      jQuery("#messages").append(html);
      scrollToBottom(); //poziva se nakon appenda => logicno
  	});

  	socket.on("disconnect", function() {//arrow functions ce se renderovati samo na chrome-u, zato se koriste regular functions
  		console.log("Disconnected from server");
  	});

    socket.on("updateUserList", function(users) {
      var ol = jQuery("<ol></ol>");

      users.forEach(function(user) {
        ol.append(jQuery("<li></li>").text(user));
      });

      jQuery("#users").html(ol);
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
        scrollToBottom();
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