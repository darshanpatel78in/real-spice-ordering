"use client";

import { useEffect, useMemo, useState } from "react";

import {
  menuItems,
  type MenuItem,
} from "../../lib/menu-data";

import AdminLogin from "./components/AdminLogin";
import AdminHeader from "./components/AdminHeader";
import MenuSection from "./components/MenuSection";
import OrdersSection from "./components/OrdersSection";
import StatementsSection from "./components/StatementsSection";


const orderStatusOptions = [
  "NEW",
  "PREPARING",
  "READY",
  "DISPATCHED",
  "DELIVERED",
];

const paymentStatusOptions = [
  "PENDING",
  "COMPLETED",
  "FAILED",
];

type AdminView = "orders" | "menu" | "statement";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] =
    useState(false);

  const [activeView, setActiveView] =
    useState<AdminView>("orders");

  const [menuData, setMenuData] =
    useState<MenuItem[]>([]);

  const [selectedMenuItemIds, setSelectedMenuItemIds] =
    useState<number[]>([]);

  const [selectionMode, setSelectionMode] =
    useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [showAddItemForm, setShowAddItemForm] =
    useState(false);

  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    isVeg: true,
  });

  const [statusEdits, setStatusEdits] = useState<
    Record<
      string,
      {
        orderStatus: string;
        paymentStatus: string;
        paymentMethod: string;
      }
    >
  >({});

  useEffect(() => {
    const storedMenu =
      localStorage.getItem("restaurant-menu");

    if (storedMenu) {
      setMenuData(JSON.parse(storedMenu));
    } else {
      setMenuData(menuItems);
    }
  }, []);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? sessionStorage.getItem("admin-auth")
        : null;

    if (stored === "true") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated]);

  async function fetchOrders() {
    setLoadingOrders(true);

    try {
      const response = await fetch(
        "/api/admin/orders"
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrders(false);
    }
  }

  async function handleLogin() {
    try {
      const response = await fetch(
        "/api/admin/auth",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: adminId,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert("Invalid credentials");
        return;
      }

      document.cookie =
        "admin-auth=true; path=/";

      sessionStorage.setItem(
        "admin-auth",
        "true"
      );

      setAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    document.cookie =
      "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    sessionStorage.removeItem(
      "admin-auth"
    );

    setAuthenticated(false);
  }

  function saveMenuItems(nextMenu: MenuItem[]) {
    setMenuData(nextMenu);

    localStorage.setItem(
      "restaurant-menu",
      JSON.stringify(nextMenu)
    );
  }

  function handleDeleteSelectedMenuItems() {
    if (selectedMenuItemIds.length === 0)
      return;

    if (
      !window.confirm(
        `Delete ${selectedMenuItemIds.length} items?`
      )
    ) {
      return;
    }

    const nextMenu = menuData.filter(
      (item) =>
        !selectedMenuItemIds.includes(item.id)
    );

    saveMenuItems(nextMenu);

    setSelectedMenuItemIds([]);
    setSelectionMode(false);
  }

  function handleMenuItemSelection(
    itemId: number
  ) {
    setSelectedMenuItemIds((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  }

  function handleAddMenuItem() {
    if (
      !newMenuItem.name ||
      !newMenuItem.category ||
      !newMenuItem.price
    ) {
      alert("Fill all required fields");
      return;
    }

    const nextId =
      Math.max(
        ...menuData.map((i) => i.id),
        100
      ) + 1;

    const item: MenuItem = {
      id: nextId,
      name: newMenuItem.name,
      category: newMenuItem.category,
      price: Number(newMenuItem.price),
      image:
        newMenuItem.image ||
        "/images/placeholder.svg",
      description:
        newMenuItem.description,
      isVeg: newMenuItem.isVeg,
    };

    saveMenuItems([...menuData, item]);

    setShowAddItemForm(false);

    setNewMenuItem({
      name: "",
      category: "",
      price: "",
      image: "",
      description: "",
      isVeg: true,
    });
  }

  async function applyStatusUpdate(
    orderId: string
  ) {
    const edit = statusEdits[orderId];

    if (!edit) return;

    try {
      const response = await fetch(
        "/api/admin/orders",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderId,
            ...edit,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(
    orderId: string
  ) {
    if (!window.confirm("Delete order?"))
      return;

    try {
      const response = await fetch(
        "/api/admin/orders",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setOrders((current) =>
          current.filter(
            (order) =>
              order._id !== orderId
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const menuCategories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          menuData.map(
            (item) => item.category
          )
        )
      ),
    ],
    [menuData]
  );

  const visibleMenuItems = useMemo(() => {
    const query =
      searchQuery.toLowerCase();

    return menuData.filter((item) => {
      const matchesSearch =
        !query ||
        item.name
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        activeCategory === "All" ||
        item.category === activeCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    menuData,
    searchQuery,
    activeCategory,
  ]);

  if (!authenticated) {
    return (
      <AdminLogin
        adminId={adminId}
        password={password}
        setAdminId={setAdminId}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark p-3">
      <div className="mx-auto max-w-[1400px]">

        <AdminHeader
          activeView={activeView}
          setActiveView={setActiveView}
          handleLogout={handleLogout}
        />

        {activeView === "menu" && (
          <MenuSection
            menuData={menuData}
            visibleMenuItems={
              visibleMenuItems
            }
            menuCategories={
              menuCategories
            }
            activeCategory={
              activeCategory
            }
            setActiveCategory={
              setActiveCategory
            }
            searchQuery={searchQuery}
            setSearchQuery={
              setSearchQuery
            }
            selectionMode={
              selectionMode
            }
            setSelectionMode={
              setSelectionMode
            }
            selectedMenuItemIds={
              selectedMenuItemIds
            }
            handleMenuItemSelection={
              handleMenuItemSelection
            }
            handleDeleteSelectedMenuItems={
              handleDeleteSelectedMenuItems
            }
            showAddItemForm={
              showAddItemForm
            }
            setShowAddItemForm={
              setShowAddItemForm
            }
            newMenuItem={newMenuItem}
            setNewMenuItem={
              setNewMenuItem
            }
            handleAddMenuItem={
              handleAddMenuItem
            }
          />
        )}

        {activeView === "orders" && (
          <OrdersSection
            orders={orders}
            loadingOrders={
              loadingOrders
            }
            statusEdits={
              statusEdits
            }
            setStatusEdits={
              setStatusEdits
            }
            orderStatusOptions={
              orderStatusOptions
            }
            paymentStatusOptions={
              paymentStatusOptions
            }
            applyStatusUpdate={
              applyStatusUpdate
            }
            handleDelete={
              handleDelete
            }
          />


        )}
        {activeView === "statement" && (
  <StatementsSection
    orders={orders}
  />
)}
      </div>
    </main>
  );
}
