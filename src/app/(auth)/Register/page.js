"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Register from "@/app/actions/Registeractions";

const schema = z.object({
  username: z.string().min(6, "Username must be atleat 6 characters long and is required"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((val) => val.endsWith("@wisc.edu"), {
      message: "Email must end with @wisc.edu",
    }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  location: z.string().min(3, "Location is required"),
});

export default function Page() {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("Form submitted");
    console.log(data);
    try {
      const result = await Register(data); 

      if (result.user) {
        console.log('User registered successfully:', result);
        reset();
        router.push('/login')
      
      } else if (result.error) {
        if (result.error === 'User already exists') {
          setError("location", {
            type: "manual",
            message: "User already exists with this email.",
          });
        } else {
          setError("api", {
            type: "manual",
            message: "Error registering user. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError("api", {
        type: "manual",
        message: "Error registering user. Please try again.",
      });
    }
  };


  const handleSelectChange = (value) => {
    setValue("location", value, { shouldValidate: true });
    trigger("location");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <h1>
        <title>Register Form</title>
      </h1>

      <main className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Get started Now</h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input type="text" placeholder="Username" {...register("username")} />
          {errors.username && (
            <p
              id="username-error"
              className="text-red-500 text-sm font-semibold"
            >
              {errors.username.message}
            </p>
          )}
          <Input type="email" placeholder="Email" {...register("email")}/>
          {errors.email && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.email.message}
            </p>
          )}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </p>
          )}
          <Select onValueChange={handleSelectChange} defaultValue="">
            <SelectTrigger className="w-[385px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Select a Location</SelectItem>
              <SelectItem value="Rathskeller">Rathskeller</SelectItem>
              <SelectItem value="Lakefront">Lakefront</SelectItem>
              <SelectItem value="MU Markets">MU Markets</SelectItem>
            </SelectContent>
          </Select>
          {errors.location && (
            <p id="location-error" className="text-red-500 text-sm font-semibold">
              {errors.location.message}
            </p>
          )}
          <Button
            type="submit"
            className="bg-green-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            disabled={!isValid}
          >
            Sign up
          </Button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-6">
          Aldready have an account?{" "}
          <Link href="/Login">
            <span className='text-blue-500 hover:underline"'>Sign In</span>
          </Link>
        </p>
        <p className="text-gray-500 text-sm text-center mt-2">
          By clicking continue, you agree to our{" "}
          <a href="#" className="text-blue-500">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </main>
    </div>
  );
}
