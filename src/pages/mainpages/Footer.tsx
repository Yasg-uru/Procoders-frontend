import React from "react";

const Footer: React.FC = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="footer bg-black text-neutral-content p-10 dark:bg-gray-900  border-t-[0.5px] dark:border-white border-slate-500">
      <nav>
        <h6 className="footer-title">Courses</h6>
        <a className="link link-hover">Web Development</a>
        <a className="link link-hover">Data Science</a>
        <a className="link link-hover">Machine Learning</a>
        <a className="link link-hover">Cloud Computing</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Procoders</a>
        <a className="link link-hover">Contact Us</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Blog</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of Service</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover" onClick={scrollTop}>
          Back To Top
        </a>
      </nav>
      <footer className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Procoders. All rights reserved.</p>
      </footer>
    </footer>
  );
};

export default Footer;
