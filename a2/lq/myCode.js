"use strict"

var verify = function(e,flag) {
    if ((document.getElementById('password').value ==
      document.getElementById('confirm_password').value&&e.keyCode===13)||(document.getElementById('password').value ==
      document.getElementById('confirm_password').value&&flag===0)) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Correct';
    } else if(e.keyCode===13||flag===0){
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Wrong Password';
      setTimeout(function(){
        document.getElementById("message").innerHTML="";
        },3000);
    }
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('city').addEventListener('blur', function() {
      geocodeAddress(geocoder, map);
    });
    document.getElementById('address').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
    document.getElementById('country').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    console.log(document.getElementById('city').value);
    var country = document.getElementById('country').value;
    var address2=country+city+address;
    geocoder.geocode({'address': address2}, function(results, status) {
      
      if (status === 'OK'&&city!=0) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
          document.getElementById('message2').style.color = 'green';
          document.getElementById('message2').innerHTML = 'Found The location';
          setTimeout(function(){
            document.getElementById("message2").innerHTML="";
            },3000);
      } else {
        document.getElementById('message2').style.color = 'red';
        document.getElementById('message2').innerHTML = 'Didnt Find the location';
        setTimeout(function(){
          document.getElementById("message2").innerHTML="";
          },3000);
      }
    });
  }