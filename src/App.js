import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Dashboard from './components/Dashboard'
import StockContext from './context/StockContext'
import ThemeContext from './context/ThemeContext'
import Navbar from './components/Navbar'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [opalFilter, setOpalFilter] = useState('0304701 Boyce Estate')

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ opalFilter, setOpalFilter }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </Router>
      </StockContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
