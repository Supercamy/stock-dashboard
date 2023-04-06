import React, { useContext, useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchResults from './SearchResults'
import ThemeContext from '../context/ThemeContext'
import StockContext from '../context/StockContext'
import { summedDataSummary } from '../constants/myDataConstant'

const Search = () => {
  const { setOpalFilter } = useContext(StockContext)
  const [input, setInput] = useState('')
  const [bestMatches, setBestMatches] = useState([])
  const [showResults, setShowResults] = useState(false)

  const { darkMode } = useContext(ThemeContext)

  const clear = () => {
    setInput('')
    setBestMatches([])
  }

  const handleItemClick = (opal) => {
    setOpalFilter(opal)
    setShowResults(false)
    setInput('')
  }

  const updateBestMatches = async () => {
    try {
      if (input) {
        const filteredOpals = summedDataSummary.filter((item) =>
          item.Opal.toLowerCase().includes(input.toLowerCase())
        )

        setBestMatches(filteredOpals)
      }
    } catch (error) {
      setBestMatches([])
      console.log(error)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateBestMatches()
    }
  }

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96  ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-neutral-200'
      }`}
    >
      <input
        type='text'
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? 'bg-gray-900' : null
        }`}
        placeholder='Search opal...'
        onChange={(event) => {
          setInput(event.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
      {input && (
        <button onClick={clear} className='m-1'>
          <XMarkIcon className='h-4 w-4 fill-gray-500'></XMarkIcon>
        </button>
      )}{' '}
      <button
        onClick={updateBestMatches}
        className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2'
      >
        <MagnifyingGlassIcon className='h-4 w-4 fill-gray-200'></MagnifyingGlassIcon>
      </button>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} onItemClick={handleItemClick} />
      ) : null}
    </div>
  )
}

export default Search
