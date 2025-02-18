'use client';

import { useEffect, useState } from "react"
import {toast} from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SingUpPage(){
  const router = useRouter()
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Sign Up success",response);
      router.push("/login")
      
    } catch (error) {
      console.error("User registration failed",{error: error});
      
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  }, [user])
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processiong" : "Sign up"}</h1>

      <label htmlFor="username">Username:</label>
      <input type="text"
      id="username"
      value={user.username}
      placeholder="username"
      onChange={(e) => setUser({...user, username:e.target.value})}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="email">Email:</label>
      <input type="text"
      id="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder="email"
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="password">Password:</label>
      <input type="text"
      id="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>{disabled ? "Submit" : "Please fill the form"}</button>

      <Link className="underline text-xs" href={"/login"}>already have an account?</Link>
    </div>
  )
}