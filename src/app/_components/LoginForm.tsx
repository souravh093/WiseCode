"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div>
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue </p>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-gray-600">
              Enter your credentials to access the influencer directory
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 bg-gray-100 p-2 rounded-md">
                <h2 className="text-lg font-bold">Demo Credentials:</h2>
                <p className="text-gray-600">
                  Admin: admin@example.com / Admin123!
                </p>
                <p className="text-gray-600">
                  Viewer: viewer@example.com / Viewer123!
                </p>
              </div>

              <Button type="submit" className="w-full" size={"lg"}>
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
