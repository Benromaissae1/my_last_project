import React, { useState } from 'react'
import { useHabitStore } from '../store/habitStore'

const AddHabitForm = () => {
  const addHabit = useHabitStore((s) => s.addHabit)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      completions: {}
    }
    addHabit(newHabit)
    setName('')
    setDescription('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add a new habit</h2>
      <input
        type="text"
        placeholder="Habit name (e.g., 'Exercise')"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <div className="form-actions">
        <button type="submit">Add Habit</button>
      </div>
    </form>
  )
}

export default AddHabitForm
