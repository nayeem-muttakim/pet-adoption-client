import { Button } from "@mui/joy";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckOutForm = ({ amount, campaign, handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
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
    const { error } = await stripe.createPaymentMethod({
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
        handleClose();
        const donation = {
          transactionId: paymentIntent.id,
          email: user?.email,
          amount: amount,
          campaign,
        };

        toast.success(
          `Donation successful.\nYour transaction ID\n is ${paymentIntent.id}`,
          {
            duration: 4000,
            style: {
              border: "1px solid #7c3aed",
              width: "450px",
              textAlign: "center",
            },
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#FFFAEE",
            },
          }
        );
        await axiosSecure.post("/donations", donation);
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
                color: "#7c3aed",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <Button
        sx={{ mt: 2, bgcolor: "#7c3aed", width: "100%" }}
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </Button>
    </Form>
  );
};

export default CheckOutForm;
