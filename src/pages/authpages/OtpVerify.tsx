import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "@/redux/slices/authSlice";
import { useToast } from "@/components/ui/use-toast";

export const VerifyFormSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string().email("invalid email"),
});

const Verify: React.FC = () => {
  const dispatch = useAppDispatch();
  const { email } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof VerifyFormSchema>>({
    resolver: zodResolver(VerifyFormSchema),
    defaultValues: {
      code: "",
      email: email,
    },
  });

  function onSubmit(data: z.infer<typeof VerifyFormSchema>) {
    dispatch(verifyUser(data))
      .unwrap()
      .then(() => {
        toast({
          title: "verified successfully",
          description: "Your Account has been verified successfully",
        });
        navigate("/home");
      })
      .catch((error) => {
        toast({
          title: "Incorrect code",
          description: "Try again ,Please Enter correct OTP ",
          variant: "destructive",
        });
      });
  }
  const { isLoading } = useAppSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-black dark:shadow-violet-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Verify Your Account
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your Email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Verify;
