"use client";

import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function HeroLoginButton() {
  const { isAuthenticated, loading } = useAuth();

  if (loading || isAuthenticated) return null;

  return (
    <Button href="/auth" variant="white" className="mt-10">
      Log in →
    </Button>
  );
}
