import React from "react";
import Razorpay from "razorpay";
import { useAppDispatch } from "@/redux/hook";

import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/helper/axiosInstance";

const ChecKOut = () => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { toast } = useToast();

  const handlePayment = async () => {
    const Amount = 1;

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

  return (
    <div className="min-h-screen">
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default ChecKOut;
