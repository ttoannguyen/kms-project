/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "@/services/systems/adminLocalAuth";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SysLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Sửa default fallback về "/sys/admin"
  const from = location.state?.from?.pathname || "/sys/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login(username, password);
      if (res?.token) {
        localStorage.setItem("sys_token", res.token);
        navigate(from, { replace: true }); 
      } else {
        setError("Login failed: no token received");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Network or server error");
      }
    }
  };

  return (
    <div className="min-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl mb-6">System Login</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username
          <input
            className="w-full border p-2 mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            className="w-full border p-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SysLogin;
