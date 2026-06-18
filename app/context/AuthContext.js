"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      credentials: "include",
      ...options,
    });
  } catch {
    throw new Error(
      "Could not reach the backend. Is it running on port 8080 with CORS credentials enabled?"
    );
  }
  return res;
}

async function requestMe() {
  const res = await apiFetch("/me");
  if (res.ok) {
    return res.json();
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    requestMe()
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password) {
    const res = await apiFetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Invalid credentials");
    }

    const me = await requestMe();
    setUser(me);
  }

  async function signup(name, email, password) {
    const res = await apiFetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Signup failed");
    }

    const me = await requestMe();
    setUser(me);
  }

  async function logout() {
    await apiFetch("/logout", { method: "POST" });
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
