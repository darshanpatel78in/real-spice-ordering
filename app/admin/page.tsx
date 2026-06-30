"use client";

import { useEffect, useMemo, useState } from "react";

const orderStatusOptions = ["NEW", "PREPARING", "READY", "DISPATCHED", "DELIVERED"];
const paymentStatusOptions = ["PENDING_COD", "PENDING_PHONEPE", "COMPLETED", "FAILED"];

function formatDate(dateString: string | undefined) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export default function AdminPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [statusEdits, setStatusEdits] = useState<Record<string, { orderStatus: string; paymentStatus: string }>>({});
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.sessionStorage.getItem("admin-auth");
      if (stored === "true") {
        setAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setUpdateError(null);

    try {
      const response = await fetch("/api/admin/orders");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load orders.");
      }

      setOrders(data.orders || []);
    } catch (error) {
      setUpdateError((error as Error).message || "Failed to load orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogin = async () => {
    setAuthenticating(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: adminId, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials.");
      }

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("admin-auth", "true");
      }
      setAuthenticated(true);
    } catch (error) {
      setLoginError((error as Error).message || "Login failed.");
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("admin-auth");
    }
    setAuthenticated(false);
    setOrders([]);
    setAdminId("");
    setPassword("");
    setLoginError(null);
  };

  const handleStatusChange = (
    orderId: string,
    field: "orderStatus" | "paymentStatus",
    value: string
  ) => {
    setStatusEdits((current) => ({
      ...current,
      [orderId]: {
        orderStatus: field === "orderStatus" ? value : current[orderId]?.orderStatus || orders.find((order) => order._id === orderId)?.orderStatus || "NEW",
        paymentStatus: field === "paymentStatus" ? value : current[orderId]?.paymentStatus || orders.find((order) => order._id === orderId)?.paymentStatus || "PENDING_COD",
      },
    }));
  };

  const applyStatusUpdate = async (orderId: string) => {
    const edit = statusEdits[orderId];
    if (!edit) {
      return;
    }

    setUpdatingOrderId(orderId);
    setUpdateError(null);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, ...edit }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update order.");
      }

      setOrders((current) =>
        current.map((order) => (order._id === orderId ? data.order : order))
      );
      setStatusEdits((current) => {
        const next = { ...current };
        delete next[orderId];
        return next;
      });
    } catch (error) {
      setUpdateError((error as Error).message || "Failed to update order.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm("Delete this order permanently?")) {
      return;
    }

    setUpdatingOrderId(orderId);
    setUpdateError(null);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete order.");
      }

      setOrders((current) => current.filter((order) => order._id !== orderId));
    } catch (error) {
      setUpdateError((error as Error).message || "Failed to delete order.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [orders]
  );

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-bg-dark px-4 py-10 md:px-8">
        <div className="mx-auto max-w-md rounded-3xl bg-bg-card border border-border-subtle p-10 shadow-[0_20px_80px_rgba(0,0,0,0.16)]">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-text-primary mb-3">
            Admin Login
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            Enter your admin ID and password to access the admin panel.
          </p>

          <div className="space-y-5">
            <label className="block text-sm text-text-secondary">
              <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-text-muted">Admin ID</span>
              <input
                type="text"
                value={adminId}
                onChange={(event) => setAdminId(event.target.value)}
                className="w-full rounded-2xl bg-bg-dark border border-border-subtle px-4 py-3 text-text-primary focus:border-accent-green outline-none"
                placeholder="admin"
              />
            </label>
            <label className="block text-sm text-text-secondary">
              <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-text-muted">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl bg-bg-dark border border-border-subtle px-4 py-3 text-text-primary focus:border-accent-green outline-none"
                placeholder="••••••••"
              />
            </label>
            {loginError && (
              <p className="text-sm text-accent-red">{loginError}</p>
            )}
            <button
              onClick={handleLogin}
              disabled={authenticating}
              className="w-full rounded-2xl bg-accent-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-green-light disabled:opacity-60"
            >
              {authenticating ? "Logging in…" : "Open Admin Panel"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8 animate-fade-in-up">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent-green font-medium mb-1">
              Admin Panel
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-text-primary">
              Orders Dashboard
            </h1>
            <p className="mt-3 text-text-secondary max-w-2xl">
              Manage incoming orders and update order/payment status from one place.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-border-subtle bg-bg-card px-5 py-3 text-sm text-text-secondary transition hover:border-accent-red hover:text-accent-red"
          >
            Logout
          </button>
        </div>

        <div className="section-divider mb-8" />

        {loadingOrders ? (
          <div className="rounded-3xl bg-bg-card border border-border-subtle p-10 text-center text-text-secondary">
            Loading admin orders...
          </div>
        ) : updateError ? (
          <div className="rounded-3xl bg-bg-card border border-accent-red/20 p-10 text-center text-accent-red">
            {updateError}
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="rounded-3xl bg-bg-card border border-border-subtle p-10 text-center text-text-secondary">
            No orders found yet.
          </div>
        ) : (
          <div className="space-y-6">
            {sortedOrders.map((order) => (
              <div key={order._id} className="rounded-3xl bg-bg-card border border-border-subtle p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] animate-fade-in-up">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2">Order ID</p>
                    <p className="font-mono text-sm text-text-primary">{order._id}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2">Customer</p>
                      <p className="text-sm text-text-primary">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2">Phone</p>
                      <p className="text-sm text-text-primary">{order.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2">Placed</p>
                      <p className="text-sm text-text-primary">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-2">Total</p>
                      <p className="text-sm font-semibold text-accent-gold">₹{order.total}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl bg-bg-dark border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-3">Delivery</p>
                    <p className="text-sm text-text-primary mb-2">{order.address}</p>
                    <p className="text-sm text-text-secondary">Distance: {order.distanceKm} km</p>
                  </div>

                  <div className="rounded-3xl bg-bg-dark border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-3">Payment</p>
                    <p className="text-sm text-text-primary mb-2">{order.paymentMethod}</p>
                    <p className="text-sm text-text-secondary">Status: {order.paymentStatus}</p>
                    {order.merchantTransactionId && (
                      <p className="text-sm text-text-secondary mt-2">Txn: {order.merchantTransactionId}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl bg-bg-dark border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-3">Order Items</p>
                    <div className="space-y-3">
                      {order.items?.map((item: any) => (
                        <div key={`${order._id}-${item.id}`} className="rounded-2xl bg-bg-card p-3">
                          <div className="flex items-center justify-between gap-4 text-sm">
                            <span>{item.name}</span>
                            <span className="font-semibold">{item.quantity} × ₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-bg-dark border border-border-subtle p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-3">Status Controls</p>
                    <div className="space-y-4">
                      <label className="block text-sm text-text-secondary">
                        <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-text-muted">Order Status</span>
                        <select
                          value={statusEdits[order._id]?.orderStatus ?? order.orderStatus}
                          onChange={(event) =>
                            handleStatusChange(order._id, "orderStatus", event.target.value)
                          }
                          className="w-full rounded-2xl bg-bg-card border border-border-subtle p-3 text-sm text-text-primary"
                        >
                          {orderStatusOptions.map((status) => (
                            <option key={status} value={status} className="text-black">
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block text-sm text-text-secondary">
                        <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-text-muted">Payment Status</span>
                        <select
                          value={statusEdits[order._id]?.paymentStatus ?? order.paymentStatus}
                          onChange={(event) =>
                            handleStatusChange(order._id, "paymentStatus", event.target.value)
                          }
                          className="w-full rounded-2xl bg-bg-card border border-border-subtle p-3 text-sm text-text-primary"
                        >
                          {paymentStatusOptions.map((status) => (
                            <option key={status} value={status} className="text-black">
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => applyStatusUpdate(order._id)}
                    disabled={
                      updatingOrderId === order._id || !statusEdits[order._id]
                    }
                    className="rounded-full bg-accent-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600 disabled:opacity-60"
                  >
                    Update Status
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(order._id)}
                    disabled={updatingOrderId === order._id}
                    className="rounded-full bg-accent-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                  >
                    Delete Order
                  </button>
                  {updatingOrderId === order._id && (
                    <p className="text-sm text-text-muted">Saving changes…</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
