"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } =
    useCartStore();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-[#120d0a] px-4 py-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="mt-6 text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#1f1712] p-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-400">₹{item.price}</p>
                </div>

                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="h-8 w-8 rounded-full bg-[#3a2418] font-bold"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="h-8 w-8 rounded-full bg-orange-500 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-orange-500 p-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <a
            href="/checkout"
            className="block w-full rounded-full bg-white py-3 text-center font-semibold text-orange-600"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </main>
  );
}
