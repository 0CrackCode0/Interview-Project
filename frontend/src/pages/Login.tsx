import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!username || !password) {
            setError("Please enter username and password");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("login/", {
                username: username.trim(),
                password: password.trim(),
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            navigate("/dashboard");

        } catch (err: any) {
            setError(
                err?.response?.data?.detail ||
                JSON.stringify(err?.response?.data) ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">

                <div className="card shadow-lg p-4" style={{ width: "380px" }}>

                    <h3 className="text-center fw-bold mb-1">
                        Project Manager
                    </h3>

                    <p className="text-center text-muted mb-4">
                        Sign in to continue
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2">
                            {error}
                        </div>
                    )}

                    {/* LOGIN BUTTON */}
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* REGISTER BUTTON */}
                    <button
                        className="btn btn-outline-secondary w-100 mt-2"
                        onClick={() => navigate("/register")}
                    >
                        Create new account
                    </button>

                </div>
            </div>
            <div className="text-center py-2 text-muted small position-fixed bottom-0 w-100 bg-light border-top">
                <div>DESIGNED AND DEVELOPED BY <strong>ABDUL AHAD</strong></div>
                <div>&copy; 2026 Abdul Ahad. All rights reserved.</div>
            </div>
        </>
    );
}