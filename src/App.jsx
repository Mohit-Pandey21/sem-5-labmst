import { useState } from "react";

const users = [
  { username: "admin", password: "1234", userId: 1, role: "Admin" },
  { username: "user", password: "5678", userId: 2, role: "User" }
];

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const login = () => {
    const found = users.find(
      u => u.username === username && u.password === password
    );

    if (!found) {
      alert("Invalid username or password");
      return;
    }

    // Simulated JWT token
    const token = btoa(
      JSON.stringify({
        userId: found.userId,
        role: found.role
      })
    );

    localStorage.setItem("token", token);
    setUser(found);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      {!user ? (
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          
          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            onClick={login}
          >
            Login
          </button>

        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">

          <h2 className="text-2xl font-bold mb-3">
            Welcome, {user.username}
          </h2>

          <p className="text-gray-600 mb-6">
            Role: <span className="font-bold">{user.role}</span>
          </p>

          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
            Protected Dashboard
          </div>

          <button
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            onClick={logout}
          >
            Logout
          </button>

        </div>
      )}

    </div>
  );
}

export default App;