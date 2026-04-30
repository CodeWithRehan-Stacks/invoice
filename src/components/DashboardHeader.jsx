import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("Authentication token missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user || data);
      } catch (err) {
        console.error("Fetch user error:", err);
        setError(err.message || "Failed to load user data");
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  // initial letter(s) for avatar
  const getAvatarInitials = () => {
    if (!user) return "U";
    const first = user.first_name?.charAt(0) || "";
    const last = user.last_name?.charAt(0) || "";
    return first + last || "U";
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between">
        

          {/* Avatar button */}
          <button
            onClick={openSidebar}
            className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? "..." : getAvatarInitials()}
          </button>
        </div>
      </header>

      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-6 flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </button>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : (
          <>
            {/* Profile info */}
            <div className="text-center mt-10">...</div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <Link
                to="/settings"
                className="block w-full text-center py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={closeSidebar}
              >
                Update Profile
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default DashboardHeader;