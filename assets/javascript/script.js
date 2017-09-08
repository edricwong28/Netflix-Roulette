  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAvYUBg47CmdjD-J_-XYOcD_Xi2ekHg7lI",
    authDomain: "netflix-group-project-1.firebaseapp.com",
    databaseURL: "https://netflix-group-project-1.firebaseio.com",
    projectId: "netflix-group-project-1",
    storageBucket: "netflix-group-project-1.appspot.com",
    messagingSenderId: "179076092851"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();
  
              //when SUBMIT is clicked, save inputs into variables______________________________________________________________________________________
              $("#submitbtn").click(function(event){


                var city = $("#city").val().trim();
                var actor = $("#actor").val().trim();


                console.log(city);
                console.log(actor);

                // create "temporary" object for holding user's data
                newObject = {
                  city: city,
                  actor: actor
                };

                // Uploads  data to the database
                database.ref().push(newObject);


                //Clears input boxes;
                  $("#city").val("");
                  $("#actor").val("");

              getflix();
            });

          //END OF SUBMIT BUTTON FOR ROULETTE

              //SIGNUP BUTTON___________________________________________________________________________________________________________________________
              $("#signupbtn").click(function(event){

                var email = $("#email").val().trim();
                var password = $("#password").val().trim();
               
                newObject2 = {
                  email: email,
                  password: password
                };

                  console.log(email);
                  console.log(password);

                // Uploads  data to the database, this will "trigger" the "child_added" event
                database.ref().push(newObject2);

                  //Clears input boxes
                  $("#email").val("");
                  $("#password").val("");

                  authRegister(event);
                });

           //END OF SIGNUP BUTTON

              //SIGNIN BUTTON___________________________________________________________________________________________________________________________
              $("#loginbtn").click(function(event){

                 var email = $("#login_email").val().trim();
                 var password = $("#login_password").val().trim();

                  newObject3 = {
                    email: email,
                    password: password
                  };

                 database.ref().push(newObject3);

                  $("#login_email").val("");
                  $("#login_password").val("");

                authLogin(event);
              });
  

    //MATERIALIZE SCRIPTS
  $(document).ready(function(){
      // $('.carousel').carousel({dist:0});
      $('.modal').modal();
      $('.parallax').parallax();
      Materialize.updateTextFields();
      $('select').material_select();
      // $('.carousel.carousel-main').carousel({fullWidth: true});
      // $('.slider').slider();        
      // $('select').material_select('destroy');
  });
     

    function getflix(){ 

      console.log("WORKGIN!")

      var key = "819174faa3fc447084b0d2c6d4bf1418";
      //WEATHER DATA WILL USE CITY INPUT FROM FIREBASE OBJECT
      var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + newObject.city + "&APPID=" + key;
   
      var netflixURL = "https://netflixroulette.net/api/api.php?" + "actor=" + newObject.actor;
     
      // var req = new XMLHttpRequest();

      var getWeather = $.ajax({
          url: URL,
          method: "GET"
          })

      var getNetflix = $.ajax ({
          url: netflixURL,
          method: "GET"

          // req.open('GET', netflixURL + actor + true);
          // req.addEventListener("load", function() {
          //     var response = JSON.parse(req.responseText);
          //     console.log(response);
          // });
          // req.send(null);
          })
 
   //MULTIPLE AJAX CALLS METHOD
   $.when(getWeather, getNetflix).done(function(r1, r2) {

       r1 = r1[0];
      //r2[0] is pointing to the "parent" array, which holds mulipltle objects
       r2 = r2[0];
       r1.main.temp = ((r1.main.temp) * 9/5) - 459.67;


       //FOR WEATHER ICON IMAGE TO DISPLAY
         var iconCode = r1.weather[0].icon;
         var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
         var icon = $("<img>").attr("src", iconURL);

         // $("#weatherTable > tbody").append("<tr><td>" + r1.name + "</td> <td>" + r1.main.temp + "</td> <td>" +
         //         r1.weather[0].main + "</td><td>" + r1.weather[0].description + "</td><td>" + icon + "</td></tr>");

        $("#1").html(r1.name);
        $("#2").html(r1.main.temp +" °F");
        $("#3").html(r1.weather[0].main);
        $("#4").html(r1.weather[0].description);
        $("#5").html(icon);
        
      console.log(r1.main.temp);
      console.log(r1.weather[0].main);
      console.log(r1.weather[0].description);
      console.log(r1.weather[0].icon);

      console.log(r1);
      console.log(r2[0]);
      console.log(r2);

      console.log("TESTING!!!!");
      console.log(r2[1].category);



          for(i=0; i < r2.length; i++){

             if(r1.weather[0].main == "Clear" && (r2[i].category == "Action & Adventure" || r2[i].category == "Comedies" || r2[i].category == "Independent Movies"  || r2[i].category == "Sports" )){

                var results = document.getElementById("results")
                var newDiv = document.createElement("div")

                var imgURL = r2[i].poster;
                var imgDiv = $('<a id="imgDiv" class="carousel-item carousel-item-custom">');
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;
                $("#results").prepend(newDiv);
                
                imgDiv.append(img);
                $('#main-carousel').append(imgDiv);
                

                // $(".carousel-item").prepend(img);
                // $(".carousel").prepend(imgDiv);
                // $("#results").prepend(newDiv);
                
   
              }

              else if((r1.weather[0].main == "Clouds" || r1.weather[0].main == "Haze" || r1.weather[0].main == "Mist") && (r2[i].category == "Dramas" || r2[i].category == "Thrillers" || r2[i].category == "TV Shows")){
                var results = document.getElementById("results")
                var newDiv = document.createElement("div")

                var imgURL = r2[i].poster;
                var imgDiv = $('<a id="imgDiv" class="carousel-item carousel-item-custom">');
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;
                $("#results").prepend(newDiv);

                imgDiv.append(img);
                $('#main-carousel').append(imgDiv);
         
                

              }

              else if((r1.weather[0].main == "Rain" || r1.weather[0].main == "Drizzle" || r1.weather[0].main == "Thunderstorm" || r1.weather[0].main == "Snow") && 
                (r2[i].category == "Oscar-winning Movies" || r2[i].category == "Sci-Fi & Fantasy" || r2[i].category == "Faith & Spirituality" || r2[i].category == "Documentaries" || r2[i].category == "Classic Movies" || r2[i].category == "Children & Family" || r2[i].category == "Romance" || r2[i].category == "Anime")){
                
                var results = document.getElementById("results")
                var newDiv = document.createElement("div")

                var imgURL = r2[i].poster;
                var imgDiv = $('<a id="imgDiv" class="carousel-item carousel-item-custom">');
                var img = $("<img>").attr("src", imgURL);

                newDiv.innerHTML = r2[i].show_title;
                $("#results").prepend(newDiv);
                
                imgDiv.append(img);
                $('#main-carousel').append(imgDiv);
                
              }

          }
          $('#main-carousel').carousel();
          // $('.slider').slider();



     });
    }


// User SignUp
function authRegister(event) {
  event.preventDefault();
  var registerForm = $("form[name='registerForm']");
  var reg_email = registerForm.find('#email').val();
  var reg_password = registerForm.find('#password').val();

  // reg_email = JSON.stringify(reg_email);
  // reg_password = JSON.stringify(reg_password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(reg_email, reg_password)
    .then(function () {
      this.firebaseToken.innerHTML = "Registered successfully !";
    })
    .catch(function(err) {
      alert(err.message);
    })
}


// User SignIn
function authLogin(event) {
  event.preventDefault();
  var loginForm = $("form[name='loginForm']");
  var log_email = loginForm.find('#login_email').val();
  var log_password = loginForm.find('#login_password').val();

  firebase
    .auth()
    .signInWithEmailAndPassword(log_email, log_password)
    .then(function () {
      this.firebaseToken.innerHTML = "Sign-in Successful !";
      console.log('sign in successful !');
      // outputFirebaseData();
    })
    .catch(function(err) {
      alert(err.message);
    })

  }
