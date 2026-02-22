"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

function NavLinks({
  mobile = false,
  onLinkClick,
}: {
  mobile?: boolean
  onLinkClick?: () => void
}) {
  const baseClass = mobile
    ? "flex flex-col gap-6 text-lg"
    : "hidden md:flex gap-8 text-sm"
  const linkClass = mobile
    ? "text-[var(--portfolio-text)] hover:text-[var(--portfolio-accent)] transition-colors duration-200 py-2"
    : "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)] transition-colors duration-200"

  return (
    <div className={baseClass}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={linkClass}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--portfolio-bg)]/90 backdrop-blur-md border-b border-[var(--portfolio-border)] supports-[backdrop-filter]:bg-[var(--portfolio-bg)]/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-lg text-[var(--portfolio-text)] hover:text-[var(--portfolio-accent)] transition-colors duration-200"
        >
          Mohit Sai Sekharamahanthi
        </Link>

        <NavLinks />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="md:hidden p-2 -mr-2 text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] sm:w-[320px] bg-[var(--portfolio-surface)] border-[var(--portfolio-border)]"
            showCloseButton={true}
          >
            <SheetHeader>
              <SheetTitle className="text-[var(--portfolio-text)] font-semibold">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8">
              <NavLinks mobile onLinkClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
