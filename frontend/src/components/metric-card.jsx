import React from "react"

export default function MetricCard({ title, value, subtitle, icon }) {
  return (
    <article
      className="min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-2"
      aria-label={title}
    >
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>{title}</span>
        {icon ? (
          <div className="w-7 h-7 rounded-md grid place-items-center border border-zinc-800 bg-violet-500/10 text-violet-400">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="text-2xl font-bold text-zinc-100">{value}</div>
      {subtitle ? <div className="mt-1 text-sm text-zinc-400">{subtitle}</div> : null}
    </article>
  )
}
