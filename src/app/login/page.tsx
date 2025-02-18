'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [buttonDisabled, setButtonDisabled] = useState(false)

const handleLogin = async() => {
  try {
    setLoading(true)
    const response = await axios.post("/api/users/login", user);
    console.log(response);
    user.email = "";
    user.password = "";
    router.push("/profile")
    
  } catch (error: any) {
    setError(true);
    console.error(error);
  }finally{
    setLoading(false)
  }
}

useEffect(() => {
  if (user.email.length > 0 && user.password.length > 0) {
    setButtonDisabled(true);
  }
}, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <label htmlFor="email">Email:</label>
      <input type="text"
      id="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <label htmlFor="password">Password:</label>
      <input type="text"
      id="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      />

      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      onClick={handleLogin}
      >{buttonDisabled ? "Login" : "Please complete the form"}</button>

      {error && (
        <div className="">
          <p>Error</p>
        </div>
      )}
    </div>
  )
}

export default page
