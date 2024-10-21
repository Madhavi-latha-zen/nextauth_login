"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schema using Zod
const adminLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const AdminLogin = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  // Access admin credentials from environment variables
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: { email: string; password: string }) => {
    setError(""); // Clear any previous error

    // Check if the entered email and password match the admin credentials
    if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
      // Redirect to product page if credentials are correct
      router.push("/product");
    } else {
      // Display error if credentials don't match
      setError("Admin details are wrong");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className=" p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center text-white font-semibold mb-8">
          Admin Login
        </h1>

        {/* Form using Shadcn components */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
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
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </Form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
