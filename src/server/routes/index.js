var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var products = [
  {
    productName: 'Soylent',
    productDescription: 'Meal replacement that tastes like pancake batter.',
    productPrice: 10.99
  }
];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/products/:name', function(req, res, next) {
  var productName = req.params.name;
  for (var i = 0; i < products.length; i++) {
    if(productName === products[i].productName) {
      return res.render('product', {productInfo: products[i]});
    } else {
      return res.send('Product does not exist.');
    }
  }
});

router.get('/payment/:id', function(req, res, next) {
  var userID = req.params.id;
  firebase.database().ref('/user-trips/' + userID).limitToLast(1).once('value').then(function(snapshot) {
    var amount=snapshot.child('total').val();
  })    
      // console.log(snapshot.val());

  return res.render('product', {productInfo: amount});
  // var productName = req.params.name;
  // for (var i = 0; i < products.length; i++) {
  //   if(productName === products[i].productName) {
  //     return res.render('product', {productInfo: products[i]});
  //   } else {
  //     return res.send('Product does not exist.');
  //   }
  // }
});

router.get('/email/:amount', function(req, res, next) {
  var amount = req.params.amount;
  // firebase.database().ref('/user-trips/' + userID).limitToLast(1).once('value').then(function(snapshot) {
  //   var amount=snapshot.child('total').val();
  // })    
      // console.log(snapshot.val());

  return res.render('product', {amount: amount});
  // var productName = req.params.name;
  // for (var i = 0; i < products.length; i++) {
  //   if(productName === products[i].productName) {
  //     return res.render('product', {productInfo: products[i]});
  //   } else {
  //     return res.send('Product does not exist.');
  //   }
  // }
});


router.post('/charge', function(req, res,next) {
  console.log('posting charges');
  var stripeToken = req.body.stripeToken;
  var amount = req.body.price * 100;

  // ensure amount === actual product amount to avoid fraud

  stripe.charges.create({
    card: stripeToken,
    currency: 'usd',
    amount: amount
  },
  function(err, charge) {
    if (err) {
      console.log(err);
      // res.send('error');
      return res.render('product', {error: 'Your payment couldn\'t be processed.'});
    } else {
      // res.send('success');
      res.redirect('https://m.me/thewaylo')
    }
  });
});

module.exports = router;