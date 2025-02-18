'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailedUserProfile({params}: any) {
      const router = useRouter();
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);
      const [user, setUser]: any = useState(null);
      const [processing, setProcessing] = useState(false)

      const fetchUserDetails = async () => {
        try {
          const response: any = await axios.post("/api/users/me");
          console.log("This is user response", response.data);
          setUser(response.data.data);
        } catch (error: any) {
          setError(error);
          console.log(error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };
       useEffect(() => {
          fetchUserDetails();
        }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
        <h1>Detailed user profile</h1>
        <p>{params.id}</p>
    </div>
  )
}

