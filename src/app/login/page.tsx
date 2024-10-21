"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { Card } from "@/components/ui/card"; 
import { Typography } from "@/components/ui/typography"; 
import { useTheme } from "next-themes"; 

const loginSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { data: session, status: sessionStatus } = useSession();
  const { theme } = useTheme(); 
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/users");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      setError(
        validationResult.error.format().email?._errors[0] ||
        validationResult.error.format().password?._errors[0] ||
        ""
      );
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1 className="text-center">Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className={`flex min-h-screen flex-col items-center justify-center p-8
        ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
        <Card className={`p-8 w-full max-w-md shadow-lg rounded-lg
          ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <Typography variant="h1" className={`text-center font-semibold mb-6
            ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              className={`border border-gray-300 dark:border-gray-600 px-4 py-2 mb-4 rounded
                ${theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Email"
              required
            />
            <Input
              type="password"
              name="password"
              className={`border border-gray-300 dark:border-gray-600 px-4 py-2 mb-4 rounded
                ${theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Password"
              required
            />
            <Button
              type="submit"
              className={`w-full py-2 rounded transition-colors duration-300
                ${theme === "dark" ? "bg-blue-700 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
              Sign In
            </Button>
            {error && (
              <p className={`text-sm mt-2 ${theme === "dark" ? "text-red-400" : "text-red-600"}`}>
                {error}
              </p>
            )}
          </form>
          <Button
            className={`w-full py-2 rounded mt-4 transition-colors duration-300
              ${theme === "dark" ? "bg-gray-800 hover:bg-gray-600 text-white" : "bg-black hover:bg-gray-700 text-white"}`}
            onClick={() => signIn("github")}
          >
            Sign In with GitHub
          </Button>
          <p className={`text-sm text-center mt-4
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Create a new account?{" "}
            <Link
              className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} hover:underline`}
              href="/register"
            >
              Register here
            </Link>
          </p>
        </Card>
      </div>
    )
  );
};

export default Login;
