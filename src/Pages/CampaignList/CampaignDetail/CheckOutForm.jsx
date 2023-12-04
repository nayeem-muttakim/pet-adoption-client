import { Button } from "@mui/joy";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CheckOutForm = ({ amount, campaign, setShow }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transId, setTransId] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
 
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { amount: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, amount]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
    } else {
      //   console.log("method", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "unknown",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransId(paymentIntent.id);

        const donation = {
          transactionId: paymentIntent.id,
          email: user?.email,
          amount: amount,
          campaign,
        };
        Swal.fire({
          title: "Congratulation",
          text: `You have made a donation , Your transaction ID id ${paymentIntent.id} `,
          icon: "success"
        });
        setShow(false);

        const res = await axiosSecure.post("/donations", donation);
   
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button sx={{ mt: 2 }} type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </Button>
    </Form>
  );
};

export default CheckOutForm;
