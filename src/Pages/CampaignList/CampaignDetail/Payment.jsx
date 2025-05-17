import { Grid } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = ({ amount, campaign, handleClose }) => {
  return (
    <Grid>
      <Elements stripe={stripePromise}>
        <CheckOutForm
          campaign={campaign}
          amount={amount}
          handleClose={handleClose}
        />
      </Elements>
    </Grid>
  );
};

export default Payment;
