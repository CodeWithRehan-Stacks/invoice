import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    date_of_birth: "",
    password: "",
    password_confirmation: "",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [errors, setErrors] = useState({});

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        user_name: user.user_name || "",
        email: user.email || "",
        date_of_birth: user.date_of_birth || "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (name === "password" && errors.password_confirmation) {
      setErrors((prev) => ({ ...prev, password_confirmation: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage("");

    // Client-side password check
    if (formData.password && formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: ["Passwords do not match"] });
      setSaving(false);
      return;
    }

    try {
      await updateUser(formData);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setFormData((prev) => ({ ...prev, password: "", password_confirmation: "" }));
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message || "Update failed");
        setMessageType("error");
      }
    } finally {
      setSaving(false);
    }
  };

  const InputField = ({ name, type = "text", placeholder, label }) => (
    <div>
      <label htmlFor={`settings-${name}`} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      <input
        id={`settings-${name}`}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full mt-1.5 px-4 py-3 rounded-xl border bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:outline-none transition-all duration-200
          ${errors[name] ? "border-red-300" : "border-slate-200"}`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errors[name][0]}
        </p>
      )}
    </div>
  );

  const initials = user
    ? (user.first_name?.charAt(0) || "") + (user.last_name?.charAt(0) || "") || "U"
    : "U";

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Account Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Update your personal information and password.</p>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-brand-500/20">
            {initials}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-slate-800">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <p className="text-xs text-slate-400 mt-1">@{user?.user_name || "username"}</p>
          </div>
        </div>

        {/* Feedback message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center gap-2 border ${
            messageType === "success"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-red-50 text-red-600 border-red-100"
          }`}>
            {messageType === "success" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            )}
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-700">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField name="first_name" placeholder="First Name" label="First Name" />
              <InputField name="last_name" placeholder="Last Name" label="Last Name" />
            </div>
            <InputField name="user_name" placeholder="Username" label="Username" />
            <InputField name="email" type="email" placeholder="Email" label="Email Address" />
            <InputField name="date_of_birth" type="date" label="Date of Birth" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-semibold text-slate-700">Change Password</h2>
            <p className="text-xs text-slate-400">Leave blank if you don't want to change your password.</p>
            <InputField name="password" type="password" placeholder="New Password" label="New Password" />
            <InputField name="password_confirmation" type="password" placeholder="Confirm Password" label="Confirm Password" />
          </div>

          <button
            id="update-profile-btn"
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/35 hover:from-brand-600 hover:to-brand-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving…
              </span>
            ) : "Update Profile"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
