var express = require('express');
var fs = require("fs");
const solc = require('solc');
var Web3 = require('web3');
var web3 = new Web3();
var bodyParser = require("body-parser");

//Database link
var mongoose = require('mongoose');
var url = mongoose.connect('mongodb://localhost:27017/blockchain_db');
var schema = mongoose.Schema;

//TFA
var tfadata = new schema({
    username: String,
    email: String,
    token: String
});
var Tfa = mongoose.model('Tfa', tfadata);

//cross
var cors = require('cors');

////token 
var jwt = require('jsonwebtoken');
var SECRET_KEY = "blockchain";

////random number 
var random = require('random-number-generator');

////email
var nodemailer = require('nodemailer');
var assert = require('assert');
var app = express();
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var contractaddress;
var app = express();

////Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
//////////////////////////////////////////////////////////////////////////Deployingcontracthere/////////////////////////////////////////////////////////////////////////////////////
function contractdeploy(filedeploy) {
    var contractaddress;
    var source = fs.readFileSync(filedeploy, 'utf8');

    var output = solc.compile(source, 1); // 1 activates the optimiser
    var abi;
    var bytecode;
    for (var contractName in output.contracts) {
        bytecode = output.contracts[contractName].bytecode;
        abi = output.contracts[contractName].interface;
    }
    var MyContract = web3.eth.contract(JSON.parse(abi));
    var gasEstimate = web3.eth.estimateGas({ data: bytecode });
    var untitled_sandeep = MyContract.new({
        from: web3.eth.accounts[0],
        data: bytecode,
        gas: gasEstimate
    }, function(e, contract) {
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            contractaddress = contract.address;
        }
    });
    //return [untitled_sandeep, contractaddress];
    return untitled_sandeep;
}
var authcon = contractdeploy('./contracts/Authsingle.sol');
var authcon1 = contractdeploy('./contracts/Authtwofactor.sol');
var authcon2 = contractdeploy('./contracts/Authfoureye.sol');

////////////////////////////////////////////////////////////////////single-factor-API///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/sfasignup', function(req, res) {

    var xy = req.body.uname.toString();
    var yz = req.body.pwd.toString();
    var x = authcon.signup.call(xy, yz, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon.signup(xy, yz, { from: web3.eth.accounts[0], gas: 500000 });

    }
    res.send(x);
});

//login
app.post('/sfalogin', function(req, res) {

    var xy = req.body.uname.toString();
    var yz = req.body.pwd.toString();
    var x = authcon.login(xy, yz);
    if (x == "suclcessful") {
        var user = {
            username: xy, //how to get this from database
        }

        var token = jwt.sign(user, SECRET_KEY, {
            expiresIn: 4000
        });

        res.json({
            success: true,
            token: token
        })

    }
    res.send(x);
});

//verify token //
app.post('/sfaverify', function(request, response, next) {
    var token = request.body.token || request.query.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, SECRET_KEY, function(err, decoded) {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                return response.json({ success: true, message: 'Token authenticated.' });
            }
        });

    } else {

        // if there is no token
        // return an error
        return response.send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//password update//
app.post('/sfachangepass', function(req, res) {
    var xy = req.body.uname.toString();
    var yz = req.body.oldpwd.toString();
    var za = req.body.newpwd.toString();
    var x = authcon.passwordupdate.call(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon.passwordupdate(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    }
    res.send(x);
});

//////////////////////////////////////////////////////////////////////////Two-factor-API/////////////////////////////////////////////////////////////////////////////////////
//signup
app.post('/tfasignup', function(req, res) {

    var xy = req.body.uname.toString();
    var yz = req.body.pwd.toString();
    var zx = req.body.email.toString();
    var x = authcon1.signup.call(xy, yz, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon1.signup(xy, yz, { from: web3.eth.accounts[0], gas: 500000 });
        var user = new Tfa({ username: xy, email: zx });
        user.save();
    }
    res.send(x);
});

//login

app.post('/tfalogin', function(req, res) {
    var rng = random(1000000);
    var xy = req.body.uname.toString();
    var yz = req.body.pwd.toString();
    var x = authcon1.login(xy, yz);
    if (x == "successful") {
        //random number generator

        console.log(rng);
        // Not the movie transporter!
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tfaotp@gmail.com', // Your email id
                pass: 'sandeep001' // Your password
            }
        });

        //find email address in DB 
        var query = { username: xy };

        var pto = Tfa.findOne(query, 'email', function(err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            var toEmail = doc.email;
            console.log("toEmail :" + toEmail);

            var text = rng + " " + "is your One-Time Password";
            var mailOptions = {
                from: 'tfaotp@gmail.com', // sender address
                to: toEmail, // receivers address
                subject: text, // Subject line
                // text: text, // Random number
                html: rng + '&nbsp;is your One-Time Password<br></br><br>Dear User,</br> <br>Enclosed is your One-Time Password that will allow you to complete your login process </br><br>Thank you</br>' // You can choose to send an HTML body instead
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.json({ yo: 'error' });
                } else {
                    console.log('Message sent: ' + info.response);
                    res.json({ yo: info.response });
                };
            });
        });
        console.log(rng);
        var randomnumber = rng.toString();
        var y = authcon1.otpstore(xy, randomnumber, { from: web3.eth.accounts[0], gas: 500000 });
        console.log(randomnumber);
    }
    res.send(x);
});

//otp compare 

app.post('/tfaotp', function(req, res) {

    var xy = req.body.uname.toString();
    var yz = req.body.uotp.toString();
    var x = authcon1.otpcompare(xy, yz);
    if (x == "successful") {
        var user = {

            username: xy, //how to get this from database
            // email: yz
        }

        var jwtoken = jwt.sign(user, SECRET_KEY, {

            expiresIn: 4000
        });


        res.json({
            success: true,
            token: jwtoken
        })

    }
    res.send(x);
});

//verify token //
app.post('/tfaverify', function(request, response, next) {
    var token = request.body.token || request.query.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, SECRET_KEY, function(err, decoded) {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                return response.json({ success: true, message: 'Token authenticated.' });
            }
        });

    } else {

        // if there is no token
        // return an error
        return response.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//password update//
app.post('/tfachangepass', function(req, res) {
    var xy = req.body.uname.toString();
    var yz = req.body.oldpwd.toString();
    var za = req.body.newpwd.toString();
    var x = authcon1.passwordupdate.call(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon1.passwordupdate(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    }
    res.send(x);
});

//////////////////////////////////////////////////////////////////////////Four-eyes API/////////////////////////////////////////////////////////////////////////////////////

//signup

app.post('/feasignup', function(req, res) {

    var xy = req.body.uname1.toString();
    var yz = req.body.pwd1.toString();
    var za = req.body.uname2.toString();
    var ab = req.body.pwd2.toString();
    var x = authcon2.signup.call(xy, yz, za, ab, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon2.signup(xy, yz, za, ab, { from: web3.eth.accounts[0], gas: 500000 });

    }
    res.send(x);
});

//login
app.post('/fealogin', function(req, res) {

    var xy = req.body.uname1.toString();
    var yz = req.body.pwd1.toString();
    var za = req.body.uname2.toString();
    var ab = req.body.pwd2.toString();
    var x = authcon2.login(xy, yz, za, ab);
    if (x == "successful") {
        var user = {

            username1: xy,
            username2: za
        }

        var jwtoken = jwt.sign(user, SECRET_KEY, {

            expiresIn: 4000
        });


        res.json({
            success: true,
            token: jwtoken
        })

    }
    res.send(x);
});

//verify token //
app.post('/feaverify', function(request, response, next) {
    var token = request.body.token || request.query.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, SECRET_KEY, function(err, decoded) {
            if (err) {
                return response.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                return response.json({ success: true, message: 'Token authenticated.' });
            }
        });

    } else {

        // if there is no token
        // return an error
        return response.send({
            success: false,
            message: 'No token provided.'
        });

    }
});
//password update//

app.post('/feachangepass', function(req, res) {
    var xy = req.body.uname.toString();
    var yz = req.body.oldpwd.toString();
    var za = req.body.newpwd.toString();
    var x = authcon2.passwordupdate.call(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    if (x == "successful") {
        var y = authcon2.passwordupdate(xy, yz, za, { from: web3.eth.accounts[0], gas: 500000 });
    }
    res.send(x);
});

//////////////////////////////////////////////////////////////////////////ListingPort////////////////////////////////////////////////////////////////////////////////////////////////////

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});