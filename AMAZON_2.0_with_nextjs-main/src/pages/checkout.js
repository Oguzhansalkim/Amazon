import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { priceTotal, selectItems } from "../slices/basketSlice";
import CheckoutItems from "../components/CheckoutItems";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function Checkout() {
  const stripePromise = loadStripe(process.env.stripe_public_key);
  const items = useSelector(selectItems);
  items.map((item, i) => {
    console.log(item);
  });
  const totalprice = useSelector(priceTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className=" lg:flex max-w-screen-lg mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="border-b text-3xl pb-4">
              {" "}
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutItems
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasprime={item.hasprime}
              />
            ))}
          </div>
        </div>

        {/* right side */}
        <div>
          {items.length > 0 && (
            <div className=" mt-5 flex flex-col bg-white p-10 shadow-md">
              <h2 className="whitespace-nowrap ">
                {" "}
                Subtotal ({items.length} items):
                <span>
                  <Currency quantity={totalprice * 100} currency="INR" />
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to checkout" : "Proceed to checkout"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
