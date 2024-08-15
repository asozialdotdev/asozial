"use client";

import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

function DashboardContainer() {
  const searchParams = useSearchParams();
  const githubCode = searchParams.get("code");

  const {
    id,
    setId,
    avatar,
    setAvatar,
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    storeToken,
  } = useUserContext();

  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const authenticateWithGitHub = async () => {
      try {
        const response = await axios.post("http://localhost:5005/auth", {
          code: githubCode,
          withCredentials: true,
        });
        storeToken(response.headers.authorization.split(" ")[1]);
        setIsLoggedIn(true);
        setId(response.data._id);
        setAvatar(response.data.avatarUrl);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to authenticate with GitHub");
        setIsLoggedIn(false);
      }
    };

    if (githubCode) {
      authenticateWithGitHub();
    }
  }, [githubCode]);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/login", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Handle successful login (update state, redirect, etc.)
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to login", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <section className="flex grow flex-col border-dark bg-light p-4 text-dark dark:border-light dark:bg-dark dark:text-light lg:border-x">
      <h1 className="py-6 text-xl">Dashboard</h1>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="py-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 p-2 text-white"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>
      ) : (
        <>
          <p className="text-lg">Welcome, {username}!</p>
          <p>{id}</p>
          <img src={avatar} alt={username} />
        </>
      )}
    </section>
  );
}

export default DashboardContainer;
