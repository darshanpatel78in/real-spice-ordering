import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersSection({
  orders,
  loadingOrders,
  statusEdits,
  setStatusEdits,
  orderStatusOptions,
  paymentStatusOptions,
  applyStatusUpdate,
  handleDelete,
}: any) {
  return (
    <div className="glass rounded-[32px] border border-yellow-700/20 p-6 shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-700">
            Restaurant Orders
          </p>

          <h2 className="font-[var(--font-playfair)] text-3xl font-bold gradient-text">
            Orders Dashboard
          </h2>
        </div>

        <div className="rounded-2xl bg-[#232318] px-4 py-2 text-sm text-text-secondary border border-yellow-700/20">
          Total Orders:{" "}
          <span className="font-bold text-yellow-300">
            {orders.length}
          </span>
        </div>
      </div>

      {loadingOrders ? (
        <div className="py-20 text-center text-text-secondary">
          Loading orders...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-yellow-700/20">
<table className="w-full table-auto border-collapse text-left">
          

            <thead className="bg-[#2a2a1d]">
              <tr>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Customer
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Items
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Total
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Payment
                </th>
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
  Table
</th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Order Status
                </th>


                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-yellow-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map(
                (
                  order: any,
                  index: number
                ) => (
                  <tr
                    key={order._id}
                    className={`border-t border-yellow-700/10 transition-all duration-300 hover:bg-[#2a2a1d]/60 ${
                      index % 2 === 0
                        ? "bg-[#1e1e15]"
                        : "bg-[#232318]"
                    }`}
                  >
                    <td className="px-2 py-2 align-top">
                      <h3 className="font-[var(--font-playfair)] text-xl font-bold text-yellow-100">
                        {
                          order.customerName
                        }
                      </h3>

                      <p className="mt-1 text-xs text-text-secondary">
                        {order.phone}
                      </p>

                      <p className="mt-3 text-[11px] leading-relaxed text-text-secondary">
                        {order.address}
                      </p>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <div className="space-y-1">
                        {order.items?.map(
                          (item: any) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-xl bg-[#2e2e1f] px-3 py-2 text-xs text-white border border-yellow-700/10"
                            >
                              <span>
                                {item.name}
                              </span>

                              <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-yellow-300">
                                ×{" "}
                                {
                                  item.quantity
                                }
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </td>

                    <td className="px-2 py-2 align-top">
                      <div className="rounded-2xl bg-yellow-100/10 px-3 py-2 text-center border border-yellow-300/20">
                        <p className="text-xs uppercase tracking-wider text-yellow-500">
                          Amount
                        </p>

                        <h5 className="mt-1 text-2xl text-sm text-yellow-100">
                          ₹{order.total}
                        </h5>
                      </div>
                    </td>

                    <td className="px-2 py-2 align-top ">
                      <div>
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-accent-gold text-center">
                          Payment Method
                        </p>

                        <div
                          className={`rounded-2xl px-1 py-2 text-sm font-semibold text-center border
                          ${
                            order.paymentMethod ===
                            "UPI"
                              ? "bg-green-500/10 text-green-300 border-green-500/30"
                              : "bg-yellow-500/10 text-yellow-300 border-yellow-500/30"
                          }`}
                        >
                          {order.paymentMethod ||
                            "COD"}
                        </div>
                      </div>
                    </td>
<td className="px-3 py-3 align-top">
  <div className="inline-block rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-center min-w-[70px]">

    <p className="text-[10px] uppercase tracking-wide text-blue-300">
      Table
    </p>

    <h4 className="mt-0.5 text-lg font-bold text-white">
      {order.tableNumber || "--"}
    </h4>

  </div>
</td>
                    <td className="px-2 py-2 align-top ">
                      <div className="space-y-4">

                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-yellow-400 ">
                            Order Status
                          </p>

                          <Select
  value={
    statusEdits[order._id]?.orderStatus ??
    order.orderStatus
  }
  onValueChange={(value) =>
    setStatusEdits((current: any) => ({
      ...current,
      [order._id]: {
        orderStatus: value,
        paymentStatus:
          current[order._id]?.paymentStatus ??
          order.paymentStatus,
        paymentMethod:
          current[order._id]?.paymentMethod ??
          order.paymentMethod,
      },
    }))
  }
>
  <SelectTrigger className="w-28 h-8 rounded-lg border border-yellow-700/20 bg-[#2a2a1d] text-xs text-white">
    <SelectValue />
  </SelectTrigger>

<SelectContent
  side="bottom"
  align="start"
  sideOffset={5}
  className="w-28 text-xs bg-[#2a2a1d] border border-yellow-700/20 text-white"
>    {orderStatusOptions.map((status: string) => (
      <SelectItem
        key={status}
        value={status}
        className="text-xs"
      >
        {status}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
                                           </div>


                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-green-400">
                            Payment Status
                          </p>

                          <Select
  value={
    statusEdits[order._id]?.paymentStatus ??
    order.paymentStatus
  }
  onValueChange={(value) =>
    setStatusEdits((current: any) => ({
      ...current,
      [order._id]: {
        orderStatus:
          current[order._id]?.orderStatus ??
          order.orderStatus,
        paymentStatus: value,
        paymentMethod:
          current[order._id]?.paymentMethod ??
          order.paymentMethod,
      },
    }))
  }
>
  <SelectTrigger className="w-28 h-8 rounded-lg border border-green-700/30 bg-[#1f2b1f] text-xs text-white">
    <SelectValue />
  </SelectTrigger>

  <SelectContent
  side="bottom"
  align="start"
  sideOffset={5}
  className="w-28 text-xs bg-[#2a2a1d] border border-yellow-700/20 text-white"
>
    {paymentStatusOptions.map((status: string) => (
      <SelectItem
        key={status}
        value={status}
        className="text-xs"
      >
        {status}
      </SelectItem>
    ))}
  </SelectContent>
</Select> 
                        </div>
                      </div>
                    </td>

                    <td className="px-2 py-2 align-top">
                      <div className="flex flex-col gap-3">

                        <button
                          onClick={() =>
                            applyStatusUpdate(
                              order._id
                            )
                          }
                          className="rounded-2xl bg-gradient-to-r from-green-300 to-green-100  px-3 py-2 text-xs font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                          Update
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              order._id
                            )
                          }
                          className="rounded-2xl bg-gradient-to-r from-red-100 to-red-400 px-3 py-2 text-xs font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
