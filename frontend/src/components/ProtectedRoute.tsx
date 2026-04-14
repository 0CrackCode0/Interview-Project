import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
    const token = localStorage.getItem("access");

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}