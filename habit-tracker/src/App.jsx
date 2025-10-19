import React from 'react'
import Header from './components/Header'
import AddHabitForm from './components/AddHabitForm'
import HabitList from './components/HabitList'
import Stats from './components/Stats'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="left">
          <AddHabitForm />
          <HabitList />
        </section>
        <aside className="right">
          <Stats />
        </aside>
      </main>
      <Footer />
    </div>
  )
}

export default App
