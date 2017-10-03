/////////////////////// Single Factor Authentication////////////////////

//Login// 
function sfaloginfuction() {
    // alert('User sucussfl');
    var c = document.getElementById("sfaloginuname").value;
    var d = document.getElementById("sfaloginpwd").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/sfalogin",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": c,
            "pwd": d
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert("Incorrect Password");
        } else if (response == "User Doesn't Exsist") {
            alert("Incorrect Username Please try again");
        } else {
            alert("You have successfully logged in and a Token has been issued to you");

            sessionStorage.setItem('mysfatoken', response.token);
            console.log(sessionStorage.mysfatoken);
        }
    });
}

//SignUP//
function sfasignup() {
    var a = document.getElementById("sfauname").value;
    var b = document.getElementById("sfasignuppwd").value;


    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/sfasignup",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": a,
            "pwd": b
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "successful") {
            alert("You have successfully signed up");
        } else {
            alert("Username already exsist, please try again");

        }
    });

}

//verify token//
function sfatoken() {
    var a = sessionStorage.mysfatoken;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/sfaverify",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "token": a,
        }
    }
    $.ajax(settings).done(function(response) {
        var validation = response.success;
        var messege = response.messege;
        console.log(messege);
        if (validation == true) {
            alert("You have a vaild token");
        } else if (messege = "No token provided.") {
            alert("No token provided.");
        } else {
            alert("invaild token");
        }


    });

}

//Password Update//
function sfapwdreset() {
    //alert('i am paschange');
    var e = document.getElementById("sfapassuname").value;
    var f = document.getElementById("sfapassuoldpwd").value;
    var g = document.getElementById("sfapassunewpwd").value;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/sfachangepass",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": e,
            "oldpwd": f,
            "newpwd": g
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert(" Old Password Incorrect");
        } else if (response == "User Doesn't Exsist") {
            alert("Incorrect username");
        } else {
            alert("Password updated");
        }
    });

}

/////////////////////// Two-Factor Authentication///////////////////////


//Login// 
function tfalogin() {
    // alert('User sucussfl');
    var c = document.getElementById("tfaloginuname").value;
    var d = document.getElementById("tfaloginpwd").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/tfalogin",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": c,
            "pwd": d
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert("Incorrect Password");
        } else if (response == "User Doesn't Exsist") {
            alert("Incorrect username");
        } else {
            alert("Please Check your email for OTP(One Time Password)");
            window.location = "otp.html";
        }
    });
}

//Signup//Tfa
function tfasignup() {
    var a = document.getElementById("tfauname").value;
    var b = document.getElementById("tfaemailadd").value;
    var c = document.getElementById("tfasignuppwd").value;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/tfasignup",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": a,
            "pwd": c,
            "email": b

        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "successful") {
            alert("You have successfully signed up");
        } else {
            alert("User name already exsist, please try again");
        }
    });

}

//verify otp//
function userotp() {
    //  alert('User sucussfl');
    var c = document.getElementById("uname").value;
    var d = document.getElementById("uotp").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/tfaotp",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": c,
            "uotp": d
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "OTP is incorrect") {
            alert("Incorrect One Time Password");
        } else if (response == "User Doesn't Exsist") {
            alert("Incorrect Username");
        } else {
            alert("You have successfully logged in and a Token has been issued to you");
            sessionStorage.setItem('mytfatoken', response.token);
            console.log(sessionStorage.mytfatoken);
        }
    });
}

//verify token//
function tfatoken() {
    var a = sessionStorage.mytfatoken;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/tfaverify",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "token": a,
        }
    }
    $.ajax(settings).done(function(response) {
        var validation = response.success;
        var messege = response.messege;
        console.log(messege);
        if (validation == true) {
            alert("You have a vaild token");
        } else if (messege = "No token provided.") {
            alert("No token provided.");
        } else {
            alert("invaild token");
        }
    });

}


//Password Update//
function tfapwdreset() {
    //alert('i am paschange');
    var e = document.getElementById("tfapassuname").value;
    var f = document.getElementById("tfapassuoldpwd").value;
    var g = document.getElementById("tfapassunewpwd").value;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/tfachangepass",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": e,
            "oldpwd": f,
            "newpwd": g
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert("Old Password Incorrect");
        } else if (response == "User Doesn't Exsist") {
            alert("Incorrect username");
        } else {
            alert("Password updated");
        }
    });

}

///////////////////////////Four-eye Authentication///////////////////////
//SignUP//
var xy;
var yz;

function firstusignup() {
    xy = document.getElementById("firstuname").value;
    yz = document.getElementById("firstsignuppwd").value;

}

function secondusignup() {
    var c = document.getElementById("seconduname").value;
    var d = document.getElementById("secondsignuppwd").value;
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/feasignup",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname1": xy,
            "pwd1": yz,
            "uname2": c,
            "pwd2": d
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "successful") {
            alert("You have successfully signed up");
        } else {
            alert("User name already exsist, please try again");
        }
    });

}

//Login// 
var ab;
var bc;

function firstlogin() {
    ab = document.getElementById("firstloginuname").value;
    bc = document.getElementById("firstloginpwd").value;

}

function secondlogin() {
    // alert('User sucussfl');

    var e = document.getElementById("secondloginuname").value;
    var f = document.getElementById("secondloginpwd").value;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/fealogin",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname1": ab,
            "pwd1": bc,
            "uname2": e,
            "pwd2": f
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert("Incorrect Username or Password");
        } else {

            alert("You have successfully logged in and a Token has been issued to you");
            sessionStorage.setItem('myfeatoken', response.token);
            console.log(sessionStorage.myfeatoken);
        }
    });
}

//verify token//
function featoken() {
    var a = sessionStorage.myfeatoken;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/feaverify",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "token": a,
        }
    }
    $.ajax(settings).done(function(response) {
        var validation = response.success;
        var messege = response.messege;
        console.log(messege);
        if (validation == true) {
            alert("You have a vaild token");
        } else if (messege = "No token provided.") {
            alert("No token provided.");
        } else {
            alert("invaild token");
        }
    });

}

//Password Update//
function pwdreset() {
    //alert('i am paschange');
    var e = document.getElementById("passuname").value;
    var f = document.getElementById("passuoldpwd").value;
    var g = document.getElementById("passunewpwd").value;

    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/feachangepass",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": '*'
        },
        "data": {
            "uname": e,
            "oldpwd": f,
            "newpwd": g
        }
    }
    $.ajax(settings).done(function(response) {
        console.log(response);
        if (response == "unsuccessful") {
            alert("Incorrect username or Old Password");
        } else {
            alert("Password updated");
        }
    });

}