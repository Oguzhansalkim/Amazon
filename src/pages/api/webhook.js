import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permission.json");

//initializing to firebase to store it in direbase database
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//to make connection with stripe first to recieve webhook event
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointsecret = process.env.STRIPE_SIGNING_SECRET;

const storingOrders = async (session) => {
  console.log("fullFilling order ", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: ORDER ${session.id} STORED THE DATABASE`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const reqbuffer = await buffer(req);
    const payload = reqbuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //verifying if the event fired is from stripe
    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointsecret
      );
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`WebHook error: ${err.message}`);
    }

    //after verifying we are checking and handling events from stripe ,we are going to handle
    //checkout.session.completed event lets go!!

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //storing or fullfilling orders in database
      return storingOrders(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`WebHook err: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
