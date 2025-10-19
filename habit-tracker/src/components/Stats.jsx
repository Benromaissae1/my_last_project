import React, { useMemo } from 'react'
import { useHabitStore } from '../store/habitStore'

function dateKeyFromOffset(offset) {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return d.toISOString().slice(0, 10)
}

const Stats = () => {
  const habits = useHabitStore((s) => s.habits)

  const stats = useMemo(() => {
    const last7 = Array.from({ length: 7 }, (_, i) => dateKeyFromOffset(i))
    const perDayCounts = last7.map(dateKey => {
      const count = habits.reduce((acc, h) => acc + ((h.completions && h.completions[dateKey]) ? 1 : 0), 0)
      return { date: dateKey, count }
    })
    const totalPossible = habits.length * 7
    const totalCompleted = perDayCounts.reduce((acc, d) => acc + d.count, 0)
    const rate = totalPossible === 0 ? 0 : Math.round((totalCompleted / totalPossible) * 100)

    // compute best streak among habits (simple longest streak in last 30 days)
    let longest = 0
    for (const h of habits) {
      const c = h.completions || {}
      let curr = 0
      for (let i = 0; i < 30; i++) {
        const k = dateKeyFromOffset(i)
        if (c[k]) curr++ 
        else {
          if (curr > longest) longest = curr
          curr = 0
        }
      }
      if (curr > longest) longest = curr
    }

    return { perDayCounts, rate, longest }
  }, [habits])

  return (
    <aside className="stats">
      <h2>Stats (last 7 days)</h2>
      <div className="stat-item">
        <strong>Completion rate:</strong>
        <div className="big">{stats.rate}%</div>
      </div>

      <div className="stat-item">
        <strong>Longest streak (last 30d):</strong>
        <div>{stats.longest} days</div>
      </div>

      <div className="stat-item">
        <strong>Daily completions (last 7 days):</strong>
        <ul className="daily-list">
          {stats.perDayCounts.map(d => (
            <li key={d.date}>
              <span className="date">{d.date}</span>
              <span className="count">{d.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Stats
