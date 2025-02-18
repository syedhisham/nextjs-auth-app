"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  //If next.js is utilized
  // const router = useRouter()

  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // //If next.js is utilized
    //     const {query} = router;
    //     const urlToken2 = query.token;
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? token : "No token"}
      </h2>
      {isVerified && (
        <div>
          <p className="text-2xl">Verified successfuly!</p>
          <Link className="text-center text-xs" href={"/login"}>
            Navigate to Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <p className="text-2xl text-red-500">Error</p>
        </div>
      )}
    </div>
  );
}
