import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../assets/hook/useAuth';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';
import useCart from '../../../assets/hook/useCart';

const CheckoutForm = () => {

    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');
    const axiosSecure = useAxiosSecure();
    const [cart,refetch] = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId,setTransactionId] = useState();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total,item)=> total + item.price,0);
    console.log(totalPrice);

    useEffect(()=>{

        if(totalPrice > 0){
          axiosSecure.post('/create-payment-intent',{ price : totalPrice })
         .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          })
        }
    },[axiosSecure,totalPrice])

    //

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
        return;
        }
        
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card,
        });
        if(error){
            console.log('payment error', error);
            setError(error.message)
        }else{
            console.log('Payment Method', paymentMethod);
            setError('')
        }

        //confirm payment

        const { paymentIntent,error:confirmError } = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }else{
            console.log('payment Intent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transection Id',paymentIntent.id);
                setTransactionId(paymentIntent.id);
                //sweet alert

                const payment= {
                  email:user.email,
                  price : totalPrice,
                  transactionId:paymentIntent.id,
                  date : new Date(),
                  cartIds : cart.map(item=> item._id),
                  menuItemIds : cart.map(item=> item.menuId),
                  status:'pending'
                }
                const res = await axiosSecure.post('/payments',payment);
                console.log('payment saved',res.data);
                refetch();
                navigate('/dashboard/payment-history');
                if(res.data?.paymentResult?.insertedId){
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Successfully Done",
                    showConfirmButton: false,
                    timer: 1500
                  });
                 
                }
            }
        }
    }
    //

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  border: "1px solid #ced4da",
                },
              
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button className='btn btn-sm btn-info my-2' type="submit" disabled={!stripe || !clientSecret}>
            Pay
          </button>
          <>
          <p className='text-red-600 font-semibold'>{error}</p>
          {
            transactionId && <p className='text-success'>Your Transaction Id :{transactionId}</p>
          }
          </>
        </form>
      </div>
    );
};

export default CheckoutForm;