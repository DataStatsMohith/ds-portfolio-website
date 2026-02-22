import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Link from "next/link"

interface Post {
  slug: string
  title: string
  date: string
  description: string
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "content/blog")
  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug: filename.replace(".mdx", ""),
        title: data.title,
        date: data.date,
        description: data.description,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Technical Writing
          </h1>
          <p className="text-[var(--portfolio-muted)] text-lg max-w-2xl leading-relaxed">
            Deep dives into ML systems, data engineering, and production challenges.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-8 rounded-lg border border-[var(--portfolio-border)] bg-[var(--portfolio-surface)] hover:border-[var(--portfolio-border-hover)] transition-all duration-200 card-lift group"
            >
              <div className="text-sm font-mono text-[var(--portfolio-accent)] mb-3">
                {post.date}
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--portfolio-accent)] transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-[var(--portfolio-muted)] leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
