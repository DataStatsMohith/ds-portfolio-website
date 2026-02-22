"use client"

/**
 * Responsive mini bar chart for project metrics.
 * Uses CSS/SVG for full responsiveness and consistent color scheme.
 */
interface MetricBar {
  label: string
  value: number
  max?: number
}

interface ProjectMetricChartProps {
  metrics: MetricBar[]
  accentColor?: string
  className?: string
}

export function ProjectMetricChart({
  metrics,
  accentColor = "var(--portfolio-accent)",
  className = "",
}: ProjectMetricChartProps) {
  const maxVal = Math.max(...metrics.map((m) => m.max ?? m.value), 100)

  return (
    <div
      className={`grid gap-2 ${className}`}
      role="img"
      aria-label={`Project metrics: ${metrics.map((m) => `${m.label} ${m.value}`).join(", ")}`}
    >
      {metrics.map((metric, i) => {
        const pct = ((metric.max ?? metric.value) / maxVal) * 100
        return (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--portfolio-muted)] font-medium">
                {metric.label}
              </span>
              <span
                className="font-mono text-[var(--portfolio-accent)] tabular-nums"
                style={{ color: accentColor }}
              >
                {metric.value}
                {typeof metric.max === "number" && metric.max !== metric.value
                  ? ` / ${metric.max}`
                  : ""}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--portfolio-surface)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out hover:opacity-90"
                style={{
                  width: `${Math.min(pct, 100)}%`,
                  backgroundColor: accentColor,
                }}
                role="presentation"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
