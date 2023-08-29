import React from 'react';

const PaymentForm = () => {

    // Creates a payment intent and redirects the user to the checkout page
    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:5233/api/payment/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1000,
                    itemID: localStorage.getItem('currentItemId')
                }), 
            });

            if (!response.ok) {
                throw new Error('Failed to create payment intent.');
            }
            
            const res = await response.json();
            var sessionId = res.id;

            if (!window.Stripe) {
                console.error('Stripe has not been properly initialized.');
                return;
            }

            const stripe = await window.Stripe('pk_test_51NGdW9I01YhOsco09xG5KmppKq4GkN5dN1ETr8p8595JXjuPgn9mhnY9KLXgnPzWQzz0pfMLgSVhskAv23JNT0lU002nb5mmpJ');

            const result = await stripe.redirectToCheckout({
                sessionId: sessionId
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button className='btn btn-success' onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default PaymentForm;