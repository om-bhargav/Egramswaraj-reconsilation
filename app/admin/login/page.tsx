"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Admin sign-in. UI only for now — no auth wired up yet. */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter both your email and password.");
      return;
    }

    setError("");
    // TODO: verify the credentials against the admin table, then set a session.
    router.push("/admin/dashboard");
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-paper px-5 py-12">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/logo.png"
            alt="eGramSwaraj Automation"
            width={48}
            height={48}
            priority
            className="size-11 object-contain"
          />
          <div>
            <h1 className="text-[1.6rem] leading-tight font-extrabold tracking-[-0.015em] text-navy">
              Admin sign in
            </h1>
            <p className="mt-1.5 text-sm text-subtle">
              eGramSwaraj Automation · licence administration
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 rounded-xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(30,39,51,0.04)] sm:p-7"
        >
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-navy">
              <Mail className="size-3.5 text-faint" />
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10"
            />
          </div>

          <div className="mt-5 grid gap-2">
            <Label htmlFor="password" className="text-navy">
              <Lock className="size-3.5 text-faint" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-10"
            />
          </div>

          {error ? (
            <p role="alert" className="mt-4 text-sm font-medium text-brand-red">
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="mt-6 h-10 w-full bg-green text-white hover:bg-green-dark"
          >
            Sign in
          </Button>

          <p className="mt-5 border-t border-line pt-4 text-center text-[13px] text-faint">
            This area is for administrators only.
          </p>
        </form>
      </div>
    </main>
  );
}
