"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const result = await res.json().catch(() => ({}));
        setMessage(result.error || "Something went wrong — please try again.");
        setStatus("error");
      }
    } catch {
      setMessage("Something went wrong — please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{ color: "#2ecc71", fontWeight: 700, fontSize: 16 }}>
        You&apos;re in! Keep an eye on your inbox for your shot at the felt.
      </p>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        style={{
          padding: "13px 16px",
          fontSize: 15,
          border: "1px solid #3a3a44",
          background: "#fff",
          color: "#111",
          minWidth: 280,
          borderRadius: 2,
        }}
      />
      <button type="submit" className="btn btn-red" disabled={status === "loading"} style={{ border: "none", cursor: "pointer" }}>
        {status === "loading" ? "Signing Up…" : "Sign Up"}
      </button>
      {status === "error" && (
        <p style={{ width: "100%", color: "#ff6b6b", fontSize: 13.5, margin: "4px 0 0" }}>
          {message || "Something went wrong — please try again."}
        </p>
      )}
    </form>
  );
}
