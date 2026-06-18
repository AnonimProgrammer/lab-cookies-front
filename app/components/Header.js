"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/auth");
  }

  return (
    <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <span className="glitch neon-text text-primary text-xl font-bold tracking-[0.3em]">
        DEVFORGE
      </span>

      <div className="flex items-center gap-4">
        {!loading && isAuthenticated && user && (
          <>
            <span className="text-sm sm:text-base font-bold tracking-widest">
              <span className="text-comment">{"// "}</span>
              <span className="text-[#28c840]">@{user.name}</span>
            </span>
            <Button href="/profile" variant="white" size="sm">
              &gt; profile
            </Button>
          </>
        )}

        {!loading && isAuthenticated ? (
          <Button variant="danger" size="sm" onClick={handleLogout}>
            &gt; disconnect
          </Button>
        ) : (
          <Button href="/auth" variant="white" size="sm">
            &gt; access_terminal
          </Button>
        )}
      </div>
    </header>
  );
}
