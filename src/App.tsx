import { Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/mainpages/Navbar.tsx";
import { Fragment } from "react/jsx-runtime";
import Login from "./pages/authpages/Login.tsx";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

export default App;
