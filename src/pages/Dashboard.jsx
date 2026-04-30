import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("auth_token");

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

        setUser(data.user || data); // supports both API formats
      } catch (err) {
        console.log("FETCH ERROR:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back 
          </h1>
          <p className="text-gray-500 mt-1">
            Here is your account overview
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">

          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            User Profile
          </h2>

          <div className="flex items-center gap-4 mb-6">

            <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
              {user?.first_name?.charAt(0) || "U"}
              {user?.last_name?.charAt(0) || ""}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-gray-500 text-sm">
                @{user?.user_name}
              </p>
            </div>

          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Info label="First Name" value={user?.first_name} />
            <Info label="Last Name" value={user?.last_name} />
            <Info label="Username" value={user?.user_name} />
            <Info label="Email" value={user?.email} />

            <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{user?.date_of_birth}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// reusable component
const Info = ({ label, value }) => (
  <div className="p-4 bg-gray-50 rounded-xl">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default Dashboard;