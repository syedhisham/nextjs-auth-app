"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser]: any = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const fetchUserDetails = async () => {
    try {
      const response: any = await axios.post("/api/users/me");
      console.log("This is user response", response.data);
      setUser(response.data.data);
    } catch (error: any) {
      setError(error);
      console.log(error);
    } 
    // finally {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 500);
    // }
  };

  const userLogout = async() => {
    try {
      // setProcessing(true)
      const response = await axios.get("/api/users/logout");
      console.log(response.data.message);
      router.push("/login")
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  }


  // useEffect(() => {
  //     if (user) {
  //         console.log("This is user logged",user);
  //         console.log("This is user logged",user.username);
  //     }
  // }, [user])
  return (
    <div>
      {/* {loading && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <p className="text-4xl">Loading...</p>
        </div>
      )} */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p className="text-2xl m-4">click the id to navigate to detailed user profile: <br />
           <Link href={`/profile/${user?._id}`}>
           <span className=" underline text-4xl text-yellow-500">{user?._id}</span>
           </Link>
           </p>
           <button onClick={fetchUserDetails}>User Id</button>
        {/* <h1 className="text-4xl">Hi! my username is: {user?.username}</h1>
        <h1 className="text-4xl">My email is: {user?.email}</h1> */}
        {error && (
        <div className="text-4xl text-red-500">
          <p>Error while fetching the user data</p>
        </div>
      )}
      <button onClick={userLogout} className="p-2 bg-red-500 text-lg mt-5 rounded-md font-semibold">{processing ? "Processing" : "Logout"}</button>
      </div>
    </div>
  );
}
