"use client";

import { useEffect, useMemo, useState } from "react";
import { menuItems, type MenuItem } from "../../lib/menu-data";

const orderStatusOptions = ["NEW", "PREPARING", "READY", "DISPATCHED", "DELIVERED"];
const paymentStatusOptions = ["PENDING_COD", "PENDING_PHONEPE", "COMPLETED", "FAILED"];
type AdminView = "orders" | "menu";

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
  const [activeView, setActiveView] = useState<AdminView>("orders");
  const [menuData, setMenuData] = useState<MenuItem[]>(menuItems);
  const [deletedMenuIds, setDeletedMenuIds] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMenuItemIds, setSelectedMenuItemIds] = useState<number[]>([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [menuMessage, setMenuMessage] = useState<string | null>(null);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    isVeg: true,
  });

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("admin-added-menu-items");
    const savedDeleted = window.localStorage.getItem("admin-deleted-menu-item-ids");
    let deletedIds: number[] = [];

    if (savedDeleted) {
      try {
        const parsedDeleted: number[] = JSON.parse(savedDeleted);
        if (Array.isArray(parsedDeleted)) {
          deletedIds = parsedDeleted;
          setDeletedMenuIds(parsedDeleted);
        }
      } catch (error) {
        console.error("Failed to load deleted menu item ids:", error);
      }
    }

    if (!saved) {
      setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
      return;
    }

    try {
      const parsed: MenuItem[] = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setMenuData([...menuItems, ...parsed].filter((item) => !deletedIds.includes(item.id)));
      } else {
        setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
      }
    } catch (error) {
      console.error("Failed to load saved menu items:", error);
      setMenuData(menuItems.filter((item) => !deletedIds.includes(item.id)));
    }
  }, []);

  const saveDeletedMenuIds = (nextDeletedIds: number[]) => {
    setDeletedMenuIds(nextDeletedIds);

    if (typeof window === "undefined") return;

    window.localStorage.setItem("admin-deleted-menu-item-ids", JSON.stringify(nextDeletedIds));
  };

  const saveMenuItems = (nextMenuData: MenuItem[]) => {
    setMenuData(nextMenuData);

    if (typeof window === "undefined") return;

    const extraItems = nextMenuData.filter(
      (item) => !menuItems.some((staticItem) => staticItem.id === item.id)
    );

    window.localStorage.setItem("admin-added-menu-items", JSON.stringify(extraItems));
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode((current) => {
      if (current) {
        setSelectedMenuItemIds([]);
      }
      return !current;
    });
  };

  const handleMenuItemSelection = (itemId: number) => {
    setSelectedMenuItemIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  };

  const handleDeleteSelectedMenuItems = () => {
    if (selectedMenuItemIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedMenuItemIds.length} selected item(s) permanently?`)) {
      return;
    }

    const nextMenuData = menuData.filter((item) => !selectedMenuItemIds.includes(item.id));
    const staticDeleted = menuItems
      .filter((item) => selectedMenuItemIds.includes(item.id))
      .map((item) => item.id);

    if (staticDeleted.length > 0) {
      saveDeletedMenuIds([...new Set([...deletedMenuIds, ...staticDeleted])]);
    }

    saveMenuItems(nextMenuData);
    setSelectedMenuItemIds([]);
    setSelectionMode(false);
  };

  const resetNewItem = () => {
    setNewMenuItem({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      isVeg: true,
    });
  };

  const handleAddMenuItem = () => {
    setMenuMessage(null);

    if (!newMenuItem.name.trim() || !newMenuItem.category.trim() || !newMenuItem.price.trim()) {
      setMenuMessage("Name, category, and price are required.");
      return;
    }

    const priceValue = Number(newMenuItem.price);
    if (Number.isNaN(priceValue) || priceValue < 0) {
      setMenuMessage("Please enter a valid price.");
      return;
    }

    const nextId = Math.max(...menuData.map((item) => item.id), 121) + 1;
    const newItem: MenuItem = {
      id: nextId,
      name: newMenuItem.name.trim(),
      category: newMenuItem.category.trim(),
      price: priceValue,
      image: newMenuItem.image.trim() || "/images/placeholder.svg",
      description: newMenuItem.description.trim() || undefined,
      items: undefined,
      isVeg: newMenuItem.isVeg,
    };

    saveMenuItems([...menuData, newItem]);
    setMenuMessage("New item added successfully.");
    resetNewItem();
    setShowAddItemForm(false);
  };

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
        document.cookie = "admin-auth=true; path=/";
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
    document.cookie =
      "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("admin-auth");
    }

    setAuthenticated(false);
    setOrders([]);
    setAdminId("");
    setPassword("");
    setLoginError(null);
    setActiveView("orders");
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
        <header className="mb-8 rounded-3xl border border-border-subtle bg-bg-card p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Real Spice logo"
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-accent-green">
                  Admin Panel
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
                  Real Spice
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <button
                onClick={() => setActiveView("orders")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300/60 bg-[#1f1f1f] ${
                  activeView === "orders"
                    ? "text-slate-100"
                    : "text-text-secondary hover:text-slate-100"
                }`}
              >
                Admin
              </button>

              <button
                onClick={() => setActiveView("menu")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300/60 bg-[#1f1f1f] ${
                  activeView === "menu"
                    ? "text-slate-100"
                    : "text-text-secondary hover:text-slate-100"
                }`}
              >
                Menu
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full border border-border-subtle bg-accent-red px-4 py-2 text-sm font-semibold text-blue transition-all duration-200 hover:opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent-red/50"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {activeView === "menu" ? (
          <div className="rounded-3xl border border-border-subtle bg-bg-card p-4 md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">
                  Menu Manager
                </p>

                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                  Full Menu
                </h3>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex flex-wrap items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuMessage(null);
                      setShowAddItemForm((current) => !current);
                    }}
                    className="rounded-full bg-accent-green px-4 py-2 text-sm font-semibold text-blue transition-all duration-200 hover:bg-accent-green-light"
                  >
                    {showAddItemForm ? "Cancel" : "Add New Item"}
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleSelectionMode}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${selectionMode ? "bg-red-100 text-red-800" : "bg-red-50 text-red-700 hover:bg-red-100"}`}
                  >
                    {selectionMode ? "Cancel delete" : "Select items to delete"}
                  </button>

                  {selectionMode && selectedMenuItemIds.length > 0 && (
                    <button
                      type="button"
                      onClick={handleDeleteSelectedMenuItems}
                      className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700"
                    >
                      Delete selected ({selectedMenuItemIds.length})
                    </button>
                  )}
                </div>

                <p className="text-sm text-text-secondary">
                  {selectionMode ? `${selectedMenuItemIds.length} selected` : `${menuData.length} dishes available`}
                </p>
              </div>
            </div>

            {showAddItemForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-full max-w-4xl rounded-3xl border border-border-subtle bg-bg-dark/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <button
                    type="button"
                    onClick={() => {
                      resetNewItem();
                      setMenuMessage(null);
                      setShowAddItemForm(false);
                    }}
                    className="absolute right-4 top-4 rounded-full border border-border-subtle bg-bg-card/80 p-2 text-text-secondary transition hover:bg-bg-card"
                    aria-label="Close add new item form"
                  >
                    ×
                  </button>

                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-accent-gold">
                        Add Menu Item
                      </p>
                      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                        New Dish Details
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2 text-sm text-text-secondary">
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">Dish Name</span>
                      <input
                        value={newMenuItem.name}
                        onChange={(event) => setNewMenuItem((current) => ({ ...current, name: event.target.value }))}
                        className="w-full rounded-2xl border border-border-subtle bg-bg-card px-4 py-3 text-text-primary outline-none"
                        placeholder="Example: Paneer Butter Masala"
                      />
                    </label>

                    <label className="space-y-2 text-sm text-text-secondary">
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">Category</span>
                      <input
                        value={newMenuItem.category}
                        onChange={(event) => setNewMenuItem((current) => ({ ...current, category: event.target.value }))}
                        className="w-full rounded-2xl border border-border-subtle bg-bg-card px-4 py-3 text-text-primary outline-none"
                        placeholder="Example: Real Spice Paneer Special"
                      />
                    </label>

                    <label className="space-y-2 text-sm text-text-secondary">
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">Price</span>
                      <input
                        value={newMenuItem.price}
                        onChange={(event) => setNewMenuItem((current) => ({ ...current, price: event.target.value }))}
                        className="w-full rounded-2xl border border-border-subtle bg-bg-card px-4 py-3 text-text-primary outline-none"
                        placeholder="Example: 250"
                        type="number"
                        min="0"
                      />
                    </label>

                    <label className="space-y-2 text-sm text-text-secondary">
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">Dish Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (!file) {
                            return;
                          }

                          const reader = new FileReader();
                          reader.onload = () => {
                            setNewMenuItem((current) => ({
                              ...current,
                              image: reader.result as string,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="w-full rounded-2xl border border-border-subtle bg-bg-card px-4 py-3 text-text-primary outline-none"
                      />
                      {newMenuItem.image && (
                        <p className="text-xs text-text-muted">
                          Image selected
                        </p>
                      )}
                    </label>

                    <label className="space-y-2 text-sm text-text-secondary md:col-span-2">
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">Description</span>
                      <textarea
                        value={newMenuItem.description}
                        onChange={(event) => setNewMenuItem((current) => ({ ...current, description: event.target.value }))}
                        className="w-full rounded-2xl border border-border-subtle bg-bg-card px-4 py-3 text-text-primary outline-none resize-none"
                        rows={4}
                        placeholder="Short description of the dish"
                      />
                    </label>

                    <label className="flex items-center gap-3 text-sm text-text-secondary">
                      <input
                        type="checkbox"
                        checked={newMenuItem.isVeg}
                        onChange={(event) => setNewMenuItem((current) => ({ ...current, isVeg: event.target.checked }))}
                        className="h-4 w-4 rounded border border-border-subtle bg-bg-card text-accent-green focus:ring-accent-green"
                      />
                      <span>Vegetarian</span>
                    </label>
                  </div>

                  {menuMessage && (
                    <p className="mt-4 text-sm text-accent-red">{menuMessage}</p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleAddMenuItem}
                      className="rounded-full bg-accent-green px-5 py-3 text-sm font-semibold text-blue transition-all duration-200 hover:bg-accent-green-light"
                    >
                      Save Dish
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetNewItem();
                        setMenuMessage(null);
                        setShowAddItemForm(false);
                      }}
                      className="rounded-full border border-border-subtle bg-bg-dark/80 px-5 py-3 text-sm font-semibold text-text-secondary transition-all duration-200 hover:bg-bg-card"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {menuData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border-subtle bg-bg-dark/70 p-4"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectionMode && (
                          <label className="flex cursor-pointer items-center gap-2 text-xs text-text-secondary">
                            <input
                              type="checkbox"
                              checked={selectedMenuItemIds.includes(item.id)}
                              onChange={() => handleMenuItemSelection(item.id)}
                              className="h-4 w-4 rounded border border-border-subtle bg-bg-dark text-accent-yellow focus:ring-accent-red"
                            />
                            Select
                          </label>
                        )}
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            item.isVeg
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-amber-500/15 text-amber-400"
                          }`}
                        >
                          {item.isVeg ? "Veg" : "Non-Veg"}
                        </span>
                      </div>
                    </div>

                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-text-muted">
                      {item.category}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {item.description || "Freshly prepared special."}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-accent-gold">
                      {item.price !== null ? `₹${item.price}` : "Price on request"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent-green">
                  Admin Panel
                </p>

                <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white">
                  Orders Dashboard
                </h1>
              </div>
            </div>

            {loadingOrders ? (
              <div className="rounded-2xl bg-bg-card p-10 text-center text-text-secondary">
                Loading orders...
              </div>
            ) : updateError ? (
              <div className="rounded-2xl bg-red-500/10 p-6 text-center text-red-400">
                {updateError}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-3xl border border-border-subtle bg-bg-card">
                <table className="min-w-full border-collapse">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Customer
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Phone
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Address
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Items
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Total
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Order Status
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Payment
                      </th>

                      <th className="px-4 py-4 text-left text-sm font-semibold text-text-primary">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-t border-border-subtle"
                      >
                        <td className="px-4 py-4 text-sm text-white">
                          <div>
                            <p className="font-semibold">{order.customerName}</p>

                            <p className="text-xs text-text-muted">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-text-secondary">
                          {order.phone}
                        </td>

                        <td className="px-4 py-4 max-w-[220px] text-sm text-text-secondary">
                          {order.address}
                        </td>

                        <td className="px-4 py-4 text-sm text-text-secondary">
                          <div className="space-y-1">
                            {order.items?.map((item: any) => (
                              <p key={item.id}>
                                {item.name} × {item.quantity}
                              </p>
                            ))}
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm font-bold text-accent-gold">
                          ₹{order.total}
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={
                              statusEdits[order._id]?.orderStatus ??
                              order.orderStatus
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                order._id,
                                "orderStatus",
                                event.target.value
                              )
                            }
                            className="rounded-lg border border-border-subtle bg-bg-dark px-3 py-2 text-sm text-white"
                          >
                            {orderStatusOptions.map((status) => (
                              <option
                                key={status}
                                value={status}
                                className="text-black"
                              >
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={
                              statusEdits[order._id]?.paymentStatus ??
                              order.paymentStatus
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                order._id,
                                "paymentStatus",
                                event.target.value
                              )
                            }
                            className="rounded-lg border border-border-subtle bg-bg-dark px-3 py-2 text-sm text-white"
                          >
                            {paymentStatusOptions.map((status) => (
                              <option
                                key={status}
                                value={status}
                                className="text-black"
                              >
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => applyStatusUpdate(order._id)}
                              disabled={updatingOrderId === order._id}
                              className="rounded-lg bg-accent-green px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                            >
                              Update
                            </button>

                            <button
                              onClick={() => handleDelete(order._id)}
                              disabled={updatingOrderId === order._id}
                              className="rounded-lg bg-accent-red px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
