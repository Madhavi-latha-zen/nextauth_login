"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/ui/typography";
import { toast } from "sonner";
import { useTheme } from "next-themes"; 

const registrationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof registrationSchema>;

const Register = () => {
  const [serverError, setServerError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 400) {
        setServerError("This email is already registered.");
        toast.error("This email is already registered.", {
          style: {
            background: theme === "dark" ? "#333" : "white",
            color: "red",
          },
        });
      } else if (res.status === 201) {
        setSuccess("User created successfully!");
        toast.success("User created successfully!", {
          style: {
            background: theme === "dark" ? "#333" : "white",
            color: "green",
          },
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setServerError("Failed to create an account. Please try again.");
        toast.error("Failed to create an account. Please try again.", {
          style: {
            background: theme === "dark" ? "#333" : "white",
            color: "red",
          },
        });
      }
    } catch (error) {
      setServerError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.", {
        style: {
          background: theme === "dark" ? "#333" : "white",
          color: "red",
        },
      });
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Card
        className={`p-6 w-full max-w-md shadow-lg rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Typography
          variant="h1"
          className={`text-center font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Email"
            {...register("email")}
            className={`p-2 ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
            } border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`p-2 ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
            } border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <Button
            type="submit"
            className={`w-full py-2 rounded hover:bg-blue-500 transition-colors duration-300 ${
              theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
            }`}
          >
            Submit
          </Button>
          {serverError && <p className="text-red-500">{serverError}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <p
            className={`text-sm text-center ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              className={`${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              } hover:underline`}
              href="/login"
            >
              Login into existing account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Register;
