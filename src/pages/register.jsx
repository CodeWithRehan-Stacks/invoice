import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    date_of_birth: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError("");

    try {
      await register(formData);
      navigate("/dashboard");
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setErrors(err.errors);
      } else {
        setServerError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ name, type = "text", placeholder, label }) => (
    <div>
      {label && <label htmlFor={name} className="text-sm font-medium text-slate-600">{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full ${label ? "mt-1.5" : ""} px-4 py-3 rounded-xl border bg-white/50 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition-all duration-200
          ${errors[name] ? "border-red-300 focus:ring-red-500/20 focus:border-red-400" : "border-slate-200"}`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errors[name][0]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-400/5" />
      <div className="absolute top-[-40%] left-[-15%] w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-3xl" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-500/5 blur-3xl" />

      {/* Left branding (desktop) */}
      <div className="hidden lg:flex flex-col justify-center items-center w-[45%] relative p-12 bg-gradient-to-br from-brand-900 to-brand-700 text-white overflow-hidden shadow-2xl z-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-md animate-fade-in-up relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              InvoiceFlow
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Start building
            <span className="bg-gradient-to-r from-accent-400 to-brand-300 bg-clip-text text-transparent"> beautiful invoices</span>
          </h1>
          <p className="text-brand-100 text-lg leading-relaxed">
            Join thousands of freelancers and businesses who trust InvoiceFlow to manage their billing.
          </p>

          {/* Social proof */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["bg-brand-400", "bg-accent-400", "bg-emerald-400", "bg-amber-400"].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                  {["JD", "AK", "SM", "LP"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-brand-100">
              <span className="font-semibold text-white">2,000+</span> happy users
            </p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        <div className="w-full max-w-lg animate-fade-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-md shadow-brand-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              InvoiceFlow
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/40 rounded-2xl p-8 border border-slate-100/80">
            <h2 className="text-2xl font-bold text-slate-800">Create your account</h2>
            <p className="text-slate-500 mt-1 text-sm">Get started for free — no credit card required</p>

            {serverError && (
              <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 border border-red-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField name="first_name" placeholder="First name" label="First Name" />
                <InputField name="last_name" placeholder="Last name" label="Last Name" />
              </div>
              <InputField name="user_name" placeholder="johndoe" label="Username" />
              <InputField name="email" type="email" placeholder="you@example.com" label="Email" />
              <InputField name="date_of_birth" type="date" label="Date of Birth" />
              <InputField name="password" type="password" placeholder="••••••••" label="Password" />
              <InputField name="password_confirmation" type="password" placeholder="••••••••" label="Confirm Password" />

              <button
                id="register-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </span>
                ) : "Create account"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/" className="text-brand-600 font-semibold hover:text-brand-700 transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}