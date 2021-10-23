const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      expired: Date,
    },
  },
  { collection: "payment" }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
