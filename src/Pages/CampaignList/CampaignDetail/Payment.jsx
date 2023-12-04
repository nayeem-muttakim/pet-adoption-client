import { Grid } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = ({amount,campaign,setShow}) => {
   
  return (
    <Grid>
      <Elements stripe={stripePromise}>
        <CheckOutForm setShow={setShow} campaign={campaign} amount={amount}/>
      </Elements>
    </Grid>
  );
};

export default Payment;
