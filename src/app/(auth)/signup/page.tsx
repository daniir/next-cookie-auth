"use client";

import SignUpForm from "@/app/components/signUpForm";
import React from "react";

function SignUpPage() {
  return (
    <>
      <h1 className="text-center my-5 font-bold uppercase text-white">
        SignUp
      </h1>
      <SignUpForm />
    </>
  );
}

export default SignUpPage;
