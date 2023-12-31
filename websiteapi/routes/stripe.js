const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount * 100, // Convert amount to cents
      currency: "UAH",
    });

    res.status(200).json(charge);
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
