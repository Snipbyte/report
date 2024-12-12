"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NSNJfK5jFmIR9ElOjj4STpJI0aVKMH0i03dG5KM4cuLUvpV31hc8UMpE1DlJiYPxip50pLsl3hbezYSMipsdXJU007BaEo7ni");

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#131222",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  wrapper: {
    backgroundColor: "white",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    display: "flex",
    width: "90%",
    maxWidth: "1200px",
    overflow: "hidden",
  },
  leftPanel: {
    backgroundColor: "#1A1A2E",
    padding: "32px",
    flex: 1,
    color: "white",
  },
  rightPanel: {
    backgroundColor: "#EAEAEA",
    padding: "32px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "16px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.5",
    marginBottom: "12px",
    fontFamily: "Arial, sans-serif",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    textAlign: "center",
  },
  cardInputWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    flexWrap: "wrap",
  },
  cardInput: {
    flex: 1,
    minWidth: "120px",
  },
  errorText: {
    color: "#e11d48",
    marginTop: "8px",
    fontSize: "16px",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

const cardStyle = {
  base: {
    color: "#000",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    lineHeight: "24px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "12px",
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
  complete: {
    color: "#4caf50",
    iconColor: "#4caf50",
  },
};

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { plan_id } = useParams();
  console.log(plan_id);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create Payment Intent on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 9900 }), // Amount in cents
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        setError("Failed to initialize payment. Please try again later.");
        setLoading(false);
        return;
      }

      // Step 2: Confirm Card Payment
      const cardElement = elements.getElement(CardNumberElement);

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "John Doe",
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container1" style={styles.container}>
      <div className="wrapper" style={styles.wrapper}>
        <div style={styles.leftPanel}>
          <h2 style={styles.heading}>Plan Summary</h2>
          <p style={styles.text}>
            <span style={styles.label}> Name:</span> Starter
          </p>
          <p style={styles.text}>
            <span style={styles.label}>Price:</span> $99
          </p>
        </div>
        <div style={styles.rightPanel}>
          <h2 style={styles.heading}>Complete Your Purchase</h2>
          <form onSubmit={handleSubmit} style={styles.formWrapper}>
            <div>
              <label style={styles.label}>Card Number</label>
              <CardNumberElement options={{ style: cardStyle }} />
            </div>
            <div>
            <label style={styles.label}>Expiry Date</label>
              <CardExpiryElement options={{ style: cardStyle }} />
            </div>
            <div>
              <label style={styles.label}>CVC</label>
              <CardCvcElement options={{ style: cardStyle }} />
            </div>
            {error && <p style={styles.errorText}>{error}</p>}
            <button
              type="submit"
              style={styles.button}
              disabled={loading || !stripe || !elements}
            >
              {loading ? "Processing..." : "Pay $99"}
            </button>
          </form>
          {success && (
            <div>
              <div style={styles.overlay} />
              <div style={styles.modal}>
                <h2>Payment Successful!</h2>
                <p>Thank you for your purchase.</p>
                <button
                  onClick={() => setSuccess(false)}
                  style={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StripeWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripeWrapper;
