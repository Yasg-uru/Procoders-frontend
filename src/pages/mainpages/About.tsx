import React from "react";
import { Button } from "@/components/ui/button";
// import { useMediaQuery } from "@uidotdev/usehooks";

const AboutPage: React.FC = () => {
//   const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-6 md:p-12">
        <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">
          About Procoders
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              className="w-full rounded-lg shadow-lg"
              src="https://www.pngarts.com/files/7/Training-PNG-Image-Transparent-Background.png"
              alt="About Procoders"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <p className="text-lg mb-4">
              Welcome to <span className="font-bold text-green-500">Procoders</span>!
              We are dedicated to providing top-notch training and career development
              opportunities through our comprehensive courses. Our mission is to equip
              you with the skills needed to excel in today’s competitive job market.
            </p>
            <p className="text-lg mb-4">
              At Procoders, we believe in the power of knowledge and the impact it can have
              on your career. Our expert instructors and industry-relevant curriculum are
              designed to help you achieve your goals and stay ahead of the curve.
            </p>
            <p className="text-lg mb-4">
              Whether you are looking to enhance your skills, switch careers, or advance
              in your current role, our courses are tailored to meet your needs. Join us
              today and start your journey towards success!
            </p>
            <Button className="mt-6 w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-300">
              Get Started
            </Button>
          </div>
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold dark:text-white">
            Our Values
          </h2>
          <p className="text-lg mt-4 dark:text-gray-400">
            We are committed to delivering exceptional education, fostering an inclusive
            learning environment, and empowering individuals to reach their full potential.
            Our values are centered around innovation, integrity, and excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
