import { CheckCircleIcon } from "@heroicons/react/solid";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import Header from "../components/Header";

function success() {
  const route = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-md mx-auto">
        <div className="flex flex-col bg-white p-10">
          <div className="flex space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thankyou, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thankyou shopping with Amazon. We'll send a confirmation of item
            once it's shipped, if you would like to check your confirmed
            order(s) and its status please press the link below.
          </p>
          <button
            onClick={() => route.push("/orders")}
            className="button mt-8 text-sm "
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default success;
