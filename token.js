var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var secret = "jwttoken";

router.get('/generate', function(request, response, next) {
    var token = jwt.sign("hellotext", secret);

    response.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });
});

router.get('/verify', function(request, response, next) {
    var token = request.body.token || request.query.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {
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

module.exports = router;