import { useState } from 'react'
import './App.css'

import Dashboard from './components/Dashboard'
import StockContext from './context/StockContext'
import ThemeContext from './context/ThemeContext'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [opalFilter, setOpalFilter] = useState('0304701 Boyce Estate')

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ opalFilter, setOpalFilter }}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
