import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API_BASE = "http://127.0.0.1:8000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true);

  // On mount or token change, fetch user
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        const userData = data.user || data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch {
        // Token is invalid
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("auth_token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
    setToken(data.token);
    return data;
  };



  const logout = async () => {
    try {
      const t = localStorage.getItem("auth_token");
      if (t) {
        await fetch(`${API_BASE}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${t}`,
          },
        });
      }
    } catch {
      // Silently fail
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
    }
  };

  const updateUser = async (formData) => {
    const t = localStorage.getItem("auth_token");
    const res = await fetch(`${API_BASE}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${t}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const err = new Error(data.message || "Update failed");
      err.status = res.status;
      err.errors = data.errors;
      throw err;
    }

    const updated = data.user || data;
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    return updated;
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, login, logout, updateUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export default AuthContext;
