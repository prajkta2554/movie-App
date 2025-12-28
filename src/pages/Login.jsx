import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      login(res.data);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

// STYLES 

const styles = {
  page: {
    minHeight: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1c1c1c, #000)",
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#111",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#d32f2f", 
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
};
