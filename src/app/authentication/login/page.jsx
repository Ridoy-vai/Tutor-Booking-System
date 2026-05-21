'use client';

import { authClient } from '@/lib/auth-client';
import { Button, FieldError, Form, Input, Label, TextField, } from '@heroui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';


const LoginPage = () => {
  const router = useRouter();
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Login failed. Please check your credentials.");
      } else {
        // সফল হলে হোম পেজে পাঠানো এবং স্টেট রিফ্রেশ করা
        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed. Please try again.");
    }
    if(!loading){
      toast.info("Redirecting to Google for authentication...");
    }
  };
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-50/50">
      
      {/* টাইটেল এবং সাব-টাইটেল */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email Address</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={view ? "text" : "password"}
          >
            <div className="flex justify-between items-center">
              <Label>Password</Label>
              <Link href="/forgot-password" size="sm" className="text-xs text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative w-full">
              <Input
                placeholder="••••••••"
                className="pr-10 w-full"
              />
              <button
                type="button"
                onClick={() => setView(!view)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                {view ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <FieldError />
          </TextField>

          <Button 
            isLoading={loading} 
            className="w-full bg-purple-600 text-white font-semibold py-6 rounded-xl mt-2" 
            type="submit"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </Button>

        </Form>

        <div className="flex flex-col items-center">
          <span className="my-6 text-gray-400 text-sm">or continue with</span>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Google sign in</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account? 
          <Link
            href="/authentication/signup"
            className="text-purple-600 font-semibold hover:underline ml-1"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;