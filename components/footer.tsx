"use client"

export function Footer() {
  return (
    <footer className="border-t border-[var(--portfolio-border)] bg-[var(--portfolio-bg)] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[var(--portfolio-muted)] text-sm">
          © 2025 Mohit Sai Sekharamahanthi. All rights reserved.
        </div>
        <div className="flex gap-8 text-sm text-[var(--portfolio-muted)]">
          <a
            href="https://github.com/DataStatsMohith"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--portfolio-accent)] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohit-sai-sekharamahanthi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--portfolio-accent)] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mohith.sekharamahanthi.2002@gmail.com"
            className="hover:text-[var(--portfolio-accent)] transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
