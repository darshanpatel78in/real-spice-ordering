type Props = {
  activeView: "orders" | "menu" | "statement";
  setActiveView: any;
  handleLogout: () => void;
};

export default function AdminHeader({
  activeView,
  setActiveView,
  handleLogout,
}: Props) {
  return (
    <div className="glass rounded-[24px] p-4 sm:p-6 mb-5 border border-yellow-700/20 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}
        <div>
          <h1 className="font-[var(--font-playfair)] text-2xl sm:text-3xl font-bold gradient-text">
            Real Spice Admin
          </h1>

          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Orders & Menu Management
          </p>
        </div>

        {/* Right */}
       <div className="grid grid-cols-4 gap-2 rounded-2xl bg-[#1d1c16] px-2 py-2 sm:px-4 sm:py-2.5 border border-yellow-700/20 shadow-lg w-full lg:w-auto">

  <button
    onClick={() => setActiveView("orders")}
    className={`rounded-lg px-2 py-2 text-[11px] sm:text-sm font-semibold transition-all ${
      activeView === "orders"
        ? "bg-gradient-to-r from-[#6b7a2f] to-[#95aa41] text-white"
        : "text-text-secondary hover:bg-[#2a2a1d] hover:text-white"
    }`}
  >
    📦
    <br />
    Orders
  </button>

  <button
    onClick={() => setActiveView("menu")}
    className={`rounded-lg px-2 py-2 text-[11px] sm:text-sm font-semibold transition-all ${
      activeView === "menu"
        ? "bg-gradient-to-r from-[#6b7a2f] to-[#95aa41] text-white"
        : "text-text-secondary hover:bg-[#2a2a1d] hover:text-white"
    }`}
  >
    🍽️
    <br />
    Menu
  </button>

  <button
    onClick={() => setActiveView("statement")}
    className={`rounded-lg px-2 py-2 text-[11px] sm:text-sm font-semibold transition-all ${
      activeView === "statement"
        ? "bg-gradient-to-r from-[#6b7a2f] to-[#95aa41] text-white"
        : "text-text-secondary hover:bg-[#2a2a1d] hover:text-white"
    }`}
  >
    📄
    <br />
    Statement
  </button>

  <button
    onClick={handleLogout}
    className="rounded-lg px-2 py-2 text-[11px] sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 transition-all"
    >
    Logout
  </button>

</div>
    </div>
    </div>
  );
}