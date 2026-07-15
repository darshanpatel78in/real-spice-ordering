"use client";

import { useMemo } from "react";

export default function StatementSection({
  orders,
}: any) {

  const today = new Date();

  const dailySales = useMemo(() => {
    return orders.filter((order: any) => {
      const orderDate = new Date(
        order.createdAt
      );

      return (
        orderDate.toDateString() ===
        today.toDateString()
      );
    });
  }, [orders]);

  const weeklySales = useMemo(() => {
    const oneWeekAgo = new Date();

    oneWeekAgo.setDate(
      today.getDate() - 7
    );

    return orders.filter((order: any) => {
      const orderDate = new Date(
        order.createdAt
      );

      return orderDate >= oneWeekAgo;
    });
  }, [orders]);

  const monthlySales = useMemo(() => {
    return orders.filter((order: any) => {
      const orderDate = new Date(
        order.createdAt
      );

      return (
        orderDate.getMonth() ===
          today.getMonth() &&
        orderDate.getFullYear() ===
          today.getFullYear()
      );
    });
  }, [orders]);

  function calculateTotal(data: any[]) {
    return data.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );
  }

  function calculateUnitSales(
    data: any[]
  ) {
    return data.reduce(
      (sum, order) => {
        const qty =
          order.items?.reduce(
            (
              itemSum: number,
              item: any
            ) =>
              itemSum +
              Number(
                item.quantity || 0
              ),
            0
          ) || 0;

        return sum + qty;
      },
      0
    );
  }

  return (
    <div className="glass rounded-[32px] border border-yellow-700/20 p-6 shadow-2xl">

      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-700">
          Sales Statement
        </p>

        <h2 className="font-[var(--font-playfair)] text-3xl font-bold gradient-text">
          Sales Analytics
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* DAILY */}
        <div className="rounded-3xl border border-yellow-700/20 bg-[#1f1f15] p-6">

          <h3 className="text-2xl font-bold text-yellow-300 mb-5">
            Daily Sale
          </h3>

          <div className="space-y-4">

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Unit Sold
              </p>

              <h4 className="text-3xl font-bold text-white mt-2">
                {calculateUnitSales(
                  dailySales
                )}
              </h4>
            </div>

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Aggregate Total
              </p>

              <h4 className="text-3xl font-bold text-green-300 mt-2">
                ₹
                {calculateTotal(
                  dailySales
                )}
              </h4>
            </div>
          </div>
        </div>
    


    
        {/* WEEKLY */}
        <div className="rounded-3xl border border-yellow-700/20 bg-[#1f1f15] p-6">

          <h3 className="text-2xl font-bold text-yellow-300 mb-5">
            Weekly Sale
          </h3>

          <div className="space-y-4">

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Unit Sold
              </p>

              <h4 className="text-3xl font-bold text-white mt-2">
                {calculateUnitSales(
                  weeklySales
                )}
              </h4>
            </div>

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Aggregate Total
              </p>

              <h4 className="text-3xl font-bold text-green-300 mt-2">
                ₹
                {calculateTotal(
                  weeklySales
                )}
              </h4>
            </div>
          </div>
        </div>

        {/* MONTHLY */}
        <div className="rounded-3xl border border-yellow-700/20 bg-[#1f1f15] p-6">

          <h3 className="text-2xl font-bold text-yellow-300 mb-5">
            Monthly Sale
          </h3>

          <div className="space-y-4">

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Unit Sold
              </p>

              <h4 className="text-3xl font-bold text-white mt-2">
                {calculateUnitSales(
                  monthlySales
                )}
              </h4>
            </div>

            <div className="rounded-2xl bg-[#2a2a1d] p-4">
              <p className="text-xs uppercase text-text-secondary">
                Aggregate Total
              </p>

              <h4 className="text-3xl font-bold text-green-300 mt-2">
                ₹
                {calculateTotal(
                  monthlySales
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
{/* OVERALL AGGREGATE */}
<div className="mt-8 rounded-3xl border border-green-500/20 bg-[#1f1f15] p-8">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-green-400">
        Overall Revenue
      </p>

      <h2 className="mt-2 text-2xl font-bold text-white">
        Aggregate Total
      </h2>
    </div>

    <div className="rounded-3xl bg-green-500/10 border border-green-500/20 px-8 py-6">

      <p className="text-sm uppercase text-green-300">
        Total Earnings
      </p>

      <h3 className="mt-2 text-5xl font-bold text-green-300">
        ₹
        {calculateTotal(orders)}
      </h3>
    </div>
  </div>
</div>

    </div>
  );
}
