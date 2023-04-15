import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import Login from "./pages/Login/Login";
import Todos from "./pages/Todos/Todos";
import Navbar from "./components/Navbar/Navbar";
import RegisterSuccess from "./pages/RegisterSuccess/RegisterSuccess";

import { Route, Routes } from "react-router-dom";

// utils
import AuthRoute from "./utils/AuthRoute/AuthRoute";

// styles
import "./App.scss";
import "./assets/styles/variables.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/todos" element={<Todos />} />
        </Route>
      </Route>
    </Routes>
  );
}
