"use strict";
var passwordcheckin = false;
var usenameValidity = false;
var emailValidity = false;

function gotoRegister() {
  document.getElementById("signIn").style.display = "none";
  document.getElementById("DynamicContainer").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function gotoSignIn() {
  document.getElementById("signIn").style.display = "block";
  document.getElementById("DynamicContainer").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
}

function checkEmail(email) {
  loadXMLDoc('GET', "myServlet?UserEmail=" + email + "&action=searchUserEmail", function (response) {
    console.log(response);
    if (response == 1) {
      document.getElementById("EmailMessage").innerHTML = "<em style='color:green' class='glyphicon glyphicon-ok'></em>";
      emailValidity = true;
    } else if (response == 0) {
      document.getElementById("EmailMessage").innerHTML = "<em style='color:red' class='glyphicon glyphicon-remove'></em>";
      emailValidity = false;
    } else if (response == "wrongInput") {
      document.getElementById("EmailMessage").innerHTML = "Wrong Input";
      emailValidity = false;
    }
    else {
      document.getElementById("EmailMessage").innerHTML = "You fucked up hard";
      emailValidity = false;
    }
  });
}

function checkName(name) {
  loadXMLDoc('GET', "myServlet?UserName=" + name + "&action=searchUserName", function (response) {
    console.log(response);
    if (response == 1) {
      buttonappear(name);
      document.getElementById("NameMessage").innerHTML = "";
      usenameValidity = true;
    } else if (response == 0) {
      buttondiss();
      document.getElementById("NameMessage").innerHTML = "Already in use";
      usenameValidity = false;
      //already in use
    } else if (response == "wrongInput") {
      document.getElementById("NameMessage").innerHTML = "Wrong Input";

      buttondiss();
      usenameValidity = false;
    }
    else {
      document.getElementById("NameMessage").innerHTML = "How this name appeared HEREEE";
      setTimeout(function () {
        document.getElementById("NameMessage").innerHTML = "";
      }, 3000);
      buttondiss();
      usenameValidity = false;
    }
  });
}

function submitTheform() {
  var ok = validInputs();
  if (ok) {//send  the request with all the fields that are needed if response is ok fix a function and make a new div in main container
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var verifyPassword = document.getElementById('confirm_password').value;
    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var date = document.getElementById('date').value;
    var tmp = document.getElementsByName('gender');
    var gender;
    for (var i = 0, length = tmp.length; i < length; i++) {
      if (tmp[i].checked) {
        gender = tmp[i].value;
        break;
      }
    }
    var country = document.getElementById('country').value;
    var city = document.getElementById('city').value;
    var address = document.getElementById('address').value;
    var job = document.getElementById('job').value;
    var interests = document.getElementById('interests').value;
    var info = document.getElementById('info').value;
    var mystring = "username=" + username + "&email=" + email + "&password=" + password + "&confirm_password=" + verifyPassword + "&name=" + name + "&surname=" + surname + "&date=" + date + "&country=" + country + "&gender=" + gender + "&city=" + city + "&address=" + address + "&job=" + job + "&interests=" + interests + "&info=" + info + "&action=submit";
    console.log(gender);
    console.log(address)
    console.log(job);
    console.log(interests);
    loadXMLDoc('GET', "SubmitForm?" + mystring, function (response) {
      //here we put all the response handling functions
      console.log(response);
      if (response == "10") {
        alert("The password doesnt match with verify password plz fix it");
      } else if (response == "alreadyinuse") {
        alert("Email or Username already in use check it");
      } else if (response == "regexproblem") {
        alert("Problem with input format");
      } else if (response == "1") {
        console.log("came here");
        //all good here
        //clear the the form for a start
        //
        document.getElementById('email').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('confirm_password').value = "";
        document.getElementById('name').value = "";
        document.getElementById('surname').value = "";
        document.getElementById('date').value = "";

        document.getElementById("default").checked=true;
        document.getElementsByName('gender').value = "unknown";

        document.getElementById('country').value = "GR";
        document.getElementById('city').value = "";
        document.getElementById('address').value = "";
        document.getElementById('job').value = "";
        document.getElementById('interests').value = "";
        document.getElementById('info').value = "";
        buttondiss();
        document.getElementById("upload").style.display = "none";
        document.getElementById("NameMessage").innerHTML = "";
        document.getElementById("EmailMessage").innerHTML = "";
        document.getElementById("showbutton").style.display = "none";
        document.getElementById("hidebutton").style.display = "none";
        document.getElementById("map").style.display = "none";
        document.getElementById("message").innerHTML = "";

        //new content fix
        document.getElementById("registerForm").style.display = "none";//here put the new div
        var mydiv = '<div class="row" style="padding-bottom:20px;padding-top:20px;">\
        <div class="col-sm-3"></div>\
        <div class="col-sm-6 input_form">\
            <h1 class="myh1">Welcome<span style="font-size:15px;">(Your Info)</span></h1>\
            <table style="table-layout:fixed;width:100%;">\
                <tr>\
                    <td class="infoStyle">Username:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ username +
                      '</span>\
                        </td/>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Email:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                    '+ email +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Όνομα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ name +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Επίθετο:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ surname +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Ημερομηνία Γέννησης:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ date +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Φύλο:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ gender +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Χώρα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ country +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Πόλη:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ city +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Διεύθυνση:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ address +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Επάγγελμα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:20px;">\
                        '+ job +
                      '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Ενδιαφέροντα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="width:400px;\
                        max-height:70px;overflow:auto;word-wrap: break-word;display:inline-block;font-size:20px;">'+interests+'\
                        </span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Γενικες Πληροφορίες:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px"><span style="width:400px;\
                        max-height:70px;overflow:auto;word-wrap: break-word;display:inline-block;font-size:20px;">'+info+'\
                        </span>\
                        </span>\
                    </td>\
                </tr>\
            </table>\
        </div>\
        <div class="col-sm-3"></div>\
    </div>\
          ';//put here dinamically request give the user INFOS 
        console.log(date);
        document.getElementById("DynamicContainer").innerHTML = mydiv;
        document.getElementById("DynamicContainer").style.display = "block";

      } else {
        alert("something went really bad");
      }
    });
  } else {
    alert("Oopsss check again your infos");
  }
}

function validInputs() {

  if (!document.getElementById("username").checkValidity() || !usenameValidity) {
    return false;
  }
  if (!document.getElementById("email").checkValidity() || !emailValidity) {
    return false;
  }
  if (!document.getElementById("password").checkValidity()) {
    return false;
  }
  if (!document.getElementById("confirm_password").checkValidity()) {
    return false;
  }
  if (!document.getElementById("name").checkValidity()) {
    return false;
  }
  if (!document.getElementById("surname").checkValidity()) {
    return false;
  }
  if (!document.getElementById("date").checkValidity()) {
    return false;
  }
  if (!document.getElementById("city").checkValidity()) {
    return false;
  }
  if (!document.getElementById("job").checkValidity()) {
    return false;
  }
  if (!(document.getElementById("password").value == document.getElementById("confirm_password").value)) {
    alert("Two passwords are not the same");
    return false;
  }
  return true;
}

var verify = function (e, flag) {
  if ((document.getElementById("password").value ==
    document.getElementById("confirm_password").value && e.keyCode === 13) || (document.getElementById("password").value ==
      document.getElementById("confirm_password").value && flag === 0)) {

    document.getElementById("message").innerHTML = "<em style='color:green' class='glyphicon glyphicon-ok'></em>";
    passwordcheckin = true;
  } else if (e.keyCode === 13 || flag === 0) {
    document.getElementById("message").innerHTML = "<em style='color:red' class='glyphicon glyphicon-remove'></em>";
  }
};

function loadXMLDoc(method, name, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      callback(this.responseText);
    } else if (this.status == 400) {
      callback(this.responseText);
    } else {
      console.log("waiting...")
    }
  };
  xhttp.open(method, name, true);
  xhttp.send();
}