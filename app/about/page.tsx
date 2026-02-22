"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const skills = [
  "Python",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "XGBoost",
  "PyTorch",
  "SQL",
  "PySpark",
  "Snowflake",
  "Azure Databricks",
  "Power BI",
  "Flask",
  "Docker",
  "MLflow",
  "SHAP",
  "Git",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--portfolio-bg)] text-[var(--portfolio-text)] py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mohit Sai Sekharamahanthi
          </h1>
          <div className="text-[var(--portfolio-muted)] space-y-2">
            <p>mohith.sekharamahanthi.2002@gmail.com | +447355641845 | Loughborough, UK</p>
            <a
              href="https://www.linkedin.com/in/mohit-sai-sekharamahanthi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--portfolio-accent)] hover:underline transition-colors"
            >
              linkedin.com/in/mohit-sai-sekharamahanthi
            </a>
          </div>
          <p className="text-[var(--portfolio-muted)] text-lg leading-relaxed pt-4">
            MSc Data Science graduate with 2+ years of experience delivering predictive modelling and machine learning solutions at Capgemini. Built and deployed production-ready models that improved stakeholder adoption by 25% and generated £60K+ annual savings. Strong expertise in Python, SQL, and large-scale data processing. Right to work in the UK.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            className="border-l-2 pl-8 space-y-4"
            style={{ borderColor: "var(--portfolio-accent)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-sm text-[var(--portfolio-muted-deep)] font-mono">
              September 2020 — August 2022
            </div>
            <h3 className="text-xl font-semibold">Data Analyst</h3>
            <div className="text-[var(--portfolio-accent)] font-medium">
              Capgemini | Mumbai, India
            </div>
            <ul className="text-[var(--portfolio-muted)] list-disc list-inside space-y-2 leading-relaxed">
              <li>
                Designed and deployed predictive ML models using Python (Pandas, Scikit-learn) for customer churn forecasting and segmentation, increasing model adoption by 25% across 5+ cross-functional teams
              </li>
              <li>
                Applied statistical modelling on large-scale datasets using SQL, PySpark and Snowflake, improving data processing performance by 25%
              </li>
              <li>
                Engineered and automated 50+ production-ready ETL pipelines, reducing manual reporting effort by 30%
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="border-l-2 pl-8 space-y-4"
            style={{ borderColor: "var(--portfolio-accent)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-sm text-[var(--portfolio-muted-deep)] font-mono">
              October 2023 — December 2024
            </div>
            <h3 className="text-xl font-semibold">MSc Data Science</h3>
            <div className="text-[var(--portfolio-accent)] font-medium">
              Loughborough University | Loughborough, UK
            </div>
            <ul className="text-[var(--portfolio-muted)] list-disc list-inside space-y-2 leading-relaxed">
              <li>
                Modules: Machine Learning & AI, Statistical Modelling & Predictive Analytics, Data Visualisation & Storytelling
              </li>
              <li>
                Dissertation: Deep Learning-based Predictive Maintenance for Manufacturing Systems
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="space-y-6 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold">Core Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-transparent border-[var(--portfolio-border)] text-[var(--portfolio-muted)] text-sm font-medium px-3 py-1 rounded-md hover:border-[var(--portfolio-border-hover)] hover:text-[var(--portfolio-accent)] transition-colors duration-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold">Certifications</h2>
          <div className="space-y-2 text-[var(--portfolio-muted)]">
            <p>• IBM Data Science Certificate</p>
            <p>• Google Advanced Data Analytics Certificate</p>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold">Languages</h2>
          <div className="flex flex-wrap gap-4 text-[var(--portfolio-muted)]">
            <span>English (Advanced)</span>
            <span>•</span>
            <span>Telugu (Native)</span>
            <span>•</span>
            <span>Hindi (Fluent)</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
