const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "require the name"],
    },
    expired: {
      type: String,
      required: [true, "require the date"],
    },
  },
  { collection: "payment" }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
