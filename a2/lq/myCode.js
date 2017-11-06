"use strict"
var passwordcheckin=false;

var verify = function(e,flag) {
    if ((document.getElementById('password').value ==
      document.getElementById('confirm_password').value&&e.keyCode===13)||(document.getElementById('password').value ==
      document.getElementById('confirm_password').value&&flag===0)) {
        setTimeout(function(){
          document.getElementById("message2").innerHTML="";
          },3000);
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Correct';
      passwordcheckin=true;
    } else if(e.keyCode===13||flag===0){
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Wrong Password';
      setTimeout(function(){
        document.getElementById("message").innerHTML="";
        },3000);
    }
  }

  var askPass=function(){

   if(!passwordcheckin){
     alert("Two passwords are not the same");
     event.preventDefault();
   }
  }

  function initMap() {
    document.getElementById('city').addEventListener('blur', function() {
      
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      var geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map);
    });
    document.getElementById('address').addEventListener('blur', function() {
      
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      var geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map);
    });
    document.getElementById('country').addEventListener('blur', function() {
      
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      var geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var country = document.getElementById('country').value;
    var address2=country+city+address;
    geocoder.geocode({'address': address2}, function(results, status) {
      
      if (status === 'OK'&&city!=0) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
            document.getElementById('showbutton').style.display="block";
            console.log("found location");
            
      } else {
        document.getElementById('message2').style.color = 'red';
        document.getElementById('message2').innerHTML = 'Didnt Find the location';
        setTimeout(function(){
          document.getElementById("message2").innerHTML="";
          },3000);
          document.getElementById('showbutton').style.display="none";
          document.getElementById('hidebutton').style.display="none";
          document.getElementById('map').style.display = 'none'
      }
    });
  }

var Showmap=function(){
  document.getElementById('map').style.display = 'block';
  document.getElementById('map').style.width = '100%';
  document.getElementById('map').style.height = '400px';
   document.getElementById('hidebutton').style.display="inline";

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map);
}

var Hidemap=function(){
  document.getElementById('map').style.display = 'none';
  document.getElementById('hidebutton').style.display = 'none';
}

function buttonappear(){
  if(document.getElementById("username").value.match(/[A-Za-z0-9]{8,}/)) document.getElementById("snap").style.display='inline';
}