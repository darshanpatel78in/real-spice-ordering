"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
export default function CheckoutPage() {
  const { cart } = useCartStore();

  const RESTAURANT_LOCATION = {
    lat: 21.261514047844013,
    lng: 72.83041159486301,
  };

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

    selectedLat: RESTAURANT_LOCATION.lat,
    selectedLng: RESTAURANT_LOCATION.lng,

    paymentMethod: "COD",
  });

  const [locating, setLocating] = useState(false);

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
    setLocating(true);
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
          selectedLat: userLat,
          selectedLng: userLng,
          distanceKm: distance,
        });
        setLocating(false);
      },
      () => {
        alert("Please allow location permission");
        setLocating(false);
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
    if (!cart.length || total <= 0) {
      alert("Your cart is empty");
      return;
    }

    console.log("[Checkout] Placing order with total:", total);

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
        customer.paymentMethod === "PHONEPE"
          ? "PENDING_PHONEPE"
          : "PENDING_COD",
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    console.log("[Checkout] Order API response:", data);
    if (!data.success) {
      alert("Order failed");
      return;
    }

    if (customer.paymentMethod === "PHONEPE") {
      try {
        const paymentPayload = {
          orderId: data.order._id,
          amount: total,
          phone: customer.phone,
        };
        console.log("[Checkout] Sending to PhonePe:", paymentPayload);
        const phonepeResponse = await fetch("/api/payment/phonepe/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentPayload),
        });
        const phonepeData = await phonepeResponse.json();
        console.log("[Checkout] PhonePe response:", phonepeData);

        if (phonepeData.success && phonepeData.redirectUrl) {
          window.location.href = phonepeData.redirectUrl;
          return;
        } else {
          const errorMsg = phonepeData.message || phonepeData.data?.message || "Failed to initiate payment";
          console.error("[Checkout] PhonePe error:", errorMsg);
          alert(`Payment Error: ${errorMsg}`);
          return;
        }
      } catch (error) {
        console.error("[Checkout] Payment error:", error);
        alert("Payment initialization error");
        return;
      }
    }

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
      `Payment Method: ${customer.paymentMethod === "PHONEPE" ? "UPI (PhonePe)" : "Cash on Delivery"}%0A` +
      `Payment Status: ${customer.paymentMethod === "PHONEPE" ? "Payment pending verification" : "Collect cash on delivery"}%0A%0A` +
      `Items:%0A${itemsText}%0A%0A` +
      `Total: ₹${total}`;
    window.open(`https://wa.me/919408227397?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-bg-dark px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <p className="text-xs tracking-[0.3em] uppercase text-accent-green font-medium mb-1">
            Final Step
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary">
            Checkout
          </h1>
        </div>

        <div className="section-divider mb-8" />

        <div className="grid gap-8 md:grid-cols-5">
          {/* Form column */}
          <div className="md:col-span-3 space-y-5 animate-fade-in-up">
            {/* Customer details */}
            <div className="rounded-2xl bg-bg-card border border-border-subtle p-5">
              <h2 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-xs text-white font-bold">
                  1
                </span>
                Your Details
              </h2>
              <div className="space-y-3">
                <input
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-bg-elevated border border-border-subtle p-3.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200"
                />
                <input
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  className="w-full rounded-xl bg-bg-elevated border border-border-subtle p-3.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200"
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  className="w-full rounded-xl bg-bg-elevated border border-border-subtle p-3.5 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl bg-bg-card border border-border-subtle p-5">
              <h2 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-xs text-white font-bold">
                  2
                </span>
                Delivery Location
              </h2>
              <button
                onClick={getUserLocation}
                disabled={locating}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-bg-elevated border border-border-subtle p-3.5 text-sm font-medium text-text-secondary hover:border-accent-green/40 hover:text-accent-green transition-all duration-200 disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {locating ? "Detecting..." : "Use My Location"}
              </button>

              <p className="mt-3 text-center text-xs text-text-muted">
                🚚 Free delivery up to 5 km · ₹10/km beyond
              </p>
              {customer.distanceKm > 0 && (
                <p className="mt-2 text-center text-sm text-accent-green font-medium">
                  ✓ {customer.distanceKm} km from restaurant
                </p>
              )}
            </div>

            {/* Payment method */}
            <div className="rounded-2xl bg-bg-card border border-border-subtle p-5">
              <h2 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-green text-xs text-white font-bold">
                  3
                </span>
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-3 rounded-xl p-3.5 border cursor-pointer transition-all duration-200 ${
                    customer.paymentMethod === "COD"
                      ? "bg-accent-green/10 border-accent-green/40"
                      : "bg-bg-elevated border-border-subtle hover:border-accent-green/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={customer.paymentMethod === "COD"}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="accent-accent-green"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-text-muted">
                      Pay when your food arrives
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-3 rounded-xl p-3.5 border cursor-pointer transition-all duration-200 ${
                    customer.paymentMethod === "PHONEPE"
                      ? "bg-accent-green/10 border-accent-green/40"
                      : "bg-bg-elevated border-border-subtle hover:border-accent-green/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PHONEPE"
                    checked={customer.paymentMethod === "PHONEPE"}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="accent-accent-green"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      UPI (PhonePe)
                    </p>
                    <p className="text-xs text-text-muted">
                      Pay securely via PhonePe
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Summary column */}
          <div
            className="md:col-span-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="sticky top-24 rounded-2xl bg-bg-card border border-accent-green/20 p-5">
              <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-text-secondary">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-text-primary font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border-subtle pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Delivery</span>
                  <span
                    className={deliveryCharge === 0 ? "text-accent-green" : ""}
                  >
                    {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border-subtle flex justify-between items-center">
                <span className="font-semibold text-text-primary">Total</span>
                <span className="text-xl font-bold text-accent-gold">
                  ₹{total}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn-shine mt-5 w-full rounded-full bg-accent-red py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-red-light hover:shadow-[0_8px_30px_rgba(198,40,40,0.3)] animate-pulse-glow"
              >
                {customer.paymentMethod === "COD"
                  ? "Place Order — Cash on Delivery"
                  : "Pay with PhonePe & Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
