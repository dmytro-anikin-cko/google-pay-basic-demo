# Google Pay Basic Demo

I took the template from Google Pay docs [here](https://developers.google.com/pay/api/web/guides/tutorial), moved the JS to a seperate file, and added the logic to `processPayment()` function:
1. Used data from `paymentData` to [get a CKO token](https://www.checkout.com/docs/payments/add-payment-methods/google-pay#Step_2:_Tokenize_the_Google_Pay_payment_data).
2. Used the CKO token to make a payment request
