import  { useEffect } from "react";
// import Razorpay from "razorpay";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/helper/axiosInstance";
import { getCourseDetail } from "@/redux/slices/courseSlice";

const ChecKOut = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { courseDetails } = useAppSelector((state) => state.course);
  const { toast } = useToast();
  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetail({ courseId }))
        .then(() => {
          toast({
            title: "course detail fetched",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }
  }, []);

  const handlePayment = async () => {
    const price = courseDetails?.price;
    const discount = courseDetails?.discount;
    let Amount = 0;

    if (price && discount) {
      Amount = Math.floor(price - price * (discount / 100));
    }

    const response = await axiosInstance.post(
      `/payment/intialize/${courseId}`,
      { amount: Amount },
      {
        withCredentials: true,
      }
    );
    const { amount, id, currency } = response.data?.order;
    console.log("this is a amount and id and currency :");
    const options = {
      key: "rzp_live_tK7jKIBkQuTeH7", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Procoders",
      description: "Procoders course payment",
      image:
        "https://res.cloudinary.com/duzmyzmpa/image/upload/v1721313988/x9nno0siixwdva4beymy.jpg",
      order_id: id,
      handler: async function (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) {
        const data = {
          orderCreationId: id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axiosInstance.post(
          `http://localhost:8000/payment/verify-payment/${courseId}`,
          data,
          {
            withCredentials: true,
          }
        );

        toast({
          title: result.data?.message,
        });
      },
      prefill: {
        name: "Yash choudhary",
        email: "yashpawar12122004@gmail.com",
        contact: "7999379411",
      },
      notes: {
        address: "Procoders chhindwara",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  if (!courseDetails) {
    return <div>....Loading</div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <Button
        onClick={handlePayment}
        className="mt-6 w-auto bg-gradient-to-r px-8 py-5 from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-300"
      >
        Pay Now
      </Button>
    </div>
  );
};

export default ChecKOut;
