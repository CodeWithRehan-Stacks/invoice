import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422) {
          setErrors(data.errors || {});
        } else {
          setServerError(data.message || "Registration failed");
        }
        return;
      }

      localStorage.setItem("auth_token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");

    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ name, type = "text", placeholder }) => (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
          errors[name] ? "border-red-400" : "border-gray-200"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name][0]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">

      <div className="w-full max-w-lg">

        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-gray-100">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account 
          </h2>

          <p className="text-center text-gray-500 mt-1">
            Join us and start your journey
          </p>

          {/* Server Error */}
          {serverError && (
            <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <Input name="first_name" placeholder="First Name" />
              <Input name="last_name" placeholder="Last Name" />
            </div>

            <Input name="user_name" placeholder="Username" />
            <Input name="email" type="email" placeholder="Email address" />
            <Input name="date_of_birth" type="date" />
            <Input name="password" type="password" placeholder="Password" />
            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;