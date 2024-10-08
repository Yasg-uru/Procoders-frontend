import { Route, Routes } from "react-router-dom";
import { Navbar } from "./pages/mainpages/Navbar.tsx";
import { Fragment } from "react/jsx-runtime";
import Login from "./pages/authpages/Login.tsx";
import Signup from "./pages/authpages/Signup.tsx";
import Verify from "@/pages/authpages/OtpVerify.tsx";
import ForgotPassword from "./pages/authpages/ForgotPassword.tsx";
import ResetPassword from "./pages/authpages/ResetPassword.tsx";
import DetailPage from "./pages/coursepages/DetailPage.tsx";
import Homepage from "./pages/coursepages/Homepage.tsx";
import CourseCategory from "./pages/coursepages/CourseCategory.tsx";
import Footer from "./pages/mainpages/Footer.tsx";
import MyCourse from "./pages/coursepages/MyCourse.tsx";
import CourseContinue from "./pages/courseLecture/CourseContinue.tsx";
import ChecKOut from "./pages/paymentPage/ChecKOut.js";

import QuizTest from "./pages/courseLecture/Quiz.js";
import CourseQuiz from "./pages/courseLecture/CourseQuiz.tsx";
import RequireAuth from "./helper/RequireAuth.tsx";
import AboutPage from "./pages/mainpages/About.tsx";
import ServicesPage from "./pages/mainpages/Service.tsx";
import ContactPage from "./pages/mainpages/Contact.tsx";

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
        <Route path="/detail/:courseId" element={<DetailPage />} />
        <Route path="/explore/:courseId" element={<DetailPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/course-category" element={<CourseCategory />} />
        <Route
          element={
            <RequireAuth allowedRoles={["student", "admin", "instructor"]} />
          }
        >
          <Route path="/mycourse" element={<MyCourse />} />
          <Route
            path="/continue-course/:courseId"
            element={<CourseContinue />}
          />
          <Route path="/checkout/:courseId" element={<ChecKOut />} />
          <Route path="/quiz/:moduleId/:courseId" element={<QuizTest />} />
          <Route path="/course/quiz" element={<CourseQuiz />} />
        </Route>
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
