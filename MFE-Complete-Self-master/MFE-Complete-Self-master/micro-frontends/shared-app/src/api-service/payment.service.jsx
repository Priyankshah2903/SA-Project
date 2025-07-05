import { useState } from "react";
import API_BASE_URL from "./apiConfig";
import axios from "axios";

// Hardcoded Stripe public key (Not needed anymore because we are using checkoutUrl)
const STRIPE_PUBLIC_KEY = "pk_test_51R3L9MIWECciELsFVC9a2fdTxHcHaOb7WxDwBtolgpMDa4wv5BkTMdyikdJwOC5TyekdK7AOQvOil9cN6z01Llgh007jB7oMY4";

function PaymentService() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Correct Authorization Header
  const authHeader = () => {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  // Initiate Stripe Checkout
  const initiateCheckout = async (amount, description) => {
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      console.log("Initiating checkout...");
      
      const response = await axios.post(
        `http://172.17.48.111:9060/cart/checkout`, // ✅ Fixed API endpoint  //ip of backend
        {
          userId: user?.id,
          amount: amount,
          description: description,
          successUrl: "http://localhost:3000/success",
          cancelUrl: "http://localhost:5173/",
        },
        { headers: authHeader() }
      );

      console.log("API Response:", response.data);

      const { checkoutUrl } = response.data.response;
      if (!checkoutUrl) {
        throw new Error("Checkout URL missing in response.");
      }

      // ✅ Redirect user to Stripe Checkout page
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error("Payment API Error:", error);
      setCheckoutError(
        error.response?.data?.message || error.message || "Checkout failed."
      );
    }

    setCheckoutLoading(false);
  };

  return { checkoutLoading, checkoutError, initiateCheckout };
}

export default PaymentService;