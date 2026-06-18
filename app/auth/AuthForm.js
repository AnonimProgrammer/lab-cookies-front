"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Field from "./Field";
import Button from "../components/Button";

export default function AuthForm() {
  const { login, signup, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [errors, setErrors] = useState({ confirm: "", form: "" });
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmRef = useRef(null);

  const isLogin = mode === "login";

  async function handleLogin(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirm) {
      setErrors((prev) => ({ ...prev, confirm: "Passwords do not match" }));
      confirmRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setErrors({ confirm: "", form: "" });

    try {
      await signup(name, email, password);
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    setMode(isLogin ? "signup" : "login");
    setErrors({ confirm: "", form: "" });
  }

  if (authLoading) {
    return (
      <div className="w-full max-w-md mac-card p-8 text-center">
        <p className="text-xs text-comment tracking-[0.3em] animate-pulse">
          {"// verifying_session..."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mac-card p-8 sm:p-10">
      <Link
        href="/"
        className="block text-center text-primary neon-text font-bold tracking-[0.3em] mb-1 cursor-pointer hover:text-primary-strong transition-colors"
      >
        DEVFORGE
      </Link>

      <p className="text-center text-xs text-primary tracking-widest mb-2">
        {"// access_terminal"}
      </p>

      <div className="flex rounded-lg border border-surface-border bg-[#1e1e1e] overflow-hidden mb-8">
        <button
          type="button"
          onClick={() => !isLogin && switchMode()}
          className={`flex-1 py-2.5 text-xs uppercase tracking-widest transition-colors cursor-pointer ${
            isLogin
              ? "bg-white/10 text-foreground border-b-2 border-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => isLogin && switchMode()}
          className={`flex-1 py-2.5 text-xs uppercase tracking-widest transition-colors cursor-pointer ${
            !isLogin
              ? "bg-white/10 text-foreground border-b-2 border-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          Register
        </button>
      </div>

      <form
        onSubmit={isLogin ? handleLogin : handleSignup}
        className="flex flex-col gap-5"
      >
        {!isLogin && (
          <Field
            id="name"
            label="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="n3on_rider"
          />
        )}

        <Field
          id="email"
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@grid.net"
        />

        <Field
          id="password"
          label="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: "" }));
          }}
          placeholder="••••••••"
        />

        {!isLogin && (
          <Field
            id="confirm-password"
            label="confirm password"
            type="password"
            value={confirm}
            inputRef={confirmRef}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors((prev) => ({ ...prev, confirm: "" }));
            }}
            error={errors.confirm}
            placeholder="••••••••"
          />
        )}

        {errors.form && (
          <p
            role="alert"
            aria-live="polite"
            className="text-xs text-red-400 tracking-widest px-3 py-2 rounded-sm bg-red-500/10 border border-red-500/30"
          >
            {"// "}
            {errors.form}
          </p>
        )}

        <Button
          type="submit"
          variant="white"
          className="mt-1 w-full"
          disabled={submitting}
        >
          {submitting
            ? "Connecting..."
            : isLogin
              ? "Log in →"
              : "Register →"}
        </Button>
      </form>

      <Link
        href="/"
        className="block text-center text-xs text-primary hover:text-primary-strong mt-8 cursor-pointer transition-colors"
      >
        ← back to home
      </Link>
    </div>
  );
}
