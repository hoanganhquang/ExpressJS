import { showAlert } from "./alert";

const stripe = Stripe(
  "pk_test_51Js1lgASo0bi48TADOMmUH6FkNLRvnBnMrzRSSEqCZSOeNsbwrJ9Hka8ORb0KTxHKNHFslDol3SJcrzHG9vdBdeq00LfjQ43C5"
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    showAlert("error", error);
  }
};
