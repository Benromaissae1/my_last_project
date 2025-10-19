import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD
}

export const useHabitStore = create(persist(
  (set, get) => ({
    habits: [
      // optional example
      // { id: 1, name: 'Read', description: 'Read 20 pages', completions: { '2025-10-10': true } }
    ],

    addHabit: (habit) => {
      set(state => ({ habits: [...state.habits, habit] }))
    },

    editHabit: (id, updates) => {
      set(state => ({
        habits: state.habits.map(h => (h.id === id ? { ...h, ...updates } : h))
      }))
    },

    deleteHabit: (id) => {
      set(state => ({ habits: state.habits.filter(h => h.id !== id) }))
    },

    toggleCompletion: (id, date = todayKey()) => {
      set(state => {
        return {
          habits: state.habits.map(h => {
            if (h.id !== id) return h
            const completions = { ...(h.completions || {}) }
            if (completions[date]) {
              delete completions[date]
            } else {
              completions[date] = true
            }
            return { ...h, completions }
          })
        }
      })
    },

    clearAll: () => set({ habits: [] })
  }),
  {
    name: 'habit-storage-v1' // localStorage key
  }
))
