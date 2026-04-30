"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { cart } = useCartStore();

  const RESTAURANT_LOCATION = {
    lat: 21.261514047844013,
    lng: 72.83041159486301,
  };

  const UPI_ID = "9408227397@kotak"; // replace this
  const BUSINESS_NAME = "The Real Spice";

  function calculateDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Number((R * c).toFixed(2));
  }

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    distanceKm: 0,
    userLat: 0,
    userLng: 0,
    paymentMethod: "COD",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryCharge =
    customer.distanceKm > 5 ? Math.ceil(customer.distanceKm - 5) * 10 : 0;
  const total = subtotal + deliveryCharge;

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported on this device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateDistanceKm(
          RESTAURANT_LOCATION.lat,
          RESTAURANT_LOCATION.lng,
          userLat,
          userLng,
        );

        setCustomer({
          ...customer,
          userLat,
          userLng,
          distanceKm: distance,
        });
      },
      () => {
        alert("Please allow location permission");
      },
    );
  };

  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all details");
      return;
    }

    if (!customer.distanceKm) {
      alert("Please select your location");
      return;
    }

    // If UPI selected → open payment first
    if (customer.paymentMethod === "ONLINE") {
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
        BUSINESS_NAME,
      )}&am=${total}&cu=INR`;
      window.location.href = upiUrl;
    }

    // Save order (common for both)
    const orderData = {
      customerName: customer.name,
      phone: customer.phone,
      address: customer.address,
      userLat: customer.userLat,
      userLng: customer.userLng,
      distanceKm: customer.distanceKm,
      items: cart,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod: customer.paymentMethod,

      paymentStatus:
        customer.paymentMethod === "ONLINE"
          ? "PENDING_OWNER_CONFIRMATION"
          : "PENDING_COD",
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!data.success) {
      alert("Order failed");
      return;
    }

    // WhatsApp message
    const itemsText = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`,
      )
      .join("%0A");

    const message =
      `🍽️ New Order%0A%0A` +
      `Name: ${customer.name}%0A` +
      `Phone: ${customer.phone}%0A` +
      `Address: ${customer.address}%0A` +
      `Distance: ${customer.distanceKm} km%0A` +
      `Payment Method: ${
        customer.paymentMethod === "ONLINE" ? "UPI" : "Cash on Delivery"
      }%0A` +
      `Payment Status: ${
        customer.paymentMethod === "ONLINE"
          ? "Verify UPI payment manually"
          : "Collect cash on delivery"
      }%0A%0A` +
      `Items:%0A${itemsText}%0A%0A` +
      `Total: ₹${total}`;

    window.open(`https://wa.me/919408227397?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#120d0a] px-4 py-6 text-white">
      <h1 className="text-2xl font-bold">Checkout</h1>

      <div className="mt-6 space-y-4">
        <input
          placeholder="Full Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="w-full rounded-xl bg-[#1f1712] p-4 outline-none"
        />

        <input
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          className="w-full rounded-xl bg-[#1f1712] p-4 outline-none"
        />

        <textarea
          placeholder="Delivery Address"
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
          className="w-full rounded-xl bg-[#1f1712] p-4 outline-none"
          rows={4}
        />

        <button
          onClick={getUserLocation}
          className="w-full rounded-xl bg-[#3a2418] p-4 font-semibold"
        >
          Use My Location
        </button>

        <p className="text-xs text-gray-400 text-center">
          🚚 Delivery is free up to 5 km. Extra charges apply beyond 5 km.
        </p>

        {customer.distanceKm > 0 && (
          <p className="text-sm text-green-400">
            Distance from restaurant: {customer.distanceKm} km
          </p>
        )}

        <div className="rounded-2xl bg-[#1f1712] p-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="mt-2 flex justify-between text-gray-400">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>

          <div className="rounded-2xl bg-[#1f1712] p-4">
            <p className="mb-3 font-semibold">Payment Method</p>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={customer.paymentMethod === "COD"}
                onChange={(e) =>
                  setCustomer({ ...customer, paymentMethod: e.target.value })
                }
              />
              Cash on Delivery
            </label>

            <label className="mt-3 flex items-center gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="ONLINE"
                checked={customer.paymentMethod === "ONLINE"}
                onChange={(e) =>
                  setCustomer({ ...customer, paymentMethod: e.target.value })
                }
              />
              Online Payment
            </label>
          </div>

          <div className="mt-4 flex justify-between border-t border-white/10 pt-4 font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full rounded-full bg-orange-500 py-3 font-semibold"
        >
          {customer.paymentMethod === "COD"
            ? "Place Order - Cash on Delivery"
            : "Pay & Place Order"}
        </button>
      </div>
    </main>
  );
}
