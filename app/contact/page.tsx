"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("sent")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-[var(--portfolio-surface)] border border-[var(--portfolio-border)] rounded-lg text-[var(--portfolio-text)] placeholder:text-[var(--portfolio-muted-deep)] focus:border-[var(--portfolio-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--portfolio-accent)]/30 transition-all duration-200"

  const cardClass =
    "block p-6 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] hover:border-[var(--portfolio-border-hover)] transition-all duration-200 card-lift"

  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-16">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-[var(--portfolio-muted)] text-lg">
            Open to data science and ML engineering opportunities in the UK.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <label className="block text-sm font-medium text-[var(--portfolio-muted)] mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--portfolio-muted)] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClass}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--portfolio-muted)] mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`${inputClass} resize-none`}
              placeholder="Tell me about your project or opportunity..."
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent-muted)] text-[var(--portfolio-bg)] py-6 text-lg font-semibold transition-all duration-200 disabled:opacity-60"
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
                ? "Message Sent!"
                : status === "error"
                  ? "Failed — Try Again"
                  : "Send Message"}
          </Button>
        </motion.form>

        <motion.div
          className="space-y-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="mailto:mohith.sekharamahanthi.2002@gmail.com" className={cardClass}>
            <div className="text-sm text-[var(--portfolio-muted-deep)] mb-1">
              Email
            </div>
            <div className="text-xl text-[var(--portfolio-text)] font-medium">
              mohith.sekharamahanthi.2002@gmail.com
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/mohit-sai-sekharamahanthi/"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
          >
            <div className="text-sm text-[var(--portfolio-muted-deep)] mb-1">
              LinkedIn
            </div>
            <div className="text-xl text-[var(--portfolio-text)] font-medium">
              linkedin.com/in/mohit-sai-sekharamahanthi
            </div>
          </a>

          <a
            href="https://github.com/DataStatsMohith"
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
          >
            <div className="text-sm text-[var(--portfolio-muted-deep)] mb-1">
              GitHub
            </div>
            <div className="text-xl text-[var(--portfolio-text)] font-medium">
              github.com/DataStatsMohith
            </div>
          </a>

          <div className="p-6 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)]">
            <div className="text-sm text-[var(--portfolio-muted-deep)] mb-1">
              Location
            </div>
            <div className="text-xl text-[var(--portfolio-text)] font-medium">
              Loughborough, UK
            </div>
            <div className="text-[var(--portfolio-accent)] text-sm mt-2 font-medium">
              ✓ Right to work in UK
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
