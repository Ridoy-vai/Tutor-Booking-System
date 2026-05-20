'use client';

import { authClient } from '@/lib/auth-client';
import { Button, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation'; // সঠিক রাউটার ইমপোর্ট
import Link from 'next/link';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupPage = () => {
    const router = useRouter(); // রাউটার ইনিশিয়ালাইজ
    const [view, setView] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());

            const { data, error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.url,
                callbackURL: "/",
            });

            if (error) {
                alert(error.message || "Something went wrong!");
            } else {
                // সফল হলে হোম পেজে পাঠানো
                alert("Account created successfully!");
                router.push("/");
                router.refresh();
            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-4 bg-gray-50/50">
            
            {/* টাইটেল এবং ডেসক্রিপশন */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
                <p className="text-gray-500 mt-2">Join us today! Please enter your details.</p>
            </div>

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <Form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4"
                >
                    <TextField
                        isRequired
                        name="url"
                        type="text"
                    >
                        <Label>Profile Image URL</Label>
                        <Input placeholder="https://example.com/photo.jpg" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="name"
                        type="text"
                    >
                        <Label>Full Name</Label>
                        <Input placeholder="Enter your full name" />
                        <FieldError />
                    </TextField>

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
                        minLength={8}
                        name="password"
                        type={view ? "text" : "password"}
                        validate={(value) => {
                            if (value.length < 6) return "Min 6 characters required";
                            if (!/[A-Z]/.test(value)) return "Need at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Need at least one number";
                            return null;
                        }}
                    >
                        <Label>Password</Label>
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
                        {loading ? 'Creating Account...' : "Sign up"}
                    </Button>
                </Form>

                <div className="flex flex-col items-center">
                    <span className="my-6 text-gray-400 text-sm">or continue with</span>

                    <button
                        type="button"
                        onClick={async () => {
                            await authClient.signIn.social({
                                provider: "google",
                                callbackURL: "/",
                            });
                        }}
                        className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 px-4 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-gray-700 font-medium">Google</span>
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? 
                    <Link
                        href="/authentication/login"
                        className="text-purple-600 font-semibold hover:underline ml-1"
                    >
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;