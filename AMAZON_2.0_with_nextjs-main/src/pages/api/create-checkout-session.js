const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;
  console.log(items);
  console.log(email);

  const tranformItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 10000,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J1XLMSHfXaGmVRQqWPfPg71"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    line_items: tranformItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
