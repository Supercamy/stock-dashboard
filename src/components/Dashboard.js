import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { mockCompanyDetails } from '../constants/mock'
import Details from './Details'
import Header from './Header'
import Overview from './Overview'
import Chart from './Chart'
import Chartg from './Chartg'
import ThemeContext from '../context/ThemeContext'
import dataSummary from '../constants/summarytable.json'
import StockContext from '../context/StockContext'

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext)
  const { opalFilter } = useContext(StockContext)

  // const [opalDetails, setOpalDetails] = useState({})

  useEffect(() => {
    console.log('opalFilter is called')
    console.log(opalFilter)
  }, [opalFilter])

  return (
    <div
      className={`h-screen grid grid-cols md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${
        darkMode ? 'bg-gray-900 text-gray-300' : 'bg-neutral-100'
      }`}
    >
      {' '}
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={mockCompanyDetails.name} />
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chartg />
      </div>
      <div>
        <Overview
          symbol={mockCompanyDetails.ticker}
          price={300}
          change={30}
          changePercent={10.0}
          currency={'USD'}
        />
      </div>
      <div className='row-span-2 xl:row-span-3'>
        <Details details={mockCompanyDetails} />
      </div>
    </div>
  )
}

export default Dashboard
