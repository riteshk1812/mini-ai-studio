import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks/typedHook";
import { login } from "./redux/slices/loginSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      dispatch(login({ user: JSON.parse(storedUser), token: storedToken }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
      <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
      <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;