Stripe.setPublishableKey('pk_test_n61exhWO34qNqG8ws1HU7IMq');

$(document).on('ready', function() {
  $('form-errors').hide();
});

$('#payment-form').on('submit', function(event){

  event.preventDefault();

  $('form-errors').hide();

  Stripe.card.createToken({
    number: $('#cardNumber').val(),
    cvc: $('#cardCVC').val(),
    // exp_month: $('#expiry-month').val(),
    // exp_year: $('#expircardExpiryy-year').val()
    exp: $('#cardExpiry').val(),
    name: $("name").val(),
    address_zip: $("couponCode").val()
  }, stripeResponseHandler);

  $('#submit-btn').prop("disabled", true);

});

function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');
  if (response.error) {
    // Show the errors on the form
    $('#form-errors').show();
    $('#form-errors').html(response.error.message);
    $('#submit-btn').prop("disabled", false);
    console.log(response.error.message);
    console.log('There is an error');
  } else {
    console.log('charge being submitted');
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    console.log($form.get(0));
    $form.get(0).submit();
  }
}