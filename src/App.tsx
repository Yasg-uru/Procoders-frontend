import { Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/mainpages/Navbar.tsx";
import { Fragment } from "react/jsx-runtime";
import Login from "./pages/authpages/Login.tsx";
import Signup from "./pages/authpages/Signup.tsx";
import Verify from "@/pages/authpages/OtpVerify.tsx";
import ForgotPassword from "./pages/authpages/ForgotPassword.tsx";
import ResetPassword from "./pages/authpages/ResetPassword.tsx";
import DetailPage from "./pages/coursepages/DetailPage.tsx";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/course/detail/:id" element={<DetailPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
