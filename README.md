
1. create a *.env* and add the following env variable:

  ```
  STRIPE_SECRET_KEY=ADD-YOUR-OWN-KEY
  ```

2. update the *main.js* with your publishable key:

  ```javascript
  Stripe.setPublishableKey('UPDATE ME');
  ```
