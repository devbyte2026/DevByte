"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@devbyte.com.ar" && password === "devbyte2024") {
      localStorage.setItem("devbyte_admin", "true");
      router.push("/admin/leads");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-surface-muted">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-display text-primary">DevByte Admin</h1>
          <p className="text-text-muted text-sm mt-2">Ingresá tus credenciales</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              placeholder="admin@devbyte.com.ar"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" size="lg">
            Ingresar
          </Button>
        </form>

        <p className="text-xs text-text-muted text-center mt-6">
          Solo para administradores de DevByte
        </p>
      </Card>
    </main>
  );
}