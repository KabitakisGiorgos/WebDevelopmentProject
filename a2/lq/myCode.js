"use strict"

var verify = function(e) {
    if (document.getElementById('password').value ==
      document.getElementById('confirm_password').value&& e.keyCode===13) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Correct';
    } else if(e.keyCode===13){
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'Wrong Password';
    }
  }

var verify2=function(){
    if (document.getElementById('password').value ==
    document.getElementById('confirm_password').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML ='Correct';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Wrong Password';
  }

}