import React, { useMemo } from 'react'
import { useHabitStore } from '../store/habitStore'

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

const HabitCard = ({ habit }) => {
  const toggleCompletion = useHabitStore((s) => s.toggleCompletion)
  const deleteHabit = useHabitStore((s) => s.deleteHabit)

  const today = todayKey()
  const completedToday = !!(habit.completions && habit.completions[today])

  // compute simple total completions and current streak (consecutive days ending today)
  const { totalCompletions, streak } = useMemo(() => {
    const completions = habit.completions || {}
    const dates = Object.keys(completions).sort().reverse() // newest first
    const total = dates.length

    // compute streak
    let streakCount = 0
    const now = new Date()
    for (let offset = 0; ; offset++) {
      const d = new Date(now)
      d.setDate(now.getDate() - offset)
      const k = d.toISOString().slice(0, 10)
      if (completions[k]) streakCount++
      else break
      // safety stop for insane loops
      if (offset > 3650) break
    }

    return { totalCompletions: total, streak: streakCount }
  }, [habit])

  return (
    <div className="habit-card">
      <div className="habit-main">
        <div className="habit-header">
          <h3>{habit.name}</h3>
          <div className="habit-actions">
            <button
              className={`complete-btn ${completedToday ? 'done' : ''}`}
              onClick={() => toggleCompletion(habit.id)}
              title="Toggle completion for today"
            >
              {completedToday ? '✅' : '☐'}
            </button>
            <button className="delete-btn" onClick={() => deleteHabit(habit.id)} title="Delete habit">🗑️</button>
          </div>
        </div>

        {habit.description && <p className="habit-desc">{habit.description}</p>}

        <div className="habit-meta">
          <span>Total: {totalCompletions}</span>
          <span>Streak: {streak}</span>
        </div>
      </div>
    </div>
  )
}

export default HabitCard
