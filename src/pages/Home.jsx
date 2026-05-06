import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Home() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-brand-50 via-white to-accent-400/5" />
      <div className="absolute top-[-50%] right-[-20%] w-150 h-150 rounded-full bg-brand-500/5 blur-3xl" />
      <div className="absolute bottom-[-30%] left-[-10%] w-100 h-100 rounded-full bg-accent-500/5 blur-3xl" />

      {/* Left branding panel (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-[45%] relative p-12 bg-linear-to-br from-brand-900 to-brand-700 text-white overflow-hidden shadow-2xl z-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-md animate-fade-in-up relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="Logo" className="w-40 object-contain" />
            <span className="text-3xl font-bold bg-linear-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              InvoiceFlow
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Invoicing made
            <span className="bg-linear-to-r from-accent-400 to-brand-300 bg-clip-text text-transparent"> effortless</span>
          </h1>
          <p className="text-brand-100 text-lg leading-relaxed">
            Create professional invoices, track payments, and manage your business finances — all in one beautiful dashboard.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["Real-time Preview", "Auto Calculations", "PDF Export", "Client Management"].map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-brand-50 border border-white/20 shadow-sm backdrop-blur-md">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold bg-linear-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              InvoiceFlow
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 rounded-2xl p-8 border border-slate-100/80">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-slate-500 mt-1 text-sm">Sign in to your account to continue</p>

            {error && (
              <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-600">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-slate-600">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 bg-white/50 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition-all duration-200"
                />
              </div>

              <button
                id="login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : "Sign in"}
              </button>
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}