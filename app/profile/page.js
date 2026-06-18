"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Button from "../components/Button";

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex flex-col flex-1 text-foreground">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-xs text-muted tracking-[0.3em] animate-pulse">
            {"// loading_identity..."}
          </p>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 text-foreground">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-16 auth-ambient scanlines relative">
        <div className="w-full max-w-lg mac-card p-8 sm:p-10 relative z-10">
          <p className="text-xs text-primary tracking-widest mb-2">
            {"// identity_verified"}
          </p>
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Operator profile
          </h1>

          <dl className="space-y-4 text-sm">
            <div className="flex flex-col gap-1 border-b border-surface-border pb-4">
              <dt className="text-[10px] uppercase tracking-widest text-foreground font-bold">
                Handle
              </dt>
              <dd className="text-[#28c840] text-lg font-bold">@{user.name}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[10px] uppercase tracking-widest text-foreground font-bold">
                Email
              </dt>
              <dd className="text-orange-400">{user.email}</dd>
            </div>
          </dl>

          <div className="flex gap-3 mt-8">
            <Button href="/" variant="white" size="sm">
              ← Home
            </Button>
            <Link
              href="/"
              className="text-xs text-primary hover:text-primary-strong self-center ml-auto transition-colors"
            >
              session active via httpOnly cookie
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
