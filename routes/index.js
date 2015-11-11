var express = require('express');
var router = express.Router();
var spotify = require('spotify-node-applescript');
var request = require('request');

var deviceID = '54ff6e066667515148431567';
var token = '8716bbb1e83ac488c9eb877cfa68aba83a688108';
var formData = {
  access_token: token,
  params: ''
};

var braintree = require('braintree');
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
	merchantId:  'pgb3hwxpm27gd6c7',
	publicKey:   'jkbhscdxbysmrhtf',
	privateKey:  '0ded8ab9228f7beb80eb4e73c95c9437'
});

/* GET render the index page with the checkout form */
router.get('/', function(req, res, next) {
  gateway.clientToken.generate({}, function (error, response) {
    if (error) {
      res.render('error', { error: error });
    } else {
      res.render('index', { clientToken: response.clientToken });
    }
  });
});

/* POST process the actual payment method nonce */
router.post('/pay', function (req, res) {
  gateway.transaction.sale({
    paymentMethodNonce: req.body.payment_method_nonce,
    amount: '40'
  }, function (error, response) {
    if (error) {
      res.render('error', { error: error });
    } else {
      request.post({
        url: 'https://api.particle.io/v1/devices/' + deviceID + '/pay',
        form: formData
      }, function (err, httpResponse, body) {
        spotify.playTrack('spotify:track:5cP52DlDN9yryuZVQDg3iq', function () {
          res.render('disco', { transaction: response.transaction });
        });
      });
    }
  });
});

module.exports = router;
