import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authService.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import FormField from "../../common/FormField.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      const token = data.accessToken;
      if (token) {
        login(token);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">Zaloguj się</h2>
        {error && <div className="auth-error">{error}</div>}

        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormField
          id="password"
          name="password"
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-submit">
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
