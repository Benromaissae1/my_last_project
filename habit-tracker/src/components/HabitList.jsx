import React from 'react'
import { useHabitStore } from '../store/habitStore'
import HabitCard from './HabitCard'

const HabitList = () => {
  const habits = useHabitStore((s) => s.habits)

  if (!habits || habits.length === 0) {
    return <div className="empty">No habits yet — add your first habit!</div>
  }

  return (
    <div className="habit-list">
      {habits.map((h) => (
        <HabitCard key={h.id} habit={h} />
      ))}
    </div>
  )
}

export default HabitList
