import AddMenuModal from "./AddMenuModal";

export default function MenuSection({
  menuData,
  visibleMenuItems,
  menuCategories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  selectionMode,
  setSelectionMode,
  selectedMenuItemIds,
  handleMenuItemSelection,
  handleDeleteSelectedMenuItems,
  showAddItemForm,
  setShowAddItemForm,
  newMenuItem,
  setNewMenuItem,
  handleAddMenuItem,
}: any) {
  return (
    <div className="glass rounded-3xl p-4">

      {/* HEADER */}
      <div className="glass rounded-3xl p-5 mb-6 border border-yellow-700/20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-yellow-700">
              Restaurant Menu
            </p>

            <h2 className="font-[var(--font-playfair)] text-3xl font-bold text-yellow-300">
              Menu Management
            </h2>

            <p className="text-sm text-text-secondary mt-1">
              Add, search and manage your dishes
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() =>
                setShowAddItemForm(true)
              }
              className="
                rounded-2xl
                px-5
                py-2.5
                text-sm
                font-semibold
                text-black
                bg-gradient-to-r
                from-green-200
                to-[#95aa41]
                shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
              "
            >
              ➕ Add Item
            </button>

            <button
              onClick={() =>
                setSelectionMode(
                  !selectionMode
                )
              }
              className="
                rounded-2xl
                px-5
                py-2.5
                text-sm
                font-semibold
                text-black
                bg-gradient-to-r
                from-red-200
                to-red-400
                shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
              "
            >
              {selectionMode
                ? "Cancel"
                : "🗑 Delete Items"}
            </button>

            {selectionMode &&
              selectedMenuItemIds.length >
                0 && (
                <button
                  onClick={
                    handleDeleteSelectedMenuItems
                  }
                  className="
                    rounded-2xl
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-black
                    bg-red-200
                    shadow-lg
                    animate-pulse
                    cursor-pointer
                  "
                >
                  Delete (
                  {
                    selectedMenuItemIds.length
                  }
                  )
                </button>
              )}
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <input
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(
              e.target.value
            )
          }
          placeholder="Search dishes..."
          className="w-full rounded-2xl bg-bg-card border border-border-subtle px-4 py-2.5 text-sm cuesor-pointer "
        />
      </div>

      {/* CATEGORIES */}
      <div className="mb-5 overflow-x-auto scrollbar-hide">
        <div className="flex w-max gap-3 rounded-2xl border border-yellow-700/20 bg-[#1f1f15] p-2 ">
          {menuCategories.map(
            (category: string) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`
                  whitespace-nowrap
                  rounded-xl
                  border
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    activeCategory ===
                    category
                      ? "border-yellow-400 bg-gradient-to-r from-[#6b7a2f] to-[#95aa41] text-white shadow-lg"
                      : "border-yellow-700/20 bg-[#232318] text-text-secondary hover:border-yellow-400 hover:text-white cursor-pointer"
                  }
                `}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* MODAL */}
      {showAddItemForm && (
        <AddMenuModal
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

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:gap-4 gap-3">
        {visibleMenuItems.map(
          (item: any) => (
            <div
              key={item.id}
              className="glass rounded-3xl overflow-hidden border border-yellow-700/20 shadow-lg hover:-translate-y-2 hover:shadow-yellow-900/20 duration-300"
            >
              <div className="relative h-28">
                <img
                  src={
                    item.image ||
                    "/images/placeholder.svg"
                  }
                  alt={item.name}
                  className="h-full w-full object-cover"
                />

                {selectionMode && (
                  <input
                    type="checkbox"
                    checked={selectedMenuItemIds.includes(
                      item.id
                    )}
                    onChange={() =>
                      handleMenuItemSelection(
                        item.id
                      )
                    }
                    className="absolute top-2 right-2 h-4 w-4 cursor-pointer "
                  />
                )}
              </div>

              <div className="p-3">
                <div className="flex justify-between gap-2">

                  <h3 className=" font-[var(--font-playfair)] text-lg font-bold text-white line-clamp-1">
                    {item.name}
                  </h3>

                  <p className="text-sm font-bold text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
                    ₹{item.price}
                  </p>
                </div>

                <p className="mt-1 text-[11px] text-text-secondary line-clamp-2">
                  {item.category}
                </p>

                <p className="mt-1 text-[12px] text-text-secondary line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
