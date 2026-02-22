import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface Frontmatter {
  title?: string
  date?: string
  description?: string
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/blog")
  if (!fs.existsSync(postsDir)) return []
  const slugs = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(".mdx", "") }))
  return slugs
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) notFound()

  const raw = fs.readFileSync(filePath, "utf8")

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: raw,
    options: { parseFrontmatter: true },
  })

  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)] transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Technical Writing
        </Link>

        <header className="mb-12">
          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className="text-sm font-mono text-[var(--portfolio-accent)] block mb-4"
            >
              {frontmatter.date}
            </time>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-[var(--portfolio-muted)] text-lg mt-4 leading-relaxed">
              {frontmatter.description}
            </p>
          )}
        </header>

        <div className="mdx-content">{content}</div>
      </article>
    </main>
  )
}
