'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Page = () => {

  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.target);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        console.log(error);
        alert(error.message || "Login failed");
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen items-center justify-center ">
      <Form
        onSubmit={onSubmit}
        className="flex w-96 flex-col gap-4" >
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
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          defaultValue='Ridoy@269766'
          type={view ? "text" : "password"}
          validate={(value) => {

            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <div className="relative w-full">

            <Input
              placeholder="Enter your password"
              className="pr-10 w-full"
            />

            <button
              type="button"
              onClick={() => setView(!view)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 z-10"
            >
              {
                view ? <FaEyeSlash size={18} /> : <FaEye size={18} />
              }
            </button>

          </div>

          <Description>
            Must be at least 6 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button className={'w-full'} type="submit">
            {loading ? 'Loading...' : 'Log in'}
          </Button>

        </div>
      </Form>
      <div className="mt-4">
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot your password?
        </a>
      </div>
      <span className="my-4 text-gray-500">or</span>
      <button
        type="button"
        className="w-96 mt-2 flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 bg-white hover:bg-gray-100 transition-all duration-300 shadow-sm"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        <span className="text-gray-700 font-medium">
          Continue with Google
        </span>
      </button>
      <div className="mt-4">
        <a href="/authentication/signup" className="text-blue-500 hover:underline">
          Don&apos;t have an account? Register
        </a>
      </div>
    </div>
  );
};

export default Page;
