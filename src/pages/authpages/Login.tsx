import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "@/schema/authschema/LoginFormSchema";
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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { userLogin } from "@/redux/slices/authSlice";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    console.log("form submitted with data:", data);
    dispatch(userLogin(data))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully Logged in ",
          description: "Logged in successfully explore course and register",
        });
      })
      .catch((error) => {
        console.log("this is error", error);
        toast({
          title: "Error user Login",
          description: "please Enter valid credentials",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Login
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400 dark:placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Your email address or username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter password"
                      type="password"
                      className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400 dark:placeholder-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Your account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Register here
            </Link>
          </span>
          <br />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            If you forgot password?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              click here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
