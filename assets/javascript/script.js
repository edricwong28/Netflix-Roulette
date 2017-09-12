//MATERIALIZE SCRIPTS
  $(document).ready(function(){
      $('.modal').modal();
      $('.parallax').parallax();
      Materialize.updateTextFields();
      $('select').material_select();

  });
  
  //when SUBMIT is clicked, save inputs into variables______________________________________________________________________________________
  $("#submitbtn").click(function(event){

    $("submitbtn").toggleClass("is-active");

    var city = $("#city").val().trim();
    var actor = $("#actor").val().trim();

    console.log(city);
    console.log(actor);

    // create "temporary" object for holding user's data
    newObject = {
      city: city,
      actor: actor
    };

    //Clears input boxes;
      $("#city").val("");
      $("#actor").val("");

  getflix();

  });

    function getflix(){ 

      console.log("WORKGIN!")

      var key = "819174faa3fc447084b0d2c6d4bf1418";
      //WEATHER DATA WILL USE CITY INPUT FROM NEW OBJECT
      var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + newObject.city + "&APPID=" + key;
   
      var netflixURL = "https://netflixroulette.net/api/api.php?" + "actor=" + newObject.actor;
     
      var getWeather = $.ajax({
          url: URL,
          method: "GET"
          })

      var getNetflix = $.ajax ({
          url: netflixURL,
          method: "GET"

          })
 
   //MULTIPLE AJAX CALLS METHOD
   $.when(getWeather, getNetflix).done(function(r1, r2) {

    $("#results").empty();
    $("#main-carousel").empty();
    $(".carousel").empty();

     r1 = r1[0];
     //r2[0] is pointing to the "parent" array, which holds mulipltle objects
     r2 = r2[0];
     r1.main.temp = ((r1.main.temp) * 9/5) - 459.67;

     //FOR WEATHER ICON IMAGE TO DISPLAY
       var iconCode = r1.weather[0].icon;
       var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
       var icon = $("<img>").attr("src", iconURL);

      $("#1").html(r1.name);
      $("#2").html(r1.main.temp +" °F");
      $("#3").html(r1.weather[0].main);
      $("#4").html(r1.weather[0].description);
      $("#5").html(icon);
        
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
            $(".carousel-item").addClass("active");


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
            $(".carousel-item").addClass("active");
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
            $(".carousel-item").addClass("active");
          }
      }
      $('#main-carousel').carousel();

 });
}