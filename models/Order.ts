import mongoose, { Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
  id: Number,
  name: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new Schema(
  {
    customerName: String,
    phone: String,
    address: String,

    userLat: Number,
    userLng: Number,
    distanceKm: Number,

    items: [OrderItemSchema],

    subtotal: Number,
    deliveryCharge: Number,
    total: Number,

    paymentMethod: String,
    merchantTransactionId: String,
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      default: "NEW",
    },
  },
  { timestamps: true }
);

export const Order = models.Order || mongoose.model("Order", OrderSchema);