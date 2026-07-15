export default function AddMenuModal({
  setShowAddItemForm,
  newMenuItem,
  setNewMenuItem,
  handleAddMenuItem,
}: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="glass w-full max-w-2xl rounded-[36px] border border-yellow-700/20 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)] animate-[var(--animate-scale-in)]">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-600">
              Restaurant Menu
            </p>

            <h2 className="font-[var(--font-playfair)] text-2xl font-bold gradient-text">
              Add New Dish
            </h2>
          </div>

          <button
            onClick={() =>
              setShowAddItemForm(false)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-400 transition-all hover:bg-red-500 hover:text-white cursor-pointer "
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* DISH NAME */}
          <div>
            <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-yellow-500">
              Dish Name
            </label>

            <input
              placeholder="Paneer tikka"
              value={newMenuItem.name}
              onChange={(e) =>
                setNewMenuItem({
                  ...newMenuItem,
                  name: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-yellow-700/20 bg-[#232318] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-yellow-400"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-yellow-500">
              Category
            </label>

            <input
              placeholder="Main Course"
              value={newMenuItem.category}
              onChange={(e) =>
                setNewMenuItem({
                  ...newMenuItem,
                  category:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-yellow-700/20 bg-[#232318] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-yellow-400"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-yellow-500">
              Price
            </label>

            <input
              type="number"
              placeholder="299"
              value={newMenuItem.price}
              onChange={(e) =>
                setNewMenuItem({
                  ...newMenuItem,
                  price: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-yellow-700/20 bg-[#232318] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-yellow-400"
            />
          </div>

          {/* IMAGE */}
          <div>
            <div>
              <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-yellow-500 ">
                Upload Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  const reader =
                    new FileReader();

                  reader.onloadend =
                    () => {
                      setNewMenuItem({
                        ...newMenuItem,
                        image:
                          reader.result as string,
                      });
                    };

                  reader.readAsDataURL(
                    file
                  );
                }}
                className="
                  w-full
                  rounded-xl
                  border
                  border-yellow-700/20
                  bg-[#232318]
                  px-3
                  py-2
                  text-xs
                  text-white
                  outline-none
                  file:mr-3
                  file:rounded-lg
                  file:border-0
                  file:bg-yellow-500
                  file:px-3
                  file:py-1.5
                  file:text-xs
                  file:font-semibold
                  file:text-black
                  hover:file:bg-yellow-400
                  cursor-pointer
                "
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="mb-2 ml-1 block text-xs font-semibold uppercase tracking-wider text-yellow-500">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Dish description..."
              value={
                newMenuItem.description
              }
              onChange={(e) =>
                setNewMenuItem({
                  ...newMenuItem,
                  description:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-yellow-700/20 bg-[#232318] px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-yellow-400"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex items-center justify-end gap-3">

          <button
            onClick={() =>
              setShowAddItemForm(false)
            }
            className="rounded-2xl border border-yellow-700/20 bg-[#232318] px-6 py-3 text-sm font-semibold text-text-secondary transition-all hover:bg-[#2e2e1f] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleAddMenuItem}
            className="rounded-2xl bg-gradient-to-r from-[#6b7a2f] to-[#95aa41] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(107,122,47,0.35)] cursor-pointer"
          >
            ➕ Save Dish
          </button>
        </div>
      </div>
    </div>
  );
}
