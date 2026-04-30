"use client";

import { menuItems } from "@/lib/menu-data";
import { useCartStore } from "@/store/cart-store";


export default function Home() {

   const { cart, addToCart } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

 return (
    <main className="min-h-screen bg-[#120d0a] text-white">
      <section className="px-4 py-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#3a2418] to-[#1b120e] p-5 shadow-lg">
          <p className="text-sm text-orange-300">Authentic Indian Cuisine</p>
          <h1 className="mt-2 text-3xl font-bold">The Real Spice</h1>
          <p className="mt-2 text-sm text-gray-300">
            Fresh, hot and delicious food delivered from our kitchen.
          </p>
        </div>
      </section>

      <section className="px-4 pb-28">
        <h2 className="mb-4 text-xl font-semibold">Our Menu</h2>

        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl bg-[#1f1712] p-4 shadow-md"
            >
              <div className="h-24 w-24 shrink-0 rounded-xl bg-[#3a2418]" />

              <div className="flex flex-1 flex-col">
                <p className="text-sm text-orange-300">{item.category}</p>
                <h3 className="mt-1 font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <p className="font-bold">₹{item.price}</p>
                  <button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                      })
                    }
                    className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 rounded-2xl bg-orange-500 p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{totalItems} item added</p>
              <p className="text-sm">Total ₹{totalAmount}</p>
            </div>

            <a
              href="/cart"
              className="rounded-full bg-white px-5 py-2 font-semibold text-orange-600"
            >
              View Cart
            </a>
          </div>
        </div>
      )}
    </main>
  );

}
