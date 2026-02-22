"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectMetricChart } from "@/components/project-metric-chart"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Retail Customer Intelligence",
    challenge:
      "Retailers struggle with cold-start users and fragmented customer data, leading to poor personalization and low conversion.",
    solution:
      "Built an end-to-end hybrid recommendation engine combining collaborative filtering with content-based fallbacks, deployed via FastAPI with sub-50ms latency.",
    impact: "87% recommendation accuracy, 45ms p99 latency, production-ready API.",
    tags: ["Python", "FastAPI", "PostgreSQL", "MLflow", "Docker"],
    metrics: [
      { label: "Accuracy", value: 87 },
      { label: "Latency (ms)", value: 45, max: 100 },
    ],
    href: "https://github.com/DataStatsMohith/retail-customer-intelligence",
  },
  {
    title: "Multi-Store Demand Forecasting",
    challenge:
      "Multi-store operations require accurate, real-time demand forecasts to optimize inventory and reduce stockouts.",
    solution:
      "XGBoost, Prophet, and LSTM ensemble with PySpark preprocessing on Azure Databricks; real-time dashboard via Streamlit and Snowflake.",
    impact: "43% MAE improvement over baseline, real-time operational dashboard.",
    tags: ["PySpark", "Azure Databricks", "Snowflake", "Streamlit", "XGBoost"],
    metrics: [
      { label: "MAE improvement (%)", value: 43 },
      { label: "Models in ensemble", value: 3 },
    ],
    href: "https://github.com/DataStatsMohith/retail-demand-forecasting-ml",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Projects
          </h1>
          <p className="text-[var(--portfolio-muted)] text-lg max-w-2xl leading-relaxed">
            Production-grade ML systems built end-to-end. Challenge → Solution → Impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + index * 0.08 }}
              className="block h-full group"
            >
              <Card className="bg-[var(--portfolio-surface)] border-[var(--portfolio-border)] hover:border-[var(--portfolio-border-hover)] transition-all duration-300 h-full card-lift group-hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl gap-4">
                    <span className="group-hover:text-[var(--portfolio-accent)] transition-colors duration-200">
                      {project.title}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[var(--portfolio-muted)] group-hover:text-[var(--portfolio-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--portfolio-accent)]">
                        Challenge
                      </span>
                      <p className="text-[var(--portfolio-muted)] text-sm mt-1 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--portfolio-muted)]">
                        Solution
                      </span>
                      <p className="text-[var(--portfolio-muted)] text-sm mt-1 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--portfolio-muted)]">
                        Impact
                      </span>
                      <p className="text-[var(--portfolio-text)] text-sm mt-1 font-medium">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-transparent border-[var(--portfolio-border)] text-[var(--portfolio-muted)] text-xs font-medium px-2.5 py-0.5 rounded-md hover:border-[var(--portfolio-border-hover)] hover:text-[var(--portfolio-accent)] transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <ProjectMetricChart metrics={project.metrics} />
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </main>
  )
}
