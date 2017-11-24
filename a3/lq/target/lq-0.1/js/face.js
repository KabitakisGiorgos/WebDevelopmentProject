"use strict";
var URL;
var face_token;
/*
    Author: Panagiotis Papadakos papadako@csd.uoc.gr

    For the needs of the hy359 2017 course
    University of Crete

*/

/*  face recognition that is based on faceplusplus service */
var faceRec = (function () {

  // Object that holds anything related with the facetPlusPlus REST API Service
  var faceAPI = {
    apiKey: "l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c",
    apiSecret: "2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip",
    app: "hy359",
    // Detect
    // https://console.faceplusplus.com/documents/5679127
    detect: "https://api-us.faceplusplus.com/facepp/v3/detect",  // POST
    // Set User ID
    // https://console.faceplusplus.com/documents/6329500
    setuserId: "https://api-us.faceplusplus.com/facepp/v3/face/setuserid", // POST
    // Get User ID
    // https://console.faceplusplus.com/documents/6329496
    getDetail: "https://api-us.faceplusplus.com/facepp/v3/face/getdetail", // POST
    // addFace
    // https://console.faceplusplus.com/documents/6329371
    addFace: "https://api-us.faceplusplus.com/facepp/v3/faceset/addface", // POST
    // Search
    // https://console.faceplusplus.com/documents/5679127
    search: "https://api-us.faceplusplus.com/facepp/v3/search", // POST
    // Create set of faces
    // https://console.faceplusplus.com/documents/6329329
    create: "https://api-us.faceplusplus.com/facepp/v3/faceset/create", // POST
    // update
    // https://console.faceplusplus.com/documents/6329383
    update: "https://api-us.faceplusplus.com/facepp/v3/faceset/update", // POST
    // removeface
    // https://console.faceplusplus.com/documents/6329376
    removeFace: "https://api-us.faceplusplus.com/facepp/v3/faceset/removeface", // POST
  };

  // Object that holds anything related with the state of our append
  // Currently it only holds if the snap button has been pressed
  var state = {
    photoSnapped: false,
  };

  // function that returns a binary representation of the canvas
  function getImageAsBlobFromCanvas(canvas) {

    // function that converts the dataURL to a binary blob object
    function dataURLtoBlob(dataUrl) {
      // Decode the dataURL
      var binary = atob(dataUrl.split(",")[1]);

      // Create 8-bit unsigned array
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Return our Blob object
      return new Blob([new Uint8Array(array)], {
        type: "image/jpg",
      });
    }

    var fullQuality = canvas.toDataURL("image/jpeg", 1.0);
    return dataURLtoBlob(fullQuality);

  }

  // function that returns a base64 representation of the canvas
  function getImageAsBase64FromCanvas(canvas) {
    return canvas.toDataURL("image/jpeg", 1.0);

  }

  // Function called when we upload an image
  function uploadImage() {
      console.log("upload image")
      var data = new FormData();
      data.append("api_key", faceAPI.apiKey);
      data.append("api_secret", faceAPI.apiSecret);
      data.append("image_url",URL);
      ajaxRequest("POST", faceAPI.detect, data,function (my_response){
        var data2=new FormData();
        data2.append("api_key", faceAPI.apiKey);
        data2.append("api_secret", faceAPI.apiSecret);
        data2.append("face_token",my_response);
        data2.append("user_id",document.getElementById("username").value);
        console.log(document.getElementById("username").value);

        ajaxRequest2("POST",faceAPI.setuserId,data2,function(){
          var data3=new FormData();
          data3.append("api_key", faceAPI.apiKey);
          data3.append("api_secret", faceAPI.apiSecret);
          data3.append("outer_id",faceAPI.app);
          data3.append("face_tokens",my_response);
          ajaxRequest3("POST",faceAPI.addFace,data3);
        });
      });
  }

  function uploadImage2(URL2){
    var data=new FormData();
    data.append("api_key", faceAPI.apiKey);
    data.append("api_secret", faceAPI.apiSecret);
    data.append("image_url",URL2);
    data.append("outer_id",faceAPI.app);
    ajaxRequest4("POST", faceAPI.search, data);
  }
  // Function for initializing things (event handlers, etc...)
  function init() {
      // Trigger when upload button is pressed
      document.getElementById("upload").addEventListener("click", uploadImage);
      console.log("uploading");
  }
 
  function ajaxRequest(post,search,data,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myresponse=JSON.parse(this.response);
        face_token=myresponse.faces[0].face_token;
        console.log(myresponse.faces[0].face_token);
        callback(face_token);
      }else{
        console.log("Waiting1...");
      }
    };
    xhttp.open(post, search, true);
    xhttp.send(data);
  }

  function ajaxRequest2(post,search,data,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myresponse=JSON.parse(this.response);
        callback();
      }else{
        console.log("Waiting.2..");
      }
    };
    xhttp.open(post, search, true);
    xhttp.send(data);
  }

  function ajaxRequest3(post,search,data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("ok the upload");
      }else{
        console.log("Waiting.3..");
      }
    };
    xhttp.open(post, search, true);
    xhttp.send(data);
  }

  function ajaxRequest4(post, search, data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var myresponse=JSON.parse(this.response);
        if(myresponse.results.length>=1){
            if(myresponse.results[0].confidence>=78){
                document.getElementById("username1").value=myresponse.results[0].user_id;
                document.getElementById("nomatch").innerHTML="";
            }else{
              document.getElementById("nomatch").innerHTML="You are too beautiful to match you with somenone";
              setTimeout(function(){
                document.getElementById("nomatch").innerHTML="";
                },3000);
            }
        }else{
          document.getElementById("nomatch").innerHTML="You are too beautiful to match you with somenone";
          setTimeout(function(){
            document.getElementById("nomatch").innerHTML="";
            },3000);
        }
      }else{
        console.log("Waiting4...");
      }
    };
    xhttp.open(post, search, true);
    xhttp.send(data);
  }
  
  return {
    init: init,
    uploadImage2: uploadImage2,
  };

})();

function URLfunction(){
  URL = prompt("Please enter an image URL", "https://goo.gl/AES9iA");
  document.getElementById("upload").style.display="inline";
}

function URLfunction2(value){
  if(value==="yes"){
      var URL2 = prompt("Please enter an image URL", "https://goo.gl/AES9iA");
      if(URL2==null) {
          document.getElementById("no").checked=true;
      }else{
        document.getElementById("nomatch").innerHTML="Wait you handsome beast";
        faceRec.uploadImage2(URL2);
      }
  }
}

