"use strict";
var passwordcheckin = false;
var usenameValidity = false;
var emailValidity = false;
var login = false;
var login1 = false;

function gotoRegister() {
  document.getElementById("signIn").style.display = "none";
  document.getElementById("DynamicContainer").innerHTML = "";
  document.getElementById("registerForm").style.display = "block";
}

function gotoSignIn() {
  document.getElementById("signIn").style.display = "block";
  document.getElementById("DynamicContainer").innerHTML = "";
  document.getElementById("registerForm").style.display = "none";
}

function checkEmail(email) {
  loadXMLDoc('GET', "myServlet?UserEmail=" + email + "&action=searchUserEmail", function (response) {
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

    loadXMLDoc('GET', "SubmitForm?" + mystring, function (response) {
      //here we put all the response handling functions
      if (response == "10") {
        alert("The password doesnt match with verify password plz fix it");
      } else if (response == "alreadyinuse") {
        alert("Email or Username already in use check it");
      } else if (response == "regexproblem") {
        alert("Problem with input format");
      } else if (response == "1") {
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

        document.getElementById("default").checked = true;
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
        document.getElementById("registerForm").style.display = "none";
        var mydiv = '<div class="row" style="padding-bottom:20px;padding-top:17px;">\
        <div class="col-sm-3"></div>\
        <div class="col-sm-6 input_form">\
            <h1 class="myh1">Welcome<span style="font-size:15px;">(Your Info)</span></h1>\
            <table style="table-layout:fixed;width:100%;">\
                <tr>\
                    <td class="infoStyle">Username:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ username +
          '</span>\
                        </td/>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Email:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                    '+ email +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Όνομα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ name +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Επίθετο:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ surname +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Ημερομηνία Γέννησης:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ date +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Φύλο:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ gender +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Χώρα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ country +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Πόλη:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ city +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Διεύθυνση:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ address +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Επάγγελμα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="font-size:17px;">\
                        '+ job +
          '</span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Ενδιαφέροντα:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px;"><span style="width:400%;\
                        max-height:70px;word-wrap: break-word;font-size:17px;">'+ interests + '\
                        </span>\
                    </td>\
                </tr>\
                <tr>\
                    <td class="infoStyle">Γενικες Πληροφορίες:</td>\
                    <td style="padding-bottom: 10px;padding-left:70px"><span style="width:400%;\
                        max-height:70px;word-wrap: break-word;font-size:17px;">'+ info + '\
                        </span>\
                        </span>\
                    </td>\
                </tr>\
            </table>\
        </div>\
        <div class="col-sm-3"></div>';
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

  var pattern = new RegExp("[<>%\$]");
  if (!document.getElementById("username").checkValidity() || !usenameValidity || pattern.test(document.getElementById("username").value)) {
    return false;
  }
  if (!document.getElementById("email").checkValidity() || !emailValidity || pattern.test(document.getElementById("email").value)) {
    return false;
  }
  if (document.getElementById("interests") != null) {
    if (pattern.test(document.getElementById("interests").value)) {
      return false;
    }
  }

  if (document.getElementById("info") != null) {
    if (pattern.test(document.getElementById("info").value)) {
      return false;
    }
  }

  if (!document.getElementById("password").checkValidity()) {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Wrong Input";
    return false;
  }
  if (!document.getElementById("confirm_password").checkValidity()) {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Wrong Input";
    return false;
  }
  if (!document.getElementById("name").checkValidity() || pattern.test(document.getElementById("name").value)) {
    return false;
  }
  if (!document.getElementById("surname").checkValidity() || pattern.test(document.getElementById("surname").value)) {
    return false;
  }
  if (!document.getElementById("date").checkValidity()) {
    return false;
  }
  if (!document.getElementById("city").checkValidity() || pattern.test(document.getElementById("city").value)) {
    return false;
  }
  if (!document.getElementById("job").checkValidity() || pattern.test(document.getElementById("job").value)) {
    return false;
  }
  if (!(document.getElementById("password").value == document.getElementById("confirm_password").value)) {
    alert("Two passwords are not the same");
    return false;
  }
  if (!document.getElementById("address").checkValidity() || pattern.test(document.getElementById("address").value)) {
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

function PasswordCheck() {
  if (!document.getElementById("password1").checkValidity()) {

    document.getElementById("LogingPassMessage").innerHTML = "Wrong Input";
    login1 = false;
  } else {
    document.getElementById("LogingPassMessage").innerHTML = "";
    login1 = true;
  }
}

function NameCheck() {
  if (!document.getElementById("username1").checkValidity()) {
    document.getElementById("nomatch").style.color = "red";
    document.getElementById("nomatch").innerHTML = "Wrong Input";
    login = false;
  } else {
    document.getElementById("nomatch").innerHTML = "";
    login = true;
  }
}


function ManualTrue() {
  login = true;
}

function TryToLogin() {
  if (login && login1) {
    console.log("stelnei minima sto server MPRRR");
    var data = "SiteFunctions?username=" + document.getElementById('username1').value + "&password=" + document.getElementById('password1').value + "&action=login";
    loadXMLDoc('POST', data, function (response) {
      if (response == "1") {
        loginFunction(document.getElementById("username1").value);
        document.getElementById("signIn").value = "";
        document.getElementById("registerForm").value = "";
      } else if (response == "notExistentUser") {
        document.getElementById("nomatch").style.color = "red";
        document.getElementById("nomatch").innerHTML = "Not existent User";
        setTimeout(function () {
          document.getElementById("nomatch").innerHTML = "Please Try again";
        }, 2000);
        setTimeout(function () {
          document.getElementById("nomatch").innerHTML = "";
        }, 4000);
        document.getElementById("username1").value = "";
        document.getElementById("password1").value = "";
      } else if (response == "WrongPassword") {
        document.getElementById("LogingPassMessage").innerHTML = "Wrong Password!Please Try again";
        setTimeout(function () {
          document.getElementById("LogingPassMessage").innerHTML = "";
        }, 3000);
        document.getElementById("password1").value = "";
      } else {
        alert("Something went really bad");
      }
    });
  } else {
    alert("Something is wrong with your inputs");
  }
}

function loginFunction(username) {
  document.getElementById("signIn").style.display = "none";
  var MenuContent = '<li><a class="noStyle" onclick="MyFriendList();">MyFriends</a></li>\
  <div class="dropdown" style="float:right;">\
  <li><a id="takename" class="noStyle dropbtn" onclick="">'+ username + ' ' + '<em  class="glyphicon glyphicon-triangle-bottom" ></em></a></li>\
  <div class="dropdown-content">\
  <span class="dropMenu" onclick="Settings();">Settings<em class="material-icons">border_color</em></span>\
  <span class="dropMenu" onclick="Log_out();">Log Out</span>\
</div>\
</div>\
<div class="dropdown2" style="float:right;">\
<li><a class="noStyle dropbtn2">Voting</a></li>\
<div class="dropdown2-content">\
<span class="dropMenu" onclick="NewInitiative();">New Initiative<em class="material-icons">add_circle</em></span>\
<span class="dropMenu" onclick="MyInitiativeList()">My Initiatives</span>\
<span class="dropMenu" onclick="ActiveInitiatives(\''+ username + '\');">Active Initiatives</span>\
<span class="dropMenu" onclick="EndedInitiatives();">Ended Initiatives</span>\
</div>\
</div>\
  ';
  document.getElementById("mylist").innerHTML = MenuContent;
  Homepage();
}

function Homepage() {
  clearInterval(periodicalFunction);
  var mycontainer = '<div class="row" style="padding-bottom:20px;padding-top:20px;">\
  <div class="col-sm-3"></div>\
  <div class="col-sm-6 input_form">\
      <h1 class="myh1">Homepage</h1>\
      <div class="col-sm-1">\
          <div id="myphoto">\
              <div class="circular--portrait">\
                  <img src="images/avatar.png" >\
              </div>\
          </div>\
      </div>\
      <div class="col-sm-11" style="text-align:center;">\
          <h3>Welcome To No Purpose Site</h3>\
      </div>\
  </div>\
  <div class="col-sm-3"></div>\
</div>';
  document.getElementById("logoPic").style.cursor = "pointer";

  document.getElementById("logoPic").addEventListener("click", gotoHomePage);

  document.getElementById("DynamicContainer").innerHTML = mycontainer;
}

function Settings() {
  //here requests
  clearInterval(periodicalFunction);
  loadXMLDoc('GET', "SiteFunctions?input=0&action=name", function (response) {
    document.getElementById("Pusername").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=email", function (response) {
    document.getElementById("Pemail").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=Fname", function (response) {
    document.getElementById("Pname").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=Lname", function (response) {
    document.getElementById("PLname").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=Bdate", function (response) {
    document.getElementById("PBdate").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=gender", function (response) {
    document.getElementById("Pgender").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=country", function (response) {
    document.getElementById("Pcountry").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=city", function (response) {
    document.getElementById("Pcity").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=address", function (response) {
    document.getElementById("Paddress").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=job", function (response) {
    document.getElementById("Pjob").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=interests", function (response) {
    document.getElementById("Pinterests").innerHTML = response;
  });
  loadXMLDoc('GET', "SiteFunctions?input=0&action=infos", function (response) {
    document.getElementById("Pinfo").innerHTML = response;
  });

  var mydiv = '<div class="row" style="padding-bottom:20px;padding-top:20px;">\
  <div class="col-sm-3"></div>\
  <div class="col-sm-6 input_form">\
      <h1 class="myh1">Personal Info<em class="glyphicon glyphicon-pencil"></em></span></h1>\
      <table style="table-layout:fixed;width:100%;">\
          <tr>\
              <td class="infoStyle">Username:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;"><span id="Pusername" style="font-size:17px;">\
    </span>\
                  </td/>\
          </tr>\
          <tr>\
              <td class="infoStyle">Email:</td>\
              <td  style="padding-bottom: 10px;padding-left:70px;"><span id="Pemail" style="font-size:17px;">\
              </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Όνομα:</td>\
              <td  style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()"><span id="Pname" class="visible-borders"  contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Επίθετο:</td>\
              <td  style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()" "><span id="PLname"  class="visible-borders" contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Ημερομηνία Γέννησης:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()"><span id="PBdate" class="visible-borders" contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Φύλο:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;"onclick="appearbuttons()" ><span id="Pgender"class="visible-borders" contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Χώρα:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()" ><span id="Pcountry" class="visible-borders" contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Πόλη:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()"><span id="Pcity" class="visible-borders" contenteditable="true" style="font-size:17px;">\
                 </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Διεύθυνση:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()" ><span id="Paddress" class="visible-borders" contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Επάγγελμα:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;"onclick="appearbuttons()" ><span id="Pjob" class="visible-borders"  contenteditable="true" style="font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Ενδιαφέροντα:</td>\
              <td style="padding-bottom: 10px;padding-left:70px;" onclick="appearbuttons()"><span id="Pinterests" class="visible-borders"  contenteditable="true" style="width:400%;\
                  max-height:70px;overflow:auto;word-wrap: break-word;font-size:17px;">\
                  </span>\
              </td>\
          </tr>\
          <tr>\
              <td class="infoStyle">Γενικες Πληροφορίες:</td>\
              <td style="padding-bottom: 10px;padding-left:70px" onclick="appearbuttons()"><span id="Pinfo" class="visible-borders" contenteditable="true" style="width:400%;\
                  max-height:70px;overflow:auto;word-wrap: break-word;font-size:17px;">\
                  </span>\
                  </span>\
              </td>\
          </tr>\
      </table>\
      <button class="mybutton2" onclick="UpdateChanges();">Submit Changes</button>\
      <button class="mybutton2" onclick="Settings();">Cancel</button>\
  </div>\
  <div class="col-sm-3"></div>';
  document.getElementById("DynamicContainer").innerHTML = mydiv;
  document.getElementById("DynamicContainer").style.display = "block";
}

function UpdateChanges() {
  //first of all check all regexes and changes
  var pattern = new RegExp("[<>%\$]");
  if ((document.getElementById("Pname").innerHTML).length > 20 || (document.getElementById("Pname").innerHTML).length <= 0 || pattern.test(document.getElementById("Pname").innerHTML)) {
    alert("Wrong name input!!");
    return;
  }

  if ((document.getElementById("PLname").innerHTML).length > 20 || (document.getElementById("PLname").innerHTML).length <= 4 || pattern.test(document.getElementById("PLname").innerHTML)) {
    alert("Wrong Last Name input!!");
    return;
  }

  if ((document.getElementById("Pcity").innerHTML).length > 20 || (document.getElementById("Pcity").innerHTML).length < 0 || pattern.test(document.getElementById("Pcity").innerHTML)) {
    alert("Wrong city input!!");
    return;
  }
  if ((document.getElementById("Paddress").innerHTML).length > 40 || (document.getElementById("Paddress").innerHTML).length < 0 || pattern.test(document.getElementById("Paddress").innerHTML)) {
    alert("Wrong address input!!");
    return;
  }

  if ((document.getElementById("Pjob").innerHTML).length > 20 || (document.getElementById("Pjob").innerHTML).length <= 2 || pattern.test(document.getElementById("Pjob").innerHTML)) {
    alert("Wrong job input!!");
    return;
  }

  if ((document.getElementById("Pinterests").innerHTML).length > 100 || (document.getElementById("Pinterests").innerHTML).length < 0 || pattern.test(document.getElementById("Pinterests").innerHTML)) {
    alert("Wrong interests input!!");
    return;
  }

  if ((document.getElementById("Pinfo").innerHTML).length > 500 || (document.getElementById("Pinfo").innerHTML).length < 0 || pattern.test(document.getElementById("Pinfo").value)) {
    alert("Wrong info input!!");
    return;
  }

  var mystring2 = "input1=" + document.getElementById("Pname").innerHTML
    + "&input2=" + document.getElementById("PLname").innerHTML + "&input3=" + document.getElementById("PBdate").innerHTML +
    "&input4=" + document.getElementById("Pjob").innerHTML + "&input5=" + document.getElementById("Pcountry").innerHTML +
    "&input6=" + document.getElementById("Pcity").innerHTML + "&input7=" + document.getElementById("Paddress").innerHTML +
    "&input8=" + document.getElementById("Pinterests").innerHTML + "&input9=" + document.getElementById("Pinfo").innerHTML +
    "&input10=" + document.getElementById("Pgender").innerHTML;

  loadXMLDoc('GET', "SiteFunctions?" + mystring2 + "&action=update", function (response) {
  });
  // location.reload();
  alert("The changes are made");
  Settings();
  Settings();
}

function appearbuttons() {
  document.getElementsByClassName("mybutton2")[0].style.display = "inline-block";
  document.getElementsByClassName("mybutton2")[1].style.display = "inline-block";
}

function MyFriendList() {
  clearInterval(periodicalFunction);
  var mystring = "SiteFunctions?&action=userlist";
  loadXMLDoc('GET', mystring, function (response) {

    var myresponse = response;

    myresponse = myresponse.split("+++++++");

    document.getElementById("DynamicContainer").innerHTML = "";
    document.getElementById("DynamicContainer").innerHTML = ' <div class="row" style="padding-bottom:20px;padding-top:20px;height:100%">\
      <div class="col-sm-3"></div>\
      <div class="col-sm-6 input_form">\
          <h1 class="myh1">My Friends<span style="font-size:15px;">(inside DB)</span></h1>\
          <table id="mytable" style="table-layout:fixed;width:100%;">\
          </table>\
          </div>\
          <div class="col-sm-3"></div>';
    for (var i = 0; i < myresponse.length - 1; i++) {
      var object2 = myresponse[i].split("^^^");
      var username = object2[0];
      var email = object2[1];
      var mystring = '<tr class="borderTable">\
        <td class="picture">\
            <div class="circular--portrait2">\
                <img src="images/avatar.png">\
            </div>\
        </td>\
        <td>\
            <span class="infoStyle2" style="padding:0px;">  Username:  </span><br>'+ username + '\
        </td>\
        <td style="position:relative;left:10%;">\
            <span class="infoStyle2">  Email:  </span> <br>'+ email + '\
        </td>\
       \
    </tr>';
      document.getElementById("mytable").innerHTML = document.getElementById("mytable").innerHTML + mystring;
    }
  });
}

function gotoHomePage() {
  clearInterval(periodicalFunction);
  Homepage();
}
window.onload = function () {
  clearInterval(periodicalFunction);
  var mystring = "SiteFunctions?&action=reload";
  loadXMLDoc('GET', mystring, function (response) {
    console.log(response);
    if (response == "NOTconnected") {
      document.getElementById("mylist").innerHTML = '\
      <li><a class="noStyle" onclick="gotoRegister();">Register</a></li>\
      <li><a class="noStyle" onclick="gotoSignIn();">Sign In</a></li>';

    } else {
      document.getElementById("signIn").style.display = "none";
      loginFunction(response);
    }
  });
}

function Log_out() {
  clearInterval(periodicalFunction);
  var mystring = "SiteFunctions?&action=logout";
  var answer = confirm("Are you sure you want to log out");
  if (answer) {
    loadXMLDoc('GET', mystring, function (response) {
      location.reload();
    });
  } else {
  }
}
function loadXMLDoc(method, name, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
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
// <("[^"]*?"|'[^']*?'|[^'">])*>

function NewInitiative() {
  clearInterval(periodicalFunction);
  var mystring = '\
  <div class="row" style="padding-bottom:20px;padding-top:20px;">\
  <div class="col-sm-3"></div>\
  <div class="col-sm-6 initiative_box">\
      <!-- add also title -->\
      <h1 class="myh1">Create New Initiative</span></h1>\
      <h3>Category</h3>\
      <span class="red VoteInput">*<input style="color:black;" id="categoryVOTE" type="text" pattern=".{2,40}" placeholder="e.g Food" required></span>\
      <h3>Title</h3>\
      <span class="red VoteInput">*<input style="color:black;" id="titleVOTE" type="text" pattern=".{2,40}" placeholder="e.g Favorite Food" required></span>\
      <h3>Description</h3>\
      <span class="red VoteInput">*<textarea style="color:black;width:98%;" id="descriptionVOTE"  rows="3"  maxlength="200" type="text" placeholder="e.g Spaghetti or Pizza? Upvote for Spaghetti or Downvote for Pizza" required></textarea></span>\
      \
      <button class="mybutton3" onclick="SubmitNewInitiative();">Submit</button>\
      <button class="mybutton3" onclick="NewInitiative();">Cancel</button>\
  </div>\
  <div class="col-sm-3"></div>\
</div>\
  ';
  document.getElementById("DynamicContainer").innerHTML = mystring;
}

function SubmitNewInitiative() {
  var pattern = new RegExp("[<>%\$]");

  if (document.getElementById("categoryVOTE").value == "") {
    alert("Fill all inputs");
    return false;
  } else if (!document.getElementById("categoryVOTE").checkValidity() || pattern.test(document.getElementById("categoryVOTE").value)) {//amd regex here and put an alert
    alert("Wrong Category Input");
    return false;
  }
  if (document.getElementById("titleVOTE").value == "") {
    alert("Fill all inputs");
    return false;
  } else if (!document.getElementById("titleVOTE").checkValidity() || pattern.test(document.getElementById("titleVOTE").value)) {
    alert("Wrong Title Input");
    return false;
  }

  if (document.getElementById("descriptionVOTE").value == "") {
    alert("Fill all inputs");
    return false;
  } else if (!document.getElementById("descriptionVOTE").checkValidity() || pattern.test(document.getElementById("descriptionVOTE").value)) {
    alert("Wrong Description Input");
    return false;
  }

  //send server request
  var mystring2 = "SiteFunctions?&action=reload";
  loadXMLDoc('GET', mystring2, function (response) {

    var mystring = "VoteServlet?action=NewPoll&category="
      + document.getElementById("categoryVOTE").value + "&title=" + document.getElementById("titleVOTE").value + "&description="
      + document.getElementById("descriptionVOTE").value + "&creator=" + response;

    loadXMLDoc('GET', mystring, function (response) {
      if (response == 1) {
        alert("Your initiative was submitted")
        MyInitiativeList();
      } else {
        alert("Something Went Really Bad");
      }
    });
  });
}

function MyInitiativeList() {
  clearInterval(periodicalFunction);
  periodicalFunction = setInterval(askQuestion1, 20000);
  var mystring = "SiteFunctions?&action=reload";
  loadXMLDoc('GET', mystring, function (response) {
    //response here has the nam
    var mystring2 = "VoteServlet?action=UserInitiativeList&input=" + response;
    loadXMLDoc('GET', mystring2, function (response2) {
      if (response2 == "0") {
        document.getElementById("DynamicContainer").innerHTML = '<div class="row" style="padding-bottom:10px;padding-top:20px;">\
        <div class="col-sm-3"></div>\
        <div class="col-sm-6 ">\
            <h1 style="color:black;text-align:center;" >Oooops no initiatives yet</h1>\
            <img style="width:50%;position:relative;left:25%" src="images/nopolls.png">\
        </div>\
        <div class="col-sm-3"></div>\
    </div>';
      } else {

        var mymodal = '<div id="id01" class="w3-modal">\
        <span id="ModalVoteID"></span>\
        <div class="w3-modal-content w3-card-4 w3-animate-zoom">\
            <header class="w3-container" style="background-color:#4285f4">\
                <span onclick="closeModal();" class="w3-button  w3-xlarge w3-display-topright">&times;</span>\
                <h2>Settings</h2>\
            </header>\
\
            <div class="w3-bar w3-border-bottom">\
                <button class="tablink w3-bar-item w3-button" onclick="openChoice(event, \'update\')">Update</button>\
                <button class="tablink w3-bar-item w3-button" onclick="openChoice(event, \'setVote\')">Set For Vote</button>\
                <button class="tablink w3-bar-item w3-button" onclick="openChoice(event,\'delete\')">Delete</button>\
            </div>\
\
            <div id="update" class="w3-container choice">\
                <h3>Category</h3>\
                <span class=" VoteInput"><input style="color:black;" id="categoryUPDATE" type="text" pattern=".{2,20}" value="Category" required></span>\
                <h3>Title</h3>\
                <span class=" VoteInput"><input style="color:black;" id="titleUPDATE" type="text" pattern=".{2,20}" value="Title" required></span>\
                <h3>Description</h3>\
                <span class=" VoteInput"><textarea style="color:black;width:98%;" id="descriptionUPDATE"  rows="3"  maxlength="200"   required>Title</textarea></span>\
\
                <button class="mybutton3" onclick="SaveChanges(document.getElementById(\'ModalVoteID\').innerHTML,document.getElementById(\'categoryUPDATE\').value,document.getElementById(\'titleUPDATE\').value,document.getElementById(\'descriptionUPDATE\').value);">Save</button>\
                <button class="mybutton3" onclick="closeModal();">Cancel</button>\
            </div>\
\
            <div id="setVote" class="w3-container choice">\
                <h3>Expiration Date</h3>\
                <input id="ExpireDate" type="datetime-local">\
                <br>\
                <button class="mybutton3" onclick="PublishInitiative(document.getElementById(\'ExpireDate\').value,document.getElementById(\'ModalVoteID\').innerHTML);">Publish</button>\
                <button class="mybutton3" onclick="closeModal();">Cancel</button>\
            </div>\
            <div id="delete" class="w3-container choice">\
                    <button class="mybutton3" onclick="deletePoll(document.getElementById(\'ModalVoteID\').innerHTML,\''+ response + '\')">Delete</button>\
                    <button class="mybutton3" onclick="closeModal();">Cancel</button>\
                </div>\
        </div>\
    </div>\
    ';
        document.getElementById("DynamicContainer").innerHTML = mymodal;
        var myresponse = response2;
        myresponse = myresponse.split("<+>");//kathe poll brisketai edo mesa

        for (var i = 0; i < myresponse.length - 1; i++) {
          var tmp = myresponse[i].split("<>");

          var ID = tmp[0];
          var Creator = tmp[1];
          var Title = tmp[2];
          var Category = tmp[3];
          var Description = tmp[4];
          var Status = tmp[5];
          var mycontent;
          if (Status == "0") {
            mycontent = '<div class="row" style="padding-bottom:10px;padding-top:20px;">\
            <div class="col-sm-3"></div>\
            <div class="col-sm-6 initiative_box">\
              <div id="PollID'+ i + '" style="display:none">' + Status + '</div>\
              <h1 class="myh1" >\
              <div  class="col-sm-11"style="background-color:#4285f4;padding-left:13%"><span id="containerCategory">'+ Category + '</span><span style="font-size:15px;">(' + Creator + ')</span></div>\
              <div  class="col-sm-1"style="background-color:#4285f4;padding-left:4%;"><em style="cursor:pointer;" onclick="openModal(\''+ ID + '\',\'' + Category + '\',\'' + Title + '\',\'' + Description + '\');" class="material-icons">border_color</em></div>\
          </h1>\
          \
          \
                <h3 id="containerTitle" style="color:black; text-align:center;">'+ Title + '</h3>\
                <div style="border:1px solid black;padding-bottom:10px;">\
                    <h4 class="myh4">Description:</h4>\
                    <span id="containerDescription" class="description">'+ Description + '</span>\
                </div>\
            </div>\
            <div class="col-sm-3"></div>\
        </div>';
          } else if (Status == "1") {
            mycontent = ' <div class="row " style="padding-bottom:10px;padding-top:20px;">\
            <div class="col-sm-3"></div>\
            <div class="col-sm-6 initiative_box" style="cursor:not-allowed;">\
                <div class="centered published">Published</div>\
                <div id="PollID'+ i + '" style="display:none">' + Status + '</div>\
                <div style="opacity: 0.5;">\
                    <h1 class="myh1">\
                        <div class="col-sm-11" style="background-color:#4285f4;padding-left:13%"><span id="containerCategory">'+ Category + '</span><span style="font-size:15px;">(' + Creator + ')</span>\
                        </div>\
                        <div class="col-sm-1" style="background-color:#4285f4;padding-left:4%;"><em class="material-icons">border_color</em></div>\
                    </h1>\
    \
                    <h3 id="containerTitle" style="color:black; text-align:center;">'+ Title + '</h3>\
                    <div style="border:1px solid black;padding-bottom:10px;">\
                        <h4 class="myh4">Description:</h4>\
                      <span id="containerDescription" class="description">'+ Description + '</span>\
                    </div>\
                </div>\
            </div>\
            <div class="col-sm-3"></div>\
        </div>';
          } else if (Status == "2") {
            mycontent = ' <div class="row " style="padding-bottom:10px;padding-top:20px;">\
            <div class="col-sm-3"></div>\
            <div class="col-sm-6 initiative_box" style="cursor:not-allowed;">\
                <div class="centered expired">Expired</div>\
                <div id="PollID'+ i + '" style="display:none">' + Status + '</div>\
                <div style="opacity: 0.5;">\
                    <h1 class="myh1">\
                        <div class="col-sm-11" style="background-color:#4285f4;padding-left:13%"><span id="containerCategory">'+ Category + '</span><span style="font-size:15px;">(' + Creator + ')</span>\
                        </div>\
                        <div class="col-sm-1" style="background-color:#4285f4;padding-left:4%;"><em class="material-icons">border_color</em></div>\
                    </h1>\
    \
                    <h3 id="containerTitle" style="color:black; text-align:center;">'+ Title + '</h3>\
                    <div style="border:1px solid black;padding-bottom:10px;">\
                        <h4 class="myh4">Description:</h4>\
                      <span id="containerDescription" class="description">'+ Description + '</span>\
                    </div>\
                </div>\
            </div>\
            <div class="col-sm-3"></div>\
        </div>';
          }
          document.getElementById("DynamicContainer").innerHTML = document.getElementById("DynamicContainer").innerHTML + mycontent;
        }
      }
    });
  });
}

function ActiveInitiatives(username) {
  clearInterval(periodicalFunction);
  periodicalFunction = setInterval(askQuestion2, 20000);
  var mystring2 = "VoteServlet?&action=ActiveInitiatives&username=" + username;
  loadXMLDoc('GET', mystring2, function (response) {
    document.getElementById("DynamicContainer").innerHTML = "";
    if (response == "0") {
      console.log("no initiatives");
    } else {
      var results = response.split("<+>");
      for (var i = 0; i < results.length - 1; i++) {
        var tmp = results[i].split("<>");
        var ID = tmp[0];
        var Creator = tmp[1];
        var Title = tmp[2];
        var Category = tmp[3];
        var Description = tmp[4];
        var UsersVote = tmp[5]

        var content = '\
        <div class="row" style="padding-bottom:10px;padding-top:20px;">\
        <div class="col-sm-3"></div>\
        <div class="col-sm-6 initiative_box">\
            <h1 class="myh1">\
                <div class="col-sm-11" style="background-color:#4285f4;padding-left:13%"><span>'+ Category + '</span><span style="font-size:15px;">(' + Creator + ')</span></div>\
                <div class="col-sm-1" style="background-color:#4285f4;padding-left:4%;"><em id="alreadyVote'+ i + '" style="color:white;cursor:help;visibility:hidden;" class="material-icons"><abbr title="You Have already vote but still can change your choice">check_circle</em></div>\
            </h1>\
            <h3 style="color:black; text-align:center;">'+ Title + '</h3>\
            <div style="border:1px solid black;padding-bottom:10px;">\
                <h4 class="myh4">Description:</h4>\
                <span class="description">'+ Description + '</span>\
            </div>\
            <div class="col-sm-4"></div>\
            <div class="col-sm-5" style="position:relative;right:-1%">\
                <label class="radio-inline">\
                            <input type="radio" name="vote'+ i + '" value="upvote" onclick="Vote(' + ID + ',1);"> UpVote<br>\
                    </label>\
                <label class="radio-inline">\
                            <input type="radio" name="vote'+ i + '"  value="downvote"onclick="Vote(' + ID + ',0);"> DownVote\
                    </label>\
            </div>\
            <div class="col-sm-4"></div>\
        </div>\
        <div class="col-sm-3"></div>\
    </div>\
        ';
        document.getElementById("DynamicContainer").innerHTML = document.getElementById("DynamicContainer").innerHTML + content;
        if (UsersVote == "1" || UsersVote == "0") {
          document.getElementById("alreadyVote" + i).style.visibility = "visible";
        } else if (UsersVote == "-1") {
          //nothing :P
        } else {
          alert("SOmethin went reallly wrong");
        }
      }
    }
  });
}

function Vote(ID, vote) {//the initiatvies ID
  var mystring = "SiteFunctions?&action=reload";//when we vote we take the name of the voter
  loadXMLDoc('GET', mystring, function (response) {//response holds the username
    var mystring2 = "VoteServlet?&action=castVote&id=" + ID + "&vote=" + vote + "&user=" + response;
    loadXMLDoc('GET', mystring2, function (response2) {
      console.log(response2);
      ActiveInitiatives(response);
    });
  });
}

function openModal(ID, Category, Title, Description) {
  document.getElementById('id01').style.display = 'block';
  document.getElementsByClassName("tablink")[0].click();
  document.getElementById("categoryUPDATE").value = Category;
  document.getElementById("titleUPDATE").value = Title;
  document.getElementById("descriptionUPDATE").value = Description;
  document.getElementById("ModalVoteID").innerHTML = ID
}

function closeModal() {
  var answer = confirm("Any changes will be lost");
  if (answer) {
    document.getElementById('id01').style.display = 'none';
  }
}

function SaveChanges(ID, category, title, description) {
  var pattern = new RegExp("[<>%\$]");

  if (category.length < 2 || category.length > 40 || pattern.test(category)) {//amd regex here and put an alert
    alert("Wrong Category Input");
    return false;
  }

  if (title.length < 2 || title.length > 40 || pattern.test(title)) {
    alert("Wrong Title Input");
    return false;
  }

  if (description.length < 2 || description.length > 200 || pattern.test(description)) {
    alert("Wrong Description Input");
    return false;
  }

  //send server request
  var mystring2 = "VoteServlet?&action=update&id=" + ID + "&category=" + category + "&title=" + title + "&description=" + description;
  loadXMLDoc('GET', mystring2, function (response) {
    if (response == "1") {
      MyInitiativeList();
    } else {
      alert("Something went really bad");
    }
  });
}

function PublishInitiative(expiredate, ID) {
  if (expiredate == "") {
    alert("Wrong Date Input");
    return;
  }
  var d = new Date(expiredate);
  var date = new Date();
  // date.setDate(date.getDate() + 1); HERE WE HAVE A RESTRICTION OF "A ONE DAY PERIOD OF PUBLISH" but putted on a comment in order to test my system :P 
  if (d < date) {
    alert("Initiatives must at least have a day as published");
    return;
  }
  var d = d.toString().split(" GMT")
  var mystring2 = "VoteServlet?&action=setExpireDate&id=" + ID + "&date=" + d[0];
  loadXMLDoc('GET', mystring2, function (response) {
    if (response == "1") {
      MyInitiativeList();
    } else {
      alert("Something went really bad");
    }
  });
}

function deletePoll(ID, creator) {
  var mystring = "VoteServlet?id=" + ID + "&action=deletePoll&creator=" + creator;

  loadXMLDoc('GET', mystring, function (response) {
    if (response == "1") {
      MyInitiativeList();
    } else {
      alert("Something went really bad");
    }
  });
}

function openChoice(evt, choice) {
  var i, x, tablinks;
  x = document.getElementsByClassName("choice");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(choice).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

function EndedInitiatives() {
  clearInterval(periodicalFunction);
  periodicalFunction = setInterval(askQuestion3, 20000);
  var mystring = "VoteServlet?&action=endedInitiatives";

  loadXMLDoc('GET', mystring, function (response) {

    var modalChart = '    <div id="id02" class="w3-modal">\
    <div class="w3-modal-content w3-card-4 w3-animate-zoom">\
        <header class="w3-container" style="background-color:#4285f4">\
            <span onclick="closeModalResults();" class="w3-button  w3-xlarge w3-display-topright">&times;</span>\
            <h2>Results</h2>\
        </header>\
        <div id="noVote">\
        <div id="piechart" style="display:inline-block;"></div>\
        <div class="myChartContainer" id="chartDiv" style="display:inline-block;"></div>\
        </div>\
    </div>\
</div>';
    document.getElementById("DynamicContainer").innerHTML = modalChart;
    var myresponse = response.split("<+>");
    for (var i = 0; i < myresponse.length - 1; i++) {
      var tmp = myresponse[i].split("<>");
      var ID = tmp[0];
      var Creator = tmp[1];
      var Title = tmp[2];
      var Category = tmp[3];
      var Description = tmp[4];

      var content = '<div class="row" style="padding-bottom:10px;padding-top:20px;">\
      <div class="col-sm-3"></div>\
      <div class="col-sm-6 initiative_box">\
          <h1 class="myh1">\
              <div class="col-sm-11" style="background-color:#4285f4;padding-left:13%"><span>'+ Category + '</span><span style="font-size:15px;">(' + Creator + ')</span></div>\
              <div class="col-sm-1" style="background-color:#4285f4;padding-left:4%;"><em style="cursor:pointer;" onclick="openModalResults('+ ID + ')" class="material-icons">poll</em></div>\
          </h1>\
          <h3 style="color:black; text-align:center;">'+ Title + '</h3>\
          <div style="border:1px solid black;padding-bottom:10px;">\
              <h4 class="myh4">Description:</h4>\
              <span class="description">'+ Description + '</span>\
          </div>\
      </div>\
      <div class="col-sm-3"></div>\
  </div>';
      document.getElementById("DynamicContainer").innerHTML = document.getElementById("DynamicContainer").innerHTML + content;
    }
  });
}

function openModalResults(ID) {
  var mystring = "VoteServlet?&action=VoteResults&id=" + ID;

  loadXMLDoc('GET', mystring, function (response) {
    var myresponse = response.split("<+>");
    var Votes = myresponse[0].split("<>");
    var Users = myresponse[1].split("<>");
    if (parseInt(Votes[0]) == 0 && parseInt(Votes[1]) == 0) {
      document.getElementById("noVote").innerHTML = '<img src="images/noVote.jpg" style="height:20%;width:20%;padding-bottom:10px;position:relative;left:40%;">';
      document.getElementById('id02').style.display = 'block';
    } else {
      document.getElementById("noVote").innerHTML = ' <div id="piechart" style="display:inline-block;"></div>\
      <div class="myChartContainer" id="chartDiv" style="display:inline-block;"></div>';
      document.getElementById("chartDiv").innerHTML = '<h2 style="color:black;">Voters:</h2>';
      for (var i = 0; i < Users.length - 1; i++) {
        document.getElementById("chartDiv").innerHTML = document.getElementById("chartDiv").innerHTML + '<span style="display:block;text-align:center;">' + Users[i] + '</span>';
      }
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Votes', 'Votes'],
          ['Upvote', parseInt(Votes[0])],
          ['Downvote', parseInt(Votes[1])],
        ]);
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data);
        document.getElementById('id02').style.display = 'block';
      }
    }
  });
}

function closeModalResults() {
  document.getElementById('id02').style.display = 'none';
}

function askQuestion1() {
  var mystring = "VoteServlet?&action=checkExpires";

  loadXMLDoc('GET', mystring, function (response) {
    if (response == "1") {
      MyInitiativeList();
    } else if (response == "0") { }
    else {
      alert("something went really bad");
    }
  });
}

function askQuestion2() {
  var mystring = "VoteServlet?&action=checkExpires";

  loadXMLDoc('GET', mystring, function (response) {
    if (response == "1") {
      var mystring2 = "SiteFunctions?&action=reload";
      loadXMLDoc('GET', mystring2, function (response2) {
      ActiveInitiatives(response2);
      });
    } else if (response == "0") { }
    else {
      alert("something went really bad");
    }
  });
}

function askQuestion3() {
  var mystring = "VoteServlet?&action=checkExpires";

  loadXMLDoc('GET', mystring, function (response) {
    if (response == "1") {
      EndedInitiatives();
    } else if (response == "0") { }
    else {
      alert("something went really bad");
    }

  });
}