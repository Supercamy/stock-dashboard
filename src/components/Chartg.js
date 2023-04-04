import { useState, useEffect, useContext } from 'react'
import React from 'react'
import { mockHistoricalData } from '../constants/mock'
import { convertUnixTimestampToDate } from '../helpers/date-helper'
import Card from './Card'
import ChartFilter from './ChartFilter'
import { chartConfig } from '../constants/config'
import myFinance from '../constants/bar.json'
import {
  AreaChart,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  Label,
  Legend,
  CartesianGrid,
  Bar,
  Line,
} from 'recharts'
import ThemeContext from '../context/ThemeContext'

const Chartg = () => {
  const [data, setData] = useState(mockHistoricalData)
  const [mainData, setMainData] = useState(myFinance)
  const [filter, setFilter] = useState('1W')
  const { darkMode } = useContext(ThemeContext)

  useEffect(() => {
    fetchDate()
  }, [])

  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      }
    })
  }

  const fetchDate = () => {
    function processMyFinance(myFinance) {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]

      return myFinance
        .filter((item) => item.Opal === '0304701 Boyce Estate')
        .map((item) => {
          const cumBudget = parseFloat(item.cumBudget.toFixed(0))
          const cumActual = parseFloat(item.cumActual.toFixed(0))
          const { Opal, Month, ...rest } = item
          return {
            Opal,
            Month,
            myMonth: monthNames[Month - 1],
            Actuals: cumActual,
            Budget: cumBudget,
            ...rest,
          }
        })
    }

    let myFinanceBoyce = processMyFinance(myFinance)

    console.log(myFinanceBoyce)

    setMainData(myFinanceBoyce)
  }

  return (
    <Card>
      <ul className='flex absolute top-2 right-2 z=40'>
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item)
                }}
              />
            </li>
          )
        })}
      </ul>
      <ResponsiveContainer>
        <ComposedChart
          width={1600}
          height={800}
          data={mainData}
          margin={{ top: 55, right: 10, left: 10, bottom: 25 }}
        >
          <XAxis
            dataKey='myMonth'
            sclaeToFit='true'
            interval={0}
            stroke='#312e81'
          ></XAxis>
          <YAxis yAxisId={1} orientation='right' />
          <Tooltip
            formatter={(value, name) => {
              const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })

              if (name === 'Actuals' || name === 'Budget') {
                return currencyFormatter.format(value)
              }

              return new Intl.NumberFormat('en').format(value)
            }}
            wrapperStyle={{ backgroundColor: '#ccc' }}
          />

          <Legend verticalAlign='bottom' height={36} />
          <CartesianGrid
            vertical={false}
            stroke='rgb(199 210 254)'
            strokeDasharray='5 5'
          />
          <Bar
            yAxisId={1}
            dataKey='Actuals'
            barSize={80}
            label={{ fill: 'white', fontSize: 12 }}
            fill='#312e81'
          />
          <Line
            yAxisId={1}
            strokeWidth={2}
            type='monotone'
            dataKey='Budget'
            stroke='#ff0000'
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chartg