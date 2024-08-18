"use client";
import React from "react";
import { signOut } from "next-auth/react";
const SignOutButton = ({ className }: { className?: string }) => {
  return (
    <button className={className} onClick={() => signOut()}>
      SignOut
    </button>
  );
};

export default SignOutButton;
