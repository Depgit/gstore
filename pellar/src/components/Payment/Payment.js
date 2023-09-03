import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import StripeCheckout from 'react-stripe-checkout';
import Input from '../ExtraTabs/Input'
import Button from '../ExtraTabs/Button'
import './payment.css'

const pub_key = 'pk_test_51JiD4OSEc3lie6F0lrZnLvsmT5J4heMgvrZvWVNovQPW53jJ4CRHncy8aN1OhQIe2oqhxXHvmuAboiK558powMSq00lp7lth9C'

const PaymentForm = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  const onToken = async (token) => {
    if (name === null || name === '' || price === 0 || price === null) {
      alert('something missing');
      return;
    }
    const response = await fetch('/v1/payment/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        name,
        price,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div className="container_payment">
        <div className="card">
          <div className="card-header">Payment Proceed!</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Input name="Name" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <Input name="Amount" placeholder="Amount" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              {
                name && price ?
                  <div className="form-group">
                    <StripeCheckout
                      name={name}
                      description={`Payment of $${price}`}
                      amount={price * 100}
                      token={onToken}
                      stripeKey={pub_key}
                      currency='inr'
                    >
                      <Button name={`Pay ${price}`} type="submit" />
                    </StripeCheckout>
                  </div>
                  :
                  ''
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentForm;
