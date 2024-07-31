import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const services = [
  {
    title: "Course Development",
    description:
      "We offer expert course development services to help you create high-quality educational content tailored to your needs.",
    icon: "https://www.pngall.com/wp-content/uploads/5/Online-Course-PNG-Image.png",
    details:
      "Our course development service includes curriculum design, content creation, and video production. We tailor each course to meet the specific needs of your audience and ensure high engagement and retention.",
  },
  {
    title: "Career Coaching",
    description:
      "Our career coaching services provide personalized guidance to help you navigate your career path and achieve your professional goals.",
    icon: "https://www.pngall.com/wp-content/uploads/5/Business-Consultant-PNG-Image.png",
    details:
      "With our career coaching, you'll receive one-on-one sessions with experienced professionals, personalized career plans, and access to exclusive job search resources.",
  },
  {
    title: "Skill Assessment",
    description:
      "We conduct comprehensive skill assessments to identify your strengths and areas for improvement, helping you focus your learning efforts.",
    icon: "https://www.pngall.com/wp-content/uploads/5/Skills-Assessment-PNG-Image.png",
    details:
      "Our skill assessments cover a wide range of technical and soft skills. We provide detailed reports and personalized recommendations to help you enhance your capabilities.",
  },
  {
    title: "Certification Preparation",
    description:
      "Our certification preparation services ensure that you are fully prepared to pass your certification exams and advance your career.",
    icon: "https://www.pngall.com/wp-content/uploads/5/Certification-PNG-Image.png",
    details:
      "We offer comprehensive study guides, practice exams, and expert-led workshops to help you prepare for your certification exams and achieve your career goals.",
  },
];

const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleLearnMore = (index: number) => {
    setSelectedService(index === selectedService ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto p-6 md:p-12">
        <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">
          Our Services
        </h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {services.map((service, index) => (
            <Card key={index} className="w-[400px] max-w-sm">
              <CardHeader>
                <img
                  className="w-16 h-16 mb-4"
                  src={service.icon}
                  alt={service.title}
                />
                <CardTitle className="text-xl font-semibold mb-2 dark:text-white">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedService === index && (
                  <div className="text-gray-700 dark:text-gray-300 text-center">
                    {service.details}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleLearnMore(index)}
                >
                  {selectedService === index ? "Hide Details" : "Show Details"}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Additional Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Procoders offers a variety of courses tailored to different skill
            levels and interests. Whether you're looking for free or paid
            courses, we have something to fit your needs. Our platform allows
            you to track your progress and stay motivated as you work towards
            completing your courses.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            Enrolled users can benefit from:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2">
            <li>Tracking course progress</li>
            <li>Access to both free and paid courses</li>
            <li>Personalized learning paths</li>
            <li>Expert support and community forums</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
