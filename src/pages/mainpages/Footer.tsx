import React from "react";

const Footer: React.FC = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer mt-5 p-10 bg-gray-100 dark:bg-black text-black dark:text-gray-100 border-t dark:border-gray-700 border-gray-300">
      {/* Course Navigation */}
      <nav>
        <h6 className="footer-title font-semibold text-gray-700 dark:text-gray-200">
          Courses
        </h6>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Web Development
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Data Science
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Machine Learning
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Cloud Computing
        </a>
      </nav>

      {/* Company Navigation */}
      <nav>
        <h6 className="footer-title font-semibold text-gray-700 dark:text-gray-200">
          Company
        </h6>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          About Procoders
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Contact Us
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Careers
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Blog
        </a>
      </nav>

      {/* Legal Navigation */}
      <nav>
        <h6 className="footer-title font-semibold text-gray-700 dark:text-gray-200">
          Legal
        </h6>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Terms of Service
        </a>
        <a className="link link-hover text-black dark:text-gray-400 hover:underline">
          Privacy Policy
        </a>
        <a
          className="link link-hover text-black dark:text-gray-400 hover:underline cursor-pointer"
          onClick={scrollTop}
        >
          Back To Top
        </a>
      </nav>

      {/* Copyright Section */}
      <div className="text-center mt-4 text-gray-700 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Procoders. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
