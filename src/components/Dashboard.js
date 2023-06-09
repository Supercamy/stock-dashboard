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
import { summedDataSummary } from '../constants/myDataConstant'

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext)
  const { opalFilter } = useContext(StockContext)

  // const [opalDetails, setOpalDetails] = useState({})
  const [overvieww, setOverview] = useState([{ Opal: 'Gordon', BudgetSum: 0 }])

  useEffect(() => {
    let overviewg = summedDataSummary.filter((item) => item.Opal === opalFilter)
    setOverview(overviewg)
  }, [opalFilter])

  const removeNumbers = (text) => {
    return text.replace(/[0-9]/g, '')
  }

  return (
    <div
      className={`h-90v grid grid-cols md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-4 p-4 font-quicksand  ${
        darkMode ? 'bg-gray-900 text-gray-300' : 'bg-neutral-50'
      }`}
    >
      {' '}
      <div className='col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center'>
        <Header name={opalFilter} />
      </div>
      <div className='md:col-span-2 row-span-4'>
        <Chartg />
      </div>
      <div>
        {overvieww.length > 0 && (
          <Overview
            symbol={removeNumbers(overvieww[0].Opal)}
            price={Math.round(overvieww[0].BudgetSum)}
            change={30}
            changePercent={10.0}
            currency={'K'}
          />
        )}
      </div>
      <div className='row-span-2 xl:row-span-3'>
        <Details details={mockCompanyDetails} />
      </div>
    </div>
  )
}

export default Dashboard
