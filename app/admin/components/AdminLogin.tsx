
export default function AdminLogin({
  adminId,
  password,
  setAdminId,
  setPassword,
  handleLogin,
}: any) {
  return (
    <main className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="glass w-full max-w-sm rounded-3xl p-6">
        <h1 className="gradient-text text-2xl font-bold mb-6">
          Admin Login
        </h1>

        <div className="space-y-4">
          <input
            value={adminId}
            onChange={(e) =>
              setAdminId(e.target.value)
            }
            placeholder="Admin ID"
            className="w-full rounded-2xl bg-bg-card border border-border-subtle px-4 py-2.5 text-sm"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="w-full rounded-2xl bg-bg-card border border-border-subtle px-4 py-2.5 text-sm"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-accent-green py-2.5 text-sm font-semibold text-white btn-shine cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

