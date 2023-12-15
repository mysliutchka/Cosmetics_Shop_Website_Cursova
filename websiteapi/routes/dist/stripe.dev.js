"use strict";

var router = require("express").Router();

var stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", function _callee(req, res) {
  var charge;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount * 100,
            // Convert amount to cents
            currency: "UAH"
          }));

        case 3:
          charge = _context.sent;
          res.status(200).json(charge);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Stripe Error:", _context.t0);
          res.status(500).json({
            error: "Payment failed"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;