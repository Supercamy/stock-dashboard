import React, { useContext } from 'react'
import Card from './Card'
import ThemeContext from '../context/ThemeContext'

const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext)

  const detailsList = {
    name: 'Name',
    country: 'Country',
    currency: 'Currency',
    exchange: 'Exchange',
    ipo: 'IPO Date',
    marketCapitalization: 'Market Capitalization',
    finnhubIndustry: 'Industry',
  }

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2)
  }

  return (
    <Card>
      <ul
        className={`w-full h-full flex flex-col justify-between divide-y-1 ${
          darkMode ? 'divide-gray-800' : null
        }`}
      >
        <li className='flex-1 flex justify-between items-center'>
          <span>Name</span>
          <span>Space Management</span>
        </li>{' '}
        <li className='flex-1 flex justify-between items-center'>
          <span>Budget</span>
          <span>$713,000</span>
        </li>
        <li className='flex-1 flex justify-between items-center'>
          <span>Salary</span>
          <span>35% - $317,000</span>
        </li>
        <li className='flex-1 flex justify-between items-center'>
          <span>Non Salary</span>
          <span>65% - $416,000</span>
        </li>
        <li className='flex-1 flex justify-between items-center'>
          <span>
            This account is the general operating for the Space Mangagement
            team. The account covers salary, space management projects and cost
            for providing space auditing
          </span>
        </li>
        {/* {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className='flex-1 flex justify-between items-center'>
              <span>{detailsList[item]}</span>
              <span>
                {' '}
                {item === 'marketCapitalization'
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </span>
            </li>
          )
        })} */}
      </ul>
    </Card>
  )
}

export default Details
