import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ---------------- REGISTER ----------------
    const handleRegister = async () => {
        setError("");

        if (!username.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await api.post("register/", {
                username: username.trim(),
                email: email.trim(),
                password: password.trim(),
            });

            // optional UX: go to login after register
            navigate("/");

        } catch (err: any) {
            const data = err?.response?.data;

            setError(
                data?.detail ||
                JSON.stringify(data) ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    // ---------------- ENTER KEY ----------------
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card shadow-lg p-4" style={{ width: "380px" }}>

                <h3 className="text-center fw-bold mb-1">
                    Create Account
                </h3>

                <p className="text-center text-muted mb-4">
                    Register to start managing projects
                </p>

                {/* USERNAME */}
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

                {/* EMAIL */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* PASSWORD */}
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

                {/* ERROR */}
                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                {/* REGISTER BUTTON */}
                <button
                    className="btn btn-primary w-100"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                {/* BACK TO LOGIN */}
                <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => navigate("/")}
                >
                    Back to Login
                </button>

            </div>
        </div>
    );
}