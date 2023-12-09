import { Navigate, Routes, Route } from "react-router-dom";

const ProtectedRoute = ({ authenticated, element, to }) => {
    if(!authenticated) return <Navigate to={to} />;

    return (
        <Routes>
            <Route path="/*" element={element} />
        </Routes>
    )
};

export default ProtectedRoute;