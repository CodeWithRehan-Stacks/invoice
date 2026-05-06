import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Settings, X, Menu } from "lucide-react";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleEsc = (e) => {
      e.key === "Escape" && setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setUser(data.user || data);
      } catch (err) {
        console.error("User fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("auth_token");
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      localStorage.clear();
      navigate("/");
    }
  };

  const getAvatarInitials = () => {
    if (!user) return <User size={20} />;
    return (
      `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() ||
      "U"
    );
  };

  return (
    <>
      <header className="glass sticky top-4 z-30 mx-4 mt-4 px-6 py-3 rounded-2xl flex items-center justify-between shadow-sm border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <span className="font-black text-xl">S</span>
          </div>
          <h1 className="font-black text-slate-800 tracking-tight hidden sm:block">
            SchoolSync
          </h1>
        </div>

        <button
          onClick={toggleSidebar}
          className="group flex items-center gap-3 p-1 pr-4 rounded-full bg-slate-50 border border-slate-200 hover:border-brand-300 transition-all active:scale-95"
        >
          <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shadow-inner">
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              getAvatarInitials()
            )}
          </div>
          <Menu
            size={18}
            className="text-slate-500 group-hover:text-brand-600"
          />
        </button>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-white z-[70] shadow-2xl flex flex-col p-8"
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="self-end p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>

              <div className="mt-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-600 text-2xl font-black mb-4 border-2 border-brand-100">
                  {getAvatarInitials()}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {user
                    ? `${user.first_name} ${user.last_name}`
                    : "User Profile"}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {user?.email || "Account Settings"}
                </p>
              </div>

              <nav className="mt-12 space-y-2 flex-1">
                <SidebarLink
                  to="/dashboard/profile"
                  icon={<User size={18} />}
                  label="My Profile"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <SidebarLink
                  to="/dashboard/settings"
                  icon={<Settings size={18} />}
                  label="Preferences"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </nav>

              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper component for cleaner nav
const SidebarLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-all font-semibold"
  >
    <span className="text-slate-400">{icon}</span>
    {label}
  </Link>
);

export default DashboardHeader;
